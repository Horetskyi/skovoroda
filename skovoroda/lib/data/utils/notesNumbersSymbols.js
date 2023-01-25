const NOTES_NUMBERS_SYMBOLS_ARRAY = [..."⁰¹²³⁴⁵⁶⁷⁸⁹"];
export const NOTES_NUMBERS_SYMBOLS_MAP = new Map();
const NOTES_NUMBERS_SYMBOLS_MAP_REVERSE = new Map();
NOTES_NUMBERS_SYMBOLS_ARRAY.forEach((symbol, index) => {
  NOTES_NUMBERS_SYMBOLS_MAP.set(symbol, index);
});
NOTES_NUMBERS_SYMBOLS_MAP.set('ᵃ', 'a');
NOTES_NUMBERS_SYMBOLS_MAP.set('ᵇ', 'b');
NOTES_NUMBERS_SYMBOLS_MAP.set('ᵉ', 'e');
NOTES_NUMBERS_SYMBOLS_MAP.set('ᵈ', 'd');
NOTES_NUMBERS_SYMBOLS_MAP.set('ᵍ', 'g');
NOTES_NUMBERS_SYMBOLS_MAP.forEach((value, key) => {
  NOTES_NUMBERS_SYMBOLS_MAP_REVERSE.set("" + value, key);
});

export function getNoteNumberUpperString(number) {
  const str = ""+number;
  return [...str].map(symbol => {
    return NOTES_NUMBERS_SYMBOLS_MAP.has(symbol) 
      ? NOTES_NUMBERS_SYMBOLS_MAP.get(symbol)
      : symbol;
  }).join("");
}

export function getNoteNumberString(number) {
  const str = ""+number;
  if (NOTES_NUMBERS_SYMBOLS_MAP.has(str)) {
    return number;
  }
  return [...str].map(symbol => NOTES_NUMBERS_SYMBOLS_MAP_REVERSE.get(symbol)).join("");
}
