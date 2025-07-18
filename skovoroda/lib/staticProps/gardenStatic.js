import { SkImages } from "../data/images/skImages";
import { SkovorodaGardenRefactored } from "../dataReaders/skovorodaGarden";
import { gardenPageKey } from "../skovorodaConstants";

export function getGardenPageProps() {
  const allSongsMetadata = SkovorodaGardenRefactored.allSongs.map(song => song.songMetadata);
  const gardenImageByOlenka = SkImages.gardenByOlenka;
  return {
    props: {
      // APP LEVEL {
      pageKey: gardenPageKey,
      // APP LEVEL }

      // SEO {
      shouldBeIndexed: true,
      metadataTitle: "Григорій Савич Сковорода - Сад божественних пісень",
      metadataDescription: "Григорій Савич Сковорода - Сад божественних пісень",
      metadataKeywords: ["Сад божественних пісень", "Пісні Сковороди", "Сковорода Сад"],
      canonicalPageUrl: "https://www.skovoroda.club/texts/garden",
      // SEO }
      
      // TECH {
      gardenImageByOlenka,
      allSongsMetadata,
      // TECH }      
    },
  };
}
