// Special regex for multiple books joined by 'та' (e.g. 'Парафраза Першої книги царств 25: 26 та Четвертої книги царств 2: 2.')
const multiBookPattern = new RegExp(
  String.raw`([Пп]арафраза|[Пп]р|[Пп]р\.|[Пп]арафр\.|[Пп]арафр|[Пп]арафраз)\s+((?:[А-ЯA-ZІіЇїЄєа-яa-z0-9'’\.\-\s]+)\s+\d+\s*[:\.]\s*\d+(?:\s*[–\-]\s*\d+)?(?:\s+та\s+(?:[А-ЯA-ZІіЇїЄєа-яa-z0-9'’\.\-\s]+)\s+\d+\s*[:\.]\s*\d+(?:\s*[–\-]\s*\d+)?)*)`,
  'giu'
);
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
  // Add genitive forms for books
  'Першої книги царств': '1SA',
  'Другої книги царств': '2SA',
  'Третьої книги царств': '1KI',
  'Четвертої книги царств': '2KI',
  // Add long forms for epistles
  'Друге послання св. ап. Павла до коринтян': '2CO',
  'Перше послання св. ап. Павла до коринтян': '1CO',
  'Друге послання св. ап. Павла до Тимофія': '2TI',
  'Перше послання св. ап. Павла до Тимотея': '1TI',
  'Послання св. ап. Павла до євреїв': 'HEB',
  'Послання св. ап. Павла до филип’ян': 'PHP',
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

  // Handle genitive forms for books
  if (/Книги пророка Осії/u.test(name)) return 'HOS';
  if (/Другого послання св. ап. Павла до коринтян/u.test(name)) return '2CO';
  if (/Першого соборного послання св. ап. Івана/u.test(name)) return '1JN';
  if (/Євангелії від св. Матвія/u.test(name)) return 'MAT';
  if (/Книги Псалмів/u.test(name)) return 'PSA';
  if (/^Першої книги царств$/u.test(name)) return '1SA';
  if (/^Другої книги царств$/u.test(name)) return '2SA';
  if (/^Третьої книги царств$/u.test(name)) return '1KI';
  if (/^Четвертої книги царств$/u.test(name)) return '2KI';

  // Try to match long forms for epistles
  if (/^Друге послання св\. ап\. Павла до коринтян$/u.test(name)) return '2CO';
  if (/^Перше послання св\. ап\. Павла до коринтян$/u.test(name)) return '1CO';
  if (/^Друге послання св\. ап\. Павла до Тимофія$/u.test(name)) return '2TI';
  if (/^Перше послання св\. ап\. Павла до Тимотея$/u.test(name)) return '1TI';
  if (/^Послання св\. ап\. Павла до євреїв$/u.test(name)) return 'HEB';
  if (/^Послання св\. ап\. Павла до филип’ян$/u.test(name)) return 'PHP';

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

// Enhanced regex for multiple citations in a line, e.g. 'Парафраза Першої книги царств 25: 26 та Четвертої книги царств 2: 2.'
const refPattern = new RegExp(
  String.raw`(?:[Пп]ре|[Нн]еточна|[Тт]рохи неточна)?\s*цитата з\s+` +
  String.raw`((?:[А-ЯA-ZІіЇїЄєа-яa-z0-9'’\.\-\s]+)\s+\d+(?:\s*\((\d+)\))?\s*[:\.]\s*\d+(?:\s*[–\-]\s*\d+)?(?:\s+та\s+(?:[А-ЯA-ZІіЇїЄєа-яa-z0-9'’\.\-\s]+)\s+\d+(?:\s*\((\d+)\))?\s*[:\.]\s*\d+(?:\s*[–\-]\s*\d+)?)*)`,
  'giu'
);

// Broader regex for 'зринає в ...' and similar patterns (matches any book phrase)
const inBookPattern = new RegExp(
  String.raw`зринає в\s+([Кк]нига|[Кк]ниги)?\s*([А-ЯA-ZІіЇїЄєа-яa-z0-9'’\s\.\-]+?)\s*(\d+)(?:\s*\((\d+)\))?\s*[:\.]\s*(\d+(?:\s*[–\-]\s*\d+)?)`,
  'giu'
);

// General fallback regex for [Book name] [chapter]:[verse(s)]
// Now allows optional leading words (e.g., 'Трохи неточна цитата з') and any book name
const generalPattern = new RegExp(
  String.raw`(?:[Пп]ре|[Нн]еточна|[Тт]рохи неточна)?\s*цитата з\s+` +
  String.raw`((?:[А-ЯA-ZІіЇїЄєа-яa-z0-9'’\.\-\s]+))` +
  String.raw`\s+(\d+)(?:\s*\((\d+)\))?\s*[:\.]\s*(\d+(?:\s*[–\-]\s*\d+)?)`,
  'giu'
);
// Also match just [Book name] [chapter]:[verse(s)] anywhere in the line (now any book name)
const generalPatternLoose = new RegExp(
  String.raw`([А-ЯA-ZІіЇїЄєа-яa-z0-9'’\.\-\s]+)` +
  String.raw`\s+(\d+)(?:\s*\((\d+)\))?\s*[:\.]\s*(\d+(?:\s*[–\-]\s*\d+)?)`,
  'giu'
);

// ---------- Extract ----------
const results = [];

for (const [num, block] of pairs) {
  const refs = [];
  // Special handling for multi-book pattern with 'та'
  for (const m of block.matchAll(multiBookPattern)) {
    const citationBlock = m[2];
    const singleCitationPattern = new RegExp(
      String.raw`((?:[А-ЯA-ZІіЇїЄєа-яa-z0-9'’\.\-\s]+))\s+(\d+)\s*[:\.]\s*(\d+(?:\s*[–\-]\s*\d+)?)`,
      'gu'
    );
    for (const m2 of citationBlock.matchAll(singleCitationPattern)) {
      const book = m2[1];
      const chap = m2[2];
      let verses = normalizeDashes(m2[3] || '');
      let bookNorm = book.trim();
      if (/^Апокаліпсису$/u.test(bookNorm)) bookNorm = 'Апокаліпсис';
      let code = mapBookToCode(bookNorm);
      if (!code) continue;
      refs.push({ code, chap, verses, raw: m2[0] });
    }
  }
  // Enhanced: extract all book+chapter:verse(s) patterns, including multiple in one line
  // First, match the whole citation block (may contain multiple citations)
  for (const m of block.matchAll(refPattern)) {
    // Now, extract each citation from the matched block
    const citationBlock = m[1];
    // Match all book+chapter:verse(s) in the block
    const singleCitationPattern = new RegExp(
      String.raw`((?:[А-ЯA-ZІіЇїЄєа-яa-z0-9'’\.\-\s]+))\s+(\d+)(?:\s*\((\d+)\))?\s*[:\.]\s*(\d+(?:\s*[–\-]\s*\d+)?)`,
      'gu'
    );
    for (const m2 of citationBlock.matchAll(singleCitationPattern)) {
      const book = m2[1];
      const chap = m2[2];
      const altChap = m2[3];
      let verses = normalizeDashes(m2[4] || '');
      let bookNorm = book.trim();
      if (/^Апокаліпсису$/u.test(bookNorm)) bookNorm = 'Апокаліпсис';
      let code = mapBookToCode(bookNorm);
      if (!code) continue;
      refs.push({ code, chap, verses, raw: m2[0], altChap });
    }
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
const outputPath = path.join(__dirname, 'notes_output.txt');
fs.writeFileSync(outputPath, lines.join('\n') + (lines.length ? '\n' : ''));
