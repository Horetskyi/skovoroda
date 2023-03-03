
import { SkovorodaSourcesArray } from '../../lib/data/skovorodaSources';
import getStaticPathsCommon from '../../lib/getStaticPathsCommon';
import readDynamicIdCommon from '../../lib/readDynamicIdCommon';

export default function Source({ sourceData, deviceEnding }) {

  return (
    <div>
      {deviceEnding}
      {sourceData.sourceName}
    </div>
  )
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