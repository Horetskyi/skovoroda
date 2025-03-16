
const charsToReplace = [
  ["у́", "у"],
  ["и́", "и"],
  ["я́", "я"],
  ["ю́", "ю"],
  ["ы́", "ы"],
];

export function fixText(text) {
  if (!text || !text.length) {
    return text;
  }
  charsToReplace.forEach(replace => {
    text = text.replaceAll(replace[0], replace[1]);
  });
  return text;
}
