// script.js
// Usage:
//   node script.js input.txt
//   cat input.txt | node script.js
//   node script.js   (uses the small sample at bottom)

const fs = require('fs');

// ---------- Read input ----------
function readInput() {
  // Always read notes_input.txt from the same folder as this script
  const path = require('path');
  const inputPath = path.join(__dirname, 'notes_input.txt');
  if (fs.existsSync(inputPath)) {
    return fs.readFileSync(inputPath, 'utf8');
  }
  // Fallback sample
  return `
[NoteNumber] 54 [NoteNumber] Книга пророка Осії 7: 12–13.
[NoteNumber] 55 [NoteNumber] Парафраза Книги пророка Осії 11: 10.
[NoteNumber] 56 [NoteNumber] Сковорода має на думці слова: ... (Книга пророка Ісаї 16: 2).
[NoteNumber] 57 [NoteNumber] Книга пророка Михея 1: 8.
[NoteNumber] 58 [NoteNumber] Книга пророка Михея 7: 17.
`;
}

const text = readInput();

// ---------- Book map ----------
const nameToCode = {
  'Євангелія від св. Івана': 'JHN',
  'Євангелія від св. Марка': 'MRK',
  'Євангелія від св. Матвія': 'MAT',
  'Євангелія від св. Луки': 'LUK',
  'Дії святих апостолів': 'ACT',
  'Дії св. апостолів': 'ACT',
  'Книга Ісуса, сина Сирахового': 'SIR',
  'Перше соборне послання св. ап. Івана': '1JN',
  'Друге послання Івана': '2JN',
  'Третє послання Івана': '3JN',
  'Перше послання до Тимотея': '1TI',
  'Перше послання св. ап. Павла до Тимотея': '1TI',
  'Друге послання до Тимофія': '2TI',
  'Друге послання св. ап. Павла до Тимофія': '2TI',
  'Послання до Римлян': 'ROM',
  'Перше послання до коринтян': '1CO',
  'Перше послання св. ап. Павла до коринтян': '1CO',
  'Друге послання до коринтян': '2CO',
  'Друге послання св. ап. Павла до коринтян': '2CO',
  'Послання до Галатів': 'GAL',
  'Послання до ефесян': 'EPH',
  "Послання до филип’ян": 'PHP',
  "Послання св. ап. Павла до филип’ян": 'PHP',
  'Перше послання до солунян': '1TH',
  'Друге послання до солунян': '2TH',
  'Послання до євреїв': 'HEB',
  'Послання св. ап. Павла до євреїв': 'HEB',
  'Перше послання Петра': '1PE',
  'Друге послання Петра': '2PE',
  'Пісня над піснями': 'SNG',
  'Книга Премудрості Соломона': 'WIS',
  'Книга Премудрості Соломонової': 'WIS',
  'Книга Псалмів': 'PSA',
  'Послання Апостола Якова': 'JAS',
  'Соборне послання св. ап. Іуди': 'JUD',
  'Книга пророка Ісаї': 'ISA',
  'Книги пророка Ісаї': 'ISA',
  'Книга пророка Єремії': 'JER',
  'Книги пророка Єремії': 'JER',
  'Плач Єремії': 'LAM',
  'Книга пророка Єзекіїла': 'EZK',
  'Книга пророка Даниїла': 'DAG', // as provided
  'Книга пророка Осії': 'HOS',
  'Книги пророка Осії': 'HOS',
  'Книга пророка Амоса': 'AMO',
  'Книга пророка Авдія': 'OBA',
  'Книга пророка Михея': 'MIC',
  'Книги пророка Михея': 'MIC',
  'Книга пророка Аввакума': 'HAB',
  'Книга пророка Софонії': 'ZEP',
  'Книга пророка Захарії': 'ZEC',
  'Книга пророка Варуха': 'BAR',
  'Книга Буття': 'GEN',
  'Перша книга Мойсеєва: Буття': 'GEN',
  'Першої книги Мойсеєвої: Буття': 'GEN',
  'Друга книга Мойсеєва: Вихід': 'EXO',
  'Вихід': 'EXO',
  'Четверта книга Мойсеєва: Числа': 'NUM',
  'П’ята книга Мойсеєва: Повторення Закону': 'DEU',
  'Пята книга Мойсеєва: Повторення Закону': 'DEU',
  'Книга Ісуса Навина': 'JOS',
  'Книга Суддів': 'JDG',
  'Книга Рут': 'RUT',
  'Перша книга царств': '1SA',
  'Друга книга царств': '2SA',
  'Третя книга царств': '1KI',
  'Четверта книга царств': '2KI',
  'Перша книга Хроніки': '1CH',
  'Друга книга параліпоменон': '2CH',
  'Книга Йова': 'JOB',
  'Книга Притч Соломонових': 'PRO',
  'Книга Екклезіястова': 'ECC',
  'Апокаліпсис': 'REV',
  'Євангелія від св. Іоанна': 'JHN',
};
const codeToName = new Map();
for (const [name, code] of Object.entries(nameToCode)) {
  if (!codeToName.has(code)) {
    codeToName.set(code, name);
  }
}

// ---------- Helpers ----------
function classify(block) {
  const b = block.toLowerCase();
  if (b.includes('парафраз')) return 'PARAPHRASE';
  if (b.includes('неточна цитата') || b.includes('трохи неточна цитата')) return 'NOT_EXACT';
  if (b.includes('має на думці') || b.includes('мае на думці')) return 'ALLUSION';
  if (b.includes('фраза') && b.includes('зринає')) return 'EXACT';
  return 'EXACT';
}

function normalizeDashes(s) {
  return s.replace(/\s+/g, '')
          .replace(/–|—/g, '-')
          .replace(/·/g, '.');
}

function mapBookToCode(raw) {
  let name = raw.trim();

  // Normalize "Апокаліпсису" -> "Апокаліпсис"
  if (/^Апокаліпсису$/u.test(name)) name = 'Апокаліпсис';

  // Direct map
  if (nameToCode[name]) return nameToCode[name];

  // If starts with "Книга " or "Книги ", try both forms
  if (name.startsWith('Книга ') || name.startsWith('Книги ')) {
    const n2 = name.replace(/^Книги?\s+/u, '');
    if (nameToCode['Книга ' + n2]) return nameToCode['Книга ' + n2];
    if (nameToCode['Книги ' + n2]) return nameToCode['Книги ' + n2];
    if (nameToCode[n2]) return nameToCode[n2];
  }

  const low = name.toLowerCase();

  // Heuristics for epistles and gospels phrasing
  if (low.includes('коринтян') && low.includes('друге')) return '2CO';
  if (low.includes('коринтян') && low.includes('перше')) return '1CO';
  if (low.includes('євреїв')) return 'HEB';
  if (low.includes('филип’ян') || low.includes('филип')) return 'PHP';
  if (low.includes('ефесян')) return 'EPH';
  if (low.includes('римлян')) return 'ROM';
  if (low.includes('євангелія від св. івана')) return 'JHN';

  return null;
}

// ---------- Parse ----------
const noteSplit = text.split(/\[NoteNumber\]\s+(\d+)\s+\[NoteNumber\]\s*/u);
// noteSplit like ['', '54', 'content...', '55', 'content...']
const pairs = [];
for (let i = 1; i < noteSplit.length; i += 2) {
  const n = parseInt(noteSplit[i], 10);
  const content = noteSplit[i + 1] || '';
  if (!Number.isNaN(n)) pairs.push([n, content]);
}

// Regex for citations: book + chapter:verse(s) and variants
const refPattern = new RegExp(
  String.raw`(?:[Пп]ре|[Нн]еточна|[Тт]рохи неточна)?\s*цитата з\s+` +
  String.raw`((?:Євангелія від св\. [ІI]вана|Євангелія від св\. Марка|Євангелія від св\. Матвія|Євангелія від св\. Луки|Дії святих апостолів|Дії св\. апостолів|Книги? [^:]+|Пісня над піснями|Послання [^:]+|Перше соборне послання св\. ап\. Івана|Друге послання Івана|Третє послання Івана|Соборному посланні св\. ап\. Іуди|Соборне послання св\. ап\. Іуди|Апокаліпсису|Апокаліпсис|Перша книга Мойсеєва: Буття|Першої книги Мойсеєвої: Буття|Друга книга Мойсеєва: Вихід|Вихід|Четверта книга Мойсеєва: Числа|П’ята книга Мойсеєва: Повторення Закону|Пята книга Мойсеєва: Повторення Закону|Книга Ісуса Навина|Книга Суддів|Книга Рут|Перша книга царств|Друга книга царств|Третя книга царств|Четверта книга царств|Перша книга Хроніки|Друга книга параліпоменон|Книга Йова|Книга Притч Соломонових|Книга Екклезіястова|Книга Псалмів|Книга Премудрості Соломона|Книга Премудрості Соломонової|Послання Апостола Якова|Соборне послання св\\. ап\\. Іуди|Книга пророка [^:]+))` +
  String.raw`\s+(\d+)(?:\s*\((\d+)\))?\s*[:\.]\s*(\d+(?:\s*[–\-]\s*\d+)?)`,
  'giu'
);

// Broader regex for 'зринає в ...' and similar patterns (matches any book phrase)
const inBookPattern = new RegExp(
  String.raw`зринає в\s+([Кк]нига|[Кк]ниги)?\s*([А-ЯA-ZІіЇїЄєа-яa-z0-9'’\s\.\-]+?)\s*(\d+)(?:\s*\((\d+)\))?\s*[:\.]\s*(\d+(?:\s*[–\-]\s*\d+)?)`,
  'giu'
);

// General fallback regex for [Book name] [chapter]:[verse(s)]
// Now allows optional leading words (e.g., 'Трохи неточна цитата з')
const generalPattern = new RegExp(
  String.raw`(?:[Пп]ре|[Нн]еточна|[Тт]рохи неточна)?\s*цитата з\s+` +
  String.raw`((?:Євангелія від св\. [ІI]вана|Євангелія від св\. Марка|Євангелія від св\. Матвія|Євангелія від св\. Луки|Дії святих апостолів|Дії св\. апостолів|Книги? [^:]+|Пісня над піснями|Послання [^:]+|Перше соборне послання св\. ап\. Івана|Друге послання Івана|Третє послання Івана|Соборному посланні св\. ап\. Іуди|Соборне послання св\. ап\. Іуди|Апокаліпсису|Апокаліпсис|Перша книга Мойсеєва: Буття|Першої книги Мойсеєвої: Буття|Друга книга Мойсеєва: Вихід|Вихід|Четверта книга Мойсеєва: Числа|П’ята книга Мойсеєва: Повторення Закону|Пята книга Мойсеєва: Повторення Закону|Книга Ісуса Навина|Книга Суддів|Книга Рут|Перша книга царств|Друга книга царств|Третя книга царств|Четверта книга царств|Перша книга Хроніки|Друга книга параліпоменон|Книга Йова|Книга Притч Соломонових|Книга Екклезіястова|Книга Псалмів|Книга Премудрості Соломона|Книга Премудрості Соломонової|Послання Апостола Якова|Соборне послання св\\. ап\\. Іуди|Книга пророка [^:]+))` +
  String.raw`\s+(\d+)(?:\s*\((\d+)\))?\s*[:\.]\s*(\d+(?:\s*[–\-]\s*\d+)?)`,
  'giu'
);
// Also match just [Book name] [chapter]:[verse(s)] anywhere in the line
const generalPatternLoose = new RegExp(
  String.raw`((?:Євангелія від св\. [ІI]вана|Євангелія від св\. Марка|Євангелія від св\. Матвія|Євангелія від св\. Луки|Дії святих апостолів|Дії св\. апостолів|Книги? [^:]+|Пісня над піснями|Послання [^:]+|Перше соборне послання св\. ап\. Івана|Друге послання Івана|Третє послання Івана|Соборному посланні св\. ап\. Іуди|Соборне послання св\. ап\. Іуди|Апокаліпсису|Апокаліпсис|Перша книга Мойсеєва: Буття|Першої книги Мойсеєвої: Буття|Друга книга Мойсеєва: Вихід|Вихід|Четверта книга Мойсеєва: Числа|П’ята книга Мойсеєва: Повторення Закону|Пята книга Мойсеєва: Повторення Закону|Книга Ісуса Навина|Книга Суддів|Книга Рут|Перша книга царств|Друга книга царств|Третя книга царств|Четверта книга царств|Перша книга Хроніки|Друга книга параліпоменон|Книга Йова|Книга Притч Соломонових|Книга Екклезіястова|Книга Псалмів|Книга Премудрості Соломона|Книга Премудрості Соломонової|Послання Апостола Якова|Соборне послання св\\. ап\\. Іуди|Книга пророка [^:]+))` +
  String.raw`\s+(\d+)(?:\s*\((\d+)\))?\s*[:\.]\s*(\d+(?:\s*[–\-]\s*\d+)?)`,
  'giu'
);

// ---------- Extract ----------
const results = [];

for (const [num, block] of pairs) {
  const refs = [];
  // Standard and variant patterns
  for (const m of block.matchAll(refPattern)) {
    const book = m[1];
    const chap = m[2];
    const altChap = m[3];
    let verses = normalizeDashes(m[4] || '');
    let bookNorm = book.trim();
    if (/^Апокаліпсису$/u.test(bookNorm)) bookNorm = 'Апокаліпсис';
    let code = mapBookToCode(bookNorm);
    if (!code) continue;
    refs.push({ code, chap, verses, raw: m[0], altChap });
  }
  // 'зринає в ...' pattern (now matchAll)
  for (const m2 of block.matchAll(inBookPattern) || []) {
    let bookRaw = m2[1] ? m2[1] : '';
    bookRaw = bookRaw.replace(/^[\s,]+|[\s,]+$/g, '');
    let bookNorm = bookRaw.trim();
    if (/^Книзі /u.test(bookNorm)) bookNorm = bookNorm.replace(/^Книзі /u, 'Книга ');
    if (/^Посланні /u.test(bookNorm)) bookNorm = bookNorm.replace(/^Посланні /u, 'Послання ');
    if (/^Соборному посланні /u.test(bookNorm)) bookNorm = bookNorm.replace(/^Соборному посланні /u, 'Соборне послання ');
    if (/^Діях /u.test(bookNorm)) bookNorm = bookNorm.replace(/^Діях /u, 'Дії ');
    if (/^Пісні над піснями/u.test(bookNorm)) bookNorm = 'Пісня над піснями';
    if (/^Апокаліпсису$/u.test(bookNorm)) bookNorm = 'Апокаліпсис';
    let code = mapBookToCode(bookNorm);
    if (code) {
      let chap = m2[2];
      let verses = normalizeDashes(m2[4] || '');
      refs.push({ code, chap, verses, raw: m2[0] });
    }
  }
  // General fallback: [Book name] [chapter]:[verse(s)]
  for (const m3 of block.matchAll(generalPattern)) {
    const book = m3[1];
    const chap = m3[2];
    const altChap = m3[3];
    let verses = normalizeDashes(m3[4] || '');
    let bookNorm = book.trim();
    if (/^Апокаліпсису$/u.test(bookNorm)) bookNorm = 'Апокаліпсис';
    let code = mapBookToCode(bookNorm);
    // Avoid duplicates from previous patterns
    if (!code) continue;
    if (refs.some(r => r.code === code && r.chap === chap && r.verses === verses)) continue;
    refs.push({ code, chap, verses, raw: m3[0], altChap });
  }
  // Even looser fallback: [Book name] [chapter]:[verse(s)] anywhere in the line
  for (const m4 of block.matchAll(generalPatternLoose)) {
    const book = m4[1];
    const chap = m4[2];
    const altChap = m4[3];
    let verses = normalizeDashes(m4[4] || '');
    let bookNorm = book.trim();
    if (/^Апокаліпсису$/u.test(bookNorm)) bookNorm = 'Апокаліпсис';
    let code = mapBookToCode(bookNorm);
    if (!code) continue;
    if (refs.some(r => r.code === code && r.chap === chap && r.verses === verses)) continue;
    refs.push({ code, chap, verses, raw: m4[0], altChap });
  }
  if (refs.length === 0) continue;
  const ctype = classify(block);
  for (const r of refs) {
    const bibleBookName = codeToName.has(r.code) ? codeToName.get(r.code) : '';
    results.push([num, r.code, r.chap, r.verses, ctype, bibleBookName, block]);
  }
}

// ---------- Sort & print ----------
results.sort((a, b) => {
  if (a[0] !== b[0]) return a[0] - b[0];
  if (a[1] !== b[1]) return a[1].localeCompare(b[1]);
  return parseInt(a[2], 10) - parseInt(b[2], 10);
});

function fmtLine(n, code, chap, verses, ctype, bibleBookName, block) {
  return `${n}. [BIBLE]${code}.${chap}.${verses}.${ctype}[X]  ${bibleBookName}  \n${block}\n`;
}

const lines = results.map(r => fmtLine(...r));
const path = require('path');
const outputPath = path.join(__dirname, 'output.txt');
fs.writeFileSync(outputPath, lines.join('\n') + (lines.length ? '\n' : ''));
