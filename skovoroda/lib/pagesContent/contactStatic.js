import { contactPageKey } from "../skovorodaConstants";

export function getContactPageProps() {
  return {
    props: {
      pageKey: contactPageKey,
      metadataTitle: "Контакти",
      metadataDescription: "Контакти",
      metadataKeywords: ["Контакти"],
      metadataAuthorUrl: "https://www.linkedin.com/in/dmytro-horetskyi/",
      shouldBeIndexed: true,
      canonicalPageUrl: "https://www.skovoroda.club/contact",
    },
  };
}
