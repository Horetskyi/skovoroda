// scriptText.js
// Usage: node scriptText.js
// Reads notes_output.txt and text_input.txt, writes text_output.txt

const fs = require('fs');
const path = require('path');

// Helper: Map superscript symbols to numbers and vice versa
const NOTES_NUMBERS_SYMBOLS_ARRAY = [..."⁰¹²³⁴⁵⁶⁷⁸⁹"];
const NOTES_NUMBERS_SYMBOLS_MAP = new Map();
const NOTES_NUMBERS_SYMBOLS_MAP_REVERSE = new Map();
NOTES_NUMBERS_SYMBOLS_ARRAY.forEach((symbol, index) => {
  NOTES_NUMBERS_SYMBOLS_MAP.set(symbol, index);
});
NOTES_NUMBERS_SYMBOLS_MAP.set('ᵃ', 'a');
NOTES_NUMBERS_SYMBOLS_MAP.set('ᵇ', 'b');
NOTES_NUMBERS_SYMBOLS_MAP.set('ᵉ', 'e');
NOTES_NUMBERS_SYMBOLS_MAP.set('ᵈ', 'd');
NOTES_NUMBERS_SYMBOLS_MAP.set('ᵍ', 'g');
NOTES_NUMBERS_SYMBOLS_MAP.forEach((value, key) => {
  NOTES_NUMBERS_SYMBOLS_MAP_REVERSE.set("" + value, key);
});

function getNoteNumberFromSuperscript(str) {
  // Converts superscript string to number or letter
  let result = '';
  for (const ch of str) {
    if (NOTES_NUMBERS_SYMBOLS_MAP.has(ch)) {
      result += NOTES_NUMBERS_SYMBOLS_MAP.get(ch);
    } else {
      result += ch;
    }
  }
  return result;
}

// Read notes_output.txt and build a map: noteNumber -> citation
function parseNotesOutput(notesOutputText) {
  // Example line: 85. [BIBLE]PSA.54.7.NOT_EXACT[X]  Книга Псалмів  
  // ...original note text...
  const map = new Map();
  const lines = notesOutputText.split(/\r?\n/);
  for (const line of lines) {
    const m = line.match(/^(\d+)\. \[BIBLE\]([A-Z0-9]+\.[0-9]+\.[^\.]+\.[A-Z_]+)\[X\]/);
    if (m) {
      const noteNumber = m[1];
      const citation = `[BIBLE]${m[2]}[X]`;
      map.set(noteNumber, citation);
    }
  }
  return map;
}

// Main logic
function processText(textInput, notesMap) {
  // Regex: match “...text...”<superscript>
  // Example: “Кто даст мнѣ кри́лѣ…”⁸⁵ or “Воспою нынѣ Возлюбленному пѣснь”⁸⁷
  return textInput.replace(/([“"«])(.*?)([”"»])([⁰¹²³⁴⁵⁶⁷⁸⁹ᵃᵇᵉᵈᵍ]+)/g, (match, openQ, inner, closeQ, superscript) => {
    // Only process if inner text contains Cyrillic
    if (!/[\u0400-\u04FF]/.test(inner)) return match;
    // Get note number from superscript
    const noteNumber = getNoteNumberFromSuperscript(superscript);
    const citation = notesMap.get(noteNumber);
    if (!citation) return match;
    // If already contains [BIBLE], skip
    if (inner.includes('[BIBLE]')) return match;
  // Insert citation at the start and closing [BIBLE] at the end
  return `${openQ}${citation}${inner}[BIBLE]${closeQ}${superscript}`;
  });
}

// File paths
const notesOutputPath = path.join(__dirname, 'notes_output.txt');
const textInputPath = path.join(__dirname, 'text_input.txt');
const textOutputPath = path.join(__dirname, 'text_output.txt');

// Read files
const notesOutputText = fs.readFileSync(notesOutputPath, 'utf8');
const textInput = fs.readFileSync(textInputPath, 'utf8');

// Build notes map
const notesMap = parseNotesOutput(notesOutputText);

// Process text
const outputText = processText(textInput, notesMap);

// Write output
fs.writeFileSync(textOutputPath, outputText, 'utf8');

console.log('Done. Output written to text_output.txt');
