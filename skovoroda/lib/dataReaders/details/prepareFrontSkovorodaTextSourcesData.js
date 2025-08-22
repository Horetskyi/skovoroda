import { getBibleBookNameAndQuoteNumberByCode, getBibleBookNameByCode, getBibleBookShortStatsNameByCode, isNewTestamentBibleCode } from "../../shared/bible";

const maxNotExpandedBlockItems = 8;

export function prepareFrontSkovorodaTextSourcesData(contentStatistics, skovorodaTextSourcesManual) {

  const result = [];

  if (contentStatistics) {

    const oldTestamentBlock = _getNewBibleBlock(contentStatistics, false);
    if (oldTestamentBlock) result.push(oldTestamentBlock);

    const newTestamentBlock = _getNewBibleBlock(contentStatistics, true);
    if (newTestamentBlock) result.push(newTestamentBlock);  
  }

  if (skovorodaTextSourcesManual && skovorodaTextSourcesManual.length) {
    skovorodaTextSourcesManual.forEach(block => result.push(block));
  }

  return result;
}

function _getNewBibleBlock(contentStatistics, isNewTestament) {
  const totalCitationsCountKey = isNewTestament ? 'newTestamentCitationsCount' : 'oldTestamentCitationsCount';
  const bibleRatiosKey = isNewTestament ? 'bibleNewTestamentRatios' : 'bibleOldTestamentRatios';
  if (contentStatistics.bibleStatistics &&
    contentStatistics.bibleStatistics[totalCitationsCountKey] &&
    contentStatistics.bibleStatistics[totalCitationsCountKey] > 0) 
  {
    const totalCitationsCount = contentStatistics.bibleStatistics[totalCitationsCountKey];
    const newBlock = {
      title: isNewTestament ? "Новий Завіт" : "Старий Завіт",
      imageUrl: isNewTestament 
        ? "/images/sk-text-sources/new-testament-background-edited.webp" 
        : "/images/sk-text-sources/old-testament-background.jpg",
      imageSourceUrl: isNewTestament
        ? "https://www.pexels.com/photo/statue-of-celsus-library-in-ephesus-21802617/"
        : "https://www.pexels.com/photo/dramatic-rainbow-over-desert-landscape-at-sunset-28896836/",
      imageAuthorFullName: isNewTestament ? "Burak Hayıt" : "Stephen Leonardi",
      items: [
        {
          text: _toCitationsString(totalCitationsCount, contentStatistics[bibleRatiosKey].bibleCitationsSmartRatio),
          iconType: 'book',
        },
      ],
      isExpandable: true,
      colorType: "red",
    };
    _addBooksByPopularityToBlock(contentStatistics, isNewTestament, newBlock);
    newBlock.items.push({
      text: "booksTable",
      isExpandedOnly: true,
      booksTable: _getBooksTable(contentStatistics.bibleStatistics.bibleBooksByPopularity, isNewTestament),
    });
    _addVersesByPopularityToBlock(contentStatistics, isNewTestament, newBlock);
    return newBlock;
  }
  return null;
}

function _getBooksTable(bibleBooksByPopularity, isNewTestament) {
  if (!bibleBooksByPopularity || !bibleBooksByPopularity.length) return null;
  const filteredBooks = bibleBooksByPopularity.filter(book => isNewTestamentBibleCode(book.key) === isNewTestament);
  if (!filteredBooks.length) return null;

  return filteredBooks.map(book => {
    const bookName = getBibleBookShortStatsNameByCode(book.key);
    const citationsCount = book.count;
    return { bookName, citationsCount };
  }).filter(item => item && item.bookName && item.citationsCount);
}

function _addVersesByPopularityToBlock(contentStatistics, isNewTestament, newBlock) {
  const minPopularityToBeDisplayed = 2;
  const bibleVersesByPopularity = contentStatistics.bibleStatistics.bibleVersesByPopularity;
  bibleVersesByPopularity
    .filter(verse => verse.count >= minPopularityToBeDisplayed)
    .filter(verse => isNewTestamentBibleCode(verse.key) === isNewTestament)
    .forEach(verse => {
      newBlock.items.push({
        text: _toBibleVerseStatisticsObject(verse),
        isExpandedOnly: true,
        sublist: _getVersesQuotes(verse, contentStatistics.bibleCitations),
      });
    });
}

function _getVersesQuotes(verse, bibleCitations) {
  const bookKey = getBibleBookNameAndQuoteNumberByCode(verse.key);
  return bibleCitations.filter(c => getBibleBookNameAndQuoteNumberByCode(c.bibleCode) === bookKey)
    .map((c, i) => c.text);
}

function _toBibleVerseStatisticsObject(verse) {
  if (!verse || !verse.key) return null;
  const verseSplit = verse.key.split('.');
  const verseCodeString = `${verseSplit[1]}:${verseSplit[2]}`; 
  const name = getBibleBookShortStatsNameByCode(verse.key);
  if (!name) return null;
  const count = verse.count;
  return [
    "Вірш ",
    { type: 'underline-text', text: `${name} ${verseCodeString}` },
    " цитується ",
    { type: 'underline-text', text: `${count} ${_countLabel(count)}` }
  ];
}

function _addBooksByPopularityToBlock(contentStatistics, isNewTestament, newBlock) {
  const totalCitationsCountKey = isNewTestament ? 'newTestamentCitationsCount' : 'oldTestamentCitationsCount';
  const totalCitationsCount = contentStatistics.bibleStatistics[totalCitationsCountKey];
  const bibleBooksByPopularity = contentStatistics.bibleStatistics.bibleBooksByPopularity;
  if (bibleBooksByPopularity && bibleBooksByPopularity.length) {
    // 20% popularity threshold and min 10 popularity
    const minPopularityToBeDisplayed = Math.max(10, Math.floor(totalCitationsCount * 0.20));
    bibleBooksByPopularity
      .filter(book => book.count >= minPopularityToBeDisplayed)
      .filter(book => isNewTestamentBibleCode(book.key) === isNewTestament)
      .forEach(book => {
        newBlock.items.push({
          text: _toBibleBookString(book),
          iconType: 'book',
          isExpandedOnly: newBlock.items.length >= maxNotExpandedBlockItems,
        });
      });
  }
}

function _toBibleBookString(book) {
  if (!book || !book.key) return null;
  const name = getBibleBookShortStatsNameByCode(book.key);
  if (!name) return null;
  const count = book.count;
  return `${name}: ${count} цитат`;
}

function _toCitationsString(total, ratio) {
  return `Всього ${total} цитат` + (ratio ? `: ${_toPercentString(ratio)} від обсягу твору` : '');
}

/** From "0.30366597777513243" to "30.4%" */
function _toPercentString(value) {
  if (!value) return "0%";
  return `${(value * 100).toFixed(1)}%`;
}

function _countLabel(value) {
  const lastNumber = value % 10;
  if ([1].includes(lastNumber)) return "раз";
  if ([0,5,6,7,8,9].includes(lastNumber)) return "разів";
  if ([2,3,4].includes(lastNumber)) return "рази";
  return "разів";
}