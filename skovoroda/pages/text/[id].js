
import { Stack } from '@mantine/core';
import getSkovorodaData from '../../lib/skovorodaData';
import TranslatedTextBlock from '../../components/translatedTextBlock';
import getStaticPathsCommon from '../../lib/getStaticPathsCommon';
import readDynamicIdCommon from '../../lib/readDynamicIdCommon';

export default function Text({ textData }) {

  const translationBlocks = textData.translates.map((translation, index) => {
  
    const imageSrc = "/books-cover/" + translation.source.bookCoverImageFileName;
    const sourceHref = "/source/" + translation.source.id;

    return <TranslatedTextBlock 
      key={"translation-"+index}
      imageSrc={imageSrc}
      sourceHref={sourceHref}
      fileSize={translation.fileSize}
      sourceName={translation.source.sourceName}
      translatorName={translation.translator.fullName}
      translatedName={translation.translatedName}
      files={translation.files}
    />
  }); 

  return (
    <Stack mt="md">
      {translationBlocks}
    </Stack>
  )
}

export async function getStaticPaths() {
  
  const data = getSkovorodaData();
  const ids = data.texts.map(text => text.id);
  return getStaticPathsCommon(ids);
}

export async function getStaticProps({ params }) {

  const { id, deviceEnding } = readDynamicIdCommon(params.id);
  const data = getSkovorodaData();
  const textData = data.texts.find(text => text.id === id);
  return {
    props: {
      textData,
      deviceEnding,
    },
  };
}