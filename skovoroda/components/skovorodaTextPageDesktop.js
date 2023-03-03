
import { Card, Container, Stack, Text, Title } from '@mantine/core';
import SkovorodaTreatiseSmallBlockDesktop from './SkovorodaTreatiseSmallBlockDesktop';
import LinkToSource from './textSourceLinkWithTooltip';

export default function SkovorodaTextPageDesktop({ textData }) {

  const pageLinkIndexes = {};

  const writtenDateInfoBlock = <Card radius="md" p="md" m="0" bg="gray.1">
    <Text key="label" size="sm" color="gray.9">
      Дата написання
    </Text>
    {textData.writtenDateInfo.dates.map((date, index) => {
      return <Text key={"date-"+index}>
        {date.text}
        <LinkToSource source={date.source} page={date.page} pageLinkIndexes={pageLinkIndexes}/>
      </Text>
    })}

  </Card>

  const originalBlock = createOriginalBlock(textData.original);

  const translationBlocks = textData.translations.map((translation, index) => {
    return <SkovorodaTreatiseSmallBlockDesktop 
      key={"translation-"+index}
      imageSrc={translation.source.bookCoverImageSrc}
      sourceHref={translation.source.sourceHref}
      sourceName={translation.source.sourceName}
      translatorName={translation.translator.fullName}
      textName={translation.translatedName}
      textType="translation"
      files={translation.files}
    />
  }); 

  return <Container>
    <Title 
      order={1} 
      ta="center"
      mb="xl"
      className='fontFamilyOldUa bigH1'
    >
      {textData.original.originalName}
    </Title>
    {originalBlock}
    {translationBlocks}
    <Stack justify="flex-start" spacing="xs">
      {writtenDateInfoBlock}
    </Stack>
  </Container>
}

function createOriginalBlock(original) {
  return <SkovorodaTreatiseSmallBlockDesktop
    key={"original"}
    imageSrc={original.source.bookCoverImageSrc}
    sourceHref={original.source.sourceHref}
    sourceName={original.source.sourceName}
    textName={original.originalName}
    textType="original"
    files={original.files}
  />;
}
