const accentsSimpleMap = [
  ['ч','ч́'],
  ['к','ќ'],
  ['а','á'],
  ['о','ó'],
  ['у','у́'],
  ['и','и́'],
  ['ы','ы́'],
  ['е','é'],
  ['э','э́'],
  ['ї','ї́'],
  ['ю','ю́'],
  ['я','я́'],

  [ 'К' , 'Ќ' ],
  [ 'Ч' , 'Ч́' ],
  [ 'А' , 'А́' ],
  [ 'О' , 'О́' ],
  [ 'У' , 'У́' ],
  [ 'И' , 'И́' ],
  [ 'Ы' , 'Ы́' ],
  [ 'E' , 'Е́' ],
  [ 'Е' , 'Е́' ],
  [ 'Э' , 'Э́' ],
  [ 'Ї' , 'Ї́' ],
  [ 'Ю' , 'Ю́' ],
  [ 'Я' , 'Я́' ],
  [ 'Ѣ' , 'Ѣ' ],
];
export const finalAccentsReplaces = [];
export const accentsIndicators = ['´', 'μ', ' ́', '°', '·', '¶', '±'];
accentsIndicators.forEach(after => {
  accentsSimpleMap.forEach(pair => {
    finalAccentsReplaces.push([pair[0] + after, pair[1]]);
  });
});

export function replaceAccentsToSimpleText(text) {
  if (!text || !text.length) {
    return text;
  }
  accentsSimpleMap.forEach(pair => {
    text = text.replace(pair[1], pair[0]);
  });
  return text;
}