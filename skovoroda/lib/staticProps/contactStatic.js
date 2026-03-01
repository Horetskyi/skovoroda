import { contactPageKey } from "../skovorodaConstants";
import { getSchemaByPageKey } from '../../components/schema/skSchemaFacade';

export function getContactPageProps() {
  return {
    props: {
      pageKey: contactPageKey,
      schemaOrg: getSchemaByPageKey(contactPageKey),
      metadataTitle: "Контакти",
      metadataDescription: "Контакти",
      metadataKeywords: ["Контакти"],
      metadataAuthorUrl: "https://www.linkedin.com/in/dmytro-horetskyi/",
      shouldBeIndexed: true,
      canonicalPageUrl: "https://www.skovoroda.club/contact",
    },
  };
}
