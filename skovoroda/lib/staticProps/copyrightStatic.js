import { copyrightPageKey } from "../skovorodaConstants";
import { copyrightContent } from "./copyrightContent";
import { getSchemaByPageKey } from '../../components/schema/skSchemaFacade';

export function getCopyrightPageProps() {
  return {
    props: {
      pageKey: copyrightPageKey,
      schemaOrg: getSchemaByPageKey(copyrightPageKey),
      metadataTitle: copyrightContent.title,
      metadataDescription: copyrightContent.title,
      metadataKeywords: [copyrightContent.title],
      metadataAuthorUrl: "https://www.linkedin.com/in/dmytro-horetskyi/",
      shouldBeIndexed: true,
      canonicalPageUrl: "https://www.skovoroda.club/copyright",
    },
  };
}
