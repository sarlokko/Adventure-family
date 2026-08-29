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
    const name = p ? p.name : "qualcuno";
    const raw = String(text || "").replace(/\bchi gira\b/g, "{actor}");
    return AF_GEN.fill(raw, { actor: name });
  }

  function storyHtml(lines, game, intro) {
    return (lines || [])
      .map((s) => {
        const t = game ? withActor(s, game) : s;
        const kicker = intro && t.length <= 22 && t.endsWith(".");
        return `<p class="line${kicker ? " kicker-line" : ""}">${escapeHtml(t)}</p>`;
      })
      .join("");
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
    if (game.resets.length) toast("Quelle spedizioni le avete già fatte. Le rimescolo.");
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
      if (game.lastOutcome && game.lastOutcome.ok) {
        finish(game, "win");
      } else {
        game.phase = "choose";
        game.currentChoiceId = null;
        state.lastSpin = null;
        sc.story = ["Il tentativo è fallito. Siete ancora lì, feriti. O riprovate adesso, o è finita."].concat(sc.story || []);
      }
      save(game);
      render();
      return;
    }
    if (game.progress >= (game.goalNeeded || 5)) {
      AF_GEN.ensureClimax(game);
    } else if (sc && sc.type !== "intro") {
      AF_GEN.appendChallenge(game);
    }
    game.sceneIndex += 1;
    game.phase = "choose";
    game.currentChoiceId = null;
    state.lastSpin = null;
    const next = scene(game);
    if (next && next.type === "ending") {
      if (game.progress >= (game.goalNeeded || 5)) {
        AF_GEN.ensureClimax(game);
        game.sceneIndex = game.scenes.findIndex((s) => s.type === "climax");
      } else {
        AF_GEN.appendChallenge(game);
        game.sceneIndex = game.scenes.length - 2;
      }
    }
    const go = scene(game);
    if (go && game.pathNote) {
      go.story = [withActor(game.pathNote, game)].concat(go.story || []);
      game.pathNote = null;
    }
    refreshActor(game);
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
      if (sc.type !== "climax") game.progress = (game.progress || 0) + 1;
      beep("green");
    }
    const need = game.goalNeeded || 5;
    game.lastOutcome = {
      text: withActor(ok ? choice.green : choice.red, game),
      ok,
      deathText,
      color,
      advanced: ok && sc.type !== "climax",
      progress: game.progress || 0,
      goalNeeded: need
    };
    state.lastSpin = { color, playerName: actor.name };
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
    const from = state.wheelDeg;
    let spin = state.forceColor
      ? AF_RNG.spinCompassToColor(state.forceColor, from, rand)
      : AF_RNG.spinCompass(rand, from);
    state.forceColor = null;
    const to = from + spin.rotation;
    const el = document.querySelector(".compass");
    const ms = AF_RNG.SPIN_MS || 1700;
    if (el) {
      el.style.transition = "none";
      el.style.transform = "rotate(" + from + "deg)";
      void el.offsetWidth;
      requestAnimationFrame(function () {
        el.style.transition = "transform " + ms / 1000 + "s cubic-bezier(0.12, 0.7, 0.08, 1)";
        el.style.transform = "rotate(" + to + "deg)";
        state.wheelDeg = to;
      });
    } else {
      state.wheelDeg = to;
    }
    setTimeout(function () {
      state.wheelDeg = to;
      state.spinning = false;
      applySpin(game, AF_RNG.colorFromWheel(to));
    }, ms + 60);
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
          <p class="eyebrow">Libro-game di sopravvivenza</p>
          <h1>Adventure Family</h1>
          <p class="lead">Giungla, tomba, spazio, montagna, mare, deserto. Si legge, si sceglie, si gira la ruota. Verde: l'azione riesce e il gruppo avanza. Giallo: si gira ancora. Rosso: un ferito, e restate dove siete. Niente tetto di scene: si continua finché uscite o finite le vite.</p>
        </div>
        ${
          pending
            ? `<div class="card warn">
                <p class="card-kicker">In sospeso</p>
                <h2>${escapeHtml(active.title)}</h2>
                <p>${active.progress != null ? "Avanzamento " + active.progress + "/" + active.goalNeeded : "In corso"}</p>
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
      inputs += `<label>Giocatore ${i + 1}
        <input type="text" maxlength="24" data-name="${i}" value="${escapeHtml(state.setupNames[i] || "")}" placeholder="Nome">
      </label>`;
    }
    return `
      <section class="screen setup">
        <button class="btn text" data-act="home">← Indietro</button>
        <h1>Chi c'è?</h1>
        <p class="lead">Uno legge, gli altri scelgono e girano la ruota. Stesso schermo. Non serve un master.</p>
        <label>Chi legge (facoltativo)
          <input type="text" id="masterName" maxlength="24" value="${escapeHtml(state.setupMaster)}" placeholder="Es. Marco">
        </label>
        <div class="stepper">
          <span>Quanti giocatori?</span>
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
    const actor = currentActor(game);
    const showTurn = sc && sc.type !== "intro" && game.phase !== "result";
    const prog = game.progress || 0;
    const need = game.goalNeeded || 5;
    const goal = game.campaign ? game.campaign.goal : game.quest && game.quest.line;
    return `
      <header class="play-top">
        <div>
          <p class="eyebrow">${escapeHtml(game.title)}</p>
          <p class="scene-count">Avanzamento ${prog} / ${need}</p>
        </div>
        <button class="btn text" data-act="home-pause">Pausa</button>
      </header>
      <ul class="party">${game.players
        .map(
          (p) =>
            `<li class="${p.hp <= 0 ? "out" : ""} ${showTurn && actor && actor.id === p.id ? "turn" : ""}"><span class="pn">${escapeHtml(p.name)}</span><span class="hp">${hearts(p.hp, p.maxHp)}</span></li>`
        )
        .join("")}</ul>
      ${goal && sc && sc.type !== "intro" ? `<p class="mission">Obiettivo: ${escapeHtml(goal)}</p>` : ""}
    `;
  }

  function compassHtml(game, opts) {
    const frozen = opts && opts.frozen;
    const actor = currentActor(game);
    const spinning = state.spinning && !frozen;
    const last = state.lastSpin;
    const yellow = !frozen && last && last.color === "yellow";
    const landed = frozen && last && last.color;
    const landLabel = landed === "green" ? "verde" : landed === "red" ? "rosso" : landed === "yellow" ? "giallo" : "";
    return `
      <div class="compass-block">
        ${
          frozen
            ? `<p class="who">La bussola si è fermata sul <strong>${landLabel}</strong>.</p>`
            : `<p class="who">Tocca a <strong>${escapeHtml(actor ? actor.name : "")}</strong>. Gira la bussola.</p>`
        }
        <div class="legend">
          <span class="lg"><i class="dot green"></i> verde: avanzate</span>
          <span class="lg"><i class="dot yellow"></i> giallo: ancora</span>
          <span class="lg"><i class="dot red"></i> rosso: feriti, restare</span>
        </div>
        <div class="compass-wrap" ${spinning || frozen ? "" : 'data-act="do-spin" role="button" tabindex="0"'}>
          <div class="needle" aria-hidden="true"></div>
          <div class="compass ${spinning ? "moving" : ""}" style="transform: rotate(${state.wheelDeg}deg)">
            <span class="lab lab-g"><span>verde</span></span>
            <span class="lab lab-y"><span>giallo</span></span>
            <span class="lab lab-r"><span>rosso</span></span>
          </div>
        </div>
        ${
          frozen
            ? ""
            : spinning
              ? `<p class="fine">Gira…</p>`
              : yellow
                ? `<p class="spin-yellow">Giallo: la bussola chiede un altro giro.</p><button class="btn primary xl" data-act="do-spin">Gira ancora</button>`
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
    if (!sc || !Array.isArray(sc.story) || !game.campaign || game.goalNeeded == null) {
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
          <p class="card-kicker">Spedizione</p>
          <h2>${escapeHtml(game.title)}</h2>
          ${storyHtml(sc.story, game, true)}
          <p class="who">Giocano: <strong>${escapeHtml(game.players.map((p) => p.name).join(", "))}</strong></p>
        </article>
        <button class="btn primary xl" data-act="intro-next">Iniziamo</button>
      </section>`;
    }

    if (game.phase === "result") {
      const o = game.lastOutcome || { text: "", ok: true };
      const kicker = o.ok
        ? o.advanced
          ? "Verde — avanzate (" + o.progress + "/" + o.goalNeeded + ")"
          : "Verde — obiettivo a portata"
        : "Rosso — non avanzate (" + (o.progress || 0) + "/" + (o.goalNeeded || 5) + ")";
      return `<section class="screen play">${hud(game)}
        ${compassHtml(game, { frozen: true })}
        <article class="card parchment">
          <p class="card-kicker">${escapeHtml(kicker)}</p>
          ${storyHtml([o.text].concat(o.deathText ? [o.deathText] : []), game)}
        </article>
        <button class="btn primary xl" data-act="scene-next">${o.ok && sc.type === "climax" ? "Fine" : "Avanti"}</button>
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
    const label = game.outcome === "win" ? "Siete usciti" : "Spedizione fallita";
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
