import { readAllFables } from "../dataReaders/fablesReader";
import { fablesPageKey } from "../skovorodaConstants";

export function getFablesPageProps() {
  const allFables = readAllFables().allFables.map(fable => fable.metadata);
  return {
    props: {
      allFables,
      pageKey: fablesPageKey,
      metadataTitle: "Байки Сковороди - Байки Харківські",
      metadataDescription: "Байки Харківські - Григорій Савич Сковорода",
      metadataKeywords: ["Байки Харківські", "Байки Сковороди", "Байки Сковороди в перекладі"],
      shouldBeIndexed: true,
    },
  };
}
