import getStaticPathsCommon from '../../../lib/getStaticPathsCommon';
import readDynamicIdCommon from '../../../lib/readDynamicIdCommon';
import { readAllReads } from '../../../lib/dataReaders/readsReader';
import dynamic from 'next/dynamic';
import { readPageKey, SkovorodaConstants } from '../../../lib/skovorodaConstants';
import { getSchemaByPageKey } from '../../../components/schema/skSchemaFacade';

const ReadPageDesktop = dynamic(() => import('../../../components/pages/readPageDesktop'));
const ReadPageMobile = dynamic(() => import('../../../components/pages/readPageMobile'));

export default function ReadPage(params) {

  return params.isMobile 
    ? <ReadPageMobile {...params} /> 
    : <ReadPageDesktop {...params} />;
}

// Generate Dynamic Paths for All Reads
export async function getStaticPaths() {
  const allReads = readAllReads();
  const allReadsUrlIds = allReads.map((read) => read.urlId);
  return getStaticPathsCommon(allReadsUrlIds);
}

// Get Read Data by URL ID
export async function getStaticProps({ params }) {
  const { id, deviceEnding } = readDynamicIdCommon(params.id);
  const allReads = readAllReads();
  const selectedRead = allReads.find((read) => read.urlId === id);
  if (!selectedRead) return { notFound: true };
  return {
    props: {
      // APP LEVEL {
      deviceEnding,
      selectedId: id,
      pageKey: readPageKey,
      schemaOrg: getSchemaByPageKey(readPageKey),
      breadcrumbLabel: selectedRead.title,
      // APP LEVEL }

      // SEO {
      shouldBeIndexed: true,
      metadataTitle: `${selectedRead.title} - Читати Сковороду`,
      metadataDescription: SkovorodaConstants.contentToMetaDescription(selectedRead.content),
      metadataKeywords: [selectedRead.title, 'Читати Григорія Сковороду'], 
      metadataAuthorUrl: "https://uk.wikipedia.org/wiki/Сковорода_Григорій_Савич",
      canonicalPageUrl: `https://www.skovoroda.club/texts/reads/${id}`,
      facebookImageUrl: selectedRead.image ? selectedRead.image.imageUrl : null,
      // SEO }
      
      selectedRead,
    },
  };
}
