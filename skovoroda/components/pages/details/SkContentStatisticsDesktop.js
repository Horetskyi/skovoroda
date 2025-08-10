import { Container, Space, Text } from "@mantine/core";
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
    { BibleQuotesByPopularity(stats.bibleStatistics.bibleQuotesByPopularity, "Цитування строчок з Біблії за частотою:", classes) }
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

function BibleQuotesByPopularity(list, title, classes) {
  return list.length ? <>
    <Text>{title}</Text>
    {list.map((book, index) => (
      <Text key={index} className={classes.formatTabs1}>{getBibleBookNameAndQuoteNumberByCode(book.key)}: {book.count}</Text>
    ))}
  </> : null;
}

