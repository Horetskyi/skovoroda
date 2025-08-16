import { Container, List, Space, Text } from "@mantine/core";
import { getBibleBookNameAndQuoteNumberByCode, getBibleBookNameByCode } from "../../../lib/shared/bible";
import classes from './SkContentStatisticsDesktop.module.scss';
import SkH2Desktop from "../../shared/skH2Desktop";

export default function SkContentStatisticsDesktop({stats}) {

  if (!stats) return null;

  return <Container>
    <SkH2Desktop text={'Статистика'} mb="lg" />
    <Text>Кількість речень: {stats.textTotalSentencesCount}</Text>
    <Text>Кількість слів: {stats.textTotalWordsCount}</Text>
    <Text>Кількість символів: {stats.textTotalCharactersCount}</Text>
    <Space h={"md"}/>
    <Text>Кількість біблійних цитат: {stats.bibleCitations.length}</Text>
    <Text className={classes.formatTabs1}>Старий Завіт: {stats.bibleStatistics.oldTestamentCitationsCount}</Text>
    <Text className={classes.formatTabs1}>Новий Завіт: {stats.bibleStatistics.newTestamentCitationsCount}</Text>
    <Space h={"md"}/>
    { BibleBooksByPopularity(stats.bibleStatistics.bibleBooksByPopularity, "Цитування Книг Біблії за частотою:", classes) }
    <Space h={"md"}/>
    { BibleVersesByPopularity(stats.bibleStatistics.bibleVersesByPopularity, 
      "Цитування віршів з Біблії за частотою:", classes, stats.bibleCitations, stats.textFromBible) }
  </Container>;
}

function BibleBooksByPopularity(list, title, classes) {
  return list.length ? <>
    <Text>{title}</Text>
    {list.map((book, index) => (
      <Text key={index} className={classes.formatTabs1}>{getBibleBookNameByCode(book.key)}: {book.count}</Text>
    ))}
  </> : null;
}

function BibleVersesByPopularity(list, title, classes, bibleCitations, textFromBible) {
  if (!list || !list.length) return null;
  return <>
    <Text>{title}</Text>
    {list.map((book, index) => {
      const bookKey = getBibleBookNameAndQuoteNumberByCode(book.key);
      const quotedTextFromBible = textFromBible ? textFromBible.find(x => book.key === `${x.bookCode}.${x.chapter}.${x.verse}`) : null;
      return <div key={index}>
        <Text className={classes.formatTabs1}>{bookKey}: {book.count}</Text>
        {bibleCitations && bibleCitations.length && book.count >= 2 ? 
          <List className={classes.formatTabs2} bg={"blue.1"}>
            {bibleCitations.filter(c => getBibleBookNameAndQuoteNumberByCode(c.bibleCode) === bookKey).map((c, i) => (
              <List.Item key={i}>{c.text}</List.Item>
            ))}
          </List> : null}
        {quotedTextFromBible && quotedTextFromBible.text && quotedTextFromBible.text.length ? (
          <Text bg={"blue.2"} className={classes.formatTabs2}>{quotedTextFromBible.text}</Text>
        ) : null}
      </div>
    })}
  </>;
}