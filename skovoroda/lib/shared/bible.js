
export const bibleBooks = {
  'JHN': 'Євангелія від св. Івана', // die-bibel.de✅
  'MRK': 'Євангелія від св. Марка', // die-bibel.de✅
  'MAT': 'Євангелія від св. Матвія', // die-bibel.de✅
  'LUK': 'Євангелія від св. Луки', // die-bibel.de✅
  'ACT': 'Дії святих апостолів', // die-bibel.de✅
  'SIR': 'Книга Ісуса, сина Сирахового', // die-bibel.de✅
  '1JN': 'Перше соборне послання св. ап. Івана', // die-bibel.de✅
  '2JN': 'Друге послання Івана', // die-bibel.de✅
  '3JN': 'Третє послання Івана', // die-bibel.de✅
  '1TI': 'Перше послання до Тимотея', // die-bibel.de✅
  '2TI': 'Друге послання до Тимофія', // die-bibel.de✅
  'ROM': 'Послання до Римлян', // die-bibel.de✅
  '1CO': 'Перше послання до коринтян', // die-bibel.de✅
  '2CO': 'Друге послання до коринтян', // die-bibel.de✅
  'GAL': 'Послання до Галатів', // die-bibel.de✅
  'EPH': 'Послання до ефесян', // die-bibel.de✅
  'PHP': 'Послання до филип\'ян', // die-bibel.de✅
  '1TH': 'Перше послання до солунян', // die-bibel.de✅
  '2TH': 'Друге послання до солунян', // die-bibel.de✅
  'HEB': 'Послання до євреїв', // die-bibel.de✅
  '1PE': 'Перше послання Петра', // die-bibel.de✅
  '2PE': 'Друге послання Петра', // die-bibel.de✅
  'SNG': 'Пісня над піснями', // die-bibel.de✅
  'WIS': 'Книга Премудрості Соломона', // die-bibel.de✅
  'PSA': 'Книга Псалмів', // die-bibel.de✅
  'JAS': 'Послання Апостола Якова', // die-bibel.de✅
  'JUD': 'Соборне послання св. ап. Іуди', // die-bibel.de✅
  'ISA': 'Книга пророка Ісаї', // die-bibel.de✅
  'JER': 'Книга пророка Єремії', // die-bibel.de✅
  'LAM': 'Плач Єремії', // die-bibel.de✅
  'EZK': 'Книга пророка Єзекіїла', // die-bibel.de✅
  'DAG': 'Книга пророка Даниїла', // die-bibel.de✅
  'HOS': 'Книга пророка Осії', // die-bibel.de✅
  'AMO': 'Книга пророка Амоса', // die-bibel.de✅
  'OBA': 'Книга пророка Авдія', // die-bibel.de✅
  'MIC': 'Книга пророка Михея', // die-bibel.de✅
  'HAB': 'Книга пророка Аввакума', // die-bibel.de✅
  'ZEP': 'Книга пророка Софонії', // die-bibel.de✅
  'ZEC': 'Книга пророка Захарії', // die-bibel.de✅
  'BAR': 'Книга пророка Варуха', // die-bibel.de✅
  'GEN': 'Книга Буття', // die-bibel.de✅
  'EXO': 'Друга книга Мойсеєва: Вихід', // die-bibel.de✅
  'NUM': 'Четверта книга Мойсеєва: Числа', // die-bibel.de✅
  'DEU': 'П\'ята книга Мойсеєва: Повторення Закону', // die-bibel.de✅
  'JOS': 'Книга Ісуса Навина', // die-bibel.de✅
  'JDG': 'Книга Суддів', // die-bibel.de✅
  'RUT': 'Книга Рут', // die-bibel.de✅
  '1SA': 'Перша книга царств', // die-bibel.de✅
  '1CH': 'Перша книга Хроніки', // die-bibel.de✅
  'JOB': 'Книга Йова', // die-bibel.de✅
  'PRO': 'Книга Притч Соломонових', // die-bibel.de✅
  'ECC': 'Книга Екклезіястова', // die-bibel.de✅
  'REV': 'Апокаліпсис', // die-bibel.de✅
};

export function getBibleBookNameByCode(bibleCode) {
  if (!bibleCode || !bibleCode.length) return '';
  const bookName = bibleBooks[bibleCode.split('.')[0]];
  return bookName ? bookName : bibleCode;
}

export function getBibleBookNameAndQuoteNumberByCode(bibleCode) {
  if (!bibleCode || !bibleCode.length) return '';
  const bookName = getBibleBookNameByCode(bibleCode);
  const split = bibleCode.split('.');
  var quoteNumber = '';
  if (split.length >= 2) {
    quoteNumber += '' + split[1];
  }
  if (split.length >= 3) {
    quoteNumber += ':' + split[2];
  }
  return `${bookName} ${quoteNumber ? `(${quoteNumber})` : ''}`;
}

const newTestamentCodes = new Set([
  'MAT', 'MRK', 'LUK', 'JHN', 'ACT', 'ROM', '1CO', '2CO', 'GAL', 'EPH',
  'PHP', '1TH', '2TH', '1TI', '2TI', 'HEB', 'JAS', '1PE', '2PE', '1JN',
  '2JN', '3JN', 'JUD', 'REV'
]);

export function isNewTestamentBibleCode(bibleCode) {
  if (!bibleCode) return false;
  if (!bibleCode.length) return false;
  return newTestamentCodes.has(bibleCode.split('.')[0]);
}