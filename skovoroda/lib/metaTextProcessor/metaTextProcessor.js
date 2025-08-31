
import { xmlHelper_parseMetaTagsWithTextAndNesting } from "./xmlHelper";
import { getOldUaWordExplanations } from "../data/skDictionaryOldua";
import { processTextViaDictionary } from "./dictionaryTextProcessor";

/**
 * 
 * INPUT: (content: string, isOldUaText: boolean)
 * OUTPUT: { meta: Object, lines: Array<ParsedLine> }
 * 
 * ParsedLine might be:
 * - "EMPTY_LINE"
 * - "MAIN_SECTION_BEGIN"
 * - "MAIN_SECTION_END"
 * - Array<ParsedPieceOfLineObject>
 * 
 * ParsedPieceOfLineObject contains:
 * - text: string (piece of text in line)
 * - meta: object (metadata about piece of text in line)
 * - start: number (index of text in line)
 * - innerParsedTextArray: Array<ParsedPieceOfLineObject> (nested parsed text objects)
 */
export function metaTextProcessor(content, isOldUaText) {

  // VALIDATION {
  if (!content || !content.trim() || typeof content !== "string") return [];
  // VALIDATION }

  const globalContentMeta = {};
  let isMainSection = false;

  let parsedLines = content.split('\n').map(line => {

    // EMPTY LINE {
    const isEmptyLine = !line || !(line.trim().length);
    if (isEmptyLine) return 'EMPTY_LINE';
    // EMPTY LINE }

    // MAIN SECTION {
    if (line.includes("[MainSection]")) {
      isMainSection = !isMainSection;
      return isMainSection ? "MAIN_SECTION_BEGIN" : "MAIN_SECTION_END";
    }
    // MAIN SECTION }

    // ALL IS LIST {
    if (line.includes('[AllIsList]')) {
      globalContentMeta.isAllIsList = true;
      return null; // SKIP THIS LINE
    }
    // ALL IS LIST }

    if (line.includes('[FOUNTAIN]')) {
      return "FOUNTAIN";
    }

    const parsedLineObjects = xmlHelper_parseMetaTagsWithTextAndNesting(line);
    if (!parsedLineObjects || !parsedLineObjects.length) return 'EMPTY_LINE';
    return parsedLineObjects;

  }).filter(parsedLine => parsedLine !== null && parsedLine !== undefined);

  // FEATURE: DICTIONARY {
  if (isOldUaText) {
    parsedLines = _processDictionary(parsedLines);
  }
  // FEATURE: DICTIONARY }

  // CLEANING {
  parsedLines = _removeEmptyLinesAtTheEnd(parsedLines);
  // CLEANING }

  return {
    meta: globalContentMeta,
    lines: parsedLines
  };
}

function _processDictionary(parsedLines) {
  const dictionary = {
    getWordExplanations: getOldUaWordExplanations,
  };
  return processTextViaDictionary(parsedLines, dictionary);
}

function _removeEmptyLinesAtTheEnd(parsedLines) {
  if (!parsedLines) return parsedLines;
  while (parsedLines.length > 0) {
    const lastParsedLine = parsedLines[parsedLines.length - 1];
    if (!lastParsedLine || lastParsedLine === "EMPTY_LINE") {
      parsedLines.pop();
    } else {
      break;
    }
  }
  return parsedLines;
}