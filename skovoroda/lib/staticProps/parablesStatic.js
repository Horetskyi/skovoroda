import { parablesPageKey } from "../skovorodaConstants";
import { getSchemaByPageKey } from '../../components/schema/skSchemaFacade';

export function getParablesPageProps() {
  
  return {
    props: {
      pageKey: parablesPageKey,
      schemaOrg: getSchemaByPageKey(parablesPageKey),
      
      shouldBeIndexed: false,
      metadataTitle: "Притчі Григорія Сковорода",
      metadataDescription: "Притчі Григорія Савича Сковороди",
      canonicalPageUrl: "https://www.skovoroda.club/texts/treatise",
      
      parables: [],
    },
  };
}