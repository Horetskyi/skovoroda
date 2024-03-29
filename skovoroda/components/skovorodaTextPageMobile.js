
import { Container, Divider, Space, Stack, Title } from '@mantine/core';
import SkovorodaTextBlockMobile from './skovorodaTextBlockMobile';


export default function SkovorodaTextPageMobile({ textData }) {

  const originalBlock = createOriginalBlock(textData.original);

  const translationBlocks = textData.translations ? textData.translations.map((translation, index) => {
    return <div  key={"translation-"+index}>
      {index === 0 ? <></> : <Divider size="sm" mb="md" />}
      <Container>
        <SkovorodaTextBlockMobile
          imageSrc={translation.source.bookCoverImageSrc}
          sourceHref={translation.source.sourceHref}
          sourceName={translation.source.sourceName}
          translatorName={translation.translator.fullName}
          textName={translation.translatedName}
          textType="translation"
          files={translation.files}
        />
      </Container>
    </div>
  }) : <></>; 

  return <>
    <Container>
      <Title mt="md" order={1} size="h2">{textData.original.originalName}</Title>
    </Container>

    <Divider mt="md" size="sm" />

    <Stack mt="md">

      <Container className={classes.textBlock}>
        {originalBlock}
      </Container>

      <Divider size="sm" />

      {translationBlocks}

      <Space h="xl" />
    </Stack>
  </>;
}

function createOriginalBlock(original) {
  return <SkovorodaTextBlockMobile
    key={"original"}
    imageSrc={original.source.bookCoverImageSrc}
    sourceHref={original.source.sourceHref}
    sourceName={original.source.sourceName}
    textName={original.originalName}
    textType="original"
    files={original.files}
  />;
}
