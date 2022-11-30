
import getStaticPathsCommon from '../../lib/getStaticPathsCommon';
import readDynamicIdCommon from '../../lib/readDynamicIdCommon';
import { SkovorodaConstants } from '../../lib/skovorodaConstants';
import dynamic from 'next/dynamic';
import { SkovorodaTextsArray } from '../../lib/data/skovorodaTexts';
const SkovorodaTextPageDesktop = dynamic(() => import('../../components/skovorodaTextPageDesktop'));
const SkovorodaTextPageMobile = dynamic(() => import('../../components/skovorodaTextPageMobile'));

export default function SkovorodaText({ textData, deviceEnding }) {

  return deviceEnding === SkovorodaConstants.desktopEnding 
    ? <SkovorodaTextPageDesktop textData={textData}/>
    : <SkovorodaTextPageMobile textData={textData}/>;
}

// Get all Text Paths
export async function getStaticPaths() {
  
  const ids = SkovorodaTextsArray.map(text => text.id);
  console.log("All Text Ids:", ids);
  return getStaticPathsCommon(ids);
}

// Get Text Data by Id
export async function getStaticProps({ params }) {

  const { id, deviceEnding } = readDynamicIdCommon(params.id);
  const textData = SkovorodaTextsArray.find(text => text.id === id);
  return {
    props: {
      textData,
      deviceEnding,
    },
  };
}