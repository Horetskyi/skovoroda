
function transliterateUkrainianToEnglish(text) {
  const transliterationMap = {
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'h', 'ґ': 'g', 'д': 'd', 'е': 'e', 'є': 'ie',
    'ж': 'zh', 'з': 'z', 'и': 'y', 'і': 'i', 'ї': 'i', 'й': 'i', 'к': 'k', 'л': 'l',
    'м': 'm', 'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
    'ф': 'f', 
    'х': 'kh', 
    'ц': 'ts', 
    'ч': 'ch', 
    'ш': 'sh', 
    'щ': 'shch', 
    'ю': 'iu',
    'я': 'ia', 
    'ы': 'y', 
    'ь': '', // Soft sign is generally omitted
    'зг': 'zgh', // Specific combination

    // Uppercase versions
    'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'H', 'Ґ': 'G', 'Д': 'D', 'Е': 'E', 'Є': 'Ye',
    'Ж': 'Zh', 'З': 'Z', 'И': 'Y', 'І': 'I', 'Ї': 'Yi', 'Й': 'Y', 'К': 'K', 'Л': 'L',
    'М': 'M', 'Н': 'N', 'О': 'O', 'П': 'P', 'Р': 'R', 'С': 'S', 'Т': 'T', 'У': 'U',
    'Ф': 'F', 'Х': 'Kh', 'Ц': 'Ts', 'Ч': 'Ch', 'Ш': 'Sh', 'Щ': 'Shch', 'Ю': 'Yu',
    'Я': 'Ya',
  };

  // Special case: 'Фі' at the start of a word should be 'fi', not 'fi' (not 'fli' or 'fyi')
  // But the main issue is that 'і' is being skipped or mis-transliterated after 'Ф'.
  // We'll process word by word to ensure correct handling.
  const finalResult = text.split(/\b/).map(word => {
    if (!word.match(/[А-Яа-яҐґЄєІіЇїЁё]/)) return word;
    let result = '';
    for (let i = 0; i < word.length; i++) {
      let char = word[i];
      let nextChar = word[i + 1];
      // Handle two-character combinations like 'зг'
      if (char === 'з' && nextChar === 'г' && transliterationMap['зг']) {
        result += transliterationMap['зг'];
        i++;
      } else if (char === 'З' && nextChar === 'г' && transliterationMap['Зг']) {
        result += transliterationMap['Зг'];
        i++;
      } else if (char === 'ї') {
        // 'ї' at the start of a word is 'yi', otherwise 'i'
        result += (i === 0 ? 'yi' : 'i');
      } else if (char === 'Ї') {
        result += (i === 0 ? 'Yi' : 'I');
      } else if (transliterationMap[char] !== undefined) {
        result += transliterationMap[char];
      } else {
        result += char;
      }
    }
    return result;
  }).join('');
  return finalResult;
}
module.exports = { transliterateUkrainianToEnglish };