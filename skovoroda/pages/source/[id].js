
import getSkovorodaData from '../../lib/skovorodaData';

export default function Source({ sourceData }) {

  return (
    <div>
      {sourceData.sourceName}
    </div>
  )
}

export async function getStaticPaths() {
  
  const data = getSkovorodaData();

  const paths = data.sources.map(source => {
    return {
      params: {
        id: source.id
      }
    };
  });
  
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {

  const data = getSkovorodaData();

  const sourceData = data.sources.find(source => source.id === params.id);

  return {
    props: {
      sourceData,
    },
  };
}