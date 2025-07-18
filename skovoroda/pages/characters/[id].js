import { characterPageKey, SkovorodaConstants } from '../../lib/skovorodaConstants';
import readDynamicIdCommon from '../../lib/readDynamicIdCommon';
import getStaticPathsCommon from '../../lib/getStaticPathsCommon';
import { readAllCharacters } from '../../lib/dataReaders/charactersReader';
import { getCharacterH1, getCharacterUaCompoundName } from '../../lib/staticProps/charactersContent';
import dynamic from 'next/dynamic';

const SkCharacterPageDesktop = dynamic(() => import('../../components/pages/skCharacterPageDesktop'));
const SkCharacterPageMobile = dynamic(() => import('../../components/pages/skCharacterPageMobile'));

export default function CharacterPage(params)  {
  
  return params.isMobile ? 
    <SkCharacterPageMobile {...params} /> :
    <SkCharacterPageDesktop {...params} />;
}

// Generate Dynamic Paths for All 
export async function getStaticPaths() {
  const all = readAllCharacters();
  const allIds = all.map(character => character.id);
  return getStaticPathsCommon(allIds);
}

// Get Data by URL ID
export async function getStaticProps({ params }) {
  const { id, deviceEnding } = readDynamicIdCommon(params.id);
  const all = readAllCharacters();
  const selectedCharacter = all.find(character => character.id === id);
  if (!selectedCharacter) return { notFound: true };
  const isMobile = deviceEnding == SkovorodaConstants.mobileEnding;
  const compoundName = getCharacterUaCompoundName(selectedCharacter);
  return {
    props: {
      // APP LEVEL {
      deviceEnding,
      isMobile,
      selectedId: id,
      pageKey: characterPageKey,
      breadcrumbLabel: `Персонаж ${compoundName}`,
      // APP LEVEL }

      // SEO {
      shouldBeIndexed: true,
      metadataTitle: getCharacterH1(selectedCharacter),
      metadataDescription: SkovorodaConstants.contentToMetaDescription(selectedCharacter.about[0].text),
      metadataKeywords: selectedCharacter.names.concat(selectedCharacter.uaNames).concat("Персонаж у творах Сковороди"),
      canonicalPageUrl: `https://www.skovoroda.club/characters/${id}`,
      // SEO }

      // TECH {
      character: selectedCharacter,
      // TECH }
    },
  };
}
