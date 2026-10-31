import './style.css';
import EXAMS from './exams.json';
import { TOPICS, FORMULAS, GENERATORS, CONCEPT_QUIZ } from './content.js';
import { SIMS, SIM_NAMES, gateTable } from './sims.js';
import CUSTOM from './custom.js';

// ---------- image loaders (one JSON per year, loaded on demand) ----------
const LOADERS = {
  2020: () => import('./ex-2020.json'), 2021: () => import('./ex-2021.json'), 2022: () => import('./ex-2022.json'),
  2023: () => import('./ex-2023.json'), 2024: () => import('./ex-2024.json'), 2025: () => import('./ex-2025.json')
};
const imgCache = {};
async function imgs(year) { if (!imgCache[year]) imgCache[year] = (await LOADERS[year]()).default; return imgCache[year]; }
const YEARS = [2020, 2021, 2022, 2023, 2024, 2025];
const Q = Object.fromEntries(EXAMS.map(q => [q.id, q]));
const TOPIC = Object.fromEntries(TOPICS.map(t => [t.id, t]));

// ---------- state ----------
const KEY = 'egrhub.v1';
let S; try { S = JSON.parse(localStorage.getItem(KEY)) || {}; } catch { S = {}; }
S.q ||= {}; S.exams ||= []; S.gen ||= {}; S.mine ||= []; S.notes ||= {};
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch { } };
const status = id => S.q[id];
function record(id, score, max, extra = {}) { S.q[id] = { score, max, at: Date.now(), ...extra }; save(); }

// ---------- helpers ----------
const $ = (s, el = document) => el.querySelector(s);
const app = $('#app');
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const qLabel = q => `${q.y} · ${q.t === 'mc' ? 'MC' : 'Q'}${q.n}`;
const tagChips = tags => tags.map(t => `<a class="chip" href="#/topic/${t}">${TOPIC[t]?.icon || ''} ${TOPIC[t]?.title.split(':')[0] || t}</a>`).join('');
function pct(list) { let s = 0, m = 0; list.forEach(q => { const st = status(q.id); if (st) { s += st.score; m += st.max; } }); return m ? Math.round(s / m * 100) : null; }
function done(list) { return list.filter(q => status(q.id)).length; }
function stDot(id) { const st = status(id); if (!st) return '<span class="dot"></span>'; const r = st.score / st.max; return `<span class="dot ${r >= .999 ? 'g' : r > 0 ? 'p' : 'b'}"></span>`; }
function ring(p, size = 54) { const v = p ?? 0, r = size / 2 - 5, c = 2 * Math.PI * r; return `<svg width="${size}" height="${size}" class="ring"><circle cx="${size / 2}" cy="${size / 2}" r="${r}" class="rb"/>${p ? `<circle cx="${size / 2}" cy="${size / 2}" r="${r}" class="rf" stroke-dasharray="${c * v / 100} ${c}" transform="rotate(-90 ${size / 2} ${size / 2})"/>` : ''}<text x="50%" y="54%" text-anchor="middle" dominant-baseline="middle">${p == null ? '–' : p + '%'}</text></svg>`; }
function setActive(h) { document.querySelectorAll('nav a').forEach(a => a.classList.toggle('on', h.startsWith(a.getAttribute('href')) && (a.getAttribute('href') !== '#/' || h === '#/'))); }

// ---------- router ----------
let cleanup = null;
function route() {
  if (cleanup) { cleanup(); cleanup = null; }
  const h = location.hash || '#/'; const [, page, a, b] = h.split('/');
  setActive(h); window.scrollTo(0, 0); document.body.classList.remove('menu');
  const R = { '': home, topic: () => a ? topicPage(a) : topicsList(), topics: topicsList, papers: () => a ? paperPage(+a) : papersList(), q: () => questionPage(a), browse, exam: () => examPage(a), formulas, mine, progress };
  (R[page] || home)();
}
window.addEventListener('hashchange', route);
$('#menuBtn').onclick = () => document.body.classList.toggle('menu');
$('#themeBtn').onclick = () => { const cur = document.documentElement.dataset.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'); const nx = cur === 'dark' ? 'light' : 'dark'; document.documentElement.dataset.theme = nx; try { localStorage.setItem('egrhub.theme', nx); } catch { } };
try { const t = localStorage.getItem('egrhub.theme'); if (t) document.documentElement.dataset.theme = t; } catch { }

// ---------- pages ----------
function home() {
  const total = EXAMS.length, d = done(EXAMS), p = pct(EXAMS);
  const weakest = TOPICS.map(t => ({ t, list: EXAMS.filter(q => q.tags.includes(t.id)) })).filter(x => x.list.length).map(x => ({ ...x, p: pct(x.list), d: done(x.list) })).sort((a, b) => (a.p ?? -1) - (b.p ?? -1));
  app.innerHTML = `
  <section class="hero"><div><h1>QCAA Engineering — Unit 4 Hub</h1><p>Everything for the external exam on <b>Machines and mechanisms</b>: lessons, interactive simulations, ${total} past-paper questions (2020–2025) with official marking guides, and full timed exams.</p>
  <div class="btns"><a class="btn pri" href="#/topics">Start learning</a><a class="btn" href="#/exam">Sit a past paper</a><a class="btn" href="#/browse">Question bank</a></div></div>
  <div class="herostat">${ring(p, 110)}<div><b>${d}/${total}</b> questions attempted<br><span class="mute">${S.exams.length} exam${S.exams.length === 1 ? '' : 's'} completed</span></div></div></section>
  <div class="examfacts"><div><b>Exam</b><span>Combination response, 25% of your result</span></div><div><b>Time</b><span>5 min perusal + 120 min working</span></div><div><b>Sections</b><span>MC · short written · calculations</span></div><div><b>Allowed</b><span>Formula book, scientific calculator, ruler, protractor</span></div></div>
  <h2>Topics</h2><div class="grid">${TOPICS.map(t => topicCard(t)).join('')}</div>
  <h2>Focus next</h2><div class="list">${weakest.slice(0, 4).map(x => `<a class="row" href="#/topic/${x.t.id}"><span>${x.t.icon} ${x.t.title}</span><span class="mute">${x.d}/${x.list.length} done${x.p != null ? ` · ${x.p}%` : ''}</span></a>`).join('')}</div>`;
}
function topicCard(t) {
  const list = EXAMS.filter(q => q.tags.includes(t.id)), p = pct(list);
  return `<a class="card topic" href="#/topic/${t.id}"><div class="ti">${t.icon}</div><div class="tb"><div class="grp">${t.group}</div><h3>${t.title}</h3><p>${t.blurb}</p><div class="meta">${list.length} past questions${p != null ? ` · ${p}% scored` : ''}</div></div></a>`;
}
function topicsList() { app.innerHTML = `<h1>Topics</h1><p class="mute">Unit 4 subject matter in syllabus order. Each topic has a lesson, simulations, practice and all of its past exam questions.</p><div class="grid">${TOPICS.map(topicCard).join('')}</div>`; }

function topicPage(id) {
  const t = TOPIC[id]; if (!t) return home();
  const list = EXAMS.filter(q => q.tags.includes(id)).sort((a, b) => b.y - a.y || (a.t === 'mc' ? -1 : 1) || a.n - b.n);
  const sims = t.sim || [], gens = GENERATORS[id], quiz = CONCEPT_QUIZ.filter(q => q.t === id);
  const tabs = [['learn', 'Lesson'], ...(sims.length ? [['sim', 'Simulations']] : []), ...((gens || quiz.length) ? [['prac', 'Practice']] : []), ['past', `Past questions (${list.length})`]];
  app.innerHTML = `<a class="back" href="#/topics">← Topics</a><div class="grp">${t.group}</div><h1>${t.icon} ${t.title}</h1>
  <div class="tabs">${tabs.map(([k, n], i) => `<button data-k="${k}" class="${i ? '' : 'on'}">${n}</button>`).join('')}</div>
  <div class="pane" data-k="learn"><details class="syl" open><summary>Syllabus dot points</summary><ul>${t.syllabus.map(s => `<li>${s}</li>`).join('')}</ul></details><div class="lesson">${t.lesson}</div></div>
  <div class="pane hide" data-k="sim">${sims.map(s => `<div class="simcard"><h3>${SIM_NAMES[s]}</h3><div class="sim" data-sim="${s}"></div></div>`).join('')}</div>
  <div class="pane hide" data-k="prac">${gens ? `<div class="simcard"><h3>Calculation practice</h3><p class="mute">Endless randomised questions in the exam's style. Use g = 9.8 m/s². Answers within about 1% are accepted.</p><div id="gen"></div></div>` : ''}${quiz.length ? `<div class="simcard"><h3>Concept check</h3><div id="cq"></div></div>` : ''}</div>
  <div class="pane hide" data-k="past"><div class="list">${list.map(qRow).join('') || '<p class="mute">No past exam questions for this topic — it is new in the 2025 v1.4 syllabus. Use the Practice tab.</p>'}</div></div>`;
  const gt = $('#gateTable'); if (gt) gt.innerHTML = gateTable();
  let simsInit = false;
  app.querySelectorAll('.tabs button').forEach(b => b.onclick = () => {
    app.querySelectorAll('.tabs button').forEach(x => x.classList.toggle('on', x === b));
    app.querySelectorAll('.pane').forEach(p => p.classList.toggle('hide', p.dataset.k !== b.dataset.k));
    if (b.dataset.k === 'sim' && !simsInit) { simsInit = true; app.querySelectorAll('.sim').forEach(el => SIMS[el.dataset.sim](el)); }
  });
  if (gens) genWidget($('#gen'), id);
  if (quiz.length) conceptWidget($('#cq'), quiz);
}
function qRow(q) {
  return `<a class="row q" href="#/q/${q.id}">${stDot(q.id)}<span class="ql">${qLabel(q)}</span><span class="qt">${esc(q.txt.slice(0, 120))}${q.txt.length > 120 ? '…' : ''}</span><span class="mk">${q.m} mark${q.m > 1 ? 's' : ''}</span></a>`;
}

function genWidget(el, topic) {
  const gens = GENERATORS[topic]; S.gen[topic] ||= { r: 0, n: 0 };
  let cur;
  function next() {
    cur = gens[Math.floor(Math.random() * gens.length)]();
    const st = S.gen[topic];
    el.innerHTML = `<div class="genq">${cur.q}</div><div class="genin"><input type="number" step="any" placeholder="answer" inputmode="decimal"> <span>${cur.unit}</span><button class="btn pri">Check</button><button class="btn" data-a="show">Show working</button><button class="btn" data-a="next">New question</button></div><div class="genfb"></div><div class="mute small">Score this session: ${st.r}/${st.n}</div>`;
    const inp = $('input', el), fb = $('.genfb', el);
    const check = () => { const x = parseFloat(inp.value); if (isNaN(x)) return; const tol = Math.max(Math.abs(cur.a) * (cur.tol || 0.01), 0.011); const ok = Math.abs(x - cur.a) <= tol; S.gen[topic].n++; if (ok) S.gen[topic].r++; save(); fb.innerHTML = `<div class="${ok ? 'good' : 'bad'}">${ok ? '✓ Correct' : `✗ Not quite — answer: <b>${cur.a} ${cur.unit}</b>`}</div><div class="work">${cur.work}</div>`; $('.small', el).textContent = `Score this session: ${S.gen[topic].r}/${S.gen[topic].n}`; };
    $('.btn.pri', el).onclick = check; inp.onkeydown = e => e.key === 'Enter' && check();
    $('[data-a=show]', el).onclick = () => fb.innerHTML = `<div class="work">${cur.work}<br>Answer: <b>${cur.a} ${cur.unit}</b></div>`;
    $('[data-a=next]', el).onclick = next;
  }
  next();
}
function conceptWidget(el, quiz) {
  el.innerHTML = quiz.map((q, i) => `<div class="cq" data-i="${i}"><p>${i + 1}. ${q.q}</p><div class="opts">${q.o.map((o, j) => `<button data-j="${j}">${o}</button>`).join('')}</div></div>`).join('');
  el.querySelectorAll('.cq').forEach(d => { const q = quiz[d.dataset.i]; d.querySelectorAll('button').forEach(b => b.onclick = () => { d.querySelectorAll('button').forEach(x => { x.disabled = true; if (+x.dataset.j === q.a) x.classList.add('right'); }); if (+b.dataset.j !== q.a) b.classList.add('wrong'); }); });
}

function papersList() {
  app.innerHTML = `<h1>Past papers</h1><p class="mute">Every QCAA Engineering external assessment, 2020–2025, with official marking guides. Questions are shown exactly as printed.</p>
  <div class="grid">${YEARS.slice().reverse().map(y => { const list = EXAMS.filter(q => q.y === y), m = list.reduce((s, q) => s + q.m, 0), p = pct(list); return `<div class="card paper"><div class="pt"><h3>${y}</h3>${ring(p, 54)}</div><p>${list.filter(q => q.t === 'mc').length} MC + ${list.filter(q => q.t === 'w').length} written · ${m} marks</p><p class="mute">${done(list)}/${list.length} attempted</p><div class="btns"><a class="btn" href="#/papers/${y}">Practise questions</a><a class="btn pri" href="#/exam/${y}">Exam mode</a></div></div>`; }).join('')}</div>
  <div class="note">⚠️ The 2020–2025 papers were written for the 2019 syllabus. A few question types (e.g. PVC/PE/PLA plastics, cast iron) are no longer explicit dot points, and <b>series/parallel circuits are new in 2026</b> — practise those in <a href="#/topic/circuits">Electrical circuits</a>.</div>`;
}
function paperPage(y) {
  const list = EXAMS.filter(q => q.y === y);
  app.innerHTML = `<a class="back" href="#/papers">← Past papers</a><h1>${y} external assessment</h1><div class="btns"><a class="btn pri" href="#/exam/${y}">Sit as a timed exam</a><button class="btn" id="resetSet">Reset this paper</button></div>
  <h2>Section 1 — Multiple choice</h2><div class="list">${list.filter(q => q.t === 'mc').map(qRow).join('')}</div>
  <h2>Sections 2 & 3 — Short response</h2><div class="list">${list.filter(q => q.t === 'w').map(qRow).join('')}</div>`;
  $('#resetSet').onclick = () => { if (confirm(`Clear your answers for the ${y} paper?`)) { list.forEach(q => delete S.q[q.id]); save(); route(); } };
}

async function questionPage(id, opts = {}) {
  const q = Q[id]; if (!q) return home();
  const host = opts.host || app;
  const sib = opts.list || EXAMS.filter(x => x.y === q.y), i = sib.findIndex(x => x.id === id);
  const prev = sib[i - 1], next = sib[i + 1];
  if (!opts.host) host.innerHTML = `<a class="back" href="#/papers/${q.y}">← ${q.y} paper</a><div class="qhead"><h1>${qLabel(q)}</h1><span class="mk">${q.m} mark${q.m > 1 ? 's' : ''}</span></div><div class="chips">${tagChips(q.tags)}</div><div id="qbody"><div class="loading">Loading question…</div></div>
  <div class="qnav">${prev ? `<a class="btn" href="#/q/${prev.id}">← ${qLabel(prev)}</a>` : '<span></span>'}${next ? `<a class="btn" href="#/q/${next.id}">${qLabel(next)} →</a>` : '<span></span>'}</div>`;
  const I = (await imgs(q.y))[id]; const body = opts.host ? host : $('#qbody'); if (!body) return;
  const st = status(id);
  if (q.t === 'mc') {
    body.innerHTML = `<img class="qimg" src="${I.q}" alt="${esc(q.txt)}"><div class="mcopts">${'ABCD'.split('').map(l => `<button data-l="${l}">${l}</button>`).join('')}</div><div class="fb"></div>${st ? `<button class="btn ghost" id="again">Try again</button>` : ''}`;
    const show = (pick) => {
      body.querySelectorAll('.mcopts button').forEach(b => { b.disabled = true; if (q.ans.includes(b.dataset.l)) b.classList.add('right'); else if (b.dataset.l === pick) b.classList.add('wrong'); });
      const ok = q.ans.includes(pick);
      $('.fb', body).innerHTML = `<div class="${ok ? 'good' : 'bad'}">${ok ? '✓ Correct' : `✗ Answer: ${q.ans.join(' or ')}`}${q.ans.length > 1 ? ' <span class="mute">(QCAA accepted two answers)</span>' : ''}</div><div class="work"><b>Why:</b> ${q.why}</div>`;
    };
    if (st && st.pick) show(st.pick);
    body.querySelectorAll('.mcopts button').forEach(b => b.onclick = () => { const ok = q.ans.includes(b.dataset.l); record(id, ok ? 1 : 0, 1, { pick: b.dataset.l }); show(b.dataset.l); if (!$('#again', body)) { body.insertAdjacentHTML('beforeend', '<button class="btn ghost" id="again">Try again</button>'); bindAgain(); } });
    const bindAgain = () => { const a = $('#again', body); if (a) a.onclick = () => { delete S.q[id]; save(); questionPage(id, opts); }; };
    bindAgain();
  } else {
    const note = S.notes[id] || '';
    body.innerHTML = `<img class="qimg" src="${I.q}" alt="${esc(q.txt)}">
    <details class="ans"><summary>✏️ Your working (optional, saved on this device)</summary><textarea placeholder="Type your answer or working here, or write it on paper…">${esc(note)}</textarea></details>
    <button class="btn pri" id="reveal">Show marking guide</button><div class="guide hide"><h3>Official marking guide &amp; sample response</h3><img class="qimg g" src="${I.g}" alt="Marking guide for ${qLabel(q)}"><div class="selfmark"><span>Mark yourself:</span>${[...Array(q.m + 1).keys()].map(k => `<button data-k="${k}" class="${st && st.score === k ? 'on' : ''}">${k}</button>`).join('')}<span class="mute">/ ${q.m}</span>${st ? `<button class="btn ghost" id="again">Try again</button>` : ''}</div></div>`;
    $('textarea', body).oninput = e => { S.notes[id] = e.target.value; save(); };
    const reveal = () => { $('.guide', body).classList.remove('hide'); $('#reveal', body).remove(); };
    $('#reveal', body).onclick = reveal; if (st) reveal();
    body.querySelectorAll('.selfmark button[data-k]').forEach(b => b.onclick = () => { record(id, +b.dataset.k, q.m); body.querySelectorAll('.selfmark button[data-k]').forEach(x => x.classList.toggle('on', x === b)); });
    const a = $('#again', body); if (a) a.onclick = () => { delete S.q[id]; save(); questionPage(id, opts); };
  }
}

function browse() {
  const f = JSON.parse(sessionStorage.getItem('egr.f') || '{}');
  app.innerHTML = `<h1>Question bank</h1><div class="filters"><input id="fs" placeholder="Search question text… (e.g. worm, pearlite, NAND)" value="${esc(f.s || '')}">
  <select id="ft"><option value="">All topics</option>${TOPICS.map(t => `<option value="${t.id}">${t.title}</option>`).join('')}</select>
  <select id="fy"><option value="">All years</option>${YEARS.map(y => `<option>${y}</option>`).join('')}</select>
  <select id="fk"><option value="">MC + written</option><option value="mc">Multiple choice</option><option value="w">Written</option></select>
  <select id="fd"><option value="">Any status</option><option value="new">Not attempted</option><option value="wrong">Lost marks</option><option value="right">Full marks</option></select></div><div id="res"></div>`;
  ['ft', 'fy', 'fk', 'fd'].forEach(k => { if (f[k]) $('#' + k).value = f[k]; });
  const run = () => {
    const v = { s: $('#fs').value.toLowerCase(), ft: $('#ft').value, fy: $('#fy').value, fk: $('#fk').value, fd: $('#fd').value }; sessionStorage.setItem('egr.f', JSON.stringify(v));
    const list = EXAMS.filter(q => (!v.s || q.txt.toLowerCase().includes(v.s)) && (!v.ft || q.tags.includes(v.ft)) && (!v.fy || q.y === +v.fy) && (!v.fk || q.t === v.fk) && (!v.fd || (v.fd === 'new' ? !status(q.id) : v.fd === 'right' ? status(q.id) && status(q.id).score === status(q.id).max : status(q.id) && status(q.id).score < status(q.id).max)));
    $('#res').innerHTML = `<p class="mute">${list.length} question${list.length === 1 ? '' : 's'} · ${list.reduce((s, q) => s + q.m, 0)} marks</p><div class="list">${list.map(qRow).join('')}</div>`;
  };
  app.querySelectorAll('.filters input, .filters select').forEach(el => el.oninput = run); run();
}

// ---------- exam mode ----------
let EX = null;
function examPage(arg) {
  if (EX && EX.phase !== 'done' && arg !== 'new') return examRun();
  if (!arg || arg === 'new') {
    EX = null;
    app.innerHTML = `<h1>Exam mode</h1><p>Sit a full paper under exam conditions: <b>5 minutes perusal</b> (read only) then <b>120 minutes</b> working time. Write your written answers on paper (or in the answer box). When you finish, MC is marked automatically and you self-mark each written question against the official marking guide.</p>
    <div class="grid">${YEARS.slice().reverse().map(y => `<a class="card paper" href="#/exam/${y}"><h3>${y} paper</h3><p class="mute">${EXAMS.filter(q => q.y === y).reduce((s, q) => s + q.m, 0)} marks</p></a>`).join('')}<a class="card paper" href="#/exam/mixed"><h3>🎲 Mixed paper</h3><p class="mute">10 MC + written questions drawn from every year (~80 marks)</p></a></div>
    ${S.exams.length ? `<h2>History</h2><div class="list">${S.exams.slice().reverse().map(e => `<div class="row"><span>${e.name}</span><span class="mute">${new Date(e.date).toLocaleDateString('en-AU')} · ${e.score}/${e.max} (${Math.round(e.score / e.max * 100)}%)</span></div>`).join('')}</div>` : ''}`;
    return;
  }
  let qs;
  if (arg === 'mixed') {
    const mc = EXAMS.filter(q => q.t === 'mc').sort(() => Math.random() - .5).slice(0, 10).sort((a, b) => a.y - b.y);
    const w = []; let m = 0; const pool = EXAMS.filter(q => q.t === 'w').sort(() => Math.random() - .5); const usedTags = {};
    for (const q of pool) { if (m >= 70) break; const t = q.tags[0]; if ((usedTags[t] || 0) >= 2) continue; usedTags[t] = (usedTags[t] || 0) + 1; w.push(q); m += q.m; }
    qs = [...mc, ...w.sort((a, b) => a.m - b.m)];
  } else qs = EXAMS.filter(q => q.y === +arg);
  EX = { name: arg === 'mixed' ? 'Mixed paper' : `${arg} paper`, qs: qs.map(q => q.id), i: 0, phase: 'perusal', start: Date.now(), perusal: 5 * 60, work: 120 * 60, picks: {}, marks: {}, notes: {} };
  location.hash = '#/exam/run';
}
function examRun() {
  if (!EX) { location.hash = '#/exam'; return; }
  if (EX.phase === 'mark') return examMark();
  const draw = async () => {
    const id = EX.qs[EX.i], q = Q[id];
    app.innerHTML = `<div class="exbar"><b>${EX.name}</b><span id="clock"></span><span class="phase ${EX.phase}">${EX.phase === 'perusal' ? 'PERUSAL — read only' : 'WORKING TIME'}</span><button class="btn" id="finish">${EX.phase === 'perusal' ? 'Skip perusal' : 'Finish & mark'}</button></div>
    <div class="exnav">${EX.qs.map((x, k) => `<button class="${k === EX.i ? 'on' : ''} ${EX.picks[x] || EX.notes[x] ? 'done' : ''}" data-k="${k}">${Q[x].t === 'mc' ? '' : 'Q'}${Q[x].n}</button>`).join('')}</div>
    <div class="qhead"><h2>${qLabel(q)}</h2><span class="mk">${q.m} mark${q.m > 1 ? 's' : ''}</span></div><div id="exq"><div class="loading">Loading…</div></div>
    <div class="qnav">${EX.i > 0 ? '<button class="btn" id="pv">← Previous</button>' : '<span></span>'}${EX.i < EX.qs.length - 1 ? '<button class="btn pri" id="nx">Next →</button>' : '<span></span>'}</div>`;
    app.querySelectorAll('.exnav button').forEach(b => b.onclick = () => { EX.i = +b.dataset.k; draw(); });
    const pv = $('#pv'), nx = $('#nx'); if (pv) pv.onclick = () => { EX.i--; draw(); }; if (nx) nx.onclick = () => { EX.i++; draw(); };
    $('#finish').onclick = () => { if (EX.phase === 'perusal') { EX.phase = 'work'; EX.start = Date.now(); draw(); } else if (confirm('Finish the exam and start marking?')) { EX.phase = 'mark'; examMark(); } };
    const I = (await imgs(q.y))[id]; const el = $('#exq'); if (!el) return;
    const ro = EX.phase === 'perusal';
    if (q.t === 'mc') { el.innerHTML = `<img class="qimg" src="${I.q}"><div class="mcopts">${'ABCD'.split('').map(l => `<button data-l="${l}" class="${EX.picks[id] === l ? 'sel' : ''}" ${ro ? 'disabled' : ''}>${l}</button>`).join('')}</div>`; el.querySelectorAll('.mcopts button').forEach(b => b.onclick = () => { EX.picks[id] = b.dataset.l; el.querySelectorAll('.mcopts button').forEach(x => x.classList.toggle('sel', x === b)); app.querySelector(`.exnav button[data-k="${EX.i}"]`).classList.add('done'); }); }
    else { el.innerHTML = `<img class="qimg" src="${I.q}"><textarea class="exans" placeholder="${ro ? 'Perusal: you can read but not write yet' : 'Answer here or on paper…'}" ${ro ? 'disabled' : ''}>${esc(EX.notes[id] || '')}</textarea>`; $('textarea', el).oninput = e => { EX.notes[id] = e.target.value; }; }
  };
  const tick = () => { const c = $('#clock'); if (!c) return; const lim = EX.phase === 'perusal' ? EX.perusal : EX.work, left = Math.max(0, lim - (Date.now() - EX.start) / 1000); c.textContent = `${Math.floor(left / 60)}:${String(Math.floor(left % 60)).padStart(2, '0')}`; c.className = left < 300 && EX.phase === 'work' ? 'low' : ''; if (left <= 0) { if (EX.phase === 'perusal') { EX.phase = 'work'; EX.start = Date.now(); draw(); } else { EX.phase = 'mark'; examMark(); } } };
  const iv = setInterval(tick, 500); cleanup = () => clearInterval(iv);
  draw().then(tick);
}
async function examMark() {
  if (cleanup) { cleanup(); cleanup = null; }
  const ids = EX.qs; const years = [...new Set(ids.map(i => Q[i].y))]; const all = {}; for (const y of years) Object.assign(all, await imgs(y));
  const mcs = ids.filter(i => Q[i].t === 'mc'), ws = ids.filter(i => Q[i].t === 'w');
  const mcScore = mcs.filter(i => Q[i].ans.includes(EX.picks[i])).length;
  app.innerHTML = `<h1>Mark your ${EX.name}</h1><div class="summary"><div>Multiple choice: <b>${mcScore}/${mcs.length}</b></div><div>Written: <b id="wsum">0</b>/${ws.reduce((s, i) => s + Q[i].m, 0)}</div><div>Total: <b id="tsum"></b></div></div>
  <h2>Multiple choice</h2><div class="mcres">${mcs.map(i => { const q = Q[i], ok = q.ans.includes(EX.picks[i]); return `<details class="mcr ${ok ? 'good' : 'bad'}"><summary>${qLabel(q)} — you: ${EX.picks[i] || '—'} · answer: ${q.ans.join('/')}</summary><img class="qimg" src="${all[i].q}"><div class="work">${q.why}</div></details>`; }).join('')}</div>
  <h2>Written — self-mark against the guide</h2>${ws.map(i => { const q = Q[i]; return `<div class="markq"><h3>${qLabel(q)} <span class="mk">${q.m} marks</span></h3><img class="qimg" src="${all[i].q}">${EX.notes[i] ? `<div class="yours"><b>Your answer:</b><pre>${esc(EX.notes[i])}</pre></div>` : ''}<details open><summary>Marking guide</summary><img class="qimg g" src="${all[i].g}"></details><div class="selfmark" data-id="${i}"><span>Marks:</span>${[...Array(q.m + 1).keys()].map(k => `<button data-k="${k}" class="${EX.marks[i] === k ? 'on' : ''}">${k}</button>`).join('')}</div></div>`; }).join('')}
  <div class="btns"><button class="btn pri" id="saveEx">Save result</button><a class="btn" href="#/exam/new">Discard</a></div>`;
  const total = () => { const w = ws.reduce((s, i) => s + (EX.marks[i] || 0), 0); $('#wsum').textContent = w; const max = ids.reduce((s, i) => s + Q[i].m, 0); $('#tsum').textContent = `${mcScore + w}/${max} (${Math.round((mcScore + w) / max * 100)}%)`; };
  app.querySelectorAll('.selfmark').forEach(d => d.querySelectorAll('button').forEach(b => b.onclick = () => { EX.marks[d.dataset.id] = +b.dataset.k; d.querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b)); total(); }));
  total();
  $('#saveEx').onclick = () => {
    mcs.forEach(i => { if (EX.picks[i]) record(i, Q[i].ans.includes(EX.picks[i]) ? 1 : 0, 1, { pick: EX.picks[i] }); });
    ws.forEach(i => { if (EX.marks[i] != null) record(i, EX.marks[i], Q[i].m); if (EX.notes[i]) S.notes[i] = EX.notes[i]; });
    const w = ws.reduce((s, i) => s + (EX.marks[i] || 0), 0), max = ids.reduce((s, i) => s + Q[i].m, 0);
    S.exams.push({ name: EX.name, date: Date.now(), score: mcScore + w, max }); save(); EX = null; location.hash = '#/progress';
  };
}

function formulas() {
  app.innerHTML = `<h1>Formula sheet</h1><p class="mute">Unit 4 formulas from the 2025 syllabus (v1.4, March 2026). The QCAA formula book is provided in the exam, but knowing <i>when</i> to use each one is what earns the marks.</p>
  <div class="grid f">${FORMULAS.map(g => `<div class="card"><h3>${g.g}</h3><table class="ftbl">${g.items.map(([n, e]) => `<tr><td>${n}</td><td class="eqc">${e}</td></tr>`).join('')}</table></div>`).join('')}</div>
  <div class="card"><h3>Units and conversions</h3><table class="ftbl"><tr><td>g</td><td>9.8 m/s²</td></tr><tr><td>1 tonne</td><td>1000 kg</td></tr><tr><td>1 L water</td><td>1 kg</td></tr><tr><td>mm → m</td><td>÷ 1000</td></tr><tr><td>km/h → m/s</td><td>÷ 3.6</td></tr><tr><td>rpm → rev/s</td><td>÷ 60</td></tr><tr><td>kW → W</td><td>× 1000</td></tr><tr><td>1 kWh</td><td>3.6 × 10⁶ J</td></tr></table></div>`;
}

function mine() {
  const all = [...CUSTOM.map(q => ({ ...q, src: 'file' })), ...S.mine.map(q => ({ ...q, src: 'local' }))];
  app.innerHTML = `<h1>My questions</h1><p class="mute">Add your own questions (from class, the learning guide, practice tests). Ones added here are saved in this browser; to make them permanent for everyone, put them in <code>custom.js</code>.</p>
  <details class="card"><summary><b>+ Add a question</b></summary><div class="form"><label>Topic<select id="mt">${TOPICS.map(t => `<option value="${t.id}">${t.title}</option>`).join('')}</select></label><label>Question<textarea id="mq" rows="3"></textarea></label><label>Answer / worked solution<textarea id="ma" rows="3"></textarea></label><label>Marks<input id="mm" type="number" value="1" min="1"></label><button class="btn pri" id="madd">Save</button></div></details>
  <div class="list">${all.map((q, i) => `<details class="card mq"><summary><span class="chip">${TOPIC[q.topic]?.icon || ''} ${TOPIC[q.topic]?.title || q.topic}</span> ${esc(q.q).slice(0, 140)} <span class="mk">${q.marks || 1} mk</span></summary><p>${esc(q.q)}</p><details><summary>Show answer</summary><div class="work">${esc(q.a).replace(/\n/g, '<br>')}</div></details>${q.src === 'local' ? `<button class="btn ghost" data-del="${i - CUSTOM.length}">Delete</button>` : ''}</details>`).join('') || '<p class="mute">No questions yet.</p>'}</div>`;
  $('#madd').onclick = () => { const q = $('#mq').value.trim(); if (!q) return; S.mine.push({ topic: $('#mt').value, q, a: $('#ma').value, marks: +$('#mm').value || 1 }); save(); mine(); };
  app.querySelectorAll('[data-del]').forEach(b => b.onclick = () => { if (confirm('Delete this question?')) { S.mine.splice(+b.dataset.del, 1); save(); mine(); } });
}

function progress() {
  const rows = TOPICS.map(t => { const list = EXAMS.filter(q => q.tags.includes(t.id)); return { t, list, p: pct(list), d: done(list) }; });
  app.innerHTML = `<h1>Progress</h1><div class="grid">${rows.map(r => `<a class="card prog" href="#/topic/${r.t.id}">${ring(r.p, 64)}<div><h3>${r.t.icon} ${r.t.title}</h3><p class="mute">${r.d}/${r.list.length} past questions${S.gen[r.t.id] ? ` · practice ${S.gen[r.t.id].r}/${S.gen[r.t.id].n}` : ''}</p></div></a>`).join('')}</div>
  <h2>By year</h2><div class="list">${YEARS.map(y => { const l = EXAMS.filter(q => q.y === y); return `<a class="row" href="#/papers/${y}"><span>${y}</span><span class="mute">${done(l)}/${l.length} attempted · ${pct(l) ?? '–'}%</span></a>`; }).join('')}</div>
  ${S.exams.length ? `<h2>Exams</h2><div class="list">${S.exams.slice().reverse().map(e => `<div class="row"><span>${e.name}</span><span class="mute">${new Date(e.date).toLocaleString('en-AU')} · ${e.score}/${e.max} (${Math.round(e.score / e.max * 100)}%)</span></div>`).join('')}</div>` : ''}
  <h2>Reset</h2><div class="btns"><select id="ry"><option value="">Choose a paper…</option>${YEARS.map(y => `<option>${y}</option>`).join('')}</select><button class="btn" id="rset">Reset paper</button><button class="btn" id="rgen">Reset practice scores</button><button class="btn danger" id="rall">Reset everything</button></div>`;
  $('#rset').onclick = () => { const y = +$('#ry').value; if (y && confirm(`Reset the ${y} paper?`)) { EXAMS.filter(q => q.y === y).forEach(q => delete S.q[q.id]); save(); progress(); } };
  $('#rgen').onclick = () => { if (confirm('Reset practice scores?')) { S.gen = {}; save(); progress(); } };
  $('#rall').onclick = () => { if (confirm('Reset ALL progress, notes and exam history? Your own questions are kept.')) { const mine = S.mine; S = { q: {}, exams: [], gen: {}, mine, notes: {} }; save(); progress(); } };
}

route();
