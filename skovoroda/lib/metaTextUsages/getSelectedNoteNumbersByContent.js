import { metaTextForEachLinePiece } from "./metaTextUsageUtils";

export default function getSelectedNoteNumbersByContent(metaText) {

  const noteNumbersSet = new Set();

  metaTextForEachLinePiece(metaText, piece => {
    if (piece.meta && piece.meta.noteNumber) {
      noteNumbersSet.add(piece.meta.noteNumber);
    }
  });

  const noteNumbersArray = Array.from(noteNumbersSet);
  return noteNumbersArray;
}
