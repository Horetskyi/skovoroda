
import { Container, Space, Stack } from '@mantine/core';
import { SkovorodaSourcesArray } from '../../lib/data/skovorodaSources';
import getStaticPathsCommon from '../../lib/getStaticPathsCommon';
import readDynamicIdCommon from '../../lib/readDynamicIdCommon';
import SkH1Desktop from '../../components/shared/skH1Desktop';
import SkImage from '../../components/shared/skImage';
import SkTextLink from '../../components/shared/skTextLink';
import DownloadStackV1 from '../../components/downloadStackV1';
import { SkovorodaConstants } from '../../lib/skovorodaConstants';

export default function Source({ sourceData, deviceEnding }) {

  const isMobile = deviceEnding == SkovorodaConstants.mobileEnding;
  const image = sourceData.bookCoverImage;
  const isImageExists = (image && image.imageUrl && image.imageUrl.length > 0) ? true : false; 

  const imageWidth = isMobile ? 250 : 500;
  const imageHeight = isMobile ? (900/2) : 900;

  return <>
    <Container py="lg" ta={"left"}>
      <SkH1Desktop text={sourceData.shortTitle} />

      {(sourceData.sourceFullName && sourceData.sourceFullName.length) ? <>
        <p className='normalContentText normalContentText_withoutIndent'>{sourceData.sourceFullName}</p>
      </> : null}
      
      {(sourceData.sourceLink && sourceData.sourceLink.length) ? <>
        <SkTextLink text={sourceData.sourceLink} href={sourceData.sourceLink} />
        <Space h={"md"}/>
      </> : null}

      {(sourceData.files && sourceData.files.length) ? <>
        <Stack mb={"md"} w={isMobile ? "100%" : "500px"} ta={"left"}>
          <DownloadStackV1 files={sourceData.files} />
        </Stack>
      </> : null}

      {isImageExists ? <>
        <Container ta={"center"} mb={"lg"}>
          <SkImage priority={true} width={imageWidth} height={imageHeight} alt={image.alt} title={image.title} imageUrl={image.imageUrl} styleAction={styleObj => {styleObj.margin = "auto"}} />
        </Container>
      </> : null}
      
    </Container>
  </>
}

// Get all Source Paths
export async function getStaticPaths() {
  
  const ids = SkovorodaSourcesArray.map(source => source.id);
  console.log("All Source Ids:", ids);
  return getStaticPathsCommon(ids);
}

// Get Source Data by Id
export async function getStaticProps({ params }) {

  const { id, deviceEnding } = readDynamicIdCommon(params.id);
  const sourceData = SkovorodaSourcesArray.find(source => source.id === id);
  return {
    props: {
      sourceData,
      deviceEnding,
      metadataTitle: "Джерела",
      metadataDescription: "Джерела",
    },
  };
}