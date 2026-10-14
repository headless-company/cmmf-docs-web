/* CMMF motion 1.0. No dependencies; load after the SVG or call mount when it is ready. */
(function (global) {
  'use strict';
  const policy = {"version":"1.0","easing":{"rise":[0.4,0,0.2,1],"lettering":[0.35,0,0.65,1],"opacity":[0.35,0,0.65,1],"gradient":[0.35,0,0.65,1]},"headline":{"symbol":{"delay":0,"duration":1200},"gradient":{"delay":0,"tail":120,"displacement":224},"wordmark":{"delay":1320,"duration":900,"fadeDuration":1000,"rise":26,"scale":0.985},"name":{"delay":2600,"duration":850,"fadeDuration":950,"wordStagger":50,"rise":22,"scale":0.99}},"incidental":{"symbol":{"delay":0,"duration":420},"gradient":{"delay":0,"tail":40,"displacement":224},"wordmark":{"delay":480,"duration":280,"fadeDuration":340,"rise":3,"scale":1},"name":{"delay":480,"duration":280,"fadeDuration":340,"rise":3,"scale":1}},"reducedMotion":"Show the complete signature immediately; no masked rise, translation, scale or gradient movement."};
  const easing = policy.easing;
  const presets = { headline: policy.headline, incidental: policy.incidental };
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  const clamp = n => Math.max(0, Math.min(1, n));
  const coordinate = (t, a, b) => 3 * (1 - t) ** 2 * t * a + 3 * (1 - t) * t * t * b + t ** 3;
  function bezier(progress, curve) {
    if (progress <= 0 || progress >= 1) return clamp(progress);
    let low = 0, high = 1;
    for (let i = 0; i < 18; i++) {
      const t = (low + high) / 2;
      if (coordinate(t, curve[0], curve[2]) < progress) low = t; else high = t;
    }
    return coordinate((low + high) / 2, curve[1], curve[3]);
  }
  let instance = 0;
  function mount(svg, mode = 'headline', onUpdate = () => {}) {
    if (!presets[mode]) throw new Error('Unknown CMMF motion mode');
    const id = `cmmf-motion-${++instance}-`;
    const ids = new Map(Array.from(svg.querySelectorAll('[id]'), el => [el.id, id + el.id]));
    for (const el of [svg, ...svg.querySelectorAll('*')]) {
      for (const attr of Array.from(el.attributes)) {
        let value = attr.value.replace(/url\(#([^)]+)\)/g, (all, key) => ids.has(key) ? `url(#${ids.get(key)})` : all);
        if (attr.name === 'id') value = ids.get(value);
        if (attr.name === 'aria-labelledby') value = value.split(' ').map(v => ids.get(v) || v).join(' ');
        el.setAttribute(attr.name, value);
      }
    }
    const contour = svg.querySelector('[data-motion-contour]');
    const gradient = svg.querySelector('[data-motion-gradient]');
    const symbol = svg.querySelector('[data-motion-part="symbol"]');
    const moving = svg.querySelector('[data-motion-moving]');
    const mask = svg.querySelector('[data-motion-mask]');
    const wordmark = svg.querySelector('[data-motion-part="wordmark"]');
    const name = svg.querySelector('[data-motion-part="name"]');
    if (!contour || !symbol || !gradient || !moving || !mask) throw new Error('Use a supplied motion/assets SVG');
    const travel = Number(mask.getAttribute('height')) + 1;
    const windowId = mask.parentElement.id;
    const words = Array.from(svg.querySelectorAll('[data-motion-word]'));
    const parts = [[wordmark, 'wordmark', 0], ...(words.length ? words.map((el,i) => [el,'name', mode === 'headline' ? i * presets[mode].name.wordStagger : 0]) : [[name,'name',0]])].filter(([el]) => el);
    const anchors = new Map(parts.map(([el]) => {
      const b = el.getBBox(); return [el, { x: b.x + b.width / 2, y: b.y + b.height }];
    }));
    const preset = presets[mode];
    const lastPart = name ? preset.name : wordmark ? preset.wordmark : preset.symbol;
    const envelope = part => Math.max(part.duration, part.fadeDuration || 0);
    const stagger = name && mode === 'headline' ? Math.max(0,words.length-1) * preset.name.wordStagger : 0;
    const duration = lastPart.delay + envelope(lastPart) + stagger + preset.gradient.tail;
    const settings = { ...preset, wordmark: {...preset.wordmark, envelope: envelope(preset.wordmark)}, name: {...preset.name, envelope: envelope(preset.name) + stagger}, gradient: { ...preset.gradient, duration } };
    let frame = 0, start = 0, currentTime = duration, disposed = false;
    const phase = (time, key, curve) => bezier(clamp((time - settings[key].delay) / settings[key].duration), easing[curve]);
    function paint(time) {
      const t = preference.matches ? duration : Math.max(0, Math.min(duration, time));
      currentTime = t;
      const rise = phase(t, 'symbol', 'rise');
      if (rise === 1) { moving.removeAttribute('transform'); symbol.removeAttribute('clip-path'); }
      else { symbol.setAttribute('clip-path', `url(#${windowId})`); moving.setAttribute('transform', `translate(0 ${travel * (1 - rise)})`); }
      const settle = 1 - phase(t, 'gradient', 'gradient');
      if (settle === 0) gradient.removeAttribute('gradientTransform');
      else gradient.setAttribute('gradientTransform', `translate(${-settings.gradient.displacement * settle} ${settings.gradient.displacement * settle})`);
      for (const [el, key, offset] of parts) {
        if (!el) continue;
        const part = settings[key];
        const p = phase(t-offset, key, 'lettering');
        const opacity = bezier(clamp((t-offset-part.delay)/(part.fadeDuration || part.duration)), easing.opacity);
        el.setAttribute('opacity', String(opacity));
        if (opacity === 1) el.removeAttribute('opacity');
        if (p === 1) el.removeAttribute('transform');
        else {
          const a = anchors.get(el), scale = settings[key].scale + (1 - settings[key].scale) * p;
          el.setAttribute('transform', `translate(0 ${settings[key].rise * (1 - p)})` + (scale === 1 ? '' : ` translate(${a.x} ${a.y}) scale(${scale}) translate(${-a.x} ${-a.y})`));
        }
      }
      svg.dataset.motionState = t === duration ? 'complete' : 'entering';
      onUpdate(t, duration);
    }
    function cancel() { cancelAnimationFrame(frame); frame = 0; }
    function tick(now) {
      if (disposed) return;
      paint(now - start);
      if (currentTime < duration) frame = requestAnimationFrame(tick); else frame = 0;
    }
    function play() {
      if (disposed) return;
      cancel(); paint(0);
      if (!preference.matches) { start = performance.now(); frame = requestAnimationFrame(tick); }
    }
    function finish() { cancel(); paint(duration); }
    function seek(ms) { cancel(); paint(ms); }
    const onPreference = () => { if (preference.matches) finish(); };
    preference.addEventListener('change', onPreference);
    paint(duration); // Static by default. Play only at an intentional entry event.
    return { play, seek, finish, cancel, duration, timings: settings, get currentTime() { return currentTime; }, dispose() { disposed = true; cancel(); preference.removeEventListener('change', onPreference); } };
  }
  global.CMMFMotion = { mount, easing, presets, reducedMotion: preference };
})(window);
