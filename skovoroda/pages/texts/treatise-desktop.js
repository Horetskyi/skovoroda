import { Card, Container, createStyles, Stack, Text, Title } from '@mantine/core';
import Link from 'next/link';
import LinkToSource from '../../components/textSourceLinkWithTooltip';
import { SkovorodaTextsArray } from '../../lib/data/skovorodaTexts';
import { treatisePageKey } from '../../lib/skovorodaConstants';
import { pathJoinWithoutEndSlash, SkovorodaTextsPath, SkovorodaTreatisePath } from '../../lib/skovorodaPath';

const useStyles = createStyles((theme) => ({
  textLink: {
    color: theme.colors.blue[8]
  }
}));

export default function SkovorodaTreatisePageDesktop({ textsData }) {
  
  const { classes } = useStyles();
  const pageLinkIndexes = {};

  function getTextBlock(textData, index) {
    
    let translationBlock = <></>;
    if (textData.translations && textData.translations.length) {
      const recommendedTranslation = textData.translations[0];
      translationBlock = <>
        <Text>
          {"Переклад: "}
          <Text span>{recommendedTranslation.translatedName}</Text>
          <LinkToSource source={recommendedTranslation.source} pageLinkIndexes={pageLinkIndexes} />
        </Text>
      </>;
    }
    
    let writtenDateInfoBlock = undefined;
    if (textData.writtenDateInfo && textData.writtenDateInfo.dates && textData.writtenDateInfo.dates.length) {
      writtenDateInfoBlock = <>
        <Text mt="md">Дата написання:</Text>
        <Stack mt="md" spacing="0">
          {textData.writtenDateInfo.dates.map((date, dateIndex) => {
            return <Text key={"date-"+dateIndex}>
              {date.text}
              <LinkToSource source={date.source} page={date.page} pageLinkIndexes={pageLinkIndexes}/>
            </Text>
          })}
        </Stack>
      </>
    }

    return <Card key={index} p="md" bg='gray.1'>
      <Title order={3} mb="md">
        <Link key={index} href={pathJoinWithoutEndSlash(SkovorodaTreatisePath, textData.id)}>
          <a className={classes.textLink}>{textData.original.originalName}</a>
        </Link>
      </Title>
      {translationBlock}
      {writtenDateInfoBlock}
    </Card>
  }

  return <Container>
    <Title ta="center" order={1} mb="xl">Трактати, Діалоги, Притчі</Title>
    <Stack>
      {textsData.map(getTextBlock)}
    </Stack>
  </Container>
}

export async function getStaticProps({ params }) {

  return {
    props: {
      pageKey: treatisePageKey,
      textsData: SkovorodaTextsArray,
      metadataTitle: "Григорій Савич Сковорода - Трактати, Діалоги, Притчі",
      metadataDescription: "Григорій Савич Сковорода - Трактати, Діалоги, Притчі",
    },
  };
}