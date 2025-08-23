import { isNewTestamentBibleCode, parseBibleCodeInCitation } from "../../shared/bible";
import { readBibleVerse } from "./bibleReader";

const emptyTextStatistics = {
  bibleCitations: [],
  words: [],
};

// Fallback word regex without Unicode property escapes (covers Latin + Cyrillic + digits)
// Allows internal apostrophes/dashes.
const wordRegex = /[A-Za-zÀ-ÖØ-öø-ÿĀ-žƠ-ỹЀ-ӿҐґЇїІіЄєЁёА-Яа-я0-9]+(?:['’ʼ-][A-Za-zÀ-ÖØ-öø-ÿĀ-žƠ-ỹЀ-ӿҐґЇїІіЄєЁёА-Яа-я0-9]+)*/g;

/**
EXTRA NOTES:

http://www.archivioalbani.it/index.php?id=30622#:~:text=The%20first%20verse%20reads%20%22Inveni,go%20make%20sport%20of%20others.%22
Латинська епіграма і її джерела (Inveni portum...)
До твору Легко бути блаженним

емблематика
- амстердамська збірка «Symbola et emblemata» (1705)
- Емвлемы и сѵмволы избранные. – Санкт-Петербург, 1788. – С. 26–27
- збірника Германа Гуго «Рiа desideria» (Антверпен, 1624)

молитовні тексти
- Могила П. Євхологіон, албо Молитвослов или Требник. – Київ, 1646. – С. 930
- Октоїх, сирѣчь Осмогласник. – Київ, 1739. – Арк. 13 (зв.)

Отці Церкви / Патристика

Апокрифи

Орнітологія

Фольклор
- прислів'я 

Канонічне право
- “Номоканон, си єст Законоправилник” (Київ, 1629) - збірка церковних і візантійських правових норм у слов’янському перекладі, яка активно використовувалася в Київській митрополії XVII ст.

Поезія та поетика
- Поетика Києво-Могилянської академії ³⁵⁴
- Барокова духовна поезія ³⁷⁵

 */

/** 
Calculates statistics for already parsed textContent (see parseFileContent output structure)
Returns: {
  bibleCitations: [ { bibleCode, bibleType?, translation?, text? }, ... ], // every occurrence preserved
  bibleStatistics: ??
  words: [ 'word1', 'word2', ... ], // every single word (duplicates kept, original case preserved)
  textTotalWordsCount: number,
  textTotalSentencesCount: number, // heuristic based on punctuation .?!…
  textTotalCharactersCount: number // non-whitespace (spaces, tabs, newlines) characters count
}
Future enhancements:
- Don't count persons e.g. "Наеман. ..." in dialog as sentences to make statistics more useful.
- Ensure diacritics handled correctly
- Uncover text like "Наем[ан]" to "Наеман"
- Language analysis e.g. 20 words greek, 30 words hebrew, etc.
*/
export function calculateTextStatistics(textContent) {
  const isStatsFeatureEnabled = true;
  if (!isStatsFeatureEnabled) return null;

  if (!textContent) return emptyTextStatistics;
  textContent = normalizeTextContent(textContent);
  if (!Array.isArray(textContent)) return emptyTextStatistics;

  const { fullText, words, bibleCitations } = receiveMoreDetailedInfoFromTextContent(textContent);

  const textTotalSentencesCount = calculateSentencesCount(fullText);
  const textTotalCharactersCount = calculateCharactersCount(fullText);
  const bibleStatistics = calculateBibleStatistics(bibleCitations);
  const textTotalWordsCount = words.length;

  const textTotals = {
    textTotalSentencesCount,
    textTotalCharactersCount,
    textTotalWordsCount
  };
  const bibleTotalRatios = _getRatiosObject(bibleStatistics.totalTotals, textTotals);
  const bibleOldTestamentRatios = _getRatiosObject(bibleStatistics.oldTestamentTotals, textTotals);
  const bibleNewTestamentRatios = _getRatiosObject(bibleStatistics.newTestamentTotals, textTotals);

  const textFromBible = prepareTextFromBible(bibleCitations);

  return {
    bibleCitations,
    bibleStatistics,
    words,
    textTotalWordsCount,
    textTotalSentencesCount,
    textTotalCharactersCount,
    bibleTotalRatios,
    bibleOldTestamentRatios,
    bibleNewTestamentRatios,
    textFromBible
  };
}

function _getRatiosObject(bibleStats, totalStats) {
  const bibleSentencesRatio = bibleStats.bibleCitationsTotalSentencesCount / totalStats.textTotalSentencesCount;
  const bibleCharactersRatio = bibleStats.bibleCitationsTotalCharactersCount / totalStats.textTotalCharactersCount;
  const bibleWordsRatio = bibleStats.bibleCitationsTotalWordsCount / totalStats.textTotalWordsCount;
  const bibleCitationsSmartRatio = (bibleSentencesRatio + bibleCharactersRatio + bibleWordsRatio) / 3;
  return {
    bibleSentencesRatio,
    bibleCharactersRatio,
    bibleWordsRatio,
    bibleCitationsSmartRatio
  };
}

function prepareTextFromBible(bibleCitations) {
  const bibleCitationsDistinctByVerseCode = Array.from(new Map(bibleCitations.map(c => [c.bookCode + c.chapter + c.verse, c])).values());
  return bibleCitationsDistinctByVerseCode.map(citation => {
    const verseTextUTT = readBibleVerse(citation.bookCode, citation.chapter, citation.verse, 'utt');
    const verseTextELZS = readBibleVerse(citation.bookCode, citation.chapter, citation.verse, 'elzs');
    return {
      textUtt: verseTextUTT,
      textElzs: verseTextELZS,
      bookCode: citation.bookCode,
      chapter: citation.chapter,
      verse: citation.verse
    };
  }).filter(obj => (obj.textUtt && obj.textUtt.length) || (obj.textElzs && obj.textElzs.length));
}

function calculateWordsStatistics(words) {
  return {
    wordsCount: words.length
  };
}

function calculateBibleStatistics(bibleCitations) {
  if (!bibleCitations || !bibleCitations.length) {
    return {
      bibleVersesByPopularity: [],
      bibleBooksByPopularity: [],
    };
  }

  const newTestamentCitationsCount = bibleCitations
    .filter(citation => isNewTestamentBibleCode(citation.bibleCode))
    .length;

  const oldTestamentCitationsCount = bibleCitations.length - newTestamentCitationsCount;

  const bibleVersesByPopularityTmp = new Map();
  bibleCitations.forEach(citation => {
    bibleVersesByPopularityTmp.set(citation.bibleCode, (bibleVersesByPopularityTmp.get(citation.bibleCode) || 0) + 1);
  });
  const bibleVersesByPopularity = Array.from(bibleVersesByPopularityTmp.entries()).map(([key, count]) => ({ key, count }));
  bibleVersesByPopularity.sort((a,b) => a.count < b.count ? 1 : -1); // Sort by count descending

  const bibleBooksByPopularityTmp = new Map();
  bibleCitations.forEach(citation => {
    const bibleBookCode = citation.bibleCode.split('.')[0];
    bibleBooksByPopularityTmp.set(bibleBookCode, (bibleBooksByPopularityTmp.get(bibleBookCode) || 0) + 1);
  });
  const bibleBooksByPopularity = Array.from(bibleBooksByPopularityTmp.entries()).map(([key, count]) => ({ key, count })); 
  bibleBooksByPopularity.sort((a,b) => a.count < b.count ? 1 : -1); // Sort by count descending

  const totalTotals = _calculateBibleTotals(bibleCitations);
  const oldTestamentTotals = _calculateBibleTotals(bibleCitations.filter(c => !isNewTestamentBibleCode(c.bibleCode)));
  const newTestamentTotals = _calculateBibleTotals(bibleCitations.filter(c => isNewTestamentBibleCode(c.bibleCode)));

  return {
    newTestamentCitationsCount,
    oldTestamentCitationsCount,
    bibleVersesByPopularity,
    bibleBooksByPopularity,
    totalTotals,
    oldTestamentTotals,
    newTestamentTotals,
  };
}

function _calculateBibleTotals(bibleCitations) {
  const bibleCitationsDistinctBySentenceIndex = Array.from(new Map(bibleCitations.map(c => [c.sentenceIndex, c])).values());
  return {
    bibleCitationsTotalSentencesCount: bibleCitationsDistinctBySentenceIndex.length,
    bibleCitationsTotalCharactersCount: calculateCharactersCount(bibleCitations.map(c => c.text).join('')),
    bibleCitationsTotalWordsCount: (bibleCitations.map(c => c.text).join(' ').match(wordRegex) || []).length,
  };
}

/** Tech */
function calculateCharactersCount(text) {
  if (!text || !text.length) return 0;
  return text.replace(/\s/g, '').length;
}

/** Tech */
function calculateSentencesCount(fullText) {
  // Sentence counting (no lookbehind):
  // Increment when we see a terminator (.?!…) followed by:
  //  - end of string
  //  - whitespace then a capital (Latin/Cyrillic) or digit
  // Fallback: at least 1 sentence if there is any text without terminators.
  let textTotalSentencesCount = 0;
  if (fullText.trim().length) {
    const terminators = '.!?…';
    for (let i = 0; i < fullText.length; i++) {
      const ch = fullText[i];
      if (terminators.includes(ch)) {
        // Look ahead
        let j = i + 1;
        while (j < fullText.length && /\s/.test(fullText[j])) j++;
        if (j >= fullText.length) {
          textTotalSentencesCount++;
        } else {
          const next = fullText[j];
            // Uppercase Latin/Cyrillic or digit or opening quote
          if (/[A-ZА-ЯЁЇІЄҐ0-9"«“„]/.test(next)) {
            textTotalSentencesCount++;
          }
        }
      }
    }
    if (textTotalSentencesCount === 0) {
      // No terminators found but text exists -> treat as one sentence
      textTotalSentencesCount = 1;
    }
  }
  return textTotalSentencesCount;
}

/** Tech. Private. */
function receiveMoreDetailedInfoFromTextContent(textContent) {
  const bibleCitations = [];
  const words = [];
  let fullText = '';
  let sentenceIndex = 0;
  const terminators = '.!?…';

  function processTextString(str) {
    if (!str || !str.trim()) return;
    if (fullText.length > 0) fullText += '\n';
    fullText += str;
    let i = 0;
    while (i < str.length) {
      // Word detection
      wordRegex.lastIndex = i;
      const match = wordRegex.exec(str);
      if (match && match.index === i) {
        words.push({ word: match[0], sentenceIndex });
        i += match[0].length;
        continue;
      }
      // Sentence boundary detection
      if (terminators.includes(str[i])) {
        // Look ahead for sentence boundary
        let j = i + 1;
        while (j < str.length && /\s/.test(str[j])) j++;
        if (j >= str.length) {
          sentenceIndex++;
        } else {
          const next = str[j];
          if (/[A-ZА-ЯЁЇІЄҐ0-9"«“„]/.test(next)) {
            sentenceIndex++;
          }
        }
      }
      i++;
    }
  }

  function processLineObject(lineObj) {
    if (!lineObj) return;
    if (lineObj.bibleCode) {
      _addBibleCitation(lineObj, sentenceIndex, bibleCitations);
    }
    const lineText = lineObj.text;
    if (Array.isArray(lineText)) {
      lineText.forEach(part => {
        if (!part) return;
        if (part.bibleCode) {
          _addBibleCitation(part, sentenceIndex, bibleCitations);
        }
        if (typeof part.text === 'string') {
          processTextString(part.text);
        }
      });
    } else if (typeof lineText === 'string') {
      if (lineText.trim() === '[FOUNTAIN]') return;
      processTextString(lineText);
    }
  }

  textContent.forEach(processLineObject);

  const normalizedBibleCitations = _mergeBibleCitations(bibleCitations);

  return {
    fullText,
    words,
    bibleCitations: normalizedBibleCitations
  };
}

/** Tech. Private. */
function _addBibleCitation(obj, sentenceIndex, bibleCitations) {
  if (!obj.bibleCode || !obj) return;
  const citation = {
    bibleCode: obj.bibleCode,
    sentenceIndex
  };
  if (obj.translation) {
    citation.translation = obj.translation;
  }
  if (obj.text && typeof obj.text === 'string') {
    citation.text = obj.text;
  }
  if (obj.bibleType) {
    citation.bibleType = obj.bibleType;
  }
  if (obj.isContinue) {
    citation.isContinue = obj.isContinue;
  }
  parseBibleCodeInCitation(citation);
  bibleCitations.push(citation);
}

/** Tech. Private. */
function _mergeBibleCitations(bibleCitations) {
  const result = [];
  bibleCitations.forEach(citation => {
    if (citation.isContinue) {
      const last = result[result.length - 1];
      last.text += ` ${citation.text}`;
    } else {
      result.push({...citation});
    }
  });
  return result;
}

/** Tech. Private. */
function normalizeTextContent(textContent) {
  if (!Array.isArray(textContent)) {
    const merged = [];
    ['beforeMain', 'main', 'afterMain'].forEach(k => {
      if (textContent[k] && Array.isArray(textContent[k])) {
        merged.push(...textContent[k]);
      }
    });
    textContent = merged;
  }
  return textContent;
}
