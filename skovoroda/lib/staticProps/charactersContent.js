
export function getCharacterH2Texts(character) {
  return `Твори Сковороди, в яких зустрічається ${getCharacterUaCompoundName(character)}`;
}

export function getCharacterH1(character) {
  return `Персонаж ${getCharacterUaCompoundName(character)} у творах Сковороди`;
}

export function getCharacterUaCompoundName(character) {
  let name = `${character.uaNames[0]}`;
  if (character.uaNames.length > 1) {
    name += ` (${character.uaNames.slice(1).join(', ')})`;
  }
  return name;
}

export function getNamesSubHeader(character) {
   return character.uaNames && character.uaNames.length > 0 
    ? 'В перекладі: ' + character.uaNames.join(', ') 
    : null;
}