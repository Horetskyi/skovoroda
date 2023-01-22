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
const NOTE_NUMBER_FORMAT = "[NoteNumber]"; 
const MAIN_SECTION_FORMAT = "[MainSection]"; 
function getNotesRegex() { return new RegExp("[¹²³⁴⁵⁶⁷⁸⁹⁰]+", 'g'); }


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
  transformLineObjectWithIrmologionEtcInner(lineObject, "[Italic]", "italic");
}

function parseNotesNumber(text) {
  let result = "";
  [...text].forEach(symbol => {
    result += NOTES_NUMBERS_SYMBOLS_MAP.get(symbol);
  });
  return +result;
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

export function parseFileContent(content) {
  
  const parsedContent = [];
  const parsedMainSection = [];
  const parsedAfterMainSection = [];
  let lastNoteNumber = undefined;
  let isMainSection = false;
  let isMainSectionMode = false;

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

    if (lineObject.text.includes(NOTE_NUMBER_FORMAT)) {
      const splitByNoteNumber = lineObject.text.split(NOTE_NUMBER_FORMAT);
      lineObject.noteNumber = +(splitByNoteNumber[1].trim());
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
      const notesRegex = getNotesRegex();
      const notesMetadata = [];
      while(true) {
        const regexResults = notesRegex.exec(lineObject.text);
        if (regexResults) {
          regexResults.forEach(regexResult => {
            const index = notesRegex.lastIndex;
            const notesNumber = parseNotesNumber(regexResult);
            const noteMetadata = { notesNumber: notesNumber, index: index - regexResult.length, length: regexResult.length };
            notesMetadata.push(noteMetadata);
          });
        } else {
          break;
        }
      }
      if (notesMetadata.length) {
        transformLineObjectWithNotes(lineObject, notesMetadata);
      } 
    }

    if (!isEmptyLine) {
      transformLineObjectWithIrmologionEtc(lineObject);
    }

    if (parsedContent.length || !isEmptyLine) {
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
      afterMain: parsedAfterMainSection
    };
  }

  return parsedContent;
}
