const { transliterateUkrainianToEnglish } = require("./transliteration");

function textToId(text) {
  // First, transliterate to preserve all letters
  text = transliterateUkrainianToEnglish(text);
  // Then, replace spaces and dots with underscores
  text = text.replace(/[ .]/g, '_');
  text = text.replace(/_+/g, '_'); 
  text = text.replace(/_$/g, ''); 
  text = text.replace(/^_/g, ''); 
  text = text.replace(/[^a-zA-Z_]/g, ''); // Only allow latin and _
  if (text[0] === '_') text = text.slice(1);
  return text.toLowerCase();
}
module.exports = { textToId };