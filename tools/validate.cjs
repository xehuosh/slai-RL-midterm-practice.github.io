/*
 * Integrity checks for questions.js. Run:  node tools/validate.cjs
 * This file is a development helper; GitHub Pages does not need it.
 */
const path = require('path');
global.window = {};
require(path.join(__dirname, '..', 'questions.js'));
const Q = global.window.QUESTIONS;
const META = global.window.BANK_META;
const errors = [];
const warn = [];
const fail = (id, msg) => errors.push(id + ': ' + msg);

if (!Array.isArray(Q) || !Q.length) { console.error('FATAL: no questions'); process.exit(1); }
const ids = new Set(), stems = new Set();
const byChapter = {}, byType = {};
const CJK = /[\u4e00-\u9fff]/;

for (const q of Q) {
  const id = q.id || '(missing id)';
  if (ids.has(id)) fail(id, 'duplicate id');
  ids.add(id);
  if (stems.has(q.en && q.en.stem)) fail(id, 'duplicate English stem');
  stems.add(q.en && q.en.stem);

  if (!q.chapter || !META.chapters.some(c => c.n === q.chapter)) fail(id, 'unknown chapter');
  byChapter[q.chapter] = (byChapter[q.chapter] || 0) + 1;
  byType[q.type] = (byType[q.type] || 0) + 1;

  // English question must be English (math symbols allowed, Chinese not)
  if (!q.en || !q.en.stem || q.en.stem.length < 20) fail(id, 'missing / too short English stem');
  if (q.en && CJK.test(q.en.stem)) fail(id, 'Chinese characters in English stem');
  if (!q.zh || !q.zh.stem) fail(id, 'missing Chinese stem');
  if (!q.zh || !q.zh.explanation || q.zh.explanation.length < 80) fail(id, 'missing / too short Chinese explanation');
  if (!q.source) fail(id, 'missing source');
  if (!q.key) warn.push(id + ': no key point');
  if (q.scored !== true) fail(id, 'scored flag missing');

  // Math is LaTeX between $...$ / $$...$$; each string must have balanced delimiters.
  const stringFields = [
    ['en.stem', q.en.stem], ['zh.stem', q.zh.stem],
    ['explanation', q.zh.explanation], ['key', q.key || '']
  ];
  (q.en.options || []).forEach((o, i) => stringFields.push(['en.opt' + i, o]));
  (q.zh.options || []).forEach((o, i) => stringFields.push(['zh.opt' + i, o]));
  for (const pair of stringFields) {
    const str = String(pair[1]);
    if ((str.match(/\$/g) || []).length % 2 !== 0) fail(id, 'unbalanced $ in ' + pair[0]);
    if ((str.match(/\$\$/g) || []).length % 2 !== 0) fail(id, 'unbalanced $$ in ' + pair[0]);
  }

  const html = [q.en.stem, q.zh.stem, q.zh.explanation, q.key || '']
    .concat(q.en.options || [], q.zh.options || []).join('\n');
  // A stray "<" that starts an unknown tag would silently swallow content in innerHTML.
  const stripped = html
    .replace(/<\/?(?:b|sub|sup|span|code|br|i|em|strong|ol|li|p|div|h[1-6])[^>]*>/gi, '')
    .replace(/&(?:lt|gt|amp|nbsp|quot);/g, '');
  const stray = stripped.indexOf('<');
  if (stray >= 0) {
    warn.push(id + ': check raw "<" near ' + JSON.stringify(html.slice(Math.max(0, stray - 12), stray + 24)));
  }
  // unbalanced common inline tags
  for (const tag of ['b', 'sub', 'sup', 'span', 'code']) {
    const open = (html.match(new RegExp('<' + tag + '(?:\\s|>)', 'g')) || []).length;
    const close = (html.match(new RegExp('</' + tag + '>', 'g')) || []).length;
    if (open !== close) fail(id, 'unbalanced <' + tag + '> (' + open + ' open / ' + close + ' close)');
  }

  if (q.type === 'numeric') {
    if (!q.answer || typeof q.answer.value !== 'number' || !isFinite(q.answer.value)) fail(id, 'bad numeric answer');
    if (!(q.answer.tol > 0)) fail(id, 'bad tolerance');
    if (q.en.options || q.zh.options) fail(id, 'numeric question should not have options');
  } else if (q.type === 'single' || q.type === 'multi') {
    if (!Array.isArray(q.en.options) || q.en.options.length < 2) fail(id, 'bad English options');
    if (!Array.isArray(q.zh.options) || q.zh.options.length !== q.en.options.length) fail(id, 'Chinese option count mismatch');
    if (!Array.isArray(q.accepted) || !q.accepted.length) fail(id, 'missing accepted answer');
    if (q.accepted.some(i => !Number.isInteger(i) || i < 0 || i >= q.en.options.length)) fail(id, 'accepted index out of range');
    if (new Set(q.accepted).size !== q.accepted.length) fail(id, 'duplicate accepted index');
    if (q.type === 'single' && q.accepted.length !== 1) fail(id, 'single choice must have exactly one answer');
    if (q.type === 'multi' && q.accepted.length < 2) fail(id, 'multi choice should have >= 2 answers');
    if (q.en.options.some(o => CJK.test(o))) fail(id, 'Chinese characters in English option');
    if (q.zh.options.some(o => !o)) fail(id, 'empty Chinese option');
  } else fail(id, 'unknown type ' + q.type);
}

for (const c of META.chapters) if (!byChapter[c.n]) fail('meta', 'chapter ' + c.n + ' has no questions');
if (!META.notes.zh || !META.notes.en) fail('meta', 'missing notes');

console.log('Total questions :', Q.length);
console.log('By chapter     :', JSON.stringify(byChapter));
console.log('By type        :', JSON.stringify(byType));
console.log('Warnings       :', warn.length);
warn.slice(0, 25).forEach(w => console.log('  ! ' + w));
if (warn.length > 25) console.log('  ... ' + (warn.length - 25) + ' more');
if (errors.length) {
  console.log('\nERRORS (' + errors.length + '):');
  errors.slice(0, 80).forEach(e => console.log('  x ' + e));
  if (errors.length > 80) console.log('  ... ' + (errors.length - 80) + ' more');
  process.exit(1);
}
console.log('\nAll checks passed.');
