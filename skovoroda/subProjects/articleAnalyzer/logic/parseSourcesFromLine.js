
const { textToId } = require("./textToIdTransformer");

// Matches:
// - Чижевський Д.
// - Чижевський Д. C.
// - Чижевський Дмитро
// - Чижевський Дмитро Сергійович
// Not matches:
// - Чижевський (one word)
// - Чижевський Д. С. І. (too many initials)
// - etc.
const slavikFullNameRegex = /^([А-ЯҐЄІЇ][а-яґєії]+)\s+((?:[А-ЯҐЄІЇ][а-яґєії]+)|(?:[А-ЯҐЄІЇ]\.))(?:\s+([А-ЯҐЄІЇ][а-яґєії]+|[А-ЯҐЄІЇ]\.))?$/u;

// Matches:
// - Харків, 2004.
// - Kharkiv, 2004.
// - Kharkiv, 2004 
// - Kharkiv, 2004р 
// - Kharkiv, 2004р. 
// - Kharkiv, 2004 р. 
// Not matches:
// - С. 46.
// - etc.
const locationAndYearRegex = /^(.*),\s*(\d{4})\s*\.?$/;

const skipSourcesTitles = [
  "Тут і далі Сковороду цитую за виданням".toLowerCase(),
];

const skipAuthorIds = [
  "skovoroda_h",
  "h_skovoroda",
  "hryhorii_skovoroda",
  "skovoroda_hryhorii",
];

function parseSourcesFromLineStage1(line) {
  if (!line || !line.length || !line.trim().length) return [];
  line = line.replace(/\[NoteNumber\]\d+\[NoteNumber\]/g, '');
  const parts = line.split(/[\[Italic\]\/-]/).map(p => p.trim()).filter(Boolean);
  let resultSource = {};
  parts.forEach(part => {
    if (slavikFullNameRegex.test(part)) {
      const id = textToId(part);
      if (skipAuthorIds.some(skip => id === skip)) return;
      if (id) {
        resultSource.authorId = id;
        resultSource.authorName = part;
        return;
      }
    }
    if (part.length > 10 && !resultSource.title) {
      resultSource.title = part;
      resultSource.titleId = textToId(part);
      if (skipSourcesTitles.some(skip => part.toLowerCase().includes(skip))) {
        resultSource = {};
      }
      return;
    }
    const match = part.match(locationAndYearRegex);
    if (match) {
      resultSource.location = match[1].trim();
      resultSource.year = parseInt(match[2], 10);
    }
  });
  const resultSources = []
  if (resultSource.titleId && resultSource.authorId) {
    resultSources.push(resultSource);
  }
  return resultSources;
}
module.exports = { parseSourcesFromLineStage1 };
