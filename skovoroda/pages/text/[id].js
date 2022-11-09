
import { Stack } from '@mantine/core';
import getSkovorodaData from '../../lib/skovorodaData';
import TranslatedTextBlock from '../../components/translatedTextBlock';
import getStaticPathsCommon from '../../lib/getStaticPathsCommon';
import readDynamicIdCommon from '../../lib/readDynamicIdCommon';

export default function Text({ textData }) {

  const translationBlocks = textData.translates.map((translation, index) => {
  
    const imageSrc = "/books-cover/" + translation.source.bookCoverImageName;
    const sourceHref = "/source/" + translation.source.id;

    return <TranslatedTextBlock 
      key={"translation-"+index}
      imageSrc={imageSrc}
      fileSize={translation.fileSize}
      sourceHref={sourceHref}
      sourceName={translation.source.sourceName}
      translatorName={translation.translator.fullName}
      translatedName={translation.translatedName}
      downloadFileName="Г. С. Сковорода - Повна академічна збірка - Леонід Ушкалов - 2011.pdf"
      downloadUrl="https://skovoroda.s3.eu-west-3.amazonaws.com/sources/%D0%93.+%D0%A1.+%D0%A1%D0%BA%D0%BE%D0%B2%D0%BE%D1%80%D0%BE%D0%B4%D0%B0+-+%D0%9F%D0%BE%D0%B2%D0%BD%D0%B0+%D0%B0%D0%BA%D0%B0%D0%B4%D0%B5%D0%BC%D1%96%D1%87%D0%BD%D0%B0+%D0%B7%D0%B1%D1%96%D1%80%D0%BA%D0%B0+-+%D0%9B%D0%B5%D0%BE%D0%BD%D1%96%D0%B4+%D0%A3%D1%88%D0%BA%D0%B0%D0%BB%D0%BE%D0%B2+-+2011.pdf"
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