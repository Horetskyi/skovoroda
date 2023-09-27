import { copyrightPageKey } from "../skovorodaConstants";
import { copyrightContent } from "./copyrightContent";

export function getCopyrightPageProps() {
  return {
    props: {
      pageKey: copyrightPageKey,
      metadataTitle: copyrightContent.title,
      metadataDescription: copyrightContent.title,
      metadataKeywords: [copyrightContent.title],
      metadataAuthorUrl: "https://www.linkedin.com/in/dmytro-horetskyi/",
      shouldBeIndexed: true,
      canonicalPageUrl: "https://www.skovoroda.club/copyright",
    },
  };
}
