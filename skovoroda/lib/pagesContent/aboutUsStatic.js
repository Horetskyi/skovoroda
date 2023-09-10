import { aboutUsPageKey } from "../skovorodaConstants";

export function getAboutUsPageProps() {
  return {
    props: {
      pageKey: aboutUsPageKey,
      metadataTitle: "Про Нас",
      metadataDescription: "Про Нас",
      metadataKeywords: ["Про Нас"],
      metadataAuthorUrl: "https://www.linkedin.com/in/dmytro-horetskyi/",
      shouldBeIndexed: true,
    },
  };
}
