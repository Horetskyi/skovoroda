
import getStaticPathsCommon from '../../../lib/getStaticPathsCommon';
import readDynamicIdCommon from '../../../lib/readDynamicIdCommon';
import { SkovorodaConstants, treatiseSelectedPageKey } from '../../../lib/skovorodaConstants';
import dynamic from 'next/dynamic';
import { readAllTreatises } from '../../../lib/dataReaders/treatisesReader';
import { SkovorodaSourcesArray } from '../../../lib/data/skovorodaSources';
import { skTranslatorsV2 } from '../../../lib/data/skovorodaTranslators';
const SkTreatisePageDesktop = dynamic(() => import('../../../components/pages/skTreatisePageDesktop'));
const SkovorodaTextPageMobile = dynamic(() => import('../../../components/skovorodaTextPageMobile'));

export default function SkovorodaText(params) {

  return params.deviceEnding === SkovorodaConstants.desktopEnding 
    ? <SkTreatisePageDesktop {...params} />
    : <SkovorodaTextPageMobile {...params} />;
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

  const sourceIds = new Set();
  if (treatise.introSourceId) {
    sourceIds.add(treatise.introSourceId)
  }
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

  return {
    props: {
      pageKey: treatiseSelectedPageKey,
      selectedId: id,
      metadataTitle: "TODO Title",
      metadataDescription: "TODO Description",
      treatise,
      sources,
      translators,
      deviceEnding,
    },
  };
}