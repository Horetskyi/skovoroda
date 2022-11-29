import { SkovorodaConstants } from "./skovorodaConstants";

export default async function getStaticPathsCommon(ids) {
  
  const paths = ids.flatMap(id => [
    {
      params: {
        id: id + SkovorodaConstants.desktopEnding
      }
    },
    {
      params: {
        id: id + SkovorodaConstants.mobileEnding
      }
    },
  ]);

  return {
    paths,
    fallback: false,
  };
}