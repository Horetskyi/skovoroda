import getStaticPathsCommon from '../../../lib/getStaticPathsCommon';
import readDynamicIdCommon from '../../../lib/readDynamicIdCommon';
import { readAllReads } from '../../../lib/dataReaders/readsReader';
import dynamic from 'next/dynamic';
import { readPageKey } from '../../../lib/skovorodaConstants';

const ReadPageDesktop = dynamic(() => import('../../../components/pages/readPageDesktop'));
const ReadPageMobile = dynamic(() => import('../../../components/pages/readPageMobile'));

export default function ReadPage(params) {

  return (
    <>
      {params.deviceEnding.includes('desktop') ? (
        <ReadPageDesktop {...params} />
      ) : (
        <ReadPageMobile {...params} />
      )}
    </>
  );
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
  if (!selectedRead) {
    return { notFound: true };
  }

  const metadataDescription = trimToLastSentence(selectedRead.content.map(line => line.text).join(" ").slice(0, 200));
  return {
    props: {
      deviceEnding,
      selectedId: id,
      pageKey: readPageKey,
      breadcrumbLabel: selectedRead.title,

      shouldBeIndexed: true,
      metadataTitle: `${selectedRead.title} - Читати Сковороду`,
      metadataDescription: metadataDescription,
      metadataKeywords: [selectedRead.title, 'Читати Григорія Сковороду'], // TODO: add more based on relevant theme etc.
      metadataAuthorUrl: "https://uk.wikipedia.org/wiki/Сковорода_Григорій_Савич",
      canonicalPageUrl: `https://www.skovoroda.club/texts/reads/${id}`,
      facebookImageUrl: selectedRead.illustration ? selectedRead.illustration.imageUrl : null,
      
      selectedRead,
    },
  };
}

function trimToLastSentence(text) {
  const lastDotIndex = text.lastIndexOf(".");
  if (lastDotIndex !== -1) {
    return text.substring(0, lastDotIndex + 1).trim();
  }
  return text.trim();
}