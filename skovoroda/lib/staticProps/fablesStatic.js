import { SkovorodaSourcesArray } from "../data/skovorodaSources";
import { readAllFables, readFablesTopContent } from "../dataReaders/fablesReader";
import { fablesPageKey } from "../skovorodaConstants";

export function getFablesPageProps() {
  const allFables = readAllFables().allFables.map(fable => fable.metadata);
  const {fablesTopContent, allSourceIds} = readFablesTopContent();
  const allSources = SkovorodaSourcesArray.filter(source => allSourceIds.includes(source.devNumber));
  return {
    props: {
      pageKey: fablesPageKey,
      
      shouldBeIndexed: true,
      metadataTitle: "Байки Сковороди - Байки Харківські",
      metadataDescription: "Перші півтора десятка байок Сковорода написав «полишивши вчительську посаду й усамітнившись у лісах, полях, садах, селах, хуторах та пасіках, що лежать довкруж Харкова». Другу половину байок написав в селі Бабаях.",
      metadataKeywords: ["Байки Харківські", "Байки Сковороди", "Байки Сковороди переклад на українську", "Байки в оригіналі", "Про байки"],
      canonicalPageUrl: "https://www.skovoroda.club/texts/fables",
      
      allSources,
      fablesTopContent,
      allFables,
    },
  };
}
