import { metaTextForEachLinePiece } from "./metaTextUsageUtils";

export default function addOrderedNumbersToMetaText(metaText) {
  if (!metaText || !metaText.lines || !metaText.lines.length) return;

  let currentNumber = 1;
  metaTextForEachLinePiece(metaText, piece => {
    if (typeof piece === "string") return;
    piece.n = currentNumber++;
  });
}