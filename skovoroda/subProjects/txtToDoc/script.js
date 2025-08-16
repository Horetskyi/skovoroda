// txtToDoc/script.js
// Usage: node script.js
// Reads input.txt, writes output.txt with text processing as specified

const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, 'input.txt');
const outputPath = path.join(__dirname, 'output.txt');

const input = fs.readFileSync(inputPath, 'utf8');

// Patterns to remove
const centerPattern = /\[Center\]/g;
const tabPattern = /\[Tab\d+\]/g;

// [CHARACTER]... [X] ... [CHARACTER] or [CHARACTER]... [CHARACTER]
const characterPattern = /\[CHARACTER\](?:[^\[]*?\[X\])?([^\[]*?)\[CHARACTER\]/g;


// [BIBLE]... [X] ... [X] ... [BIBLE] or [BIBLE]... [X] ... [BIBLE] or [BIBLE]... [BIBLE]
// Improved: Only output the actual text, ignore code-only blocks
const biblePattern = /\[BIBLE\]([^\[\]]+?)(?:\[X\]([^\[\]]*?))?(?:\[X\][^\[\]]*?)?\[BIBLE\]/g;

const lines = input.split(/\r?\n/);
const processed = lines.map(line => {
  let result = line;
  result = result.replace(centerPattern, '');
  result = result.replace(tabPattern, '');
  result = result.replace(characterPattern, (_, text) => text);
  result = result.replace(biblePattern, (_, code, text) => {
    // If text is present and not just whitespace, use it
    if (text && text.trim()) return text;
    // If code looks like a code (e.g. ISA.8.14.PARAPHRASE or ...CONTINUE), skip it
    if (/^[A-Z0-9]+\.[0-9]+\.[0-9\-]+(\.[A-Z_]+)?(\.CONTINUE)?$/.test(code.trim())) return '';
    // Otherwise, fallback to code (should not happen for valid input)
    return code;
  });
  return result.trim();
});

fs.writeFileSync(outputPath, processed.join('\n'), 'utf8');
console.log('Done. Output written to output.txt');
