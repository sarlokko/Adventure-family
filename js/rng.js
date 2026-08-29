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

  const COMPASS = {
    green: [0, 120],
    yellow: [120, 240],
    red: [240, 360]
  };

  function colorFromNeedle(needleDeg) {
    const d = ((needleDeg % 360) + 360) % 360;
    if (d < 120) return "green";
    if (d < 240) return "yellow";
    return "red";
  }

  function spinCompass(rand) {
    const r = rand();
    const color = r < 1 / 3 ? "green" : r < 2 / 3 ? "yellow" : "red";
    const [a, b] = COMPASS[color];
    const needle = a + 16 + rand() * (b - a - 32);
    const turns = 5 + Math.floor(rand() * 4);
    const rotation = turns * 360 + (360 - needle);
    return { color, needle, rotation };
  }

  root.AF_RNG = { rng, seedFrom, shuffle, rollD6, spinCompass, colorFromNeedle, COMPASS };
})(typeof window !== "undefined" ? window : globalThis);
