import { fixText } from "../../dataReaders/auxiliary";
import { getOldUaWordExplanations } from "../skDictionaryOldua";
import { NOTES_NUMBERS_SYMBOLS_MAP } from "./notesNumbersSymbols";

export const TextLineFormats = [
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
const IRM_FORMAT = "[Irm]";
const LETTER_NUMBER_FORMAT = "[LetterNumber]"; 
const SONG_NUMBER_FORMAT = "[SongNumber]"; 
const FABLE_NUMBER_FORMAT = "[FableNumber]"; 
const LETTER_NOTE_FORMAT = "[LetterNote]"; 
const SKOVORODA_NOTE_NUMBER_FORMAT = "[SkovorodaNoteNumber]"; 
const NOTE_NUMBER_FORMAT = "[NoteNumber]"; 
const MAIN_SECTION_FORMAT = "[MainSection]"; 
const HEADER2_FORMAT = "[H2]";
function getNotesRegex() { return new RegExp("[¹²³⁴⁵⁶⁷⁸⁹⁰ᵃᵇᵉᵈᵍ]+", 'g'); }
// original : "\[\d+\s—\s[А-ЯІ]+\.?\s\d+\]|\[\d+\]"
function getOurSourcesNotesRegex() { return new RegExp("\\[\\d+\\s—\\s[А-ЯІ]+\\.?\\s\\d+\\]|\\[\\d+\\]", 'giu'); }

function textToExplanations(text) {
  if (!text || !text.length) {
    return null;
  }
  const regex = /[^\s\.,;:!?\(\)\[\]{}"'\-–—«»…]+/gu;
  let match;
  const explanationsData = [];
  while ((match = regex.exec(text)) !== null) {
    const word = match[0];
    const index = match.index;
    const explanations = getOldUaWordExplanations(word);
    if (explanations) {
      const exp = explanations.explanation;
      if (exp && exp.length) {
        explanationsData.push({
          index,
          length: word.length,
          explanations: explanations,
        });
      }
    }
  }
  return explanationsData;
}

function transformLineObjectWithOldUaExplanations(lineObject, explanationsData) {
  if (explanationsData.length == 0) {
    return;
  }

  explanationsData.reverse();
  let text = lineObject.text;
  const results = [];
  explanationsData.forEach(exp => {
    if (results.length != 0) {
      results.pop();
    }
    if (!text) {
      return;
    }
    const beforeNotePart = text.substring(0, exp.index);
    const notePart = text.substring(exp.index, exp.index + exp.length);
    const afterNotePart = text.substring(exp.index + exp.length);
    results.push({ text: afterNotePart });
    results.push({ text: notePart, explanations: exp.explanations });
    results.push({ text: beforeNotePart });
    text = beforeNotePart;
  });
  results.reverse();
  lineObject.text = results;
}

function transformLineObjectWithOurSourceNotes(lineObject, notesMetadata) {
  if (notesMetadata.length == 0) {
    return;
  }

  notesMetadata.reverse();
  let text = lineObject.text;
  const results = [];
  notesMetadata.forEach(note => {
    if (results.length != 0) {
      results.pop();
    }
    if (!text) {
      return;
    }
    const beforeNotePart = text.substring(0, note.index);
    const notePart = text.substring(note.index, note.index + note.length);
    const afterNotePart = text.substring(note.index + note.length);
    results.push({ text: afterNotePart });
    results.push({ text: notePart, sourceId: note.sourceId });
    results.push({ text: beforeNotePart });
    text = beforeNotePart;
  });
  results.reverse();
  lineObject.text = results;
}

function transformLineObjectWithNotes(lineObject, notesMetadata) { 
  if (notesMetadata.length == 0) {
    return;
  }

  notesMetadata.reverse();
  let text = lineObject.text;
  const results = [];
  notesMetadata.forEach(note => {
    if (results.length != 0) {
      results.pop();
    }
    if (!text) {
      return;
    }
    const beforeNotePart = text.substring(0, note.index);
    const notePart = text.substring(note.index, note.index + note.length);
    const afterNotePart = text.substring(note.index + note.length);
    results.push({ text: afterNotePart });
    results.push({ text: notePart, noteNumber: note.notesNumber });
    results.push({ text: beforeNotePart });
    text = beforeNotePart;
  });
  results.reverse();
  lineObject.text = results;
}

function transformLineObjectWithIrmologionEtcInner(lineObject, formatInFile, format) {
  let lineObjectText = lineObject.text;
  if (!Array.isArray(lineObjectText)) {
    lineObjectText = [ { ...lineObject } ];
  }
  if (!lineObjectText.some(item => item.text.includes(formatInFile))) {
    return;
  }
  const finalResult = [];
  lineObjectText.forEach(item => {
    const irmSplit = item.text.split(formatInFile);
    if (irmSplit.length <= 1) {
      finalResult.push(item);
      return;
    }
    irmSplit.forEach((text, index) => {
      if (!text) {
        return;
      }
      if (index % 2 === 0) {
        finalResult.push({ text: text });
      } else {
        finalResult.push({ text: text, format: format });
      }
    });
  });
  lineObject.text = finalResult;
}


export function transformLineObjectWithIrmologionEtc(lineObject) {
  transformLineObjectWithIrmologionEtcInner(lineObject, IRM_FORMAT, "irmologion");
  transformLineObjectWithIrmologionEtcInner(lineObject, "[Underline]", "underline");
  transformLineObjectWithIrmologionEtcInner(lineObject, "[Italic]", "italic");
  transformLineObjectWithIrmologionEtcInner(lineObject, "[Bold]", "bold");
}

function parseNotesNumber(text) {
  let result = "";
  [...text].forEach(symbol => {
    result += NOTES_NUMBERS_SYMBOLS_MAP.get(symbol);
  });
  return result;
}

function parseSourceIdFromRegex(inputString) {
  const regex = /\[(\d+)(?:\s—\s[А-ЯІ]+\.?\s\d+)?\]/;
  const match = inputString.match(regex);
  if (match) {
    const numberMatch = match[1];
    const number = parseInt(numberMatch);
    return number;
  } 
  return 0;
}

function removeEmptyLinesAtTheEnd(parsedContent) {
  while (parsedContent.length > 0) {
    const lastLineObject = parsedContent[parsedContent.length - 1];
    if (!lastLineObject || !lastLineObject.text || (!Array.isArray(lastLineObject.text) && !lastLineObject.text.trim())) {
      parsedContent.pop();
    } else {
      break;
    }
  }
}

export function parseFileContent(content, isOldUaText) {
  
  content = fixText(content);

  const parsedContent = [];
  const parsedMainSection = [];
  const parsedAfterMainSection = [];
  let lastNoteNumber = undefined;
  let isMainSection = false;
  let isMainSectionMode = false;
  let isAllIsList = false;

  content.split('\n').forEach(line => {

    const isEmptyLine = !line || !(line.trim());
    const lineObject = { text: line };

    TextLineFormats.some(lineFormat => {
      if (lineObject.text.includes(lineFormat.formatInFile)) {
        lineObject.text = lineObject.text.replace(lineFormat.formatInFile, "").trim();
        lineObject.format = lineFormat.format;
        return true;
      }
      return false;
    });

    if (lastNoteNumber) {
      lineObject.noteNumber = lastNoteNumber;
    }

    if (lineObject.text.includes("[AllIsList]")) {
      isAllIsList = true;
      return;
    }

    if (lineObject.text.includes("[LINK]")) {
      const linkRegex = /\[LINK\](.*?)(?:\[LINK_SEPARATOR\](.*?))?\[LINK\]/g;
      const matches = [...lineObject.text.matchAll(linkRegex)];
      if (matches.length > 0) {
        const parts = [];
        let lastIndex = 0;
    
        matches.forEach(match => {
          const url = match[1];
          const text = match[2] || url;
          const startIndex = match.index;
    
          // Add text before the link
          if (startIndex > lastIndex) {
            const beforeLink = lineObject.text.substring(lastIndex, startIndex);
            if (beforeLink && beforeLink.length) {
              parts.push({ text: beforeLink });
            }
          }
    
          // Add the link
          parts.push({ text, url, isLink: true });
    
          // Update the last index
          lastIndex = startIndex + match[0].length;
        });
    
        // Add text after the last link
        const afterLink = lineObject.text.substring(lastIndex);
        if (afterLink && afterLink.length) {
          parts.push({ text: afterLink });
        }
    
        // Update lineObject.text with the processed parts
        lineObject.text = parts;
      }
    }

    if (lineObject.text.includes("[BIBLE]")) {
      const bibleRegex = /\[BIBLE\](.*?)(?:\[X\](.*?))?\[BIBLE\]/g;
      const matches = [...lineObject.text.matchAll(bibleRegex)];
      if (matches.length > 0) {
        const parts = [];
        let lastIndex = 0;
    
        matches.forEach(match => {
          const bibleCode = match[1];
          const text = match[2];
          const startIndex = match.index;
    
          // Add text before
          if (startIndex > lastIndex) {
            const beforeLink = lineObject.text.substring(lastIndex, startIndex);
            if (beforeLink && beforeLink.length) {
              parts.push({ text: beforeLink });
            }
          }
    
          // Add the bible text
          const bibleObj = { text, bibleCode: bibleCode };
          if (typeof bibleCode === 'string') {
            if (bibleCode.endsWith('.EXACT')) {
              bibleObj.bibleCode = bibleCode.replace(/\.EXACT$/, '');
              bibleObj.bibleType = 1;
            } else if (bibleCode.endsWith('.NOT_EXACT')) {
              bibleObj.bibleCode = bibleCode.replace(/\.NOT_EXACT$/, '');
              bibleObj.bibleType = 2;
            } else if (bibleCode.endsWith('.PARAPHRASE')) {
              bibleObj.bibleCode = bibleCode.replace(/\.PARAPHRASE$/, '');
              bibleObj.bibleType = 3;
            }
          }
          parts.push(bibleObj);
    
          // Update the last index
          lastIndex = startIndex + match[0].length;
        });
    
        // Add text after 
        const afterLink = lineObject.text.substring(lastIndex);
        if (afterLink && afterLink.length) {
          parts.push({ text: afterLink });
        }
    
        // Update lineObject.text with the processed parts
        lineObject.text = parts;
      }
    }
    
    if (lineObject.text.includes(LETTER_NOTE_FORMAT)) {
      const splitByLetterNote = lineObject.text.split(LETTER_NOTE_FORMAT);
      lineObject.noteNumber = "0";
      const s2 = splitByLetterNote[1].trim();
      const splitByLetterNumber = s2.split(LETTER_NUMBER_FORMAT);
      lineObject.letterNumber = +(splitByLetterNumber[1].trim());
      lineObject.text = splitByLetterNumber[2].trim();
      lineObject.isNoteBeginning = true;
    }

    if (lineObject.text.includes(HEADER2_FORMAT)) {
      lineObject.text = lineObject.text.replace(HEADER2_FORMAT, "").trim();
      lineObject.format = "header2";
    }

    if (lineObject.text.includes(SKOVORODA_NOTE_NUMBER_FORMAT)) {
      const splitByNoteNumber = lineObject.text.split(SKOVORODA_NOTE_NUMBER_FORMAT);
      lineObject.noteNumber = splitByNoteNumber[1].trim();
      const s2 = splitByNoteNumber[2].trim();
      if (s2.includes(LETTER_NUMBER_FORMAT)) {
        const splitByLetterNumber = s2.split(LETTER_NUMBER_FORMAT);
        lineObject.letterNumber = +(splitByLetterNumber[1].trim());
        lineObject.text = splitByLetterNumber[2].trim();
        lineObject.isNoteBeginning = true;
      } else if (s2.includes(SONG_NUMBER_FORMAT)) {
        const splitBySongNumber = s2.split(SONG_NUMBER_FORMAT);
        lineObject.songNumber = +(splitBySongNumber[1].trim());
        lineObject.text = splitBySongNumber[2].trim();
        lineObject.isNoteBeginning = true;
      } else if (s2.includes(FABLE_NUMBER_FORMAT)) {
        const splitByFableNumber = s2.split(FABLE_NUMBER_FORMAT);
        lineObject.fableNumber = +(splitByFableNumber[1].trim());
        lineObject.text = splitByFableNumber[2].trim();
        lineObject.isNoteBeginning = true;
      }
    }

    if (lineObject.text.includes(NOTE_NUMBER_FORMAT)) {
      const splitByNoteNumber = lineObject.text.split(NOTE_NUMBER_FORMAT);
      lineObject.noteNumber = splitByNoteNumber[1].trim();
      lineObject.isNoteBeginning = true;
      lineObject.text = splitByNoteNumber[2].trim();
      lastNoteNumber = lineObject.noteNumber;
    }

    if (!isEmptyLine && lineObject.text.includes(MAIN_SECTION_FORMAT)) {
      isMainSection = !isMainSection;
      isMainSectionMode = true;
      return;
    }

    if (!isEmptyLine) {

      // Source notes like [29 — C. 101] or [3]
      const outSourcesNotesRegex = getOurSourcesNotesRegex();
      const sourcesNotesMetadata = [];
      while(true) {
        const regexResults = outSourcesNotesRegex.exec(lineObject.text);
        if (!regexResults) {
          break;
        }
        regexResults.forEach(regexResult => {
          const index = outSourcesNotesRegex.lastIndex;
          const sourceId = parseSourceIdFromRegex(regexResult);
          if (!sourceId) {
            return;
          }
          const noteMetadata = { 
            sourceId: sourceId, 
            index: index - regexResult.length, 
            length: regexResult.length 
          };
          sourcesNotesMetadata.push(noteMetadata);
        });
      }
      if (sourcesNotesMetadata.length) {
        transformLineObjectWithOurSourceNotes(lineObject, sourcesNotesMetadata);
      } 

      const notesRegex = getNotesRegex();
      const notesMetadata = [];
      const lineObjectArray = Array.isArray(lineObject.text) ? lineObject.text : [lineObject];
      lineObjectArray.forEach(subLineObject => {
        while(true) {
          const regexResults = notesRegex.exec(subLineObject.text);
          if (!regexResults) {
            break;
          } 
          regexResults.forEach(regexResult => {
            const index = notesRegex.lastIndex;
            const notesNumber = parseNotesNumber(regexResult);
            const noteMetadata = { notesNumber: notesNumber, index: index - regexResult.length, length: regexResult.length };
            notesMetadata.push(noteMetadata);
          });
        }
        if (notesMetadata.length) {
          transformLineObjectWithNotes(subLineObject, notesMetadata);
        } 
      });
      if (Array.isArray(lineObject.text)) {
        lineObject.text = lineObject.text.flatMap(sub => Array.isArray(sub.text) ? sub.text : [sub]);
      }
      
      
      // --
      if (isOldUaText && lineObject.text && lineObject.text.length) {
        if (typeof lineObject.text === 'string') {
          const explanationsData = textToExplanations(lineObject.text);
          if (explanationsData.length) {
            transformLineObjectWithOldUaExplanations(lineObject, explanationsData);
          }
        } else if (Array.isArray(lineObject.text)) {
          lineObject.text = lineObject.text.map(subLineObject => {
            if (!subLineObject.text || !subLineObject.text.length) {
              return [subLineObject];
            }
            const explanationsData = textToExplanations(subLineObject.text);
            if (!explanationsData.length) {
              return [subLineObject];
            }
            transformLineObjectWithOldUaExplanations(subLineObject, explanationsData);
            return subLineObject.text;
          }).flat();
        }
      }
      // --
    }

    if (!isEmptyLine) {
      transformLineObjectWithIrmologionEtc(lineObject);
    }

    if (parsedContent.length || parsedMainSection.length || parsedAfterMainSection.length || !isEmptyLine) {
      if (!isMainSectionMode) {
        parsedContent.push(lineObject);
      } else if (isMainSection) {
        parsedMainSection.push(lineObject);
      } else if (!isMainSection) {
        parsedAfterMainSection.push(lineObject);
      }
    }
  });

  if (!isMainSectionMode) {
    removeEmptyLinesAtTheEnd(parsedContent);
  } else {
    removeEmptyLinesAtTheEnd(parsedAfterMainSection);
  }
 
  if (isMainSectionMode) {
    return {
      beforeMain: parsedContent,
      main: parsedMainSection,
      afterMain: parsedAfterMainSection,
    };
  }

  if (parsedContent.length) {
    parsedContent[0].isAllIsList = isAllIsList;
  }

  return parsedContent;
}
