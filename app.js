/*
 * RL Midterm Practice Lab — application logic
 * Adapted from slai-NNtraining-midterm (same single-page, no-build, no-CDN design).
 * Added: multi-select & numeric questions, Chinese question translation in the
 * answer panel, a dedicated Mistake Book, Markdown export, question palette,
 * flags / mastered marks and keyboard shortcuts.
 */
(() => {
'use strict';
const Q = window.QUESTIONS || [];
const META = window.BANK_META || {chapters:[], notes:{zh:'', en:''}};
const $ = id => document.getElementById(id);
const KEY = 'rl-midterm-progress-v2';
const FORMAT = 'rl-midterm-progress-v2';

const T = {
  zh: {
    eyebrow:'RL · REINFORCEMENT LEARNING · 期中复习',
    headline:'每一道题，都学明白。',
    subtitle:'从 MDP 与贝尔曼方程，到 DQN、Rainbow 与策略梯度。英文题目即时判分，答案里展开中文版题目与详细中文解析。',
    totalLabel:'题库总量', doneLabel:'已练习', accuracyLabel:'计分题正确率', wrongLabel:'待复习错题',
    chapterTitle:'学习章节',
    localNote:'进度自动保存在当前浏览器。手机与电脑之间可导出、导入进度；错题本还能导出 Markdown 清单。',
    export:'导出进度 ↗', import:'导入进度', exportMistakes:'导出错题清单 ↗', reset:'清空全部进度',
    typeLabel:'题型', allTypes:'全部题型', typeSingle:'单选题', typeMulti:'多选题', typeNumeric:'计算题',
    allChapters:'全部章节', allSub:'THE COMPLETE COLLECTION',
    ordered:'顺序练习', random:'随机练习', mistakes:'错题复习', book:'错题本',
    restart:'重新开始 ↻', showPalette:'答题卡', hidePalette:'收起答题卡',
    previous:'← 上一题', next:'下一题 →', finish:'查看结果 →',
    notesTitle:'题库来源与使用说明', footerNote:'英文题目 · 中文精讲 · 无需登录 · 进度保存在本机',
    choose:'选择答案后，即可查看中文版题目与详细中文解析',
    numericHint:'输入数值后按回车或点击提交；在给定容差范围内即判正确',
    numericPlaceholder:'输入数字，例如 4.32', submit:'提交答案', numericInvalid:'请输入一个有效数字',
    correct:'回答正确', incorrect:'再理解一下',
    answer:'参考答案', yourAnswer:'你的答案', source:'来源',
    zhTitle:'中文版题目', explainTitle:'详细中文解析', keyTitle:'考点速记',
    single:'单选题', multi:'多选题', numeric:'计算题',
    flag:'☆ 收藏', unflag:'★ 取消收藏', markMastered:'标记已掌握', unmarkMastered:'取消已掌握',
    emptyTitle:'暂时没有待复习的错题', emptyText:'完成练习后，答错的题会自动汇总进错题本。',
    noTitle:'这个范围还没有题目', noText:'请选择其他章节或题型。',
    summaryTitle:'本轮练习已完成', summaryText:'继续练习，把不确定的知识变成确定。',
    answered:'已作答', score:'答对', review:'复习本轮错题', again:'再练一轮',
    saved:'进度已导出', loaded:'进度已合并导入', invalid:'无法导入：请选择本网页导出的进度文件',
    storage:'浏览器无法保存进度，请及时导出。',
    resetConfirm:'确定清空全部答题记录、错题与收藏吗？此操作不可撤销。', resetDone:'进度已清空',
    noWrong:'当前没有错题可导出', mistakesSaved:'错题清单已导出',
    chapter:'第', chapterEnd:'章', question:'题', lecture:'LECTURE', qno:'Q',
    bookTitle:'错题本', bookSubtitle:'按章节汇总「最近一次答错」的题；答对或标记已掌握后自动移出。',
    wrongCount:'待复习', masteredCount:'已掌握',
    bookEmptyTitle:'错题本是空的', bookEmptyText:'答错的题会自动出现在这里，可以在本页集中复习或导出。',
    bookReviewAll:'开始复习全部错题', bookExport:'导出 Markdown', bookClearMastered:'清除已掌握标记',
    reviewOne:'单独复习', markDone:'已掌握 ✓',
    flaggedToast:'已加入收藏', unflaggedToast:'已取消收藏',
    masteredToast:'已标记掌握', unmasteredToast:'已取消掌握',
    paletteTip:'点击题号跳转 · 绿色答对 · 红色答错 · 圆点表示已收藏'
  },
  en: {
    eyebrow:'RL · REINFORCEMENT LEARNING · MIDTERM',
    headline:'Practice with understanding.',
    subtitle:'From MDPs and Bellman equations to DQN, Rainbow and policy gradients. English questions with instant grading; each answer reveals a Chinese translation and a detailed Chinese explanation.',
    totalLabel:'Questions', doneLabel:'Practiced', accuracyLabel:'Scored accuracy', wrongLabel:'To revisit',
    chapterTitle:'CHAPTERS',
    localNote:'Progress is saved in this browser. Export and import to move it between devices; the Mistake Book can also be exported as Markdown.',
    export:'Export progress ↗', import:'Import progress', exportMistakes:'Export mistakes ↗', reset:'Reset all progress',
    typeLabel:'Type', allTypes:'All types', typeSingle:'Single choice', typeMulti:'Multiple choice', typeNumeric:'Calculation',
    allChapters:'All chapters', allSub:'THE COMPLETE COLLECTION',
    ordered:'In order', random:'Random', mistakes:'Mistakes', book:'Mistake Book',
    restart:'Start again ↻', showPalette:'Question map', hidePalette:'Hide question map',
    previous:'← Previous', next:'Next question →', finish:'See results →',
    notesTitle:'Sources and notes', footerNote:'English questions · Chinese explanations · no login · local progress',
    choose:'Choose an answer to reveal the Chinese version of this question and its detailed Chinese explanation',
    numericHint:'Enter a number and press Enter or click Submit; answers within the given tolerance are accepted',
    numericPlaceholder:'Enter a number, e.g. 4.32', submit:'Submit answer', numericInvalid:'Please enter a valid number',
    correct:'Correct', incorrect:'Not quite — read the explanation',
    answer:'Correct answer', yourAnswer:'Your answer', source:'Source',
    zhTitle:'中文版题目 / Chinese version', explainTitle:'详细中文解析 / Detailed explanation', keyTitle:'考点速记 / Key point',
    single:'Single choice', multi:'Multiple choice', numeric:'Calculation',
    flag:'☆ Flag', unflag:'★ Unflag', markMastered:'Mark mastered', unmarkMastered:'Unmark mastered',
    emptyTitle:'No mistakes to revisit', emptyText:'Wrong answers are collected here automatically once you start practising.',
    noTitle:'No questions in this range', noText:'Choose another chapter or question type.',
    summaryTitle:'Session complete', summaryText:'Keep practising and turn uncertainty into certainty.',
    answered:'Answered', score:'Correct', review:'Review this round\'s mistakes', again:'Another round',
    saved:'Progress exported', loaded:'Progress merged', invalid:'Cannot import: please choose a progress file exported by this site',
    storage:'Progress could not be saved locally. Please export it.',
    resetConfirm:'Clear ALL answers, mistakes and flags? This cannot be undone.', resetDone:'Progress cleared',
    noWrong:'No mistakes to export', mistakesSaved:'Mistake list exported',
    chapter:'Ch.', chapterEnd:'', question:'questions', lecture:'LECTURE', qno:'Q',
    bookTitle:'Mistake Book', bookSubtitle:'All questions whose most recent answer was wrong, grouped by chapter. Correct or mastered items leave automatically.',
    wrongCount:'To revisit', masteredCount:'Mastered',
    bookEmptyTitle:'Your Mistake Book is empty', bookEmptyText:'Wrong answers show up here. Review them in one place or export them.',
    bookReviewAll:'Review all mistakes', bookExport:'Export Markdown', bookClearMastered:'Clear mastered marks',
    reviewOne:'Review this', markDone:'Mastered ✓',
    flaggedToast:'Added to flags', unflaggedToast:'Removed from flags',
    masteredToast:'Marked as mastered', unmasteredToast:'Mastered mark removed',
    paletteTip:'Click to jump · green = correct · red = wrong · dot = flagged'
  }
};

/* ------------------------------- state -------------------------------- */
let saved = {};
try { saved = JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch (_) { saved = {}; }
let lang = saved.lang === 'en' ? 'en' : 'zh';
let history = {};    // id -> {choice, time}
let mastered = {};   // id -> time
let flags = {};      // id -> time
let chapter = 'all', mode = 'ordered', type = 'all';
let queue = [], index = 0, answers = {}, finished = false, paletteOpen = false;
let draft = null;    // pending multi-select array or numeric string

const optCount = q => q.en.options ? q.en.options.length : 0;
const letter = i => String.fromCharCode(65 + i);
const pad = n => String(n).padStart(2, '0');
const fmtNum = v => String(Number(Number(v).toFixed(6)));

function validAnswer(q, a) {
  if (q.type === 'numeric') return typeof a === 'number' && isFinite(a);
  if (!q.en.options) return false;
  if (q.type === 'multi') {
    return Array.isArray(a) && a.length > 0 &&
      a.every(i => Number.isInteger(i) && i >= 0 && i < optCount(q)) &&
      new Set(a).size === a.length;
  }
  return Number.isInteger(a) && a >= 0 && a < optCount(q);
}
function isCorrect(q, a) {
  if (!validAnswer(q, a)) return false;
  if (q.type === 'numeric') return Math.abs(a - q.answer.value) <= q.answer.tol + 1e-9;
  const got = (q.type === 'multi' ? a.slice().sort((x, y) => x - y) : [a]);
  return got.length === q.accepted.length && got.every((v, i) => v === q.accepted[i]);
}
const byId = id => Q.find(q => q.id === id);
for (const q of Q) {
  const h = saved.history && saved.history[q.id];
  if (h && validAnswer(q, h.choice) && Number.isFinite(h.time)) history[q.id] = h;
}
for (const map of [['mastered', 'mastered'], ['flags', 'flags']]) {
  const src = saved[map[0]];
  if (src && typeof src === 'object' && !Array.isArray(src)) {
    for (const id in src) if (byId(id) && Number.isFinite(src[id])) (map[1] === 'mastered' ? mastered : flags)[id] = src[id];
  }
}

function wrongList() {
  return Q.filter(q => q.scored && history[q.id] && !isCorrect(q, history[q.id].choice) && !mastered[q.id]);
}
function save() {
  try {
    localStorage.setItem(KEY, JSON.stringify({
      lang, history, mastered, flags,
      session: {chapter, mode, type, queue: queue.map(q => q.id), index, answers, finished, paletteOpen}
    }));
  } catch (_) { toast(T[lang].storage); }
}
function toast(s) {
  const e = $('toast'); e.textContent = s; e.style.display = 'block';
  clearTimeout(toast.timer); toast.timer = setTimeout(() => { e.style.display = 'none'; }, 3600);
}
function download(filename, content, mime) {
  const blob = new Blob([content], {type: mime || 'application/json'});
  const url = URL.createObjectURL(blob), a = document.createElement('a');
  a.href = url; a.download = filename; document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
/* ---- Math: locally bundled KaTeX (no CDN) + a legacy pseudo-LaTeX fixer ---- */
const TEX_TO_TEXT = [
  [/\\sum/g,'Σ'],[/\\prod/g,'∏'],[/\\cdots/g,'⋯'],[/\\cdot/g,'·'],
  [/\\le/g,'≤'],[/\\ge/g,'≥'],[/\\ne/g,'≠'],[/\\approx/g,'≈'],
  [/\\in/g,'∈'],[/\\subset/g,'⊂'],[/\\to/g,'→'],[/\\leftarrow/g,'←'],
  [/\\infty/g,'∞'],[/\\times/g,'×'],[/\\div/g,'÷'],[/\\pm/g,'±'],
  [/\\propto/g,'∝'],[/\\odot/g,'⊙'],[/\\partial/g,'∂'],[/\\nabla/g,'∇'],
  [/\\langle/g,'⟨'],[/\\rangle/g,'⟩'],[/\\lfloor/g,'⌊'],[/\\rfloor/g,'⌋'],
  [/\\operatorname\{argmax\}/g,'argmax'],[/\\(max|min|log|exp|lim)/g,'$1'],
  [/\\\|/g,'‖'],[/\\ /g,' '],[/\\\{/g,'{'],[/\\\}/g,'}'],
  [/\\[a-zA-Z]+/g,''],[/[{}]/g,''],[/\\/g,'']
];
function texToText(t) {
  let s = String(t);
  for (const pair of TEX_TO_TEXT) s = s.replace(pair[0], pair[1]);
  return s;
}
function renderTex(tex, display) {
  if (!window.katex) return '<code>' + texToText(tex) + '</code>';
  try {
    return window.katex.renderToString(tex, {
      displayMode: !!display, throwOnError: false, strict: 'ignore'
    });
  } catch (_) { return '<code>' + texToText(tex) + '</code>'; }
}
/* Prose still contains legacy pseudo-LaTeX such as R_{t+1}, γ^k, S_t.
   Render those as real sub/superscripts instead of showing raw braces. */
function prettyMath(s) {
  return String(s).split(/(<[^>]*>)/g).map(seg => {
    if (seg.charAt(0) === '<') return seg;
    return seg
      .replace(/_\{([^{}]*)\}/g, (m, p) => '<sub class="mi">' + p + '</sub>')
      .replace(/\^\{([^{}]*)\}/g, (m, p) => '<sup class="mi">' + p + '</sup>')
      .replace(/_([A-Za-z0-9πγδθαβελμσηωΣ∞′'+−])/g, (m, p) => '<sub class="mi">' + p + '</sub>')
      .replace(/\^([A-Za-z0-9πγδθαβελμσηωΣ∞+−])/g, (m, p) => '<sup class="mi">' + p + '</sup>');
  }).join('');
}
function mathHTML(src) {
  let out = '';
  String(src).split('$$').forEach((chunk, i) => {
    if (i % 2 === 1) { out += renderTex(chunk, true); return; }
    chunk.split('$').forEach((part, j) => {
      out += (j % 2 === 1) ? renderTex(part, false) : prettyMath(part);
    });
  });
  return out;
}
function plain(html, keepMath) {
  let h = String(html).replace(/<br\s*\/?>/gi, '\n').replace(/<\/(p|div|li|h[1-6])>/gi, '\n');
  if (!keepMath) {
    let t = '';
    h.split('$$').forEach((c, i) => {
      if (i % 2 === 1) { t += texToText(c); return; }
      c.split('$').forEach((p, j) => { t += (j % 2 === 1) ? texToText(p) : p; });
    });
    h = t;
  }
  const d = document.createElement('div');
  d.innerHTML = h;
  return (d.textContent || '').replace(/\n{3,}/g, '\n\n').trim();
}
function el(tag, cls, text) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text !== undefined) e.textContent = text;
  return e;
}
function rich(tag, cls, html) { const e = el(tag, cls); e.innerHTML = mathHTML(html); return e; }

/* ----------------------------- queue ----------------------------------- */
function filtered() {
  return Q.filter(q => (chapter === 'all' || q.chapter === Number(chapter)) && (type === 'all' || q.type === type));
}
function start() {
  queue = filtered().filter(q => mode !== 'mistakes' ||
    (q.scored && history[q.id] && !isCorrect(q, history[q.id].choice) && !mastered[q.id]));
  if (mode === 'random') {
    for (let i = queue.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [queue[i], queue[j]] = [queue[j], queue[i]];
    }
  }
  index = 0; answers = {}; draft = null; finished = false;
  save(); render();
}
function goNext() {
  if (index < queue.length - 1) { index++; draft = null; save(); render(); }
  else { finished = true; draft = null; save(); render(); }
  $('card').scrollIntoView({block: 'start', behavior: 'smooth'});
}
function goPrev() { if (index > 0) { index--; draft = null; save(); render(); } }
function commit(q, a) {
  if (answers[q.id] !== undefined || !validAnswer(q, a)) return;
  answers[q.id] = a;
  history[q.id] = {choice: a, time: Date.now()};
  delete mastered[q.id];           // a new attempt re-opens the item if it is wrong again
  draft = null; save(); render();
}

/* ----------------------------- chrome ---------------------------------- */
function chapterName(n) {
  const c = META.chapters.find(x => x.n === n);
  return c ? c[lang === 'zh' ? 'zh' : 'en'] : T[lang].allChapters;
}
function statistics() {
  const attempted = Q.filter(q => history[q.id]);
  const scored = attempted.filter(q => q.scored);
  const right = scored.filter(q => isCorrect(q, history[q.id].choice));
  $('total').textContent = Q.length;
  $('done').textContent = attempted.length;
  $('accuracy').textContent = scored.length ? Math.round(right.length / scored.length * 100) + '%' : '—';
  $('wrong').textContent = wrongList().length;
}
function renderPalette() {
  const p = $('palette');
  p.hidden = !paletteOpen || mode === 'book' || !queue.length || finished;
  if (p.hidden) return;
  p.replaceChildren();
  queue.forEach((q, i) => {
    const a = answers[q.id];
    const b = el('button', '', String(i + 1));
    if (a !== undefined) b.classList.add(isCorrect(q, a) ? 'done-right' : 'done-wrong');
    if (flags[q.id]) b.classList.add('flagged');
    if (i === index) b.classList.add('current');
    b.title = T[lang].paletteTip;
    b.onclick = () => { index = i; draft = null; save(); render(); };
    p.append(b);
  });
}
function chrome() {
  const t = T[lang];
  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
  for (const id of ['eyebrow','headline','subtitle','totalLabel','doneLabel','accuracyLabel','wrongLabel',
    'chapterTitle','localNote','export','exportMistakes','reset','typeLabel','restart','previous','footerNote'])
    $(id).textContent = t[id];
  $('importLabel').textContent = t.import;
  $('language').textContent = lang === 'zh' ? '中文 / EN' : 'EN / 中文';
  $('typeSelect').value = type;
  const opts = $('typeSelect').options;
  opts[0].textContent = t.allTypes; opts[1].textContent = t.typeSingle;
  opts[2].textContent = t.typeMulti; opts[3].textContent = t.typeNumeric;

  const nav = $('chapters'); nav.replaceChildren();
  const mk = (value, num, title, sub, total, done) => {
    const b = el('button', 'chapter' + (chapter === value ? ' active' : ''));
    b.setAttribute('aria-pressed', String(chapter === value));
    b.append(el('span', 'num', num));
    const wrap = el('span', 'ctext');
    wrap.append(el('strong', '', title), el('small', '', sub));
    b.append(wrap);
    const count = el('span', 'count');
    count.innerHTML = '<em>' + done + '</em>/' + total;
    b.append(count);
    b.onclick = () => { chapter = value; start(); };
    nav.append(b);
  };
  mk('all', '◎', t.allChapters, t.allSub, Q.length, Q.filter(q => history[q.id]).length);
  META.chapters.forEach(c => {
    const total = Q.filter(q => q.chapter === c.n).length;
    const done = Q.filter(q => q.chapter === c.n && history[q.id]).length;
    mk(String(c.n), pad(c.n), c[lang === 'zh' ? 'zh' : 'en'], t.lecture + ' ' + pad(c.n), total, done);
  });

  const seg = $('modes'); seg.replaceChildren();
  for (const m of ['ordered', 'random', 'mistakes', 'book']) {
    const b = el('button', m === mode ? 'active' : '', t[m]);
    b.setAttribute('aria-pressed', String(m === mode));
    b.onclick = () => { mode = m; start(); };
    seg.append(b);
  }
  statistics();
  const isBook = mode === 'book';
  $('paletteToggle').textContent = paletteOpen ? t.hidePalette : t.showPalette;
  $('paletteToggle').style.display = isBook ? 'none' : '';
  $('previous').parentElement.style.display = isBook ? 'none' : '';
  const label = isBook ? t.bookTitle : chapterName(chapter === 'all' ? 0 : Number(chapter));
  $('sessionName').textContent = isBook
    ? label + ' · ' + wrongList().length + ' ' + t.wrongCount
    : label + ' · ' + queue.length + ' ' + t.question;
  $('position').textContent = queue.length ? `${Math.min(index + 1, queue.length)} / ${queue.length}` : '0 / 0';
  $('progress').style.width = (!isBook && queue.length ? Object.keys(answers).length / queue.length * 100 : 0) + '%';
  $('previous').disabled = index === 0 || !queue.length || finished || isBook;
  $('next').disabled = !queue.length || finished || isBook;
  $('next').textContent = index === queue.length - 1 ? t.finish : t.next;
  $('restart').disabled = isBook;
  renderPalette();
}

/* --------------------------- question card ----------------------------- */
function answerText(q, a) {
  if (q.type === 'numeric') return fmtNum(a);
  if (q.type === 'multi') return a.slice().sort((x, y) => x - y).map(letter).join(' / ');
  return letter(a);
}
function correctText(q) {
  return q.type === 'numeric' ? fmtNum(q.answer.value) : q.accepted.map(letter).join(' / ');
}
function resultBox(q, choice) {
  const t = T[lang], right = isCorrect(q, choice);
  const box = el('section', 'result' + (right ? '' : ' wrong'));
  box.setAttribute('role', 'status');
  box.setAttribute('aria-live', 'polite');
  box.append(el('h3', '', right ? '✓ ' + t.correct : '↗ ' + t.incorrect));
  box.append(rich('p', 'answer-line',
    t.answer + ': <b>' + correctText(q) + '</b> &nbsp;·&nbsp; ' + t.yourAnswer + ': ' + answerText(q, choice)));

  const tr = el('div', 'result-section');
  tr.append(el('h4', '', t.zhTitle));
  const body = el('div', 'translation');
  body.append(rich('p', 'zh-stem', q.zh.stem));
  if (q.zh.options) {
    const ol = el('ol', 'zh-options');
    q.zh.options.forEach((s, i) => {
      const li = rich('li', q.accepted.includes(i) ? 'right' : '', '<b>' + letter(i) + '.</b> ' + s);
      ol.append(li);
    });
    body.append(ol);
  }
  tr.append(body); box.append(tr);

  const ex = el('div', 'result-section');
  ex.append(el('h4', '', t.explainTitle));
  ex.append(rich('div', 'explanation', q.zh.explanation));
  box.append(ex);
  if (q.key) {
    const kp = el('div', 'result-section');
    kp.append(el('h4', '', t.keyTitle));
    kp.append(rich('div', 'key-point', q.key));
    box.append(kp);
  }
  const acts = el('div', 'result-actions');
  const fb = el('button', 'mini-button', flags[q.id] ? t.unflag : t.flag);
  fb.onclick = () => {
    if (flags[q.id]) { delete flags[q.id]; toast(t.unflaggedToast); }
    else { flags[q.id] = Date.now(); toast(t.flaggedToast); }
    save(); render();
  };
  const mb = el('button', 'mini-button', mastered[q.id] ? t.unmarkMastered : t.markMastered);
  mb.onclick = () => {
    if (mastered[q.id]) { delete mastered[q.id]; toast(t.unmasteredToast); }
    else { mastered[q.id] = Date.now(); toast(t.masteredToast); }
    save(); render();
  };
  acts.append(fb, mb); box.append(acts);
  box.append(el('p', 'source',
    t.lecture + ' ' + pad(q.chapter) + ' / ' + t.qno + pad(q.number) +
    (q.type === 'numeric' ? ' · ±' + fmtNum(q.answer.tol) : '')));
  return box;
}
function renderQuestion(card, q) {
  const t = T[lang], choice = answers[q.id], answered = choice !== undefined;
  const meta = el('div', 'question-meta');
  const left = el('div', 'meta-left');
  left.append(el('span', '', t.lecture + ' ' + pad(q.chapter) + ' / ' + t.qno + pad(q.number)));
  left.append(el('span', 'badge type-' + q.type, t[q.type]));
  if (flags[q.id]) left.append(el('span', 'badge', '★'));
  meta.append(left);
  const fb = el('button', 'flag' + (flags[q.id] ? ' on' : ''), flags[q.id] ? '★' : '☆');
  fb.setAttribute('aria-label', flags[q.id] ? t.unflag : t.flag);
  fb.onclick = () => {
    if (flags[q.id]) { delete flags[q.id]; toast(t.unflaggedToast); }
    else { flags[q.id] = Date.now(); toast(t.flaggedToast); }
    save(); render();
  };
  meta.append(fb);
  card.append(meta, rich('h2', 'question', q.en.stem));

  if (q.type === 'numeric') {
    const row = el('div', 'numeric-row');
    const input = el('input', 'numeric-input');
    input.type = 'text'; input.inputMode = 'decimal';
    input.placeholder = t.numericPlaceholder;
    input.setAttribute('aria-label', t.numericPlaceholder);
    input.value = answered ? fmtNum(choice) : (typeof draft === 'string' ? draft : '');
    input.disabled = answered;
    const submit = () => {
      const v = Number(String(input.value).trim().replace(',', '.'));
      if (!isFinite(v) || String(input.value).trim() === '') { toast(t.numericInvalid); input.focus(); return; }
      commit(q, v);
    };
    input.addEventListener('keydown', e => { if (e.key === 'Enter' && !answered) { e.preventDefault(); submit(); } });
    row.append(input);
    if (!answered) { const b = el('button', 'primary', t.submit); b.onclick = submit; row.append(b); }
    card.append(row);
    if (!answered) card.append(el('p', 'hint', t.numericHint));
  } else {
    const opts = el('div', 'options');
    const selected = Array.isArray(draft) ? draft : [];
    q.en.options.forEach((s, i) => {
      let cls = 'option';
      if (answered && isCorrect(q, i)) cls += ' correct';
      else if (answered && (q.type === 'multi' ? choice.includes(i) : choice === i)) cls += ' incorrect';
      else if (!answered && q.type === 'multi' && selected.includes(i)) cls += ' selected';
      const b = el('button', cls);
      b.setAttribute('aria-disabled', String(answered));
      b.append(el('span', 'letter', letter(i)), rich('span', 'option-text', s));
      if (answered && (isCorrect(q, i) || (q.type === 'multi' ? choice.includes(i) : choice === i)))
        b.append(el('span', '', isCorrect(q, i) ? '✓' : '×'));
      b.onclick = () => {
        if (answered) return;
        if (q.type === 'single') commit(q, i);
        else {
          const cur = Array.isArray(draft) ? draft.slice() : [];
          const p = cur.indexOf(i);
          if (p >= 0) cur.splice(p, 1); else cur.push(i);
          draft = cur; render();
        }
      };
      opts.append(b);
    });
    card.append(opts);
    if (q.type === 'multi' && !answered) {
      const row = el('div', 'submit-row');
      const b = el('button', 'primary', t.submit);
      b.disabled = selected.length === 0;
      b.onclick = () => { if (selected.length) commit(q, selected.slice()); };
      row.append(b, el('span', 'hint', t.multi));
      card.append(row);
    }
  }
  if (answered) card.append(resultBox(q, choice));
  else card.append(el('p', 'source', t.choose));
}

/* ---------------------------- mistake book ----------------------------- */
function renderBook(card) {
  const t = T[lang];
  const list = wrongList().filter(q => chapter === 'all' || q.chapter === Number(chapter));
  const head = el('div', 'book-head');
  const h = el('div');
  h.append(el('h2', '', t.bookTitle), el('p', '', t.bookSubtitle));
  head.append(h);
  const acts = el('div', 'book-actions');
  const reviewAll = el('button', 'mini-button', t.bookReviewAll);
  reviewAll.disabled = list.length === 0;
  reviewAll.onclick = () => {
    mode = 'mistakes'; queue = list.slice(); index = 0; answers = {}; draft = null; finished = false;
    save(); render(); $('card').scrollIntoView({block: 'start', behavior: 'smooth'});
  };
  const exp = el('button', 'mini-button', t.bookExport);
  exp.onclick = exportMistakes;
  const clr = el('button', 'mini-button', t.bookClearMastered);
  clr.onclick = () => { mastered = {}; save(); render(); toast(t.resetDone); };
  acts.append(reviewAll, exp, clr);
  head.append(acts);
  card.append(head);

  const summary = el('div', 'book-summary');
  summary.append(rich('span', 'chip hot', t.wrongCount + ' <b>' + list.length + '</b>'),
    rich('span', 'chip', t.masteredCount + ' <b>' + Object.keys(mastered).length + '</b>'));
  META.chapters.forEach(c => {
    const n = list.filter(q => q.chapter === c.n).length;
    if (n) summary.append(rich('span', 'chip', t.lecture + ' ' + pad(c.n) + ' <b>' + n + '</b>'));
  });
  card.append(summary);

  if (!list.length) {
    const box = el('div', 'empty');
    box.append(el('h2', '', t.bookEmptyTitle), el('p', '', t.bookEmptyText));
    card.append(box); return;
  }
  META.chapters.forEach(c => {
    const group = list.filter(q => q.chapter === c.n);
    if (!group.length) return;
    const wrap = el('div', 'book-group');
    wrap.append(el('h3', '', t.lecture + ' ' + pad(c.n) + ' · ' + c[lang === 'zh' ? 'zh' : 'en'] + ' (' + group.length + ')'));
    group.forEach(q => {
      const item = el('div', 'book-item');
      const en = plain(q.en.stem);
      const zh = plain(q.zh.stem);
      item.append(el('div', 'en', en.length > 220 ? en.slice(0, 220) + '…' : en));
      item.append(el('div', 'zh', zh.length > 130 ? zh.slice(0, 130) + '…' : zh));
      const foot = el('div', 'foot');
      foot.append(rich('span', '',
        '<span class="wrong-answer">' + t.yourAnswer + ': ' + answerText(q, history[q.id].choice) + '</span> · ' +
        '<span class="correct-answer">' + t.answer + ': ' + correctText(q) + '</span>'));
      const row = el('div', 'row');
      const one = el('button', 'mini-button', t.reviewOne);
      one.onclick = () => {
        mode = 'mistakes'; queue = [q]; index = 0; answers = {}; draft = null; finished = false;
        save(); render(); $('card').scrollIntoView({block: 'start', behavior: 'smooth'});
      };
      const done = el('button', 'mini-button', t.markMastered);
      done.onclick = () => { mastered[q.id] = Date.now(); save(); render(); toast(t.masteredToast); };
      row.append(one, done); foot.append(row); item.append(foot);
      wrap.append(item);
    });
    card.append(wrap);
  });
}

/* ------------------------------ misc views ----------------------------- */
function summary(card) {
  const t = T[lang];
  const n = queue.filter(q => answers[q.id] !== undefined);
  const sc = n.filter(q => q.scored);
  const right = sc.filter(q => isCorrect(q, answers[q.id]));
  const box = el('div', 'empty');
  box.append(el('div', 'eyebrow', 'PRACTICE COMPLETE'));
  box.append(el('h2', '', t.summaryTitle), el('p', '', t.summaryText));
  box.append(el('p', '', `${t.answered}: ${n.length}/${queue.length} · ${t.score}: ${right.length}/${sc.length}`));
  const again = el('button', 'primary', t.again);
  again.onclick = start; box.append(again);
  const wrong = sc.filter(q => !isCorrect(q, answers[q.id]));
  if (wrong.length) {
    const b = el('button', 'text-button', t.review);
    b.onclick = () => {
      mode = 'mistakes'; queue = wrong; index = 0; answers = {}; draft = null; finished = false;
      save(); render();
    };
    box.append(b);
  }
  card.append(box);
}
function render() {
  chrome();
  const card = $('card'); card.replaceChildren();
  if (mode === 'book') { renderBook(card); return; }
  if (finished) { summary(card); return; }
  if (!queue.length) {
    const box = el('div', 'empty');
    box.append(el('h2', '', mode === 'mistakes' ? T[lang].emptyTitle : T[lang].noTitle),
      el('p', '', mode === 'mistakes' ? T[lang].emptyText : T[lang].noText));
    card.append(box); return;
  }
  renderQuestion(card, queue[index]);
}

/* ------------------------------ export --------------------------------- */
function exportProgress() {
  download('rl-midterm-progress.json', JSON.stringify({
    format: FORMAT, version: 1, exportedAt: new Date().toISOString(),
    lang, history, mastered, flags
  }, null, 2));
  toast(T[lang].saved);
}
function exportMistakes() {
  const t = T[lang], list = wrongList();
  if (!list.length) { toast(t.noWrong); return; }
  const lines = ['# RL Midterm · 错题本 / Mistake Book', '',
    '导出时间 / Exported: ' + new Date().toLocaleString(),
    '共 / Total: ' + list.length + ' 题', '',
    '> 英文题干 + 中文题干 + 参考答案 + 详细中文解析。由刷题网页导出。', ''];
  META.chapters.forEach(c => {
    const group = list.filter(q => q.chapter === c.n);
    if (!group.length) return;
    lines.push('## ' + t.lecture + ' ' + pad(c.n) + ' · ' + c.zh + ' / ' + c.en, '');
    group.forEach(q => {
      lines.push('### ' + t.qno + pad(q.number) + ' [' + q.type + '] ' + plain(q.en.stem, true), '');
      if (q.en.options) q.en.options.forEach((o, i) => lines.push('- ' + letter(i) + '. ' + plain(o, true)));
      lines.push('', '**中文版题目**：' + plain(q.zh.stem, true), '');
      if (q.zh.options) q.zh.options.forEach((o, i) => lines.push('- ' + letter(i) + '. ' + plain(o, true)));
      lines.push('', '- 参考答案 / Answer: **' + correctText(q) + '**',
        '- 你的答案 / Yours: ' + answerText(q, history[q.id].choice),
        '', '**详细中文解析**', '', plain(q.zh.explanation, true), '');
      if (q.key) lines.push('**考点速记**：' + plain(q.key, true), '');
      lines.push('来源 / Source: ' + q.source, '', '---', '');
    });
  });
  download('rl-midterm-mistakes.md', lines.join('\n'), 'text/markdown;charset=utf-8');
  toast(t.mistakesSaved);
}

/* ------------------------------ events --------------------------------- */
$('language').onclick = () => { lang = lang === 'zh' ? 'en' : 'zh'; save(); render(); };
$('typeSelect').onchange = e => { type = e.target.value; start(); };
$('restart').onclick = start;
$('previous').onclick = goPrev;
$('next').onclick = goNext;
$('paletteToggle').onclick = () => { paletteOpen = !paletteOpen; save(); render(); };
$('export').onclick = exportProgress;
$('exportMistakes').onclick = exportMistakes;
$('reset').onclick = () => {
  if (!window.confirm(T[lang].resetConfirm)) return;
  history = {}; mastered = {}; flags = {}; start(); toast(T[lang].resetDone);
};
$('wrong').parentElement.style.cursor = 'pointer';
$('wrong').parentElement.title = T[lang].book;
$('wrong').parentElement.onclick = () => { mode = 'book'; start(); };
$('import').onchange = async e => {
  try {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2000000) throw Error('large');
    const data = JSON.parse(await file.text());
    if (data.format !== FORMAT || !data.history || typeof data.history !== 'object' || Array.isArray(data.history)) throw Error('format');
    for (const q of Q) {
      const h = data.history[q.id];
      if (h && validAnswer(q, h.choice) && Number.isFinite(h.time) && h.time >= 0 &&
          (!history[q.id] || h.time > history[q.id].time)) history[q.id] = {choice: h.choice, time: h.time};
    }
    for (const [field, target] of [['mastered', mastered], ['flags', flags]]) {
      const src = data[field];
      if (src && typeof src === 'object' && !Array.isArray(src)) {
        for (const id in src) if (byId(id) && Number.isFinite(src[id]) && (!target[id] || src[id] > target[id])) target[id] = src[id];
      }
    }
    save(); render(); toast(T[lang].loaded);
  } catch (_) { toast(T[lang].invalid); }
  finally { e.target.value = ''; }
};
document.addEventListener('keydown', e => {
  const tag = (e.target && e.target.tagName) || '';
  if (/INPUT|TEXTAREA|SELECT/.test(tag)) return;      // numeric Enter is handled inline
  if (mode === 'book' || finished || !queue.length) return;
  const q = queue[index];
  if (answers[q.id] !== undefined) {
    if (e.key === 'ArrowRight') goNext(); else if (e.key === 'ArrowLeft') goPrev();
    return;
  }
  if (q.type === 'multi' && e.key === 'Enter') {
    if (Array.isArray(draft) && draft.length) commit(q, draft.slice());
    return;
  }
  const k = String(e.key).toLowerCase();
  let i = -1;
  if (k.length === 1 && 'abcd'.includes(k)) i = 'abcd'.indexOf(k);
  else if (k.length === 1 && '1234'.includes(k)) i = Number(k) - 1;
  if (i >= 0 && i < optCount(q) && q.type !== 'numeric') {
    e.preventDefault();
    if (q.type === 'single') commit(q, i);
    else {
      const cur = Array.isArray(draft) ? draft.slice() : [];
      const p = cur.indexOf(i);
      if (p >= 0) cur.splice(p, 1); else cur.push(i);
      draft = cur; render();
    }
  } else if (e.key === 'ArrowRight') { e.preventDefault(); goNext(); }
  else if (e.key === 'ArrowLeft') { e.preventDefault(); goPrev(); }
});

/* --------------------------- session restore --------------------------- */
const validChapters = ['all'].concat(META.chapters.map(c => String(c.n)));
const validModes = ['ordered', 'random', 'mistakes', 'book'];
const validTypes = ['all', 'single', 'multi', 'numeric'];
const s = saved.session;
if (s && validChapters.includes(s.chapter) && validModes.includes(s.mode) && validTypes.includes(s.type) &&
    Array.isArray(s.queue) && s.queue.length && new Set(s.queue).size === s.queue.length &&
    s.queue.every(id => byId(id)) && Number.isInteger(s.index) && s.index >= 0 && s.index < s.queue.length) {
  chapter = s.chapter; mode = s.mode; type = s.type;
  queue = s.queue.map(byId); index = s.index;
  for (const q of queue) if (validAnswer(q, s.answers && s.answers[q.id])) answers[q.id] = s.answers[q.id];
  finished = s.finished === true; paletteOpen = s.paletteOpen === true;
  render();
} else start();
})();
