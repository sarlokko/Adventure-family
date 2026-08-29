(function (root) {
  function rng(seed) {
    let s = seed >>> 0;
    if (!s) s = 1;
    return function next() {
      s = (Math.imul(1664525, s) + 1013904223) >>> 0;
      return s / 4294967296;
    };
  }

  function seedFrom() {
    const a = (Date.now() ^ (Math.random() * 0xffffffff)) >>> 0;
    return a || 1;
  }

  function shuffle(arr, rand) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      const t = a[i];
      a[i] = a[j];
      a[j] = t;
    }
    return a;
  }

  function rollD6(rand) {
    return 1 + Math.floor(rand() * 6);
  }

  // Slices painted on the wheel, clockwise from 12 o'clock (CSS conic from 0deg).
  const COMPASS = {
    green: [0, 120],
    yellow: [120, 240],
    red: [240, 360]
  };

  const SPIN_MS = 1700;

  function colorFromNeedle(needleDeg) {
    const d = ((needleDeg % 360) + 360) % 360;
    if (d < 120) return "green";
    if (d < 240) return "yellow";
    return "red";
  }

  // Color sitting under the top pointer after a clockwise wheel rotation.
  function colorFromWheel(wheelDeg) {
    const d = ((wheelDeg % 360) + 360) % 360;
    const atTop = (360 - d) % 360;
    return colorFromNeedle(atTop);
  }

  function spinCompassToColor(color, currentDeg, rand) {
    const next = rand || function () {
      return 0.5;
    };
    const [a, b] = COMPASS[color];
    const pad = 18;
    const needle = a + pad + next() * Math.max(12, b - a - pad * 2);
    const turns = 3 + Math.floor(next() * 2);
    const currentMod = ((currentDeg % 360) + 360) % 360;
    const targetMod = (360 - needle) % 360;
    let extra = (targetMod - currentMod + 360) % 360;
    if (extra < 50) extra += 360;
    return { color, needle, rotation: turns * 360 + extra };
  }

  function spinCompass(rand, currentDeg) {
    const r = rand();
    const color = r < 1 / 3 ? "green" : r < 2 / 3 ? "yellow" : "red";
    return spinCompassToColor(color, currentDeg || 0, rand);
  }

  root.AF_RNG = {
    rng,
    seedFrom,
    shuffle,
    rollD6,
    spinCompass,
    spinCompassToColor,
    colorFromNeedle,
    colorFromWheel,
    COMPASS,
    SPIN_MS
  };
})(typeof window !== "undefined" ? window : globalThis);
