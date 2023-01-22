
import { Container, Stack, Text, Title } from '@mantine/core';
import SkovorodaTextBlockDesktop from './skovorodaTextBlockDesktop';
import LinkToSource from './textSourceLinkWithTooltip';

export default function SkovorodaTextPageDesktop({ textData }) {

  const pageLinkIndexes = {};

  const writtenDateInfoBlock = textData.writtenDateInfo.dates.map((date, index) => {
    return <Text key={"date-"+index}>
      {date.text}
      <LinkToSource source={date.source} page={date.page} pageLinkIndexes={pageLinkIndexes}/>
    </Text>
  });

  const originalBlock = createOriginalBlock(textData.original);

  const translationBlocks = textData.translations.map((translation, index) => {
    return <SkovorodaTextBlockDesktop 
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

  return (
    <Container>
      <Stack mt="md">
        <Title order={1}>{textData.original.originalName}</Title>
        <Stack justify="flex-start" spacing="xs">
          {writtenDateInfoBlock}
        </Stack>
        {originalBlock}
        {translationBlocks}
      </Stack>
    </Container>
  )
}

function createOriginalBlock(original) {
  return <SkovorodaTextBlockDesktop
    key={"original"}
    imageSrc={original.source.bookCoverImageSrc}
    sourceHref={original.source.sourceHref}
    sourceName={original.source.sourceName}
    textName={original.originalName}
    textType="original"
    files={original.files}
  />;
}
