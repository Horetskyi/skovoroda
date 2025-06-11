
import getStaticPathsCommon from '../../../lib/getStaticPathsCommon';
import readDynamicIdCommon from '../../../lib/readDynamicIdCommon';
import { SkovorodaConstants, treatiseSelectedPageKey } from '../../../lib/skovorodaConstants';
import dynamic from 'next/dynamic';
import { readAllTreatises } from '../../../lib/dataReaders/treatisesReader';
import { SkovorodaSourcesArray } from '../../../lib/data/skovorodaSources';
import { skTranslatorsV2 } from '../../../lib/data/skovorodaTranslators';
const SkTreatisePageDesktop = dynamic(() => import('../../../components/pages/skTreatisePageDesktop'));
const SkTreatisePageMobile = dynamic(() => import('../../../components/pages/skTreatisePageMobile'));

export default function SkovorodaText(params) {

  return params.deviceEnding === SkovorodaConstants.desktopEnding 
    ? <SkTreatisePageDesktop {...params} />
    : <SkTreatisePageMobile {...params} />;
}

export async function getStaticPaths() {
  const allTreatises = readAllTreatises();
  const ids = allTreatises.map(treatise => treatise.urlId);
  console.log("All Text Ids:", ids);
  return getStaticPathsCommon(ids);
}

export async function getStaticProps({ params }) {

  const { id, deviceEnding } = readDynamicIdCommon(params.id);

  const treatises = readAllTreatises();
  const treatise = treatises.find(treatise => treatise.urlId === id);
  treatise.introContent = ""; // free memory

  const sourceIds = new Set();
  // if (treatise.introSourceId) {
  //   sourceIds.add(treatise.introSourceId)
  // }
  treatise.writtenDate.forEach(date => {
    if (date.sourceId) {
      sourceIds.add(date.sourceId)
    }
  });
  treatise.versions.forEach(version => {
    sourceIds.add(version.sourceId);
  });
  const sources = SkovorodaSourcesArray.filter(source => sourceIds.has(source.devNumber));

  const translators = skTranslatorsV2.filter(t => treatise.versions.some(v => v.translatorId == t.translatorId));

  const preferedVersion = treatise.versions.find(v => v.preferedVersion);
  const metadataTitle = `${preferedVersion.title}`
  const metadataDescription = `${treatise.treatiseType} Сковороди: ${preferedVersion.title} ${treatise.writtenDate.map(x => x.text).join(", ")}`

  return {
    props: {
      pageKey: treatiseSelectedPageKey,
      selectedId: id,
      metadataTitle: metadataTitle,
      metadataDescription: metadataDescription,
      treatise,
      sources,
      translators,
      deviceEnding,
      shouldBeIndexed: true,
      canonicalPageUrl: "https://www.skovoroda.club/texts/treatise/" + treatise.urlId,
      facebookImageUrl: treatise.image ? treatise.image.imageUrl : null,
    },
  };
}