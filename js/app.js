(function () {
  const $ = (sel, el) => (el || document).querySelector(sel);

  const state = {
    view: "home",
    setupCount: 3,
    setupMaster: "",
    setupNames: ["", "", "", "", "", ""],
    spinning: false,
    lastSpin: null,
    wheelDeg: 0,
    toast: null,
    game: null,
    forceColor: null
  };

  function save(game) {
    const g = game || state.game;
    if (g) {
      state.game = g;
      AF_STORAGE.setActive(g);
    }
  }

  function activeGame() {
    if (state.game) return state.game;
    state.game = AF_STORAGE.getActive();
    return state.game;
  }

  function toast(msg) {
    state.toast = msg;
    render();
    setTimeout(() => {
      if (state.toast === msg) {
        state.toast = null;
        render();
      }
    }, 2800);
  }

  function beep(kind) {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.connect(g);
      g.connect(ctx.destination);
      o.type = kind === "red" ? "sawtooth" : kind === "death" ? "square" : kind === "yellow" ? "sine" : "triangle";
      o.frequency.value = kind === "green" ? 660 : kind === "red" ? 180 : kind === "death" ? 90 : 330;
      g.gain.value = 0.04;
      o.start();
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.18);
      o.stop(ctx.currentTime + 0.2);
    } catch (e) {}
  }

  function scene(game) {
    return game.scenes[game.sceneIndex];
  }

  function playerById(game, id) {
    return game.players.find((p) => p.id === id);
  }

  function currentActor(game) {
    const sc = scene(game);
    if (!sc || !sc.actors || !sc.actors.length) return null;
    refreshActor(game);
    return playerById(game, sc.actors[0]);
  }

  function refreshActor(game) {
    const sc = scene(game);
    if (!sc || sc.type === "intro" || sc.type === "ending") return;
    const alive = AF_GEN.alivePlayers(game);
    if (!alive.length) {
      sc.actors = [];
      return;
    }
    const still = (sc.actors || []).map((id) => playerById(game, id)).find((p) => p && p.hp > 0);
    if (still) {
      sc.actors = [still.id];
      return;
    }
    sc.actors = AF_GEN.chooseActor(game.players, game.sceneIndex);
  }

  function withActor(text, game) {
    const p = currentActor(game);
    return AF_GEN.fill(text || "", { actor: p ? p.name : "qualcuno" });
  }

  function startNew(masterName, playerNames) {
    const used = AF_STORAGE.getUsed();
    const game = AF_GEN.generate({
      masterName: (masterName || "").trim(),
      players: playerNames.map((n) => ({ name: n })),
      used
    });
    AF_STORAGE.markUsed(game.usedIds);
    AF_STORAGE.setSettings({ lastMaster: game.masterName, lastPlayers: playerNames });
    AF_STORAGE.setActive(game);
    state.game = game;
    state.view = "play";
    state.lastSpin = null;
    state.wheelDeg = 0;
    if (game.resets.length) toast("Alcuni pezzi erano già usati. Li ho rimescolati.");
    render();
  }

  function abandonActive() {
    const g = AF_STORAGE.getActive();
    if (!g) return;
    AF_STORAGE.pushArchive({
      id: g.id,
      title: g.title,
      at: Date.now(),
      result: "abbandonata",
      players: g.players.map((p) => p.name)
    });
    AF_STORAGE.setActive(null);
    state.game = null;
  }

  function storyHtml(lines, game) {
    return (lines || [])
      .map((s) => `<p class="line">${escapeHtml(game ? withActor(s, game) : s)}</p>`)
      .join("");
  }

  function finish(game, outcome) {
    game.status = outcome === "win" ? "won" : outcome === "flee" ? "fled" : "failed";
    game.outcome = outcome;
    game.phase = "end";
    const last = game.scenes[game.scenes.length - 1];
    last.story = outcome === "win" ? game.endings.win : outcome === "flee" ? game.endings.flee : game.endings.fail;
    game.sceneIndex = game.scenes.length - 1;
    AF_STORAGE.pushArchive({
      id: game.id,
      title: game.title,
      at: Date.now(),
      result: outcome === "win" ? "vittoria" : outcome === "flee" ? "fuga" : "sconfitta",
      players: game.players.map((p) => p.name + (p.hp > 0 ? "" : " ✦"))
    });
    AF_STORAGE.setActive(game);
    state.game = game;
    state.view = "end";
  }

  function goNextScene(game) {
    if (game.status !== "ongoing") {
      state.view = "end";
      save(game);
      render();
      return;
    }
    if (!AF_GEN.alivePlayers(game).length) {
      finish(game, "tpk");
      save(game);
      render();
      return;
    }
    const sc = scene(game);
    if (sc && sc.type === "climax" && game.phase === "result") {
      if (game.lastOutcome && game.lastOutcome.ok) finish(game, "win");
      else finish(game, "flee");
      save(game);
      render();
      return;
    }
    game.sceneIndex += 1;
    game.phase = "choose";
    game.currentChoiceId = null;
    state.lastSpin = null;
    const next = scene(game);
    if (next && game.pathNote) {
      next.story = [withActor(game.pathNote, game)].concat(next.story || []);
      game.pathNote = null;
    }
    if (next && next.type === "ending") {
      finish(game, AF_GEN.alivePlayers(game).length ? "win" : "tpk");
    } else {
      refreshActor(game);
    }
    save(game);
    render();
  }

  function applySpin(game, color) {
    const sc = scene(game);
    const actor = currentActor(game);
    const choice = sc.choices.find((c) => c.id === game.currentChoiceId);
    if (!actor || !choice) return;

    if (color === "yellow") {
      beep("yellow");
      state.lastSpin = { color: "yellow", playerName: actor.name };
      game.phase = "spin";
      save(game);
      render();
      return;
    }

    const ok = color === "green";
    const rec = { sceneId: sc.id, choiceId: choice.id, playerId: actor.id, color, ok, dmg: ok ? 0 : choice.dmg };
    game.rolls.push(rec);
    let deathText = null;
    if (!ok) {
      const res = AF_GEN.damagePlayer(game, actor.id, choice.dmg, AF_RNG.rng(game.seed));
      if (res.died) deathText = actor.outLine;
      beep(res.died ? "death" : "red");
    } else {
      beep("green");
    }
    game.lastOutcome = {
      text: withActor(ok ? choice.green : choice.red, game),
      ok,
      deathText,
      color
    };
    game.pathNote = ok ? choice.greenNext || "" : choice.redNext || "";
    game.phase = "result";
    save(game);
    render();
  }

  function doSpin(game) {
    if (state.spinning) return;
    const sc = scene(game);
    if (!game.currentChoiceId || !sc.choices.length) return;
    refreshActor(game);
    if (!currentActor(game)) return;
    state.spinning = true;
    state.lastSpin = null;
    render();
    const rand = AF_RNG.rng((game.seed ^ (Date.now() & 0xffff) ^ (game.rolls.length * 7919)) >>> 0);
    let spin = AF_RNG.spinCompass(rand);
    if (state.forceColor) {
      const color = state.forceColor;
      const [a, b] = AF_RNG.COMPASS[color];
      const needle = (a + b) / 2;
      spin = { color, needle, rotation: 6 * 360 + (360 - needle) };
      state.forceColor = null;
    }
    requestAnimationFrame(function () {
      state.wheelDeg += spin.rotation;
      render();
      setTimeout(function () {
        state.spinning = false;
        applySpin(game, spin.color);
      }, 2400);
    });
  }

  function hearts(n, max) {
    let s = "";
    for (let i = 0; i < max; i++) s += i < n ? "♥" : "♡";
    return s;
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function renderHome() {
    const active = (state.game && state.game.status === "ongoing" ? state.game : null) || AF_STORAGE.getActive();
    const archive = AF_STORAGE.getArchive();
    const pending = active && active.status === "ongoing";
    return `
      <section class="screen home">
        <div class="hero">
          <p class="eyebrow">Storia in famiglia</p>
          <h1>Adventure Family</h1>
          <p class="lead">Si legge una frase. Si sceglie cosa fare. Si gira la bussola. Verde: ok. Giallo: ancora. Rosso: un cuore in meno. Circa mezz'ora.</p>
        </div>
        ${
          pending
            ? `<div class="card warn">
                <p class="card-kicker">In sospeso</p>
                <h2>${escapeHtml(active.title)}</h2>
                <p>Punto ${active.sceneIndex + 1} di ${active.scenes.length}</p>
                <div class="row">
                  <button class="btn primary" data-act="continue">Continua</button>
                  <button class="btn ghost" data-act="new-confirm">Nuova storia</button>
                </div>
              </div>`
            : `<div class="row">
                <button class="btn primary xl" data-act="new">Nuova storia</button>
              </div>`
        }
        ${
          archive.length
            ? `<div class="archive">
                <h3>Ultime storie</h3>
                <ul>${archive
                  .slice(0, 6)
                  .map((a) => `<li><strong>${escapeHtml(a.title)}</strong> <span>${escapeHtml(a.result)}</span></li>`)
                  .join("")}</ul>
              </div>`
            : ""
        }
      </section>`;
  }

  function renderSetup() {
    const s = AF_STORAGE.getSettings();
    if (!state.setupMaster && s.lastMaster) state.setupMaster = s.lastMaster;
    const count = state.setupCount;
    let inputs = "";
    for (let i = 0; i < count; i++) {
      inputs += `<label>Bambino ${i + 1}
        <input type="text" maxlength="24" data-name="${i}" value="${escapeHtml(state.setupNames[i] || "")}" placeholder="Nome">
      </label>`;
    }
    return `
      <section class="screen setup">
        <button class="btn text" data-act="home">← Indietro</button>
        <h1>Chi c'è?</h1>
        <p class="lead">Un adulto può tenere il telefono e leggere. I bambini scelgono e girano la bussola. Non serve un master: si vede tutti la stessa cosa.</p>
        <label>Chi tiene il telefono (facoltativo)
          <input type="text" id="masterName" maxlength="24" value="${escapeHtml(state.setupMaster)}" placeholder="Es. Mamma">
        </label>
        <div class="stepper">
          <span>Quanti bambini giocano?</span>
          <div class="step-row">
            <button class="btn icon" data-act="count-down" ${count <= 1 ? "disabled" : ""}>−</button>
            <strong>${count}</strong>
            <button class="btn icon" data-act="count-up" ${count >= 6 ? "disabled" : ""}>+</button>
          </div>
        </div>
        <div class="names">${inputs}</div>
        <button class="btn primary xl" data-act="create">Inizia</button>
      </section>`;
  }

  function hud(game) {
    const sc = scene(game);
    const step = Math.min(game.sceneIndex + 1, game.scenes.length);
    const actor = currentActor(game);
    const showTurn = sc && sc.type !== "intro" && game.phase !== "result";
    return `
      <header class="play-top">
        <div>
          <p class="eyebrow">${escapeHtml(game.quest.name)}</p>
          <p class="scene-count">${step} / ${game.scenes.length}</p>
        </div>
        <button class="btn text" data-act="home-pause">Pausa</button>
      </header>
      <ul class="party">${game.players
        .map(
          (p) =>
            `<li class="${p.hp <= 0 ? "out" : ""} ${showTurn && actor && actor.id === p.id ? "turn" : ""}"><span class="pn">${escapeHtml(p.name)}</span><span class="hp">${hearts(p.hp, p.maxHp)}</span></li>`
        )
        .join("")}</ul>
      ${sc && sc.type !== "intro" ? `<p class="mission">Cattivo: ${escapeHtml(game.villain.name)}</p>` : ""}
    `;
  }

  function compassHtml(game) {
    const actor = currentActor(game);
    const spinning = state.spinning;
    const last = state.lastSpin;
    const yellow = last && last.color === "yellow";
    return `
      <div class="compass-block">
        <p class="who">Tocca a <strong>${escapeHtml(actor ? actor.name : "")}</strong>. Gira la bussola.</p>
        <div class="legend">
          <span class="lg"><i class="dot green"></i> verde: ok</span>
          <span class="lg"><i class="dot yellow"></i> giallo: ancora</span>
          <span class="lg"><i class="dot red"></i> rosso: −1 cuore</span>
        </div>
        <div class="compass-wrap" ${spinning ? "" : 'data-act="do-spin" role="button" tabindex="0"'}>
          <div class="needle" aria-hidden="true"></div>
          <div class="compass ${spinning ? "moving" : ""}" style="transform: rotate(${state.wheelDeg}deg)"></div>
        </div>
        ${
          spinning
            ? `<p class="fine">Gira…</p>`
            : yellow
              ? `<p class="spin-yellow">Giallo. Ancora.</p><button class="btn primary xl" data-act="do-spin">Gira ancora</button>`
              : `<button class="btn primary xl" data-act="do-spin">Gira</button>`
        }
      </div>`;
  }

  function renderPlay() {
    const game = activeGame();
    if (!game) return renderHome();
    if (game.status !== "ongoing") return renderEnd();
    refreshActor(game);
    const sc = scene(game);
    if (!sc || !Array.isArray(sc.story)) {
      return `<section class="screen play">
        <article class="card warn">
          <h2>Questa storia è vecchia</h2>
          <p class="lead">Il gioco è cambiato. Serve una nuova storia.</p>
          <button class="btn primary xl" data-act="new-confirm">Nuova storia</button>
        </article>
      </section>`;
    }
    const actor = currentActor(game);

    if (sc.type === "intro") {
      return `<section class="screen play">${hud(game)}
        <article class="card parchment">
          ${storyHtml(sc.story, game)}
          <p class="who">Giocano: <strong>${escapeHtml(game.players.map((p) => p.name).join(", "))}</strong></p>
        </article>
        <button class="btn primary xl" data-act="intro-next">Iniziamo</button>
      </section>`;
    }

    if (game.phase === "result") {
      const o = game.lastOutcome || { text: "", ok: true };
      return `<section class="screen play">${hud(game)}
        <article class="card parchment">
          <p class="card-kicker">${o.ok ? "Verde" : "Rosso"}</p>
          ${storyHtml([o.text].concat(o.deathText ? [o.deathText] : []), game)}
        </article>
        <button class="btn primary xl" data-act="scene-next">Avanti</button>
      </section>`;
    }

    const picked = game.currentChoiceId;
    return `<section class="screen play">${hud(game)}
      <article class="card parchment">
        ${sc.locationName ? `<p class="card-kicker">${escapeHtml(sc.locationName)}</p>` : ""}
        <h2>${escapeHtml(sc.title)}</h2>
        ${storyHtml(sc.story, game)}
        ${actor ? `<p class="who">Tocca a <strong>${escapeHtml(actor.name)}</strong>.</p>` : ""}
      </article>
      <p class="prompt">${escapeHtml(sc.prompt || "Cosa fate?")}</p>
      <div class="choices">
        ${sc.choices
          .map(
            (c) =>
              `<button class="choice ${picked === c.id ? "picked" : ""}" data-act="pick" data-id="${c.id}" ${state.spinning ? "disabled" : ""}>
                <span>${escapeHtml(c.label)}</span>
              </button>`
          )
          .join("")}
      </div>
      ${picked ? compassHtml(game) : ""}
    </section>`;
  }

  function renderEnd() {
    const game = activeGame();
    if (!game) return renderHome();
    const sc = game.scenes[game.scenes.length - 1];
    const label = game.outcome === "win" ? "Finita bene" : game.outcome === "flee" ? "Siete scappati" : "Finita male";
    return `
      <section class="screen end">
        <p class="eyebrow">${escapeHtml(label)}</p>
        <h1>${escapeHtml(game.title)}</h1>
        <article class="card parchment">${storyHtml(sc.story && sc.story.length ? sc.story : game.endings.fail, game)}</article>
        <ul class="party">${game.players
          .map(
            (p) =>
              `<li class="${p.hp <= 0 ? "out" : ""}"><span class="pn">${escapeHtml(p.name)}</span><span class="hp">${hearts(p.hp, p.maxHp)}</span>${
                p.outLine ? `<span class="role">${escapeHtml(p.outLine)}</span>` : ""
              }</li>`
          )
          .join("")}</ul>
        <button class="btn primary xl" data-act="clear-end">All'inizio</button>
      </section>`;
  }

  function render() {
    const root = $("#app");
    let html = "";
    try {
      if (state.view === "setup") html = renderSetup();
      else if (state.view === "play") html = renderPlay();
      else if (state.view === "end") html = renderEnd();
      else html = renderHome();
      if (state.toast) html += `<div class="toast" role="status">${escapeHtml(state.toast)}</div>`;
      root.innerHTML = html;
    } catch (err) {
      root.innerHTML = `<pre class="toast">Errore: ${escapeHtml(err && err.message ? err.message : String(err))}</pre>`;
    }
  }

  function onClick(ev) {
    const btn = ev.target.closest("[data-act]");
    if (!btn || btn.disabled) return;
    const act = btn.getAttribute("data-act");
    const game = activeGame();

    if (act === "continue") {
      if (!state.game) state.game = AF_STORAGE.getActive();
      state.view = "play";
      render();
      return;
    }
    if (act === "new" || act === "new-confirm") {
      if (act === "new-confirm") {
        if (!confirm("Lasciare questa storia?")) return;
        abandonActive();
      }
      state.view = "setup";
      render();
      return;
    }
    if (act === "home" || act === "home-pause") {
      if (game) save(game);
      state.view = "home";
      render();
      return;
    }
    if (act === "count-up") {
      state.setupCount = Math.min(6, state.setupCount + 1);
      render();
      return;
    }
    if (act === "count-down") {
      state.setupCount = Math.max(1, state.setupCount - 1);
      render();
      return;
    }
    if (act === "create") {
      const master = ($("#masterName") && $("#masterName").value) || state.setupMaster;
      const names = [];
      document.querySelectorAll("input[data-name]").forEach((inp) => names.push(inp.value));
      while (names.length < state.setupCount) names.push("");
      startNew(master, names.slice(0, state.setupCount));
      return;
    }
    if (act === "intro-next") {
      goNextScene(game);
      return;
    }
    if (act === "pick") {
      if (game.phase === "spin" && state.spinning) return;
      game.currentChoiceId = btn.getAttribute("data-id");
      game.phase = "spin";
      state.lastSpin = null;
      save(game);
      render();
      return;
    }
    if (act === "do-spin") {
      doSpin(game);
      return;
    }
    if (act === "scene-next") {
      goNextScene(game);
      return;
    }
    if (act === "clear-end") {
      AF_STORAGE.setActive(null);
      state.game = null;
      state.view = "home";
      render();
    }
  }

  function onInput(ev) {
    if (ev.target.id === "masterName") state.setupMaster = ev.target.value;
    if (ev.target.matches("input[data-name]")) {
      const i = Number(ev.target.getAttribute("data-name"));
      state.setupNames[i] = ev.target.value;
    }
  }

  document.addEventListener("click", onClick);
  document.addEventListener("input", onInput);

  function boot() {
    const s = AF_STORAGE.getSettings();
    state.setupMaster = s.lastMaster || "";
    state.setupNames = (s.lastPlayers || []).concat(["", "", "", "", "", ""]).slice(0, 6);
    state.setupCount = Math.min(6, Math.max(1, (s.lastPlayers || []).filter(Boolean).length || 3));
    if (state.view === "home") {
      state.game = state.game || AF_STORAGE.getActive();
      if (state.game && state.game.status !== "ongoing") state.view = "end";
    }
    render();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();

  window.AF_APP = { state, render, startNew };
})();
