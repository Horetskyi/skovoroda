
import { getNoteNumberUpperString, NOTES_NUMBERS_SYMBOLS_MAP, parseNotesNumber } from "../utils/notesNumbersSymbols.js";

/**
 * Parses a string with <meta ...>...</meta> tags (with arbitrary attributes and nesting)
 * and returns an array of objects:
 *   { text: "...", start: <number> }
 *   { text: "...", meta: { ...attributes... }, start: <number>, innerParsedTextArray: [...] }
 */
export function xmlHelper_parseMetaTagsWithTextAndNesting(input, visualPos = 0) {

  // VALIDATION {
  if (!input || !input.length || typeof input !== "string") return null;
  // VALIDATION }
 
  // PREPROCESSING {
  input = preprocessIrmologionAndSomeStyles(input);
  input = preprocessBibleTags(input);
  input = preprocessFormattings(input);
  input = preprocessNoteNumbers(input);
  // PREPROCESSING }

  let result = [];
  let i = 0;
  let lastTextIndex = 0;
  let currentVisualPos = visualPos;
  
  function pushTextWithNotes(text, startPos) {
    if (!text) return;
    let i = 0;
    while (i < text.length) {
      // If current char is a note symbol, group all consecutive note symbols
      if (NOTES_NUMBERS_SYMBOLS_MAP.has(text[i])) {
        let noteSeq = '';
        let seqStart = i;
        while (i < text.length && NOTES_NUMBERS_SYMBOLS_MAP.has(text[i])) {
          noteSeq += text[i];
          i++;
        }
        result.push({
          text: noteSeq,
          start: startPos + seqStart,
          meta: {
            isNote: true,
            noteNumber: parseNotesNumber(noteSeq),
          }
        });
      } else {
        // Collect all non-note chars until next note symbol
        let normalSeq = '';
        let seqStart = i;
        while (i < text.length && !NOTES_NUMBERS_SYMBOLS_MAP.has(text[i])) {
          normalSeq += text[i];
          i++;
        }
        if (normalSeq.length > 0) {
          result.push({ text: normalSeq, start: startPos + seqStart });
        }
      }
    }
  }
  
  while (i < input.length) {
    // Find next <meta or </meta>
    const openIdx = input.indexOf('<meta', i);
    const closeIdx = input.indexOf('</meta>', i);
  
    // If no more tags, push remaining text and break
    if (openIdx === -1 && closeIdx === -1) {
      if (lastTextIndex < input.length) {
        const text = input.slice(lastTextIndex);
        if (text) {
          pushTextWithNotes(text, currentVisualPos);
          currentVisualPos += text.length;
        }
      }
      break;
    }
  
    // If next is opening tag
    if (openIdx !== -1 && (openIdx < closeIdx || closeIdx === -1)) {
      // Push text before tag
      if (openIdx > lastTextIndex) {
        const text = input.slice(lastTextIndex, openIdx);
        if (text) {
          pushTextWithNotes(text, currentVisualPos);
          currentVisualPos += text.length;
        }
      }
      // Parse attributes
      const tagEnd = input.indexOf('>', openIdx);
      if (tagEnd === -1) break; // malformed
      const attrString = input.slice(openIdx + 5, tagEnd);
      const attrs = parseAttributesForArray(attrString);
  
      // Find matching closing </meta> for this <meta>
      let depth = 1;
      let searchIdx = tagEnd + 1;
      while (depth > 0) {
        const nextOpen = input.indexOf('<meta', searchIdx);
        const nextClose = input.indexOf('</meta>', searchIdx);
        if (nextClose === -1) break; // malformed
        if (nextOpen !== -1 && nextOpen < nextClose) {
          depth++;
          searchIdx = nextOpen + 5;
        } else {
          depth--;
          searchIdx = nextClose + 7;
        }
      }
      const contentEnd = searchIdx - 7;
      const innerContent = input.slice(tagEnd + 1, contentEnd);
  
      // Recursively parse inner content, passing currentVisualPos
      const innerParsed = xmlHelper_parseMetaTagsWithTextAndNesting(innerContent, currentVisualPos);
      // Compose text for this meta (flatten innerParsed to text)
      const metaText = innerParsed ? innerParsed.map(x => x.text).join('') : '';

      // Compose meta object
      const metaObj = {
        text: metaText,
        start: currentVisualPos,
        meta: attrs,
      };
      if (innerParsed && (innerParsed.length > 1 || (innerParsed.length === 1 && innerParsed[0].meta))) {
        metaObj.innerParsedTextArray = innerParsed;
      }
  
      result.push(metaObj);
      currentVisualPos += metaText.length;
  
      i = searchIdx;
      lastTextIndex = i;
      continue;
    }
  
    // If next is closing tag (shouldn't happen at top level, but just in case)
    if (closeIdx !== -1 && (closeIdx < openIdx || openIdx === -1)) {
      if (closeIdx > lastTextIndex) {
        const text = input.slice(lastTextIndex, closeIdx);
        if (text) {
          pushTextWithNotes(text, currentVisualPos);
          currentVisualPos += text.length;
        }
      }
      i = closeIdx + 7;
      lastTextIndex = i;
      continue;
    }
  }

  result = postprocess(result);
  return result;
}

function parseAttributesForArray(attrString) {
  const attrs = {};
  const attrRegex = /([a-zA-Z0-9_\-:]+)\s*=\s*"([^"]*)"/g;
  let match;
  while ((match = attrRegex.exec(attrString))) {
    const key = match[1];
    const value = match[2];
    if (attrs[key] === undefined) {
      attrs[key] = value;
    } else if (Array.isArray(attrs[key])) {
      attrs[key].push(value);
    } else {
      attrs[key] = [attrs[key], value];
    }
  }
  for (const k in attrs) {
    if (Array.isArray(attrs[k]) && attrs[k].length === 1) {
      attrs[k] = attrs[k][0];
    }
  }
  return Object.keys(attrs).length ? attrs : undefined;
}

//-------------------------------------------------------

// Handles:
// [BIBLE]CODE[X]text[BIBLE]  => <meta bible="CODE">text</meta>
// [BIBLE]CODE[X]text[X]translation[BIBLE] => <meta bible="CODE" translation="translation">text</meta>
function preprocessBibleTags(input) {

  // First, handle the case with translation
  input = input.replace(
    /\[(BIBLE|META)\](.*?)(?:\[X\](.*?)(?:\[X\](.*?))?)?\[\1\]/g,
    (match, f, code, text, translation) => {
      if (!translation || !translation.length) {
        return `<meta bible="${code}">${text}</meta>`;
      }
      return `<meta bible="${code}" translation="${translation}">${text}</meta>`
    }
  );

  return input;
}

//-------------------------------------------------------

export const legacy_formattings_textLineFormats = [
  ["[Center]", "center"],
  ["[Right]", "right"],
  ["[Tabs6]", "tabs6"],
  ["[Tabs5]", "tabs5"],
  ["[Tabs4]", "tabs4"],
  ["[Tabs3]", "tabs3"],
  ["[Tabs2]", "tabs2"],
  ["[Tabs1]", "tabs1"],
  ["[Tab6]", "tabs6"],
  ["[Tab5]", "tabs5"],
  ["[Tab4]", "tabs4"],
  ["[Tab3]", "tabs3"],
  ["[Tab2]", "tabs2"],
  ["[Tab1]", "tabs1"],
  ["[LeftNum9]", "leftNum9"],
  ["[LeftNum8]", "leftNum8"],
  ["[LeftNum7]", "leftNum7"],
  ["[LeftNum6]", "leftNum6"],
  ["[LeftNum5]", "leftNum5"],
  ["[LeftNum4]", "leftNum4"],
  ["[LeftNum3]", "leftNum3"],
  ["[LeftNum2]", "leftNum2"],
  ["[LeftNum1]", "leftNum1"],
  ["[Indent]", "indent"],
].map(value => { return {
  formatInFile: value[0],
  format: value[1],
}});

function preprocessFormattings(input) {
  legacy_formattings_textLineFormats.some(lineFormat => {
    if (input.includes(lineFormat.formatInFile)) {
      input = input.replace(lineFormat.formatInFile, "").trim();
      input = `<meta f="${lineFormat.format}">${input}</meta>`;
      return true;
    }
    return false;
  });
  return input;
}

//-------------------------------------------------------

function preprocessIrmologionAndSomeStylesInner(input, formatInFile, format) {
  if (!input) return input;
  if (!input.includes(formatInFile)) return input;
  
  const inputSplit = input.split(formatInFile);
  if (inputSplit.length <= 1) return input;

  let finalResult = "";
  inputSplit.forEach((text, index) => {
    if (!text) return;
    if (index % 2 === 0) {
      finalResult += text;
    } else {
      finalResult += `<meta f="${format}">${text}</meta>`;
    }
  });
  return finalResult;
}

function preprocessIrmologionAndSomeStyles(input) {
  if (!input) return input;
  input = preprocessIrmologionAndSomeStylesInner(input, "[Irm]", "irmologion");
  input = preprocessIrmologionAndSomeStylesInner(input, "[Underline]", "underline");
  input = preprocessIrmologionAndSomeStylesInner(input, "[Italic]", "italic");
  input = preprocessIrmologionAndSomeStylesInner(input, "[Bold]", "bold");
  return input;
}

//-------------------------------------------------------

function preprocessNoteNumbers(input) {
  if (input.includes('[NoteNumber]')) {
    const splitByNoteNumber = input.split('[NoteNumber]');
    const noteNumber = splitByNoteNumber[1].trim();
    input = splitByNoteNumber[2].trim();
    input = `<meta noteNumber="${noteNumber}" isNoteBeginning="true">${input}</meta>`;
  }
  return input;
}

//-------------------------------------------------------

function postprocess(result) {
  if (!result || !result.length) return result;
  result.forEach(item => {
    if (!item) return;
    _postprocessMergeInnerToParentWhenTheSame(item);
    _postprocessMeta(item.meta, item.text);
    if (item.innerParsedTextArray && item.innerParsedTextArray.length) {
      postprocess(item.innerParsedTextArray);
    }
  });
  return result;
}

function _postprocessMeta(meta, text) {
  if (!meta) return;
  if (meta.noteNumber) {
    meta.noteNumber = meta.noteNumber; // parseInt(meta.noteNumber, 10);
  }
  if (meta.sourceId) {
    meta.sourceId = meta.sourceId; // parseInt(meta.sourceId, 10);
  }
  if (meta.letterNumber) {
    meta.letterNumber = parseInt(meta.letterNumber, 10);
    meta.isNoteBeginning = true;
    if (meta.skovorodaNoteNumber) meta.noteNumber = getNoteNumberUpperString(meta.skovorodaNoteNumber);
  }
  if (meta.fableNumber) {
    meta.fableNumber = parseInt(meta.fableNumber, 10);
    meta.isNoteBeginning = true;
    if (meta.skovorodaNoteNumber) meta.noteNumber = getNoteNumberUpperString(meta.skovorodaNoteNumber);
  }
  if (meta.songNumber) {
    meta.songNumber = parseInt(meta.songNumber, 10);
    meta.isNoteBeginning = true;
    if (meta.skovorodaNoteNumber) meta.noteNumber = getNoteNumberUpperString(meta.skovorodaNoteNumber);
  }
  if (meta.isNoteBeginning === "true") {
    meta.isNoteBeginning = true;
  }
  if (meta.link === "true") {
    meta.link = text;
  }
}

/*
EXAMPLE:
TRANSFROMS FROM:
```
[
  {
    text: 'блаженні непорочні, що йдуть своїм шляхом у законі Господньому',
    start: 0,
    meta: { f: 'italic' },
    innerParsedTextArray: [ 
      {
		    text: 'блаженні непорочні, що йдуть своїм шляхом у законі Господньому',
        start: 0,
        meta: { bible: 'ISA.118.1' },
      } 
    ]
  }
]
```
TO:
```
[
  {
    text: 'блаженні непорочні, що йдуть своїм шляхом у законі Господньому',
    start: 0,
    meta: { f: 'italic', bible: 'ISA.118.1' }
  }
]
```
*/
function _postprocessMergeInnerToParentWhenTheSame(piece) {
  if (
    piece &&
    piece.innerParsedTextArray &&
    piece.innerParsedTextArray.length === 1 &&
    piece.text === piece.innerParsedTextArray[0].text &&
    piece.start === piece.innerParsedTextArray[0].start
  ) {
    // Merge meta from inner to parent
    const innerMeta = piece.innerParsedTextArray[0].meta || {};
    piece.meta = { ...(piece.meta || {}), ...innerMeta };
    delete piece.innerParsedTextArray;
  }
}

//-------------------------------------------------------
