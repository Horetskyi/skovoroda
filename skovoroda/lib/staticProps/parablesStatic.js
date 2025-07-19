import { parablesPageKey } from "../skovorodaConstants";

export function getParablesPageProps() {
  
  return {
    props: {
      pageKey: parablesPageKey,
      
      shouldBeIndexed: false,
      metadataTitle: "Притчі Григорія Сковорода",
      metadataDescription: "Притчі Григорія Савича Сковороди",
      canonicalPageUrl: "https://www.skovoroda.club/texts/treatise",
      
      parables: [],
    },
  };
}