import { isNewTestamentBibleCode } from "../../shared/bible";

/** Calculates statistics for already parsed textContent (see parseFileContent output structure)
Returns: {
  bibleCitations: [ { bibleCode, bibleType?, translation?, text? }, ... ], // every occurrence preserved
  words: [ 'word1', 'word2', ... ], // every single word (duplicates kept, original case preserved)
  textTotalWordsCount: number,
  textTotalSentencesCount: number, // heuristic based on punctuation .?!…
  textTotalCharactersCount: number // non-whitespace (spaces, tabs, newlines) characters count
}
*/ 
export function calculateTextStatistics(textContent) {
  if (!textContent) {
    return {
      bibleCitations: [],
      words: [],
      textTotalWordsCount: 0,
      textTotalSentencesCount: 0,
      textTotalCharactersCount: 0,
    };
  }

  // If object with beforeMain/main/afterMain -> merge into array
  if (!Array.isArray(textContent)) {
    const merged = [];
    ['beforeMain', 'main', 'afterMain'].forEach(k => {
      if (textContent[k] && Array.isArray(textContent[k])) {
        merged.push(...textContent[k]);
      }
    });
    textContent = merged;
  }

  if (!Array.isArray(textContent)) {
    return {
      bibleCitations: [],
      words: [],
      textTotalWordsCount: 0,
      textTotalSentencesCount: 0,
      textTotalCharactersCount: 0,
    };
  }

  const bibleCitations = [];
  const words = [];
  const sentenceSourceParts = [];

  // Fallback word regex without Unicode property escapes (covers Latin + Cyrillic + digits)
  // Allows internal apostrophes/dashes.
  const wordRegex = /[A-Za-zÀ-ÖØ-öø-ÿĀ-žƠ-ỹЀ-ӿҐґЇїІіЄєЁёА-Яа-я0-9]+(?:['’ʼ-][A-Za-zÀ-ÖØ-öø-ÿĀ-žƠ-ỹЀ-ӿҐґЇїІіЄєЁёА-Яа-я0-9]+)*/g;

  function processTextString(str) {
    if (!str || !str.trim()) return;
    sentenceSourceParts.push(str);
    let match;
    while ((match = wordRegex.exec(str)) !== null) {
      words.push(match[0]);
    }
  }

  function processLineObject(lineObj) {
    if (!lineObj) return;

    if (lineObj.bibleCode && !lineObj.isContinue) {
      bibleCitations.push({
        bibleCode: lineObj.bibleCode,
        bibleType: lineObj.bibleType,
        translation: lineObj.translation,
        text: typeof lineObj.text === 'string' ? lineObj.text : undefined,
      });
    }

    const lineText = lineObj.text;
    if (Array.isArray(lineText)) {
      lineText.forEach(part => {
        if (!part) return;
        if (part.bibleCode && !part.isContinue) {
          const citation = {
            bibleCode: part.bibleCode,
          };
          if (part.translation) {
            citation.translation = part.translation;
          }
          if (part.text && typeof part.text === 'string') {
            citation.text = part.text;
          }
          if (part.bibleType) {
            citation.bibleType = part.bibleType;
          }
          bibleCitations.push(citation);
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

  const fullText = sentenceSourceParts.join('\n');

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

  const textTotalCharactersCount = fullText.replace(/\s/g, '').length;

  return {
    bibleCitations,
    bibleStatistics: calculateBibleStatistics(bibleCitations),
    words,
    textTotalWordsCount: words.length,
    textTotalSentencesCount,
    textTotalCharactersCount,
  };
}

function calculateBibleStatistics(bibleCitations) {
  if (!bibleCitations || !bibleCitations.length) {
    return {
      newTestamentCitationsCount: 0,
      oldTestamentCitationsCount: 0,
      bibleQuotesByPopularity: [],
      bibleBooksByPopularity: [],
    };
  }

  const newTestamentCitationsCount = bibleCitations
    .filter(citation => isNewTestamentBibleCode(citation.bibleCode))
    .length;

  const oldTestamentCitationsCount = bibleCitations.length - newTestamentCitationsCount;

  const bibleQuotesByPopularityTmp = new Map();
  bibleCitations.forEach(citation => {
    bibleQuotesByPopularityTmp.set(citation.bibleCode, (bibleQuotesByPopularityTmp.get(citation.bibleCode) || 0) + 1);
  });
  const bibleQuotesByPopularity = Array.from(bibleQuotesByPopularityTmp.entries()).map(([key, count]) => ({ key, count }));
  bibleQuotesByPopularity.sort((a,b) => a.count < b.count ? 1 : -1); // Sort by count descending

  const bibleBooksByPopularityTmp = new Map();
  bibleCitations.forEach(citation => {
    const bibleBookCode = citation.bibleCode.split('.')[0];
    bibleBooksByPopularityTmp.set(bibleBookCode, (bibleBooksByPopularityTmp.get(bibleBookCode) || 0) + 1);
  });
  const bibleBooksByPopularity = Array.from(bibleBooksByPopularityTmp.entries()).map(([key, count]) => ({ key, count })); 
  bibleBooksByPopularity.sort((a,b) => a.count < b.count ? 1 : -1); // Sort by count descending

  return {
    newTestamentCitationsCount,
    oldTestamentCitationsCount,
    bibleQuotesByPopularity,
    bibleBooksByPopularity,
  };
}

