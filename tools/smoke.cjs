/*
 * DOM smoke test. Requires jsdom (development only):
 *   npm install jsdom
 *   NODE_PATH=<workspace>/node_modules node tools/smoke.cjs
 */
const fs = require('fs');
const path = require('path');
const {JSDOM} = require('jsdom');
const root = path.join(__dirname, '..');
let html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
html = html.replace(/<script\s+defer\s+src="[^"]+"><\/script>/g, '');

const dom = new JSDOM(html, {url: 'http://localhost/', runScripts: 'outside-only', pretendToBeVisual: true});
const {window} = dom;
const d = window.document;
window.confirm = () => true;
window.HTMLElement.prototype.scrollIntoView = () => {};
let capturedBlob = null, downloadedName = null;
window.URL.createObjectURL = b => { capturedBlob = b; return 'blob:mock'; };
window.URL.revokeObjectURL = () => {};
window.HTMLAnchorElement.prototype.click = function () { downloadedName = this.download; };

window.eval(fs.readFileSync(path.join(root, 'questions.js'), 'utf8'));
window.eval(fs.readFileSync(path.join(root, 'app.js'), 'utf8'));

let failures = 0;
const ok = (cond, label) => {
  console.log((cond ? '  ok  ' : ' FAIL ') + label);
  if (!cond) failures++;
};
const $ = id => d.getElementById(id);
const click = e => e.dispatchEvent(new window.MouseEvent('click', {bubbles: true}));
const Q = window.QUESTIONS;
const firstQ = () => Q.find(q => q.chapter === 1);
const stemText = () => ($('card').querySelector('.question') || {}).textContent || '';

(async () => {
  console.log('— initial state —');
  ok(Q.length === 159, 'question bank loaded (159)');
  ok($('total').textContent === '159', 'total stat rendered');
  ok($('done').textContent === '0', 'practiced stat starts at 0');
  ok($('accuracy').textContent === '—', 'accuracy starts empty');
  ok($('chapters').children.length === 13, 'chapter nav: all + 12 chapters');
  ok($('modes').children.length === 4, 'four practice modes');
  ok(stemText().includes('objective of reinforcement learning'), 'first question is English');
  ok(!/[\u4e00-\u9fff]/.test(stemText()), 'question stem contains no Chinese');

  console.log('— single choice, Chinese translation & explanation —');
  const q0 = firstQ();
  const right = q0.accepted[0];
  click($('card').querySelectorAll('.option')[right]);
  ok($('card').querySelector('.result') !== null, 'result panel appears after answering');
  ok($('card').textContent.includes('中文版题目'), 'Chinese version of question shown');
  ok($('card').textContent.includes('详细中文解析'), 'detailed Chinese explanation shown');
  ok($('card').textContent.includes('考点速记'), 'key point shown');
  ok($('card').querySelector('.option.correct') !== null, 'correct option highlighted');
  ok($('done').textContent === '1', 'practiced count updated');
  ok($('accuracy').textContent === '100%', 'accuracy updated');
  ok(JSON.parse(window.localStorage.getItem('rl-midterm-progress-v2')).history[q0.id] !== undefined, 'progress persisted');

  console.log('— second submission is locked; navigation —');
  click($('card').querySelectorAll('.option')[0]);
  ok($('accuracy').textContent === '100%', 'cannot change a submitted answer');
  click($('next'));
  ok(stemText().length > 20, 'next question rendered');
  click($('previous'));
  ok($('card').querySelector('.result') !== null, 'previous question keeps its result');

  console.log('— wrong answer feeds the mistake book —');
  const q1 = Q[1];
  click($('next'));
  const wrongIdx = (q1.accepted[0] + 1) % q1.en.options.length;
  click($('card').querySelectorAll('.option')[wrongIdx]);
  ok($('wrong').textContent === '1', 'wrong count becomes 1');
  ok($('card').querySelector('.result.wrong') !== null, 'wrong result styled');
  click($('modes').children[3]);                       // Mistake Book
  ok($('card').textContent.includes('错题本'), 'mistake book renders');
  ok($('card').querySelectorAll('.book-item').length === 1, 'one mistake aggregated');
  ok($('card').textContent.includes(q1.en.stem.slice(0, 30)), 'wrong question listed');

  console.log('— mastered mark removes an item —');
  click($('card').querySelector('.book-item .row button:last-child'));
  ok($('card').querySelectorAll('.book-item').length === 0, 'mastered item leaves the book');
  ok($('wrong').textContent === '0', 'wrong count back to 0');

  console.log('— type filter and numeric question —');
  click($('modes').children[0]);                      // back to ordered
  $('typeSelect').value = 'numeric';
  $('typeSelect').dispatchEvent(new window.Event('change'));
  ok($('sessionName').textContent.includes('31'), 'numeric filter builds 31-question queue');
  const numQ = Q.find(q => q.type === 'numeric' && q.chapter === 3 && q.answer.value === 5.5);
  ok(numQ !== undefined, 'found the return-calculation question');
  click($('chapters').children[3]);                   // chapter 3
  ok($('typeSelect').value === 'numeric', 'type filter kept when switching chapter');
  const numericSession = $('position').textContent;
  ok(numericSession.startsWith('1 /'), 'numeric queue positioned at first item');
  const input = $('card').querySelector('.numeric-input');
  ok(input !== null, 'numeric input rendered');
  const firstNumQ = Q.filter(q => q.type === 'numeric' && q.chapter === 3)[0];
  input.value = String(firstNumQ.answer.value);
  click($('card').querySelector('.numeric-row .primary'));
  ok($('card').querySelector('.result') !== null, 'numeric answer submitted');
  ok(!$('card').querySelector('.result.wrong'), 'correct numeric answer graded right');

  console.log('— multi-select question —');
  $('typeSelect').value = 'all';
  $('typeSelect').dispatchEvent(new window.Event('change'));
  const multiQ = Q.find(q => q.type === 'multi');
  click($('chapters').children[multiQ.chapter]);
  // jump using the question palette
  click($('paletteToggle'));
  ok(!$('palette').hidden, 'question palette opens');
  const posInQueue = JSON.parse(window.localStorage.getItem('rl-midterm-progress-v2')).session.queue.indexOf(multiQ.id);
  ok(posInQueue >= 0, 'multi question is in the chapter queue');
  click($('palette').children[posInQueue]);
  ok($('card').querySelectorAll('.option').length === multiQ.en.options.length, 'multi question rendered');
  multiQ.accepted.forEach(i => click($('card').querySelectorAll('.option')[i]));
  ok($('card').querySelectorAll('.option.selected').length === multiQ.accepted.length, 'multiple options selectable');
  click($('card').querySelector('.submit-row .primary'));
  ok(!$('card').querySelector('.result.wrong'), 'exact multi-answer graded right');

  console.log('— language switch keeps English questions —');
  click($('language'));
  ok($('totalLabel').textContent === 'Questions', 'UI switched to English');
  ok(!/[\u4e00-\u9fff]/.test(stemText()), 'question stem still English after switch');
  ok($('card').textContent.includes('中文版题目') || $('card').textContent.includes('Chinese version'), 'Chinese translation still present');
  click($('language'));

  console.log('— export / import —');
  click($('export'));
  ok(downloadedName === 'rl-midterm-progress.json', 'progress JSON downloaded');
  ok(capturedBlob && capturedBlob.type.includes('json'), 'download is JSON');
  click($('exportMistakes'));
  ok(downloadedName === 'rl-midterm-mistakes.md' || $('toast').textContent.includes('没有'), 'mistake export handled');

  const before = JSON.parse(window.localStorage.getItem('rl-midterm-progress-v2'));
  const payload = {
    format: 'rl-midterm-progress-v2',
    history: {[Q[100].id]: {choice: Q[100].type === 'numeric' ? Q[100].answer.value : Q[100].accepted[0], time: Date.now() + 10000}},
    mastered: {}, flags: {[Q[2].id]: Date.now() + 10000}
  };
  const file = new window.File([JSON.stringify(payload)], 'progress.json', {type: 'application/json'});
  Object.defineProperty($('import'), 'files', {value: [file], configurable: true});
  $('import').dispatchEvent(new window.Event('change'));
  await new Promise(r => setTimeout(r, 120));
  const after = JSON.parse(window.localStorage.getItem('rl-midterm-progress-v2'));
  ok(after.history[Q[100].id] !== undefined, 'imported history merged');
  ok(Object.keys(after.history).length >= Object.keys(before.history).length, 'existing history preserved');
  ok(after.flags[Q[2].id] !== undefined, 'imported flags merged');
  ok($('toast').textContent.includes('合并'), 'import success toast');

  console.log('— invalid import is rejected —');
  const bad = new window.File(['{"hello":1}'], 'bad.json', {type: 'application/json'});
  Object.defineProperty($('import'), 'files', {value: [bad], configurable: true});
  $('import').dispatchEvent(new window.Event('change'));
  await new Promise(r => setTimeout(r, 120));
  ok($('toast').textContent.includes('无法导入'), 'invalid file rejected with message');

  console.log('\n' + (failures ? failures + ' FAILURES' : 'All smoke tests passed.'));
  process.exit(failures ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
