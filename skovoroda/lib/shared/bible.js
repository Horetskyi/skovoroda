
export const bibleBooks = {
  'JHN': 'Євангелія від св. Івана', 
  'MRK': 'Євангелія від св. Марка', 
  'MAT': 'Євангелія від св. Матвія', 
  'LUK': 'Євангелія від св. Луки', 
  'ACT': 'Дії святих апостолів', 
  'SIR': 'Книга Ісуса, сина Сирахового', 
  '1JN': 'Перше соборне послання св. ап. Івана', 
  '2JN': 'Друге послання Івана', 
  '3JN': 'Третє послання Івана', 
  '1TI': 'Перше послання до Тимотея', 
  '2TI': 'Друге послання до Тимофія', 
  'ROM': 'Послання до Римлян', 
  '1CO': 'Перше послання до коринтян', 
  '2CO': 'Друге послання до коринтян', 
  'GAL': 'Послання до Галатів', 
  'EPH': 'Послання до ефесян', 
  'PHP': 'Послання до филип\'ян', 
  '1TH': 'Перше послання до солунян', 
  '2TH': 'Друге послання до солунян', 
  'HEB': 'Послання до євреїв', 
  '1PE': 'Перше послання Петра', 
  '2PE': 'Друге послання Петра', 
  'SNG': 'Пісня над піснями', 
  'WIS': 'Книга Премудрості Соломона', 
  'PSA': 'Книга Псалмів', 
  'JAS': 'Послання Апостола Якова', 
  'JUD': 'Соборне послання св. ап. Іуди', 
  'ISA': 'Книга пророка Ісаї', 
  'JER': 'Книга пророка Єремії', 
  'LAM': 'Плач Єремії', 
  'EZK': 'Книга пророка Єзекіїла', 
  'DAG': 'Книга пророка Даниїла', 
  'HOS': 'Книга пророка Осії', 
  'AMO': 'Книга пророка Амоса', 
  'OBA': 'Книга пророка Авдія', 
  'MIC': 'Книга пророка Михея', 
  'HAB': 'Книга пророка Аввакума', 
  'ZEP': 'Книга пророка Софонії', 
  'ZEC': 'Книга пророка Захарії', 
  'BAR': 'Книга пророка Варуха', 
  'GEN': 'Книга Буття', 
  'EXO': 'Друга книга Мойсеєва: Вихід', 
  'NUM': 'Четверта книга Мойсеєва: Числа', 
  'DEU': 'П\'ята книга Мойсеєва: Повторення Закону', 
  'JOS': 'Книга Ісуса Навина', 
  'JDG': 'Книга Суддів', 
  'RUT': 'Книга Рут', 
  '1SA': 'Перша книга царств', 
  '2SA': 'Друга книга царств', 
  '1KI': 'Третя книга царств', 
  '2KI': 'Четверта книга царств', 
  '1CH': 'Перша книга Хроніки', 
  'JOB': 'Книга Йова', 
  'PRO': 'Книга Притч Соломонових', 
  'ECC': 'Книга Екклезіястова', 
  'REV': 'Апокаліпсис', 
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