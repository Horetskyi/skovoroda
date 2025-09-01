
export function processTextViaDictionary(parsedLines, dictionary) {
  
  if (!parsedLines || !parsedLines.length) return parsedLines;
  
  const newParsedLines = parsedLines.map(parsedLine => {
    
    if (!Array.isArray(parsedLine)) return parsedLine;

    const newParsedLine = parsedLine.map(pieceOfLine => {
      const newPieceOfLine = _processPiece(pieceOfLine, dictionary);
      return newPieceOfLine ? newPieceOfLine : pieceOfLine;
    });
    return newParsedLine ? newParsedLine : parsedLine;
  });
  return newParsedLines;
}

function _processPiece(pieceOfLine, dictionary) {
  if (!dictionary) return null;
  if (!pieceOfLine.text || !pieceOfLine.text.length) return null;
  if (typeof pieceOfLine.text !== 'string') return null;

  if (pieceOfLine.innerParsedTextArray && pieceOfLine.innerParsedTextArray.length) {
    // PROCESS TREE ROOTS {
    const newInnerParsedTextArray = pieceOfLine.innerParsedTextArray.map(innerPiece => {
      const newInnerPiece = _processPiece(innerPiece, dictionary);
      return newInnerPiece ? newInnerPiece : innerPiece;
    });
    return { ...pieceOfLine, innerParsedTextArray: newInnerParsedTextArray };
    // PROCESS TREE ROOTS }
  } else {
    // PROCESS TREE LEAVES {
    const explanationsData = _textToExplanations(pieceOfLine.text, dictionary);
    if (explanationsData && explanationsData.length) {
      const newPieceOfLine = _transformPieceOfLineWithOldUaExplanations(pieceOfLine, explanationsData);
      return newPieceOfLine;
    }
    return null;
    // PROCESS TREE LEAVES }
  }
}

function _textToExplanations(text, dictionary) {
  if (!text || !text.length) return null;
  if (!dictionary || !dictionary.getWordExplanations) return null;
  const regex = /[^\s\.,;:!?\(\)\[\]{}"–—«»…]+/gu;
  let match;
  const explanationsData = [];
  while ((match = regex.exec(text)) !== null) {
    const word = match[0];
    const index = match.index;
    const explanations = dictionary.getWordExplanations(word);
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

function _transformPieceOfLineWithOldUaExplanations(pieceOfLine, explanationsData) {
  if (explanationsData.length == 0) return null;

  // CREATE NEW INNER ARRAY {
  let text = pieceOfLine.text;
  const newInnerParsedTextArray = [];

  explanationsData.reverse();
  explanationsData.forEach(exp => {
    if (newInnerParsedTextArray.length != 0) newInnerParsedTextArray.pop();
    if (!text) return;
    const beforeNotePart = text.substring(0, exp.index);
    const notePart = text.substring(exp.index, exp.index + exp.length);
    const afterNotePart = text.substring(exp.index + exp.length);
    if (afterNotePart && afterNotePart.length) {
      newInnerParsedTextArray.push({ 
        text: afterNotePart,
        start: pieceOfLine.start + exp.index + exp.length,
      });
    }
    newInnerParsedTextArray.push({ 
      text: notePart, 
      start: pieceOfLine.start + exp.index,
      meta: {
        explanations: exp.explanations
      },
    });
    newInnerParsedTextArray.push({ 
      text: beforeNotePart,
      start: pieceOfLine.start,
    });
    text = beforeNotePart;
  });
  newInnerParsedTextArray.reverse();
  // CREATE NEW INNER ARRAY }

  const newPieceOfLine = {
    text: pieceOfLine.text ? pieceOfLine.text : "",
    innerParsedTextArray: newInnerParsedTextArray,
  };
  if (pieceOfLine.start !== undefined && pieceOfLine.start !== null) {
    newPieceOfLine.start = pieceOfLine.start;
  }
  if (pieceOfLine.meta) {
    newPieceOfLine.meta = pieceOfLine.meta;
  }
  return newPieceOfLine;
}
