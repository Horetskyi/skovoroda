import { SkImages } from "../data/images/skImages";
import { SkovorodaGardenRefactored } from "../dataReaders/songsReader";
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
      facebookImageUrl: "https://www.skovoroda.club/images/garden/Skovoroda Garden of Divine Songs by Olenka.webp",
      // SEO }
      
      // TECH {
      gardenImageByOlenka,
      allSongsMetadata,
      // TECH }      
    },
  };
}
