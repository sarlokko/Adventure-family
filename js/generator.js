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

  function chooseActor(players, turnIndex) {
    const alive = players.filter((p) => p.hp > 0);
    if (!alive.length) return [];
    return [alive[turnIndex % alive.length].id];
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

  function baseVars(game) {
    const c = game.campaign;
    return {
      world: c.name,
      worldLine: c.setting,
      questName: c.goal,
      questLine: c.goal,
      goal: c.goal,
      villain: c.threat,
      villainLine: c.threatLine,
      treasure: "le scorte",
      npc: "il gruppo",
      npcLine: "",
      master: game.masterName || "",
      location: ""
    };
  }

  function insertBeforeEnding(game, scene) {
    const end = game.scenes[game.scenes.length - 1];
    if (end && end.type === "ending") {
      game.scenes.pop();
      game.scenes.push(scene);
      game.scenes.push(end);
    } else {
      game.scenes.push(scene);
    }
  }

  function takeChallenge(game, rand) {
    const pool = game.campaign.challenges;
    const used = game.usedChallengeIds || [];
    const res = pickUnused(pool, used, 1, rand);
    const ch = res.picked[0];
    if (!game.usedChallengeIds) game.usedChallengeIds = [];
    if (ch && !game.usedChallengeIds.includes(ch.id)) game.usedChallengeIds.push(ch.id);
    return ch;
  }

  function takeLocation(game, rand) {
    const pool = game.campaign.locations;
    const used = game.usedLocationIds || [];
    const res = pickUnused(
      pool.map((name, i) => ({ id: game.campaign.id + "-l" + i, name: name })),
      used,
      1,
      rand
    );
    const loc = res.picked[0];
    if (!game.usedLocationIds) game.usedLocationIds = [];
    if (loc && !game.usedLocationIds.includes(loc.id)) game.usedLocationIds.push(loc.id);
    return loc;
  }

  function buildChallengeScene(game, ch, loc, turnIndex) {
    const vars = Object.assign({}, baseVars(game), { location: loc.name });
    return {
      id: ch.id,
      type: "challenge",
      title: ch.title,
      locationName: loc.name,
      locationId: loc.id,
      story: fillList(ch.story, vars),
      prompt: fill(ch.prompt || "Cosa fate?", vars),
      who: "one",
      actors: chooseActor(game.players, turnIndex),
      choices: ch.choices.map((c) => mapChoice(c, vars))
    };
  }

  function buildClimaxScene(game) {
    const climax = game.campaign.climax;
    const locName = game.campaign.locations[game.campaign.locations.length - 1];
    const vars = Object.assign({}, baseVars(game), { location: locName });
    return {
      id: climax.id,
      type: "climax",
      title: climax.title,
      locationName: locName,
      locationId: climax.id + "-loc",
      story: fillList(climax.story, vars),
      prompt: fill(climax.prompt || "Cosa fate?", vars),
      who: "one",
      actors: chooseActor(game.players, game.turnIndex || 0),
      choices: climax.choices.map((c) => mapChoice(c, vars))
    };
  }

  function appendChallenge(game) {
    const rand = root.AF_RNG.rng((game.seed ^ ((game.usedChallengeIds || []).length + 1) * 9973) >>> 0);
    const ch = takeChallenge(game, rand);
    const loc = takeLocation(game, rand);
    game.turnIndex = (game.turnIndex || 0) + 1;
    insertBeforeEnding(game, buildChallengeScene(game, ch, loc, game.turnIndex));
    return game;
  }

  function ensureClimax(game) {
    const next = game.scenes[game.sceneIndex + 1];
    if (next && next.type === "climax") return game;
    if (game.scenes.some((s) => s.type === "climax")) return game;
    insertBeforeEnding(game, buildClimaxScene(game));
    return game;
  }

  function generate(opts) {
    const C = root.AF_CONTENT;
    const used = opts.used || root.AF_STORAGE.emptyUsed();
    const seed = opts.seed || root.AF_RNG.seedFrom();
    const rand = root.AF_RNG.rng(seed);
    const resets = [];
    const campaignUsed = used.campaigns || used.worlds || [];
    const campPick = pickUnused(C.campaigns, campaignUsed, 1, rand);
    if (campPick.reset) resets.push("campaigns");
    const campaign = campPick.picked[0];
    const rolePick = pickUnused(C.roles, used.roles || [], opts.players.length, rand);
    if (rolePick.reset) resets.push("roles");
    const roles = rolePick.picked;

    const players = opts.players.map((p, i) => ({
      id: "p" + (i + 1),
      name: p.name.trim() || "Giocatore " + (i + 1),
      role: roles[i % roles.length],
      hp: 3,
      maxHp: 3,
      alive: true,
      outLine: null
    }));

    const game = {
      id: "adv-" + seed.toString(16) + "-" + Date.now().toString(36),
      seed,
      createdAt: Date.now(),
      title: campaign.title,
      masterName: opts.masterName || "",
      campaign,
      world: { id: campaign.id, name: campaign.name, line: campaign.setting },
      quest: { id: campaign.id, name: campaign.title, line: campaign.goal },
      villain: { id: campaign.id + "-th", name: campaign.threat, line: campaign.threatLine },
      treasure: { id: "t-scorte", name: "le scorte" },
      npc: { id: "n-gruppo", name: "il gruppo", line: "" },
      extraNpcs: [],
      players,
      scenes: [],
      sceneIndex: 0,
      phase: "intro",
      currentChoiceId: null,
      currentActorIndex: 0,
      turnIndex: 0,
      progress: 0,
      goalNeeded: campaign.goalNeeded || 5,
      usedChallengeIds: [],
      usedLocationIds: [],
      rolls: [],
      log: [],
      status: "ongoing",
      outcome: null,
      endings: {
        win: fillList(campaign.win, { goal: campaign.goal, threat: campaign.threat }),
        fail: fillList(campaign.fail, { goal: campaign.goal, threat: campaign.threat }),
        flee: fillList(campaign.fail, { goal: campaign.goal, threat: campaign.threat })
      },
      usedIds: {
        campaigns: [campaign.id],
        worlds: [campaign.id],
        quests: [campaign.id],
        villains: [campaign.id + "-th"],
        treasures: ["t-scorte"],
        npcs: ["n-gruppo"],
        roles: roles.map((r) => r.id),
        locations: [],
        challenges: [],
        climax: [campaign.climax.id]
      },
      resets,
      minutesEstimate: 40
    };

    const vars = baseVars(game);
    game.scenes.push({
      id: "intro",
      type: "intro",
      title: campaign.title,
      locationName: campaign.name,
      story: fillList(campaign.opening, vars),
      prompt: null,
      choices: [],
      who: "none",
      actors: []
    });

    const firstCh = takeChallenge(game, rand);
    const firstLoc = takeLocation(game, rand);
    game.scenes.push(buildChallengeScene(game, firstCh, firstLoc, 0));
    game.scenes.push({
      id: "ending",
      type: "ending",
      title: "Fine",
      locationName: "",
      story: [],
      prompt: null,
      choices: [],
      who: "none",
      actors: []
    });
    game.usedIds.challenges = game.usedChallengeIds.slice();
    game.usedIds.locations = game.usedLocationIds.slice();
    return game;
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
    chooseActor,
    appendChallenge,
    ensureClimax,
    buildClimaxScene
  };
})(typeof window !== "undefined" ? window : globalThis);
