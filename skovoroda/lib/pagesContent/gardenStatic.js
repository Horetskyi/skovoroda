import { SkImages } from "../data/images/skImages";
import { SkovorodaGardenRefactored } from "../data/skovorodaGarden";
import { gardenPageKey } from "../skovorodaConstants";

export function getGardenPageProps() {
  const allSongsMetadata = SkovorodaGardenRefactored.allSongs.map(song => song.songMetadata);
  const gardenImageByOlenka = SkImages.gardenByOlenka;
  return {
    props: {
      gardenImageByOlenka,
      allSongsMetadata,
      pageKey: gardenPageKey,
      metadataTitle: "Григорій Савич Сковорода - Сад божественних пісень",
      metadataDescription: "Григорій Савич Сковорода - Сад божественних пісень",
      metadataKeywords: ["Сад божественних пісень", "Пісні Сковороди", "Сковорода Сад"],
      shouldBeIndexed: true,
      canonicalPageUrl: "https://www.skovoroda.club/texts/garden",
    },
  };
}
