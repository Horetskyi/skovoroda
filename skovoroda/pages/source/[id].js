
import getStaticPathsCommon from '../../lib/getStaticPathsCommon';
import readDynamicIdCommon from '../../lib/readDynamicIdCommon';
import getSkovorodaData from '../../lib/skovorodaData';

export default function Source({ sourceData, deviceEnding }) {

  return (
    <div>
      {deviceEnding}
      {sourceData.sourceName}
    </div>
  )
}

export async function getStaticPaths() {
  
  const data = getSkovorodaData();
  const ids = data.sources.map(source => source.id);
  return getStaticPathsCommon(ids);
}

export async function getStaticProps({ params }) {

  const { id, deviceEnding } = readDynamicIdCommon(params.id);
  const data = getSkovorodaData();
  const sourceData = data.sources.find(source => source.id === id);
  return {
    props: {
      sourceData,
      deviceEnding
    },
  };
}