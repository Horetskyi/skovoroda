/**
 * If the text contains "ѣ" or "Ѣ", splits it and wraps each yat character
 * in a <span> with font-style: normal so it renders upright in italic headings.
 * Returns the original text unchanged when there is no yat.
 */
export function wrapYatInSpans(text) {
  if (typeof text !== 'string' || !/[ѣѢ]/.test(text)) {
    return text;
  }
  const yatStyle = { fontStyle: 'normal' };
  // Split around every ѣ / Ѣ, keeping the delimiter in the result
  const parts = text.split(/([ѣѢ])/);
  return parts.map((part, i) =>
    part === 'ѣ' || part === 'Ѣ'
      ? <span key={i} style={yatStyle}>{part}</span>
      : part
  );
}
