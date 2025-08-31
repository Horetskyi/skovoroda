
function metaTextForEachLinePieceInner(lineFunc, lines, depth) {

  if (!lines || !lines.length) return;
  if (depth && depth >= 50) return;
  if (!depth) depth = 1;

  lines.forEach(line => {
    if (!line) return;
    if (!Array.isArray(line)) line = [line];
    line.forEach(piece => {
      lineFunc(piece);
      if (piece.innerParsedTextArray) {
        metaTextForEachLinePieceInner(lineFunc, piece.innerParsedTextArray, depth + 1);
      }
    });
  });
}

export function metaTextForEachLinePiece(metaText, lineFunc) {
  if (!metaText) return null;
  metaTextForEachLinePieceInner(lineFunc, metaText.lines);
}

function metaTextSomeLinePieceInner(lineFunc, lines, depth) {

  if (!lines || !lines.length) return false;
  if (depth && depth >= 50) return false;
  if (!depth) depth = 1;

  return lines.some(line => {
    if (!line) return false;
    const isFound = lineFunc(line);
    if (isFound) return true;
    if (line.innerParsedTextArray) {
      return metaTextSomeLinePieceInner(lineFunc, line.innerParsedTextArray, depth + 1);
    }
  });
}


export function metaTextSomeLinePiece(metaText, lineFunc) {
  if (!metaText) return false;
  return metaTextSomeLinePieceInner(lineFunc, metaText.lines);
}

export function isLineIncludesNoteNumbers(line, noteNumbers) {
  if (!line) return false;
  if (Array.isArray(line)) line = line[0];
  if (line.meta && line.meta.noteNumber && noteNumbers.includes(""+line.meta.noteNumber)) {
    return true;
  }
  if (line.innerParsedTextArray && line.innerParsedTextArray.length) {
    return line.innerParsedTextArray.some(innerPiece => isLineIncludesNoteNumbers(innerPiece, noteNumbers));
  }
  return false;
}