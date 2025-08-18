import path from "path";
import { readFileSyncOrDefault } from "../dataReaderHelper";

const cacheBibleData = {};
const isIgnoreCache = true;

export function readBibleVerse(bookCode, chapter, verse) {

  const chapterString = ''+chapter;
  const verseString = ''+verse;
  const verseSplit = verseString.split('-');
  if (verseSplit.length > 1) {
    const startVerse = parseInt(verseSplit[0], 10);
    const endVerse = parseInt(verseSplit[1], 10);
    return Array.from({ length: endVerse - startVerse + 1 }, (_, i) => readBibleVerse(bookCode, chapterString, startVerse + i))
      .filter(result => result && result.length)
      .join(' ');
  }

  if (!_isCached(bookCode, chapterString, verseString) || isIgnoreCache) _readFromSource(bookCode, chapterString);
  if (!_isCached(bookCode, chapterString, verseString)) return null;
  return cacheBibleData[bookCode][chapterString][verseString].text;
}

function _isCached(bookCode, chapterString, verseString) {
  return cacheBibleData[bookCode] &&
    cacheBibleData[bookCode][chapterString] &&
    cacheBibleData[bookCode][chapterString][verseString] &&
    cacheBibleData[bookCode][chapterString][verseString].text &&
    cacheBibleData[bookCode][chapterString][verseString].text.length;
}

function _readFromSource(bookCode, chapter) {
  const directoryPath = path.join(process.cwd(), "lib", "data", "bible", "utt");
  const filePath = path.join(directoryPath, `${bookCode}.${chapter}.txt`);
  const fileContent = readFileSyncOrDefault(filePath);
  if (!fileContent) {
    console.warn(`Bible file not found: ${filePath}`);
    return;
  }

  // Split into lines
  const lines = fileContent.split(/\r?\n/);
  const parsed = [];
  let lastVerseNumber = null;
  let chapterObj = {};

  // Helper to commit verse to chapterObj
  function commitVerse(verseNumber, text, isEnterAfterThisVerse = false) {
    const verseNumberString = '' + verseNumber;
    if (!chapterObj[verseNumberString]) {
      chapterObj[verseNumberString] = { text: text.trim(), isEnterAfterThisVerse };
    } else {
      // If verse already exists, append text
      // chapterObj[verseNumberString].text += ' ' + text.trim();
      if (isEnterAfterThisVerse) chapterObj[verseNumberString].isEnterAfterThisVerse = true;
    }
  }

  for (let i = 0; i < lines.length; ++i) {
    const line = lines[i].trim();
    if (!line) continue;

    // [Enter] line
    if (/^\[Enter\]$/.test(line)) {
      parsed.push("NEW_LINE");
      if (lastVerseNumber !== null) {
        commitVerse(lastVerseNumber, chapterObj[''+lastVerseNumber]?.text || '', true);
      }
      continue;
    }

    // [Number] ... [Number] ...
    const numberMatch = line.match(/^\[Number\]\s*(\d+)\s*\[Number\]\s*(.*)$/);
    if (numberMatch) {
      const verseNumber = parseInt(numberMatch[1], 10);
      const text = numberMatch[2].trim();
      parsed.push({ verseNumber, text });
      commitVerse(verseNumber, text, false);
      lastVerseNumber = verseNumber;
      continue;
    }

    // [Number] ...
    const numberMatchSimple = line.match(/^\[Number\]\s*(\d+)\s*(.*)$/);
    if (numberMatchSimple) {
      const verseNumber = parseInt(numberMatchSimple[1], 10);
      const text = numberMatchSimple[2].trim();
      parsed.push({ verseNumber, text });
      commitVerse(verseNumber, text, false);
      lastVerseNumber = verseNumber;
      continue;
    }

    // If line is not a verse or enter, skip or handle as needed
  }

  // Attach to cache for future use (only this chapter)
  if (!cacheBibleData[bookCode]) cacheBibleData[bookCode] = {};
  cacheBibleData[bookCode][''+chapter] = chapterObj;

  // Return parsed array as result
  return parsed;
}