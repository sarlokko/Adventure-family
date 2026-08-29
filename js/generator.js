(function (root) {
  function fill(str, vars) {
    return String(str).replace(/\{([a-zA-Z0-9]+)\}/g, (_, k) => {
      return vars[k] != null ? String(vars[k]) : "{" + k + "}";
    });
  }

  function fillList(list, vars) {
    return (list || []).map((s) => fill(s, vars));
  }

  function pickUnused(pool, usedIds, count, rand) {
    const used = new Set(usedIds || []);
    const unused = root.AF_RNG.shuffle(
      pool.filter((x) => !used.has(x.id)),
      rand
    );
    const reused = root.AF_RNG.shuffle(
      pool.filter((x) => used.has(x.id)),
      rand
    );
    const reset = unused.length < count;
    const picked = [];
    const seen = new Set();
    for (const item of unused.concat(reused)) {
      if (seen.has(item.id)) continue;
      picked.push(item);
      seen.add(item.id);
      if (picked.length >= count) break;
    }
    return { picked, reset, remainingFresh: Math.max(0, unused.length - picked.length) };
  }

  function chooseActor(players, sceneIndex) {
    const alive = players.filter((p) => p.hp > 0);
    if (!alive.length) return [];
    return [alive[sceneIndex % alive.length].id];
  }

  function mapChoice(c, vars) {
    return {
      id: c.id,
      label: fill(c.label, vars),
      dmg: c.dmg || 1,
      green: fill(c.green, vars),
      red: fill(c.red, vars),
      greenNext: fill(c.greenNext || "", vars),
      redNext: fill(c.redNext || "", vars)
    };
  }

  function generate(opts) {
    const C = root.AF_CONTENT;
    const used = opts.used || root.AF_STORAGE.emptyUsed();
    const seed = opts.seed || root.AF_RNG.seedFrom();
    const rand = root.AF_RNG.rng(seed);
    const resets = [];
    const session = {};
    for (const key of Object.keys(used)) session[key] = (used[key] || []).slice();

    function take(poolName, count) {
      const res = pickUnused(C[poolName], session[poolName] || [], count, rand);
      if (res.reset) resets.push(poolName);
      session[poolName] = (session[poolName] || []).concat(res.picked.map((p) => p.id));
      return res.picked;
    }

    const world = take("worlds", 1)[0];
    const quest = take("quests", 1)[0];
    const villain = take("villains", 1)[0];
    const treasure = take("treasures", 1)[0];
    const npc = take("npcs", 1)[0];
    const roles = take("roles", opts.players.length);
    const locations = take("locations", 6);
    const challenges = take("challenges", 5);
    const climax = take("climax", 1)[0];
    const opening = C.openings[0];
    const winEnding = C.winEndings[0];
    const failEnding = C.failEndings[0];
    const fleeEnding = C.fleeEndings[0];

    const players = opts.players.map((p, i) => ({
      id: "p" + (i + 1),
      name: p.name.trim() || "Giocatore " + (i + 1),
      role: roles[i % roles.length],
      hp: 3,
      maxHp: 3,
      alive: true,
      outLine: null
    }));

    const baseVars = {
      world: world.name,
      worldLine: world.line,
      questName: quest.name,
      questLine: quest.line,
      villain: villain.name,
      villainLine: villain.line,
      treasure: treasure.name,
      npc: npc.name,
      npcLine: npc.line,
      master: opts.masterName || ""
    };

    const scenes = [];

    scenes.push({
      id: "intro",
      type: "intro",
      title: world.name,
      locationName: world.name,
      story: fillList(opening, baseVars),
      prompt: null,
      choices: [],
      who: "none",
      actors: []
    });

    challenges.forEach((ch, i) => {
      const loc = locations[i] || locations[locations.length - 1];
      const vars = Object.assign({}, baseVars, { location: loc.name });
      scenes.push({
        id: ch.id,
        type: "challenge",
        title: ch.title,
        locationName: loc.name,
        locationId: loc.id,
        story: fillList(ch.story, vars),
        prompt: fill(ch.prompt, vars),
        who: "one",
        actors: chooseActor(players, i),
        choices: ch.choices.map((c) => mapChoice(c, vars))
      });
    });

    const climaxLoc = locations[5] || locations[locations.length - 1];
    const cvars = Object.assign({}, baseVars, { location: climaxLoc.name });
    scenes.push({
      id: climax.id,
      type: "climax",
      title: climax.title,
      locationName: climaxLoc.name,
      locationId: climaxLoc.id,
      story: fillList(climax.story, cvars),
      prompt: fill(climax.prompt, cvars),
      who: "one",
      actors: chooseActor(players, 5),
      choices: climax.choices.map((c) => mapChoice(c, cvars)),
      groupSuccessNeeded: true
    });

    scenes.push({
      id: "ending",
      type: "ending",
      title: "Fine",
      locationName: climaxLoc.name,
      story: [],
      prompt: null,
      choices: [],
      who: "none",
      actors: []
    });

    const title = quest.name + " · " + world.name;

    return {
      id: "adv-" + seed.toString(16) + "-" + Date.now().toString(36),
      seed,
      createdAt: Date.now(),
      title,
      masterName: opts.masterName || "",
      world,
      quest,
      villain,
      treasure,
      npc,
      extraNpcs: [],
      players,
      scenes,
      sceneIndex: 0,
      phase: "intro",
      currentChoiceId: null,
      currentActorIndex: 0,
      rolls: [],
      log: [],
      status: "ongoing",
      outcome: null,
      endings: {
        win: fillList(winEnding, Object.assign({}, baseVars, { location: climaxLoc.name })),
        fail: fillList(failEnding, Object.assign({}, baseVars, { location: climaxLoc.name })),
        flee: fillList(fleeEnding, Object.assign({}, baseVars, { location: climaxLoc.name }))
      },
      usedIds: {
        worlds: [world.id],
        quests: [quest.id],
        villains: [villain.id],
        treasures: [treasure.id],
        npcs: [npc.id],
        roles: roles.map((r) => r.id),
        locations: locations.map((l) => l.id),
        challenges: challenges.map((c) => c.id),
        climax: [climax.id]
      },
      resets,
      minutesEstimate: 30
    };
  }

  function alivePlayers(game) {
    return game.players.filter((p) => p.hp > 0);
  }

  function applyDeath(game, player, rand) {
    const C = root.AF_CONTENT;
    const line = C.deathLines[Math.floor((rand ? rand() : Math.random()) * C.deathLines.length)];
    player.hp = 0;
    player.alive = false;
    player.outLine = line.replace("{name}", player.name).replace("{villain}", game.villain.name);
    game.log.push({ t: Date.now(), kind: "death", text: player.outLine, playerId: player.id });
  }

  function damagePlayer(game, playerId, amount, rand) {
    const p = game.players.find((x) => x.id === playerId);
    if (!p || p.hp <= 0) return { died: false, player: p };
    p.hp = Math.max(0, p.hp - amount);
    if (p.hp <= 0) {
      applyDeath(game, p, rand);
      return { died: true, player: p };
    }
    return { died: false, player: p };
  }

  function checkTpk(game) {
    if (alivePlayers(game).length === 0) {
      game.status = "failed";
      game.outcome = "tpk";
      game.phase = "end";
      game.sceneIndex = game.scenes.length - 1;
      return true;
    }
    return false;
  }

  root.AF_GEN = {
    fill,
    fillList,
    pickUnused,
    generate,
    alivePlayers,
    damagePlayer,
    applyDeath,
    checkTpk,
    chooseActor
  };
})(typeof window !== "undefined" ? window : globalThis);
