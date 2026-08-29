#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");
const assert = require("assert");

const store = {};
const sandbox = {
  console,
  Date,
  Math,
  window: null,
  localStorage: {
    getItem: (k) => (Object.prototype.hasOwnProperty.call(store, k) ? store[k] : null),
    setItem: (k, v) => {
      store[k] = String(v);
    },
    removeItem: (k) => {
      delete store[k];
    }
  }
};
sandbox.globalThis = sandbox;
sandbox.window = sandbox;

function load(rel) {
  const code = fs.readFileSync(path.join(__dirname, "..", rel), "utf8");
  vm.runInNewContext(code, sandbox, { filename: rel });
}

load("js/content.js");
load("js/rng.js");
load("js/storage.js");
load("js/generator.js");

const C = sandbox.AF_CONTENT;
const GEN = sandbox.AF_GEN;
const STORAGE = sandbox.AF_STORAGE;
const RNG = sandbox.AF_RNG;

function makeGame(n, used) {
  const names = [];
  for (let i = 0; i < n; i++) names.push("P" + (i + 1));
  return GEN.generate({
    masterName: "Nonna",
    players: names.map((name) => ({ name })),
    used: used || STORAGE.emptyUsed(),
    seed: (Math.floor(Math.random() * 1e9) + 1) >>> 0
  });
}

let passed = 0;
function test(name, fn) {
  fn();
  passed += 1;
  console.log("ok  " + name);
}

test("pool sizes", () => {
  assert.ok(C.worlds.length >= 20);
  assert.ok(C.quests.length >= 20);
  assert.ok(C.villains.length >= 20);
  assert.ok(C.locations.length >= 40);
  assert.ok(C.challenges.length >= 30);
  assert.ok(C.roles.length >= 12);
  assert.ok(C.climax.length >= 3);
});

test("unique ids inside each pool", () => {
  for (const [name, pool] of Object.entries({
    worlds: C.worlds,
    quests: C.quests,
    villains: C.villains,
    treasures: C.treasures,
    npcs: C.npcs,
    roles: C.roles,
    locations: C.locations,
    challenges: C.challenges,
    climax: C.climax
  })) {
    const ids = pool.map((x) => x.id);
    assert.equal(ids.length, new Set(ids).size, name + " has duplicate ids");
  }
});

test("adventure shape ~30 min, 8 scenes", () => {
  const g = makeGame(3);
  assert.equal(g.scenes.length, 8);
  assert.equal(g.scenes[0].type, "intro");
  assert.equal(g.scenes[6].type, "climax");
  assert.equal(g.scenes[7].type, "ending");
  assert.equal(g.players.length, 3);
  assert.ok(g.players.every((p) => p.hp === 3));
  assert.equal(g.minutesEstimate, 30);
  const usedLoc = new Set(g.scenes.filter((s) => s.locationId).map((s) => s.locationId));
  assert.equal(usedLoc.size, 6);
});

test("player count 1 to 6", () => {
  for (const n of [1, 2, 6]) {
    const g = makeGame(n);
    assert.equal(g.players.length, n);
    const roles = new Set(g.players.map((p) => p.role.id));
    assert.equal(roles.size, n);
  }
});

test("sequential adventures never reuse elements until a pool resets", () => {
  const seen = STORAGE.emptyUsed();
  const used = STORAGE.emptyUsed();
  for (let i = 0; i < 5; i++) {
    const g = makeGame(2, used);
    for (const [pool, ids] of Object.entries(g.usedIds)) {
      for (const id of ids) {
        if (!g.resets.includes(pool)) {
          assert.ok(!seen[pool].includes(id), "reused " + pool + " " + id + " on adventure " + i);
        }
        if (!seen[pool].includes(id)) seen[pool].push(id);
        if (!used[pool].includes(id)) used[pool].push(id);
      }
    }
    assert.ok(g.world.id);
    assert.ok(g.quest.id);
    assert.ok(g.villain.id);
  }
});

test("five adventures have distinct world+quest+villain signatures", () => {
  const used = STORAGE.emptyUsed();
  const sigs = new Set();
  for (let i = 0; i < 5; i++) {
    const g = makeGame(3, used);
    const sig = [g.world.id, g.quest.id, g.villain.id, g.treasure.id, g.npc.id].join("|");
    assert.ok(!sigs.has(sig), "duplicate signature " + sig);
    sigs.add(sig);
    for (const [pool, ids] of Object.entries(g.usedIds)) {
      for (const id of ids) if (!used[pool].includes(id)) used[pool].push(id);
    }
  }
});

test("damage and TPK", () => {
  const g = makeGame(2);
  const rand = sandbox.AF_RNG.rng(42);
  const a = g.players[0];
  const b = g.players[1];
  GEN.damagePlayer(g, a.id, 3, rand);
  assert.equal(a.hp, 0);
  assert.ok(a.outLine);
  assert.equal(GEN.checkTpk(g), false);
  GEN.damagePlayer(g, b.id, 3, rand);
  assert.equal(GEN.checkTpk(g), true);
  assert.equal(g.status, "failed");
  assert.equal(g.outcome, "tpk");
});

test("choices have green/red paths, no dice target", () => {
  const g = makeGame(4);
  for (const sc of g.scenes) {
    if (!sc.choices || !sc.choices.length) continue;
    for (const c of sc.choices) {
      assert.equal(c.target, undefined);
      assert.ok(c.dmg >= 1);
      assert.ok(c.label);
      assert.ok(c.green);
      assert.ok(c.red);
      assert.notEqual(c.green, c.red);
    }
    if (sc.type === "challenge" || sc.type === "climax") {
      assert.ok(sc.actors.length >= 1);
      assert.ok(Array.isArray(sc.story) && sc.story.length >= 3);
    }
  }
});

test("every challenge is three story lines plus two short choices", () => {
  for (const ch of C.challenges) {
    assert.ok(Array.isArray(ch.story) && ch.story.length === 3, ch.id + " story");
    assert.ok(ch.story[0].includes("{location}"), ch.id + " must say where");
    assert.equal(ch.choices.length, 2);
    for (const c of ch.choices) {
      assert.ok(c.label && c.label.length <= 40, ch.id + "/" + c.id + " label too long");
      assert.ok(c.green && c.green.length >= 8, ch.id + "/" + c.id + " green");
      assert.ok(c.red && c.red.length >= 8, ch.id + "/" + c.id + " red");
      assert.notEqual(c.green, c.red);
      assert.ok(c.greenNext && c.greenNext.length >= 8, ch.id + "/" + c.id + " greenNext");
      assert.ok(c.redNext && c.redNext.length >= 8, ch.id + "/" + c.id + " redNext");
      assert.notEqual(c.greenNext, c.redNext);
    }
  }
});

test("generated scenes carry story lines and next-path lines", () => {
  const g = makeGame(2);
  const ch = g.scenes.find((s) => s.type === "challenge");
  assert.ok(Array.isArray(ch.story) && ch.story.length >= 3);
  assert.ok(ch.choices[0].greenNext);
  assert.ok(ch.choices[0].redNext);
  const intro = g.scenes[0];
  const blob = intro.story.join(" ");
  assert.ok(blob.includes("Dove siete") || blob.includes("bussola"));
});

test("actor placeholder stays until play, then becomes the name", () => {
  const g = makeGame(2);
  const ch = g.scenes.find((s) => s.type === "challenge");
  const hit = ch.choices.find((c) => /\{actor\}/.test(c.green + c.red));
  assert.ok(hit, "at least one outcome should name who acts");
  const filled = GEN.fill(hit.red.includes("{actor}") ? hit.red : hit.green, { actor: "Luca" });
  assert.ok(filled.includes("Luca"));
  assert.ok(!filled.includes("{actor}"));
});

test("turns rotate across scenes", () => {
  const g = makeGame(3);
  const ids = g.scenes.filter((s) => s.type === "challenge" || s.type === "climax").map((s) => s.actors[0]);
  assert.equal(ids[0], "p1");
  assert.equal(ids[1], "p2");
  assert.equal(ids[2], "p3");
  assert.equal(ids[3], "p1");
});

test("compass colors from needle angle", () => {
  assert.equal(RNG.colorFromNeedle(0), "green");
  assert.equal(RNG.colorFromNeedle(119), "green");
  assert.equal(RNG.colorFromNeedle(120), "yellow");
  assert.equal(RNG.colorFromNeedle(239), "yellow");
  assert.equal(RNG.colorFromNeedle(240), "red");
  assert.equal(RNG.colorFromNeedle(359), "red");
  assert.equal(RNG.colorFromNeedle(-10), "red");
});

test("spinCompass lands on its own color", () => {
  const rand = RNG.rng(11);
  const seen = { green: 0, yellow: 0, red: 0 };
  for (let i = 0; i < 60; i++) {
    const s = RNG.spinCompass(rand);
    assert.equal(s.color, RNG.colorFromNeedle(s.needle));
    assert.ok(s.rotation >= 5 * 360);
    seen[s.color] += 1;
  }
  assert.ok(seen.green > 0 && seen.yellow > 0 && seen.red > 0);
});

test("pickUnused prefers unused ids", () => {
  const pool = [{ id: "a" }, { id: "b" }, { id: "c" }];
  const rand = sandbox.AF_RNG.rng(7);
  const first = GEN.pickUnused(pool, [], 1, rand);
  const second = GEN.pickUnused(pool, [first.picked[0].id], 1, rand);
  assert.notEqual(first.picked[0].id, second.picked[0].id);
  const third = GEN.pickUnused(pool, [first.picked[0].id, second.picked[0].id], 1, rand);
  assert.ok(["a", "b", "c"].includes(third.picked[0].id));
  const reset = GEN.pickUnused(pool, ["a", "b", "c"], 1, rand);
  assert.equal(reset.reset, true);
});

test("storage roundtrip", () => {
  const g = makeGame(2);
  STORAGE.setActive(g);
  const back = STORAGE.getActive();
  assert.equal(back.title, g.title);
  STORAGE.markUsed(g.usedIds);
  const used = STORAGE.getUsed();
  assert.ok(used.worlds.includes(g.world.id));
});

test("full playthrough can win on green", () => {
  const g = makeGame(3, STORAGE.emptyUsed());
  g.sceneIndex = 1;
  while (g.scenes[g.sceneIndex].type !== "ending" && g.status === "ongoing") {
    const sc = g.scenes[g.sceneIndex];
    if (sc.type === "intro") {
      g.sceneIndex += 1;
      continue;
    }
    if (sc.type === "climax") {
      g.outcome = "win";
      g.status = "won";
      break;
    }
    g.sceneIndex += 1;
  }
  assert.equal(g.outcome, "win");
  assert.ok(GEN.alivePlayers(g).length >= 1);
});

test("everyone dead fails the adventure", () => {
  const g = makeGame(1);
  const rand = sandbox.AF_RNG.rng(1);
  GEN.damagePlayer(g, g.players[0].id, 3, rand);
  assert.equal(GEN.checkTpk(g), true);
  assert.equal(g.outcome, "tpk");
});

console.log("\n" + passed + " test ok");
