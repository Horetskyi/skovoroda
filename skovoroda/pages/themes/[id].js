import dynamic from 'next/dynamic';
import { readAllThemes } from '../../lib/dataReaders/themesReader';
import { themePageKey } from '../../lib/skovorodaConstants';
import readDynamicIdCommon from '../../lib/readDynamicIdCommon';
import getStaticPathsCommon from '../../lib/getStaticPathsCommon';

const ThemePageDesktop = dynamic(() => import('../../components/pages/themePageDesktop'));
const ThemePageMobile = dynamic(() => import('../../components/pages/themePageMobile'));

export default function ThemePage(params) {

  return (
    <>
      {params.deviceEnding.includes('desktop') ? (
        <ThemePageDesktop {...params} />
      ) : (
        <ThemePageMobile {...params} />
      )}
    </>
  );
}

// Generate Dynamic Paths for All 
export async function getStaticPaths() {
  const allThemes = readAllThemes();
  const allUrlIds = allThemes.map(theme => theme.urlId);
  return getStaticPathsCommon(allUrlIds);
}

// Get Read Data by URL ID
export async function getStaticProps({ params }) {
  const { id, deviceEnding } = readDynamicIdCommon(params.id);
  const allThemes = readAllThemes();
  const selectedTheme = allThemes.find(theme => theme.urlId === id);
  if (!selectedTheme) {
    return { notFound: true };
  }

  return {
    props: {
      deviceEnding,
      selectedId: id,
      pageKey: themePageKey,
      breadcrumbLabel: selectedTheme.title,

      shouldBeIndexed: false,
      metadataTitle: `${selectedTheme.title} - Сковорода`,
      metadataDescription: "",
      metadataKeywords: [selectedTheme.title], 
      canonicalPageUrl: `https://www.skovoroda.club/themes/${id}`,
      
      selectedTheme: selectedTheme,
    },
  };
}
