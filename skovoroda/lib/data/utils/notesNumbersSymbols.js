export const NOTES_NUMBERS_SYMBOLS_ARRAY = [..."⁰¹²³⁴⁵⁶⁷⁸⁹"];
export const NOTES_NUMBERS_SYMBOLS_MAP = new Map();
export const NOTES_NUMBERS_SYMBOLS_MAP_REVERSE = new Map();
NOTES_NUMBERS_SYMBOLS_ARRAY.forEach((symbol, index) => {
  NOTES_NUMBERS_SYMBOLS_MAP.set(symbol, index);
  NOTES_NUMBERS_SYMBOLS_MAP_REVERSE.set(index, symbol);
});

export function numberToNotesString(number) {
  return [...(""+number)].map(symbol => NOTES_NUMBERS_SYMBOLS_MAP_REVERSE.get(+symbol)).join("");
}
