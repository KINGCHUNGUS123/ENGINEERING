// sims.js — interactive canvas simulations for each topic
const css = v => getComputedStyle(document.documentElement).getPropertyValue(v).trim();
const C = () => ({ ink: css('--ink'), mute: css('--mute'), line: css('--line'), acc: css('--acc'), acc2: css('--acc2'), bad: css('--bad'), good: css('--good'), card: css('--card'), warn: css('--warnc') });
const fx = (x, d = 2) => (Math.round(x * 10 ** d) / 10 ** d).toLocaleString('en-AU', { maximumFractionDigits: d });
const rad = d => d * Math.PI / 180, G = 9.8;

function canvas(host, h = 300) {
  const cv = document.createElement('canvas'); cv.className = 'simcv'; host.appendChild(cv);
  const fit = () => { const w = host.clientWidth || 600, dpr = window.devicePixelRatio || 1; cv.width = w * dpr; cv.height = h * dpr; cv.style.height = h + 'px'; const g = cv.getContext('2d'); g.setTransform(dpr, 0, 0, dpr, 0, 0); cv._w = w; cv._h = h; };
  fit(); cv.fit = fit; return cv;
}
function controls(host, spec, onChange) {
  const box = document.createElement('div'); box.className = 'ctrls'; host.appendChild(box);
  const val = {};
  spec.forEach(s => {
    const lab = document.createElement('label');
    if (s.type === 'select') {
      lab.innerHTML = `<span>${s.label}</span>`; const sel = document.createElement('select');
      s.options.forEach(([v, t]) => { const o = document.createElement('option'); o.value = v; o.textContent = t; sel.appendChild(o); });
      sel.value = s.value; val[s.id] = s.value; sel.onchange = () => { val[s.id] = sel.value; onChange(val); }; lab.appendChild(sel);
    } else if (s.type === 'check') {
      lab.className = 'chk'; const cb = document.createElement('input'); cb.type = 'checkbox'; cb.checked = !!s.value; val[s.id] = !!s.value;
      cb.onchange = () => { val[s.id] = cb.checked; onChange(val); }; lab.appendChild(cb); lab.append(' ' + s.label);
    } else {
      const out = document.createElement('b'); const inp = document.createElement('input'); inp.type = 'range'; inp.min = s.min; inp.max = s.max; inp.step = s.step || 1; inp.value = s.value; val[s.id] = +s.value;
      lab.innerHTML = `<span>${s.label}</span>`; lab.appendChild(inp); lab.appendChild(out); out.textContent = s.value + (s.unit || '');
      inp.oninput = () => { val[s.id] = +inp.value; out.textContent = inp.value + (s.unit || ''); onChange(val); };
    }
    box.appendChild(lab);
  });
  return val;
}
function readout(host) { const d = document.createElement('div'); d.className = 'readout'; host.appendChild(d); return d; }
function arrow(g, x1, y1, x2, y2, col, w = 2.5, label, lx = 6, ly = -6) {
  g.strokeStyle = col; g.fillStyle = col; g.lineWidth = w; g.beginPath(); g.moveTo(x1, y1); g.lineTo(x2, y2); g.stroke();
  const a = Math.atan2(y2 - y1, x2 - x1), s = 9; g.beginPath(); g.moveTo(x2, y2); g.lineTo(x2 - s * Math.cos(a - .4), y2 - s * Math.sin(a - .4)); g.lineTo(x2 - s * Math.cos(a + .4), y2 - s * Math.sin(a + .4)); g.closePath(); g.fill();
  if (label) { g.font = '600 13px system-ui'; g.fillText(label, x2 + lx, y2 + ly); }
}
function onResize(cv, draw) { let t; window.addEventListener('resize', () => { clearTimeout(t); t = setTimeout(() => { if (cv.isConnected) { cv.fit(); draw(); } }, 120); }); }

// ---------------- Lever ----------------
function lever(host) {
  const v = controls(host, [
    { id: 'order', type: 'select', label: 'Lever order', value: '1', options: [['1', '1st order (E–F–L)'], ['2', '2nd order (F–L–E)'], ['3', '3rd order (F–E–L)']] },
    { id: 'load', label: 'Load', min: 50, max: 1000, step: 10, value: 400, unit: ' N' },
    { id: 'de', label: 'Effort arm', min: 0.1, max: 2, step: 0.05, value: 1.2, unit: ' m' },
    { id: 'dl', label: 'Load arm', min: 0.1, max: 2, step: 0.05, value: 0.3, unit: ' m' },
    { id: 'eff', label: 'Efficiency', min: 50, max: 100, step: 1, value: 100, unit: '%' }], draw);
  const cv = canvas(host, 260), ro = readout(host);
  function draw() {
    const c = C(), g = cv.getContext('2d'), W = cv._w, H = cv._h; g.clearRect(0, 0, W, H);
    let { order, load, de, dl, eff } = v;
    if (order === '2' && dl >= de) dl = Math.max(0.05, de - 0.05);
    if (order === '3' && de >= dl) de = Math.max(0.05, dl - 0.05);
    const vr = de / dl, ma = vr * eff / 100, FE = load / ma;
    const span = order === '1' ? de + dl : Math.max(de, dl), sc = (W - 120) / span, y = 150;
    let xF, xE, xL; const x0 = 60;
    if (order === '1') { xE = x0; xF = x0 + de * sc; xL = xF + dl * sc; }
    else { xF = x0; xE = x0 + de * sc; xL = x0 + dl * sc; }
    g.strokeStyle = c.ink; g.lineWidth = 6; g.beginPath(); g.moveTo(Math.min(xE, xL, xF) - 10, y); g.lineTo(Math.max(xE, xL, xF) + 10, y); g.stroke();
    g.fillStyle = c.acc2; g.beginPath(); g.moveTo(xF, y + 3); g.lineTo(xF - 18, y + 40); g.lineTo(xF + 18, y + 40); g.closePath(); g.fill();
    g.fillStyle = c.ink; g.font = '13px system-ui'; g.fillText('Fulcrum', xF - 24, y + 56);
    g.fillStyle = c.warn; g.fillRect(xL - 22, y - 46, 44, 40); g.fillStyle = c.ink; g.fillText(load + ' N', xL - 22, y - 52);
    arrow(g, xL, y - 6, xL, y + 50, c.bad, 2.5, 'Load', 8, 0);
    const up = order === '1';
    arrow(g, xE, up ? y - 90 : y + 80, xE, up ? y - 6 : y + 6, c.acc, 3); g.fillStyle = c.acc; g.font = '600 13px system-ui'; g.fillText('Effort = ' + fx(FE, 1) + ' N', xE + 8, up ? y - 70 : y + 70);
    g.strokeStyle = c.mute; g.lineWidth = 1; g.setLineDash([4, 4]);
    const dim = (a, b, yy, t) => { g.beginPath(); g.moveTo(a, yy); g.lineTo(b, yy); g.stroke(); g.fillStyle = c.mute; g.fillText(t, (a + b) / 2 - 20, yy - 4); };
    dim(xF, xE, y + 75 + (up ? 0 : 30), 'effort arm ' + de + ' m'); dim(xF, xL, y + 95 + (up ? 0 : 30), 'load arm ' + fx(dl) + ' m'); g.setLineDash([]);
    ro.innerHTML = `VR = effort arm ÷ load arm = ${de} ÷ ${fx(dl)} = <b>${fx(vr)}</b> &nbsp;·&nbsp; MA = η × VR = <b>${fx(ma)}</b> &nbsp;·&nbsp; Effort = ${load} ÷ ${fx(ma)} = <b>${fx(FE, 1)} N</b>` + (order === '3' ? ' &nbsp;<i>(3rd order: MA &lt; 1 — you gain distance/speed, not force)</i>' : '');
  }
  draw(); onResize(cv, draw);
}

// ---------------- Pulley ----------------
function pulley(host) {
  const v = controls(host, [
    { id: 'n', label: 'Supporting ropes (VR)', min: 1, max: 6, value: 4 },
    { id: 'm', label: 'Load mass', min: 10, max: 500, step: 5, value: 100, unit: ' kg' },
    { id: 'h', label: 'Lift height', min: 1, max: 20, value: 3, unit: ' m' },
    { id: 'eff', label: 'Efficiency', min: 40, max: 100, value: 80, unit: '%' }], draw);
  const cv = canvas(host, 300), ro = readout(host);
  function draw() {
    const c = C(), g = cv.getContext('2d'), W = cv._w, H = cv._h; g.clearRect(0, 0, W, H);
    const { n, m, h, eff } = v; const FL = m * G, ma = n * eff / 100, FE = FL / ma;
    const cx = W / 2 - 40, topY = 30, botY = 190, sp = 22;
    g.fillStyle = c.mute; g.fillRect(cx - 120, topY - 14, 240, 10);
    const ropes = n, xs = [...Array(ropes)].map((_, i) => cx - (ropes - 1) * sp / 2 + i * sp);
    g.strokeStyle = c.ink; g.lineWidth = 2;
    xs.forEach(x => { g.beginPath(); g.moveTo(x, topY); g.lineTo(x, botY); g.stroke(); });
    const tw = Math.max(40, (ropes - 1) * sp + 30);
    g.fillStyle = c.acc2; g.globalAlpha = .25; g.fillRect(cx - tw / 2, topY - 4, tw, 22); g.fillRect(cx - tw / 2, botY - 10, tw, 22); g.globalAlpha = 1;
    g.strokeStyle = c.acc2; g.strokeRect(cx - tw / 2, topY - 4, tw, 22); g.strokeRect(cx - tw / 2, botY - 10, tw, 22);
    g.fillStyle = c.ink; g.font = '12px system-ui'; g.fillText('fixed block', cx + tw / 2 + 6, topY + 10); g.fillText('moving block', cx + tw / 2 + 6, botY + 4);
    g.beginPath(); g.moveTo(cx, botY + 12); g.lineTo(cx, botY + 32); g.stroke();
    g.fillStyle = c.warn; g.fillRect(cx - 30, botY + 32, 60, 44); g.fillStyle = c.ink; g.fillText(m + ' kg', cx - 18, botY + 58);
    const ex = cx + tw / 2 + 110; g.strokeStyle = c.acc; g.lineWidth = 2; g.beginPath(); g.moveTo(xs[xs.length - 1], topY); g.lineTo(ex, topY + 4); g.lineTo(ex, 200); g.stroke();
    arrow(g, ex, 200, ex, 250, c.acc, 3, 'Effort = ' + fx(FE, 1) + ' N', 8, 0);
    g.fillStyle = c.mute; g.fillText(`${n} rope${n > 1 ? 's' : ''} support the load`, 12, H - 12);
    ro.innerHTML = `F<sub>L</sub> = ${m} × 9.8 = ${fx(FL, 1)} N · VR = ${n} · MA = η × VR = ${fx(ma)} · <b>Effort = ${fx(FE, 1)} N</b><br>Effort rope pulled = VR × ${h} m = <b>${n * h} m</b> · Work in = ${fx(FE * n * h, 0)} J · Useful work out = ${fx(FL * h, 0)} J`;
  }
  draw(); onResize(cv, draw);
}

// ---------------- Gears ----------------
function gears(host) {
  const v = controls(host, [
    { id: 't1', label: 'Driver teeth', min: 8, max: 60, value: 15 },
    { id: 't2', label: 'Driven teeth', min: 8, max: 80, value: 45 },
    { id: 'rpm', label: 'Driver speed', min: 10, max: 120, step: 5, value: 30, unit: ' rpm' },
    { id: 'idler', type: 'check', label: 'Add idler gear', value: false }], () => { });
  const cv = canvas(host, 280), ro = readout(host);
  let ang = 0, last = performance.now();
  function gear(g, x, y, t, a, col) {
    const r = t * 2.6, ro_ = r + 5, ri = r - 5; g.beginPath();
    for (let i = 0; i < t * 2; i++) { const a1 = a + i * Math.PI / t, a2 = a + (i + 1) * Math.PI / t, R = i % 2 ? ri : ro_; g.lineTo(x + R * Math.cos(a1), y + R * Math.sin(a1)); g.lineTo(x + R * Math.cos(a2), y + R * Math.sin(a2)); }
    g.closePath(); g.fillStyle = col; g.globalAlpha = .3; g.fill(); g.globalAlpha = 1; g.strokeStyle = col; g.lineWidth = 1.5; g.stroke();
    g.beginPath(); g.moveTo(x, y); g.lineTo(x + r * Math.cos(a), y + r * Math.sin(a)); g.stroke(); g.beginPath(); g.arc(x, y, 4, 0, 7); g.fill();
    return r;
  }
  function frame(now) {
    if (!cv.isConnected) return; const dt = (now - last) / 1000; last = now;
    const c = C(), g = cv.getContext('2d'), W = cv._w, H = cv._h; g.clearRect(0, 0, W, H);
    const { t1, t2, rpm, idler } = v; const ti = 12, scale = Math.min(1, (W - 40) / (2.6 * 2 * (t1 + t2 + (idler ? ti : 0)) + 30), 230 / (2.6 * 2 * Math.max(t1, t2) + 10));
    ang += rpm / 60 * 2 * Math.PI * dt;
    g.save(); g.scale(scale, scale); const y = H / 2 / scale;
    const r1 = t1 * 2.6, r2 = t2 * 2.6, rI = ti * 2.6; let x = 20 / scale + r1 + 6;
    gear(g, x, y, t1, ang, c.acc); g.fillStyle = c.ink; g.font = `${13 / scale}px system-ui`; g.fillText('driver', x - 18, y + r1 + 22);
    let dir = -1, nx = x + r1 + (idler ? rI : r2) + 2;
    if (idler) { gear(g, nx, y, ti, -ang * t1 / ti + Math.PI / ti, c.mute); g.fillStyle = c.ink; g.fillText('idler', nx - 14, y + rI + 22); nx = nx + rI + r2 + 2; dir = 1; }
    gear(g, nx, y, t2, dir * ang * t1 / t2 + (dir < 0 ? Math.PI / t2 : 0), c.acc2); g.fillStyle = c.ink; g.fillText('driven', nx - 20, y + r2 + 22);
    g.restore();
    const gr = t2 / t1;
    ro.innerHTML = `GR = driven ÷ driver = ${t2} ÷ ${t1} = <b>${fx(gr, 3)}</b> · Output speed = ${rpm} ÷ ${fx(gr, 3)} = <b>${fx(rpm / gr, 2)} rpm</b> · Output turns <b>${idler ? 'the SAME way' : 'the OPPOSITE way'}</b> to the driver${idler ? ' (an idler does not change the GR)' : ''}<br>${gr > 1 ? 'Speed reduced, turning force (torque) increased.' : gr < 1 ? 'Speed increased, turning force reduced.' : 'Same speed.'}`;
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame); window.addEventListener('resize', () => cv.isConnected && cv.fit());
}

// ---------------- Energy ----------------
function energy(host) {
  const v = controls(host, [
    { id: 'm', label: 'Mass', min: 1, max: 100, value: 20, unit: ' kg' },
    { id: 'h', label: 'Start height', min: 1, max: 30, value: 10, unit: ' m' },
    { id: 'th', label: 'Ramp angle', min: 10, max: 60, value: 30, unit: '°' },
    { id: 'mu', label: 'μk', min: 0, max: 0.5, step: 0.01, value: 0.1 }], () => { t = 0; });
  const cv = canvas(host, 290), ro = readout(host); let t = 0, last = performance.now();
  function frame(now) {
    if (!cv.isConnected) return; const dt = Math.min(.05, (now - last) / 1000); last = now;
    const c = C(), g = cv.getContext('2d'), W = cv._w, H = cv._h; g.clearRect(0, 0, W, H);
    const { m, h, th, mu } = v, L = h / Math.sin(rad(th)), a = G * (Math.sin(rad(th)) - mu * Math.cos(rad(th)));
    const sc = Math.min((W * .55) / (L * Math.cos(rad(th))), 220 / h), x0 = 30, yb = 250;
    let s = a > 0 ? Math.min(L, 0.5 * a * t * t) : 0; t += dt; if (s >= L && t > Math.sqrt(2 * L / Math.max(a, 1e-6)) + 1.2) t = 0;
    const xTop = x0, yTop = yb - h * sc, xBot = x0 + L * Math.cos(rad(th)) * sc;
    g.fillStyle = c.line; g.beginPath(); g.moveTo(xTop, yTop); g.lineTo(xBot, yb); g.lineTo(xTop, yb); g.closePath(); g.fill();
    const bx = xTop + s * Math.cos(rad(th)) * sc, by = yTop + s * Math.sin(rad(th)) * sc;
    g.fillStyle = c.acc; g.beginPath(); g.arc(bx + 8, by - 9, 9, 0, 7); g.fill();
    const hh = h - s * Math.sin(rad(th)), vv = Math.sqrt(Math.max(0, 2 * a * s));
    const PE = m * G * hh, KE = .5 * m * vv * vv, Q = mu * m * G * Math.cos(rad(th)) * s, E0 = m * G * h;
    const bars = [['PE', PE, c.acc2], ['KE', KE, c.acc], ['Heat (friction)', Q, c.bad]], bw = 46, bx0 = W - 3 * (bw + 20) - 10;
    bars.forEach(([n, val, col], i) => { const bh = val / E0 * 200; g.fillStyle = col; g.fillRect(bx0 + i * (bw + 20), yb - bh, bw, bh); g.fillStyle = c.ink; g.font = '12px system-ui'; g.fillText(n, bx0 + i * (bw + 20), yb + 16); g.fillText(fx(val, 0) + ' J', bx0 + i * (bw + 20), yb - bh - 6); });
    ro.innerHTML = a <= 0 ? `Friction is too high — the block doesn't slide (tan ${th}° = ${fx(Math.tan(rad(th)))} ≤ μ).` :
      `Start: PE = mgh = ${m} × 9.8 × ${h} = <b>${fx(E0, 0)} J</b>. Now: PE ${fx(PE, 0)} J + KE ${fx(KE, 0)} J + heat ${fx(Q, 0)} J = ${fx(PE + KE + Q, 0)} J (energy is conserved).<br>Speed at the bottom = <b>${fx(Math.sqrt(2 * a * L), 2)} m/s</b>${mu > 0 ? ` (without friction it would be √(2gh) = ${fx(Math.sqrt(2 * G * h), 2)} m/s)` : ''}.`;
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame); window.addEventListener('resize', () => cv.isConnected && cv.fit());
}

// ---------------- Motion ----------------
function motion(host) {
  const v = controls(host, [
    { id: 'u', label: 'Initial velocity u', min: -10, max: 20, value: 0, unit: ' m/s' },
    { id: 'a', label: 'Acceleration a', min: -5, max: 5, step: 0.5, value: 2, unit: ' m/s²' },
    { id: 't', label: 'Time t', min: 1, max: 20, value: 8, unit: ' s' }], draw);
  const cv = canvas(host, 280), ro = readout(host);
  function draw() {
    const c = C(), g = cv.getContext('2d'), W = cv._w, H = cv._h; g.clearRect(0, 0, W, H);
    const { u, a, t } = v, vf = u + a * t, s = u * t + .5 * a * t * t;
    const vmax = Math.max(Math.abs(u), Math.abs(vf), 1) * 1.15, L = 50, R = W - 20, T = 20, B = H - 40, y0 = (T + B) / 2;
    const X = tt => L + tt / t * (R - L), Y = vel => y0 - vel / vmax * (B - T) / 2;
    g.strokeStyle = c.mute; g.lineWidth = 1; g.beginPath(); g.moveTo(L, T); g.lineTo(L, B); g.moveTo(L, y0); g.lineTo(R, y0); g.stroke();
    g.fillStyle = c.acc; g.globalAlpha = .18; g.beginPath(); g.moveTo(X(0), y0); g.lineTo(X(0), Y(u)); g.lineTo(X(t), Y(vf)); g.lineTo(X(t), y0); g.closePath(); g.fill(); g.globalAlpha = 1;
    g.strokeStyle = c.acc; g.lineWidth = 3; g.beginPath(); g.moveTo(X(0), Y(u)); g.lineTo(X(t), Y(vf)); g.stroke();
    g.fillStyle = c.ink; g.font = '12px system-ui'; g.fillText('v (m/s)', 6, T + 4); g.fillText('t (s)', R - 26, y0 + 16); g.fillText(fx(u) + ' m/s', X(0) + 4, Y(u) - 6); g.fillText(fx(vf) + ' m/s', X(t) - 60, Y(vf) - 6);
    g.fillStyle = c.mute; g.fillText('slope = acceleration · shaded area = displacement', L + 6, B + 26);
    ro.innerHTML = `v = u + at = ${u} + ${a} × ${t} = <b>${fx(vf)} m/s</b> · s = ut + ½at² = <b>${fx(s)} m</b> · check: v² = u² + 2as → ${fx(vf * vf)} = ${fx(u * u + 2 * a * s)} ✓`;
  }
  draw(); onResize(cv, draw);
}

// ---------------- Incline / friction ----------------
function incline(host) {
  const v = controls(host, [
    { id: 'th', label: 'Incline angle θ', min: 0, max: 60, value: 20, unit: '°' },
    { id: 'm', label: 'Mass', min: 1, max: 200, value: 20, unit: ' kg' },
    { id: 'mus', label: 'μs (static)', min: 0, max: 1, step: 0.01, value: 0.45 },
    { id: 'muk', label: 'μk (kinetic)', min: 0, max: 1, step: 0.01, value: 0.3 },
    { id: 'P', label: 'Push up the slope', min: 0, max: 2000, step: 10, value: 0, unit: ' N' }], draw);
  const cv = canvas(host, 300), ro = readout(host);
  function draw() {
    const c = C(), g = cv.getContext('2d'), W = cv._w, H = cv._h; g.clearRect(0, 0, W, H);
    let { th, m, mus, muk, P } = v; if (muk > mus) muk = mus;
    const t = rad(th), mg = m * G, N = mg * Math.cos(t), down = mg * Math.sin(t), fsMax = mus * N, net = P - down;
    let state, Ff, acc = 0;
    if (Math.abs(net) <= fsMax) { state = 'At rest — static friction holds it'; Ff = -net; }
    else if (net > 0) { Ff = -muk * N; acc = (net + Ff) / m; state = 'Accelerating UP the slope'; }
    else { Ff = muk * N; acc = (net + Ff) / m; state = 'Sliding DOWN the slope'; }
    const ox = 40, oy = H - 40, len = Math.min(W - 80, 520);
    g.fillStyle = c.line; g.beginPath(); g.moveTo(ox, oy); g.lineTo(ox + len, oy); g.lineTo(ox + len, oy - len * Math.tan(t)); g.closePath(); g.fill();
    g.strokeStyle = c.mute; g.beginPath(); g.arc(ox, oy, 46, -t, 0); g.stroke(); g.fillStyle = c.ink; g.font = '13px system-ui'; g.fillText('θ = ' + th + '°', ox + 52, oy - 6);
    const d = len * .55, bx = ox + d * Math.cos(t), by = oy - d * Math.sin(t);
    g.save(); g.translate(bx, by); g.rotate(-t); g.fillStyle = c.warn; g.fillRect(-26, -40, 52, 40); g.restore();
    const cx = bx - 20 * Math.sin(t), cy = by - 20 * Math.cos(t), k = 70 / Math.max(mg, 1);
    arrow(g, cx, cy, cx, cy + mg * k, c.ink, 2.5, 'mg', 6, 0);
    arrow(g, cx, cy, cx - N * k * Math.sin(t), cy - N * k * Math.cos(t), c.acc2, 2.5, 'Fɴ', 6, 0);
    if (Math.abs(Ff) > 0.01) { const sgn = Math.sign(Ff); arrow(g, cx, cy, cx + sgn * Math.abs(Ff) * k * Math.cos(t), cy - sgn * Math.abs(Ff) * k * Math.sin(t), c.bad, 2.5, 'Ff', 4, -6); }
    if (P > 0) arrow(g, cx, cy, cx + P * k * Math.cos(t), cy - P * k * Math.sin(t), c.acc, 2.5, 'P', 4, 14);
    const rep = Math.atan(mus) * 180 / Math.PI;
    ro.innerHTML = `<b>${state}</b>${acc ? ` · a = ${fx(Math.abs(acc))} m/s²` : ''}<br>F<sub>N</sub> = mg cosθ = ${fx(N, 1)} N · mg sinθ = ${fx(down, 1)} N · max static friction μ<sub>s</sub>F<sub>N</sub> = ${fx(fsMax, 1)} N · friction now = ${fx(Math.abs(Ff), 1)} N<br>Angle of repose = tan⁻¹(μ<sub>s</sub>) = <b>${fx(rep, 1)}°</b> — ${th <= rep ? 'θ ≤ angle of repose, so with no push it stays at rest' : 'θ > angle of repose, so with no push it slides'}.`;
  }
  draw(); onResize(cv, draw);
}

// ---------------- Logic ----------------
export function gateSVG(type, w = 120) {
  const s = 'stroke="currentColor" stroke-width="2.4" fill="none"';
  const inL = type === 'NOT' ? `<line x1="0" y1="30" x2="22" y2="30" ${s}/>` : `<line x1="0" y1="18" x2="26" y2="18" ${s}/><line x1="0" y1="42" x2="26" y2="42" ${s}/>`;
  let body = '', bub = false, xor = false, outX = 84;
  if (type === 'AND' || type === 'NAND') body = `<path d="M22 6 H52 A24 24 0 0 1 52 54 H22 Z" ${s}/>`;
  if (type === 'OR' || type === 'NOR' || type === 'XOR') body = `<path d="M20 6 Q36 30 20 54 Q60 54 80 30 Q60 6 20 6 Z" ${s}/>`;
  if (type === 'XOR') xor = true;
  if (type === 'NOT') { body = `<path d="M22 8 L22 52 L66 30 Z" ${s}/>`; bub = true; outX = 66; }
  if (type === 'NAND') { bub = true; outX = 76; } if (type === 'NOR') bub = true;
  const bx = type === 'NOT' ? 66 : type === 'NAND' ? 76 : 80;
  const bubble = bub ? `<circle cx="${bx + 5}" cy="30" r="5" ${s}/>` : '';
  const ox = bub ? bx + 10 : (type === 'AND' ? 76 : 80);
  return `<svg viewBox="0 0 110 60" width="${w}" class="gate">${inL}${body}${xor ? `<path d="M12 6 Q28 30 12 54" ${s}/>` : ''}${bubble}<line x1="${ox}" y1="30" x2="110" y2="30" ${s}/></svg>`;
}
export const GATES = { AND: (a, b) => a & b, OR: (a, b) => a | b, NOT: a => 1 - a, NAND: (a, b) => 1 - (a & b), NOR: (a, b) => 1 - (a | b), XOR: (a, b) => a ^ b };
export function gateTable() {
  return `<div class="gategrid">${Object.keys(GATES).map(k => {
    const rows = k === 'NOT' ? [[0], [1]] : [[0, 0], [0, 1], [1, 0], [1, 1]];
    return `<div class="gatecard"><div class="gname">${k}</div>${gateSVG(k, 110)}<table class="tt"><tr>${k === 'NOT' ? '<th>A</th>' : '<th>A</th><th>B</th>'}<th>X</th></tr>${rows.map(r => `<tr>${r.map(x => `<td>${x}</td>`).join('')}<td><b>${GATES[k](...r)}</b></td></tr>`).join('')}</table></div>`;
  }).join('')}</div>`;
}
function parseExpr(src) {
  const toks = src.toUpperCase().replace(/([()!¬~·*+⊕'])/g, ' $1 ').trim().split(/\s+/).filter(Boolean); let i = 0; const vars = new Set();
  const peek = () => toks[i], eat = () => toks[i++];
  function prim() { const t = eat(); if (t === '(') { const e = or(); if (eat() !== ')') throw Error('missing )'); return post(e); } if (t === 'NOT' || t === '!' || t === '¬' || t === '~') { const e = prim(); return post(env => 1 - e(env)); } if (/^[A-Z]$/.test(t)) { vars.add(t); return post(env => env[t]); } if (t === '1' || t === '0') return post(() => +t); throw Error('unexpected "' + (t || 'end') + '"'); }
  function post(e) { while (peek() === "'") { eat(); const f = e; e = env => 1 - f(env); } return e; }
  function and() { let l = prim(); while (['AND', '·', '*', 'NAND'].includes(peek())) { const op = eat(), r = prim(), a = l; l = op === 'NAND' ? env => 1 - (a(env) & r(env)) : env => a(env) & r(env); } return l; }
  function xor() { let l = and(); while (['XOR', '⊕'].includes(peek())) { eat(); const r = and(), a = l; l = env => a(env) ^ r(env); } return l; }
  function or() { let l = xor(); while (['OR', '+', 'NOR'].includes(peek())) { const op = eat(), r = xor(), a = l; l = op === 'NOR' ? env => 1 - (a(env) | r(env)) : env => a(env) | r(env); } return l; }
  const e = or(); if (i < toks.length) throw Error('unexpected "' + toks[i] + '"'); return { e, vars: [...vars].sort() };
}
function logic(host) {
  const v = controls(host, [{ id: 'g', type: 'select', label: 'Gate', value: 'NAND', options: Object.keys(GATES).map(k => [k, k]) }], draw);
  const box = document.createElement('div'); box.className = 'logicbox'; host.appendChild(box);
  let A = 0, B = 1;
  function draw() {
    const k = v.g, out = k === 'NOT' ? GATES[k](A) : GATES[k](A, B);
    const rows = k === 'NOT' ? [[0], [1]] : [[0, 0], [0, 1], [1, 0], [1, 1]];
    box.innerHTML = `<div class="lrow"><div class="ins"><button class="bit ${A ? 'on' : ''}" data-i="A">A = ${A}</button>${k !== 'NOT' ? `<button class="bit ${B ? 'on' : ''}" data-i="B">B = ${B}</button>` : ''}</div>${gateSVG(k, 160)}<div class="lamp ${out ? 'on' : ''}">X = ${out}</div></div>
      <table class="tt big"><tr>${k === 'NOT' ? '<th>A</th>' : '<th>A</th><th>B</th>'}<th>X</th></tr>${rows.map(r => `<tr class="${(k === 'NOT' ? r[0] === A : r[0] === A && r[1] === B) ? 'hl' : ''}">${r.map(x => `<td>${x}</td>`).join('')}<td><b>${GATES[k](...r)}</b></td></tr>`).join('')}</table>`;
    box.querySelectorAll('.bit').forEach(b => b.onclick = () => { if (b.dataset.i === 'A') A ^= 1; else B ^= 1; draw(); });
  }
  draw();
  const ex = document.createElement('div'); ex.className = 'exprbox'; host.appendChild(ex);
  ex.innerHTML = `<h4>Truth-table builder</h4><p class="mute">Type a Boolean expression using single-letter inputs, e.g. <code>(A AND B) OR NOT C</code>, <code>A XOR B</code>, <code>NOT (A OR B) AND C</code>. Check your exam working here.</p><input class="expr" value="(A AND B) OR NOT C"><div class="exprout"></div>`;
  const inp = ex.querySelector('.expr'), out = ex.querySelector('.exprout');
  const run = () => { try { const { e, vars } = parseExpr(inp.value); if (!vars.length || vars.length > 5) throw Error('use 1 to 5 inputs'); const n = vars.length; let h = `<table class="tt big"><tr>${vars.map(x => `<th>${x}</th>`).join('')}<th>X</th></tr>`; for (let r = 0; r < 2 ** n; r++) { const env = {}; vars.forEach((x, j) => env[x] = (r >> (n - 1 - j)) & 1); h += `<tr>${vars.map(x => `<td>${env[x]}</td>`).join('')}<td><b>${e(env)}</b></td></tr>`; } out.innerHTML = h + '</table>'; } catch (err) { out.innerHTML = `<p class="bad">⚠ ${err.message}</p>`; } };
  inp.oninput = run; run();
}

// ---------------- Circuits ----------------
function circuit(host) {
  const v = controls(host, [
    { id: 'mode', type: 'select', label: 'Connection', value: 's', options: [['s', 'Series'], ['p', 'Parallel']] },
    { id: 'V', label: 'Supply voltage', min: 1, max: 24, value: 12, unit: ' V' },
    { id: 'R1', label: 'R₁', min: 1, max: 200, value: 40, unit: ' Ω' },
    { id: 'R2', label: 'R₂', min: 1, max: 200, value: 80, unit: ' Ω' }], draw);
  const cv = canvas(host, 260), ro = readout(host);
  function res(g, x, y, vert, label, col) { g.fillStyle = C().card; g.strokeStyle = col; g.lineWidth = 2; if (vert) { g.fillRect(x - 10, y - 26, 20, 52); g.strokeRect(x - 10, y - 26, 20, 52); } else { g.fillRect(x - 26, y - 10, 52, 20); g.strokeRect(x - 26, y - 10, 52, 20); } g.fillStyle = C().ink; g.font = '13px system-ui'; g.fillText(label, vert ? x + 16 : x - 20, vert ? y + 4 : y - 16); }
  function draw() {
    const c = C(), g = cv.getContext('2d'), W = cv._w; g.clearRect(0, 0, W, cv._h);
    const { mode, V, R1, R2 } = v; let Rt, I, I1, I2, V1, V2;
    if (mode === 's') { Rt = R1 + R2; I = V / Rt; I1 = I2 = I; V1 = I * R1; V2 = I * R2; } else { Rt = R1 * R2 / (R1 + R2); I1 = V / R1; I2 = V / R2; I = I1 + I2; V1 = V2 = V; }
    const L = 60, Rr = Math.min(W - 60, 520), T = 40, B = 220; g.strokeStyle = c.ink; g.lineWidth = 2;
    g.beginPath(); g.moveTo(L, T); g.lineTo(Rr, T); g.lineTo(Rr, B); g.lineTo(L, B); g.lineTo(L, T); g.stroke();
    g.fillStyle = c.card; g.fillRect(L - 14, (T + B) / 2 - 14, 28, 28); g.strokeStyle = c.ink; g.beginPath(); g.moveTo(L - 14, (T + B) / 2 - 4); g.lineTo(L + 14, (T + B) / 2 - 4); g.moveTo(L - 8, (T + B) / 2 + 4); g.lineTo(L + 8, (T + B) / 2 + 4); g.stroke();
    g.fillStyle = c.ink; g.font = '13px system-ui'; g.fillText(V + ' V', L - 50, (T + B) / 2 + 4);
    if (mode === 's') { res(g, L + (Rr - L) * .35, T, false, `R₁ ${R1} Ω · ${fx(V1)} V`, c.acc); res(g, L + (Rr - L) * .75, T, false, `R₂ ${R2} Ω · ${fx(V2)} V`, c.acc2); }
    else { const xa = L + (Rr - L) * .45, xb = L + (Rr - L) * .75; g.strokeStyle = c.ink; g.beginPath(); g.moveTo(xa, T); g.lineTo(xa, B); g.moveTo(xb, T); g.lineTo(xb, B); g.stroke(); res(g, xa, (T + B) / 2, true, `R₁ ${R1} Ω · ${fx(I1, 3)} A`, c.acc); res(g, xb, (T + B) / 2, true, `R₂ ${R2} Ω · ${fx(I2, 3)} A`, c.acc2); }
    arrow(g, L + 30, B, L + 80, B, c.bad, 2, 'I = ' + fx(I, 3) + ' A', -10, 20);
    ro.innerHTML = mode === 's' ? `R<sub>total</sub> = ${R1} + ${R2} = <b>${Rt} Ω</b> · I = V ÷ R = ${V} ÷ ${Rt} = <b>${fx(I, 4)} A</b> (same everywhere) · V₁ = ${fx(V1)} V, V₂ = ${fx(V2)} V (add to ${V} V)<br>Power: P = VI = <b>${fx(V * I, 3)} W</b> · energy in 1 minute E = Pt = ${fx(V * I * 60, 1)} J`
      : `1/R<sub>total</sub> = 1/${R1} + 1/${R2} → R<sub>total</sub> = <b>${fx(Rt, 2)} Ω</b> (smaller than either) · same ${V} V across each branch · I₁ = ${fx(I1, 3)} A, I₂ = ${fx(I2, 3)} A, I<sub>total</sub> = <b>${fx(I, 3)} A</b><br>Power: P = VI = <b>${fx(V * I, 3)} W</b> · energy in 1 minute E = Pt = ${fx(V * I * 60, 1)} J`;
  }
  draw(); onResize(cv, draw);
}

// ---------------- Stress–strain ----------------
const MATS = {
  mild: { n: 'Mild (low-carbon) steel', pts: [[0, 0], [.12, 250], [.13, 235], [.5, 240], [1.5, 330], [3, 420], [4.2, 400], [5, 340]], yieldDrop: true, E: 'high', note: 'Distinct yield point then a long plastic region: strong, very ductile, tough.' },
  high: { n: 'High-carbon steel', pts: [[0, 0], [.35, 700], [.5, 820], [.9, 900], [1.2, 880]], note: 'Very high strength and stiffness but little plastic strain: hard and fairly brittle.' },
  al: { n: 'Aluminium alloy', pts: [[0, 0], [.4, 280], [1, 320], [2.2, 360], [3, 330]], note: 'Lower stiffness than steel (shallower slope), no sharp yield point (use 0.2% offset).' },
  ci: { n: 'Grey cast iron', pts: [[0, 0], [.6, 200], [.8, 220]], note: 'Brittle: fractures with almost no plastic deformation — very low toughness.' },
  nylon: { n: 'Nylon 6', pts: [[0, 0], [.6, 60], [1.2, 70], [2.5, 62], [4, 66], [5, 70]], note: 'Low stiffness, high strain to failure: tough and fatigue resistant.' },
  pc: { n: 'Polycarbonate', pts: [[0, 0], [.7, 62], [1, 60], [3.5, 55], [4.5, 66], [4.6, 64]], note: 'Yields, necks and cold-draws: very high impact toughness.' }
};
function interp(pts, x) { for (let i = 1; i < pts.length; i++) if (x <= pts[i][0]) { const [x0, y0] = pts[i - 1], [x1, y1] = pts[i]; return y0 + (y1 - y0) * (x - x0) / (x1 - x0); } return null; }
function stress(host) {
  const v = controls(host, [
    { id: 'mat', type: 'select', label: 'Material', value: 'mild', options: Object.entries(MATS).map(([k, m]) => [k, m.n]) },
    { id: 'cmp', type: 'select', label: 'Compare with', value: 'none', options: [['none', '— none —'], ...Object.entries(MATS).map(([k, m]) => [k, m.n])] },
    { id: 'lab', type: 'check', label: 'Label features', value: true },
    { id: 'tough', type: 'check', label: 'Shade toughness', value: false },
    { id: 'res', type: 'check', label: 'Shade resilience', value: false }], draw);
  const cv = canvas(host, 320), ro = readout(host);
  function draw() {
    const c = C(), g = cv.getContext('2d'), W = cv._w, H = cv._h; g.clearRect(0, 0, W, H);
    const m = MATS[v.mat], m2 = v.cmp !== 'none' ? MATS[v.cmp] : null;
    const all = [m, m2].filter(Boolean), smax = Math.max(...all.flatMap(q => q.pts.map(p => p[1]))) * 1.12, emax = Math.max(...all.flatMap(q => q.pts.map(p => p[0]))) * 1.08;
    const L = 56, R = W - 20, T = 16, B = H - 40, X = e => L + e / emax * (R - L), Y = s => B - s / smax * (B - T);
    g.strokeStyle = c.mute; g.lineWidth = 1; g.beginPath(); g.moveTo(L, T); g.lineTo(L, B); g.lineTo(R, B); g.stroke();
    g.fillStyle = c.ink; g.font = '12px system-ui'; g.fillText('Stress (MPa)', 4, T + 2); g.fillText('Strain (%)', R - 60, B + 28);
    const curve = (q, col, w) => { g.strokeStyle = col; g.lineWidth = w; g.beginPath(); q.pts.forEach(([e, s], i) => i ? g.lineTo(X(e), Y(s)) : g.moveTo(X(e), Y(s))); g.stroke(); };
    if (v.tough) { g.fillStyle = c.acc; g.globalAlpha = .18; g.beginPath(); g.moveTo(X(0), B); m.pts.forEach(([e, s]) => g.lineTo(X(e), Y(s))); g.lineTo(X(m.pts.at(-1)[0]), B); g.closePath(); g.fill(); g.globalAlpha = 1; }
    if (v.res) { const [e1, s1] = m.pts[1]; g.fillStyle = c.acc2; g.globalAlpha = .35; g.beginPath(); g.moveTo(X(0), B); g.lineTo(X(e1), Y(s1)); g.lineTo(X(e1), B); g.closePath(); g.fill(); g.globalAlpha = 1; }
    if (m2) curve(m2, c.mute, 2);
    curve(m, c.acc, 3);
    if (v.lab) {
      const p = m.pts, pl = p[1], uts = p.reduce((a, b) => b[1] > a[1] ? b : a), fr = p.at(-1);
      const dot = (e, s, t, dx = 8, dy = -8) => { g.fillStyle = c.bad; g.beginPath(); g.arc(X(e), Y(s), 4, 0, 7); g.fill(); g.fillStyle = c.ink; g.fillText(t, X(e) + dx, Y(s) + dy); };
      dot(pl[0], pl[1], m.yieldDrop ? 'proportional/elastic limit ≈ yield' : 'proportional limit', 8, 14);
      if (m.yieldDrop) dot(p[2][0], p[2][1], 'lower yield', 8, 16);
      if (uts !== pl) dot(uts[0], uts[1], 'UTS');
      if (fr !== uts) dot(fr[0], fr[1], 'fracture', 6, 16); else dot(fr[0], fr[1], 'fracture', 6, 16);
      g.fillStyle = c.mute; g.fillText('slope = Young\'s modulus', X(pl[0] * .35) + 6, Y(pl[1] * .45));
    }
    let area = 0; for (let i = 1; i < m.pts.length; i++) area += (m.pts[i][0] - m.pts[i - 1][0]) / 100 * (m.pts[i][1] + m.pts[i - 1][1]) / 2;
    ro.innerHTML = `<b>${m.n}</b>: ${m.note}<br>Approx. UTS ${Math.max(...m.pts.map(p => p[1]))} MPa · strain at fracture ${m.pts.at(-1)[0]}% · toughness (area) ≈ ${fx(area, 1)} MJ/m³ <span class="mute">(illustrative values)</span>`;
  }
  draw(); onResize(cv, draw);
}

// ---------------- Pb–Sn phase diagram ----------------
const PB = {
  liqL: [[0, 327], [10, 305], [20, 280], [30, 256], [40, 234], [50, 212], [61.9, 183]],
  solL: [[0, 327], [5, 305], [10, 278], [15, 240], [19.2, 183]],
  svL: [[19.2, 183], [15, 150], [10, 110], [6, 65], [2, 0]],
  liqR: [[61.9, 183], [70, 195], [80, 210], [90, 222], [100, 232]],
  solR: [[97.5, 183], [99, 212], [100, 232]],
  svR: [[97.5, 183], [98.5, 100], [99, 0]]
};
const yAt = (pts, x) => { for (let i = 1; i < pts.length; i++) { const [x0, y0] = pts[i - 1], [x1, y1] = pts[i]; if ((x - x0) * (x - x1) <= 0) return x1 === x0 ? y0 : y0 + (y1 - y0) * (x - x0) / (x1 - x0); } return null; };
const xAt = (pts, y) => { for (let i = 1; i < pts.length; i++) { const [x0, y0] = pts[i - 1], [x1, y1] = pts[i]; if ((y - y0) * (y - y1) <= 0) return y1 === y0 ? x0 : x0 + (x1 - x0) * (y - y0) / (y1 - y0); } return null; };
export function pbsn(C0, T) {
  const left = C0 <= 61.9, liq = left ? yAt(PB.liqL, C0) : yAt(PB.liqR, C0);
  if (T >= liq) return { reg: 'L', phases: [['Liquid', 100, C0]] };
  if (T > 183) {
    if (left) { const sol = C0 <= 19.2 ? yAt(PB.solL, C0) : 183; if (C0 <= 19.2 && T <= sol) { const sv = yAt(PB.svL, C0); if (T >= sv) return { reg: 'α', phases: [['α', 100, C0]] }; }
      const Ca = xAt(PB.solL, T), Cl = xAt(PB.liqL, T); const fl = (C0 - Ca) / (Cl - Ca) * 100; return { reg: 'α + L', tie: [Ca, Cl], phases: [['α (solid)', 100 - fl, Ca], ['Liquid', fl, Cl]] }; }
    else { const sol = C0 >= 97.5 ? yAt(PB.solR, C0) : 183; if (C0 >= 97.5 && T <= sol) return { reg: 'β', phases: [['β', 100, C0]] };
      const Cb = xAt(PB.solR, T), Cl = xAt(PB.liqR, T); const fl = (Cb - C0) / (Cb - Cl) * 100; return { reg: 'β + L', tie: [Cl, Cb], phases: [['Liquid', fl, Cl], ['β (solid)', 100 - fl, Cb]] }; }
  }
  const Ca = xAt(PB.svL, Math.max(T, 0.01)), Cb = xAt(PB.svR, Math.max(T, 0.01));
  if (C0 <= Ca) return { reg: 'α', phases: [['α', 100, C0]] };
  if (C0 >= Cb) return { reg: 'β', phases: [['β', 100, C0]] };
  const fb = (C0 - Ca) / (Cb - Ca) * 100;
  return { reg: 'α + β', tie: [Ca, Cb], phases: [['α', 100 - fb, Ca], ['β', fb, Cb]] };
}
function phase(host) {
  const v = controls(host, [
    { id: 'C', label: 'Alloy composition', min: 0, max: 100, step: 0.5, value: 40, unit: '% Sn' },
    { id: 'T', label: 'Temperature', min: 0, max: 350, value: 220, unit: ' °C' },
    { id: 'axis', type: 'select', label: 'x-axis', value: 'sn', options: [['sn', '% Sn (tin)'], ['pb', '% Pb (lead) — 2024/25 style']] }], draw);
  const cv = canvas(host, 360), ro = readout(host);
  cv.addEventListener('click', e => { const b = cv.getBoundingClientRect(), x = e.clientX - b.left, y = e.clientY - b.top; const g = geo(); let c0 = (x - g.L) / (g.R - g.L) * 100; if (v.axis === 'pb') c0 = 100 - c0; const t = (g.B - y) / (g.B - g.T) * 350; if (c0 >= 0 && c0 <= 100 && t >= 0 && t <= 350) { v.C = Math.round(c0 * 2) / 2; v.T = Math.round(t); syncInputs(); draw(); } });
  function syncInputs() { const ins = host.querySelectorAll('.ctrls input[type=range]'); ins[0].value = v.C; ins[0].nextSibling.textContent = v.C + '% Sn'; ins[1].value = v.T; ins[1].nextSibling.textContent = v.T + ' °C'; }
  const geo = () => ({ L: 50, R: cv._w - 20, T: 14, B: cv._h - 40 });
  function draw() {
    const c = C(), g = cv.getContext('2d'); g.clearRect(0, 0, cv._w, cv._h); const { L, R, T, B } = geo(); const flip = v.axis === 'pb';
    const X = cs => L + (flip ? 100 - cs : cs) / 100 * (R - L), Y = t => B - t / 350 * (B - T);
    g.strokeStyle = c.line; g.lineWidth = 1; for (let i = 0; i <= 100; i += 10) { g.beginPath(); g.moveTo(L + i / 100 * (R - L), T); g.lineTo(L + i / 100 * (R - L), B); g.stroke(); } for (let t = 0; t <= 350; t += 50) { g.beginPath(); g.moveTo(L, Y(t)); g.lineTo(R, Y(t)); g.stroke(); }
    g.fillStyle = c.mute; g.font = '11px system-ui'; for (let i = 0; i <= 100; i += 10) g.fillText(i, L + i / 100 * (R - L) - 6, B + 14); for (let t = 0; t <= 350; t += 50) g.fillText(t, L - 28, Y(t) + 4);
    g.fillText(flip ? '% Lead (Pb)' : '% Tin (Sn)', (L + R) / 2 - 26, B + 30); g.fillText('°C', 8, T + 8);
    const line = (pts, col, w = 2.5) => { g.strokeStyle = col; g.lineWidth = w; g.beginPath(); pts.forEach(([x, y], i) => i ? g.lineTo(X(x), Y(y)) : g.moveTo(X(x), Y(y))); g.stroke(); };
    line(PB.liqL, c.bad); line(PB.liqR, c.bad); line(PB.solL, c.acc); line(PB.solR, c.acc); line(PB.svL, c.acc2); line(PB.svR, c.acc2); line([[19.2, 183], [97.5, 183]], c.acc);
    g.fillStyle = c.ink; g.font = '600 13px system-ui';
    g.fillText('L', X(50), Y(300)); g.fillText('α + L', X(14), Y(250)); g.fillText('β + L', X(85), Y(200)); g.fillText('α', X(5), Y(150)); g.fillText('β', X(99) - (flip ? 0 : 8), Y(120)); g.fillText('α + β', X(55), Y(90));
    g.font = '11px system-ui'; g.fillStyle = c.mute; g.fillText('183 °C', X(flip ? 30 : 70), Y(183) - 4); g.fillText('eutectic 61.9% Sn', X(61.9) - 40, Y(183) + 14);
    const res = pbsn(v.C, v.T);
    if (res.tie) { g.strokeStyle = c.ink; g.lineWidth = 2; g.setLineDash([5, 4]); g.beginPath(); g.moveTo(X(res.tie[0]), Y(v.T)); g.lineTo(X(res.tie[1]), Y(v.T)); g.stroke(); g.setLineDash([]); g.fillStyle = c.ink; [0, 1].forEach(i => { g.beginPath(); g.arc(X(res.tie[i]), Y(v.T), 4, 0, 7); g.fill(); }); }
    g.fillStyle = c.acc; g.beginPath(); g.arc(X(v.C), Y(v.T), 6, 0, 7); g.fill();
    const pc = x => flip ? `${fx(100 - x, 1)}% Pb` : `${fx(x, 1)}% Sn`;
    let h = `Point: <b>${pc(v.C)}</b> at <b>${v.T} °C</b> → region <b>${res.reg}</b>`;
    if (res.tie) { const [a, b] = res.phases, lo = res.tie[0], hi = res.tie[1]; h += `<br>Tie line from ${pc(lo)} to ${pc(hi)}. Lever rule: ${a[0]} = (${fx(hi, 1)} − ${fx(v.C, 1)}) ÷ (${fx(hi, 1)} − ${fx(lo, 1)}) = <b>${fx(a[1], 1)}%</b> (composition ${pc(a[2])}); ${b[0]} = <b>${fx(b[1], 1)}%</b> (composition ${pc(b[2])}).`; }
    else h += ` — single phase: 100% ${res.phases[0][0]} with the alloy's composition.`;
    const cs = v.C; h += `<br><span class="mute">${cs < 19.2 ? 'Below max α solubility: solidifies as α; β precipitates below the solvus.' : cs < 61.4 ? 'Hypoeutectic: room-temperature structure = primary α + eutectic (α+β lamellae).' : cs <= 62.4 ? 'Eutectic: solidifies at 183 °C straight into lamellar α+β.' : cs < 97.5 ? 'Hypereutectic: room-temperature structure = primary β + eutectic.' : 'Tin-rich: solidifies as β.'} Click the diagram to move the point.</span>`;
    ro.innerHTML = h;
  }
  draw(); onResize(cv, draw);
}

// ---------------- Steel microstructure ----------------
function steel(host) {
  const v = controls(host, [
    { id: 'C', label: 'Carbon content', min: 0.02, max: 2.0, step: 0.01, value: 0.4, unit: '% C' },
    { id: 'cool', type: 'select', label: 'Cooling from austenite', value: 'furnace', options: [['furnace', 'Furnace cooled (full anneal)'], ['air', 'Air cooled (normalise)'], ['oil', 'Oil quenched'], ['water', 'Water quenched'], ['temper', 'Water quenched + tempered']] }], draw);
  const wrap = document.createElement('div'); wrap.className = 'steelwrap'; host.appendChild(wrap);
  const cv = document.createElement('canvas'); cv.width = 260; cv.height = 260; cv.className = 'micro'; wrap.appendChild(cv);
  const side = document.createElement('div'); side.className = 'steelside'; wrap.appendChild(side);
  const seeds = [...Array(46)].map(() => [Math.random() * 260, Math.random() * 260, Math.random(), Math.random() * Math.PI]);
  function draw() {
    const c = C(), g = cv.getContext('2d'), img = g.createImageData(260, 260), Cc = v.C, cool = v.cool;
    const hypo = Cc < 0.83, fP = hypo ? Cc / 0.83 : 1 - (Cc - 0.83) / (6.67 - 0.83), fFe = hypo ? 1 - fP : 0, fCem = hypo ? 0 : 1 - fP;
    const quench = cool === 'oil' || cool === 'water' || cool === 'temper', spacing = cool === 'furnace' ? 9 : 4.5;
    const order = seeds.map((s, i) => [s[2], i]).sort((a, b) => a[0] - b[0]), isFerrite = new Set(order.slice(0, Math.round(fFe * seeds.length)).map(x => x[1]));
    for (let y = 0; y < 260; y++) for (let x = 0; x < 260; x++) {
      let b = 1e9, b2 = 1e9, bi = 0; for (let i = 0; i < seeds.length; i++) { const dx = x - seeds[i][0], dy = y - seeds[i][1], d = dx * dx + dy * dy; if (d < b) { b2 = b; b = d; bi = i; } else if (d < b2) b2 = d; }
      const edge = Math.sqrt(b2) - Math.sqrt(b) < (fCem > 0 && !quench ? 2.2 + fCem * 30 : 1.1);
      let val;
      if (quench) { const s = seeds[bi]; const n = Math.sin((x * Math.cos(s[3] + (x * y % 7)) + y * Math.sin(s[3])) / 3); val = cool === 'temper' ? 150 + 50 * Math.sin(x * .9 + y * .4) * Math.cos(y * .7) : (n > .3 ? 70 : 200) ; if (cool === 'oil' && s[2] < .15) { const ph = x * Math.cos(s[3]) + y * Math.sin(s[3]); val = (((ph % 4) + 4) % 4 < 2) ? 90 : 170; } }
      else if (isFerrite.has(bi)) val = 235;
      else { const s = seeds[bi]; { const ph = x * Math.cos(s[3]) + y * Math.sin(s[3]); val = (((ph % spacing) + spacing) % spacing) < spacing * .35 ? 60 : 205; } }
      if (edge) val = fCem > 0 && !quench ? 250 : 40;
      const k = (y * 260 + x) * 4; img.data[k] = img.data[k + 1] = img.data[k + 2] = val; img.data[k + 3] = 255;
    }
    g.putImageData(img, 0, 0); g.globalCompositeOperation = 'destination-in'; g.beginPath(); g.arc(130, 130, 128, 0, 7); g.fill(); g.globalCompositeOperation = 'source-over'; g.strokeStyle = c.ink; g.lineWidth = 2; g.beginPath(); g.arc(130, 130, 128, 0, 7); g.stroke();
    const cls = Cc < 0.07 ? 'very low carbon (nearly pure iron)' : Cc <= 0.3 ? 'LOW-carbon (mild) steel' : Cc <= 0.6 ? 'MEDIUM-carbon steel' : 'HIGH-carbon steel';
    const uses = Cc <= 0.3 ? 'car body parts, wire, structural plates/sections, seamless tubes, boiler plate' : Cc <= 0.6 ? 'shafts, axles, gears, crankshafts, forgings, train rails, wheels' : 'springs, high-strength wire, cutting tools, punches, dies, industrial knives';
    const hard = { furnace: 20, air: 35, oil: 75, water: 95, temper: 65 }[cool] * (0.4 + Math.min(Cc, 1) * 0.6);
    let struct;
    if (!quench) struct = hypo ? `<b>Hypoeutectoid</b>: ≈${Math.round(fFe * 100)}% pro-eutectoid <b>ferrite</b> (light grains) + ≈${Math.round(fP * 100)}% <b>pearlite</b> (striped)` : Math.abs(Cc - 0.83) < 0.02 ? '<b>Eutectoid</b>: 100% <b>pearlite</b>' : `<b>Hypereutectoid</b>: ≈${Math.round(fP * 100)}% <b>pearlite</b> + ≈${Math.round(fCem * 100)}% pro-eutectoid <b>cementite</b> network at the grain boundaries (white)`;
    else struct = cool === 'temper' ? '<b>Tempered martensite</b>: slightly less hard, much tougher, internal stress relieved' : cool === 'water' ? '<b>Martensite</b> (needle-like): fastest cooling traps carbon — hardest, most brittle, may crack' : '<b>Martensite</b> with a little very fine pearlite: hard, less risk of cracking than water';
    side.innerHTML = `<p><b>${Cc.toFixed(2)}% C</b> — ${cls}</p><p>${struct}${!quench ? (cool === 'furnace' ? ' — coarse pearlite (slow furnace cooling): soft and ductile.' : ' — fine pearlite (air cooling): stronger and tougher than annealed.') : ''}</p><p><b>Typical uses:</b> ${uses}</p><div class="hbar"><span style="width:${Math.min(100, hard)}%"></span></div><p class="mute">Relative hardness (illustrative). Light = ferrite, dark/striped = pearlite, white boundary network = cementite.</p>`;
  }
  draw();
}

export const SIMS = { lever, pulley, gears, energy, motion, incline, logic, circuit, stress, phase, steel };
export const SIM_NAMES = { lever: 'Lever explorer', pulley: 'Pulley system', gears: 'Gear train', energy: 'Energy on a ramp', motion: 'Velocity–time graph', incline: 'Incline & friction FBD', logic: 'Logic gates', circuit: 'Series & parallel circuit', stress: 'Stress–strain explorer', phase: 'Pb–Sn phase diagram & lever rule', steel: 'Steel microstructure & heat treatment' };
