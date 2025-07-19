import { SkovorodaLettersFrom, SkovorodaLettersTo } from "../dataReaders/lettersReader";
import { lettersPageKey, SkovorodaConstants } from "../skovorodaConstants";
import { lettersH1Text } from "./lettersContent";
import { letterWriters } from "./letterWriters";

export function getLettersStaticProps(params) {

  const allLettersFrom = SkovorodaLettersFrom.allLetters.map(letter => letter.letterMetadata);
  const allLettersTo = SkovorodaLettersTo.allLetters.map(letter => letter.letterMetadata);

  const receiversList = [];
  allLettersFrom.forEach(letter => {
    const found = receiversList.find(l => l.to === letter.to);
    if (!found) {
      receiversList.push({...letter, count: 1});
    } else {
      found.count++;
    }
  });
  receiversList.sort((a, b) => a.count - b.count);

  return {
    props: {
      // APP LEVEL {
      pageKey: lettersPageKey,
      // APP LEVEL }
      
      // SEO {
      shouldBeIndexed: true,
      metadataTitle: lettersH1Text,
      metadataDescription: 'Листи Сковороди до ' + SkovorodaConstants.fixMetaDescription(receiversList.map(l => letterWriters.find(w => w.id === (l.to || l.from)).genetiveName).join(", ")),
      metadataKeywords: ["Сад божественних пісень", "Пісні Сковороди", "Сковорода Сад"],
      canonicalPageUrl: "https://www.skovoroda.club/letters",
      facebookImageUrl: null,
      // SEO }

      // TECH {
      allLettersFrom,
      allLettersTo,
      receiversList,
      // TECH }
    },
  };
}