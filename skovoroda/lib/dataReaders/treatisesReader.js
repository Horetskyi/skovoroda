import fs from "fs";
import path from "path";
import { fixText } from "./auxiliary";
import { parseFileContent } from "../data/utils/readingTextsUtils";
import { SkImagesArray } from "../data/images/skImages";
import { readFileSyncOrDefault } from "./dataReaderHelper";

export function readAllTreatises(options) {

  const isExcludeContent = options && options.excludeContent ? true : false;

  const directoryPath = path.join(process.cwd(), "lib", "data", "treatises");
  const fileNames = fs.readdirSync(directoryPath);
  const allParsedItems = fileNames
    .filter(fileName => fileName.includes(".json"))
    .map(jsonFileName => {

      // File 1. "vstupni_dveri_do_khrystyianskoi_dobronravnosti.json"
      const jsonFilePath = path.join(directoryPath, jsonFileName); 
      let metadataFileContent = fs.readFileSync(jsonFilePath).toString();
      if (!metadataFileContent || !metadataFileContent.length) {
        return undefined;
      }
      metadataFileContent = fixText(metadataFileContent);
      const metadata = JSON.parse(metadataFileContent);

      // Transform zmist.list
      if (metadata.zmist && Array.isArray(metadata.zmist.list) && metadata.zmist.list.length) {
        metadata.zmist.list = transformZmistList(metadata.zmist.list);
      }

      if (!isExcludeContent) {
        // File 2. "vstupni_dveri_do_khrystyianskoi_dobronravnosti INTRO.txt"
        const txtIntroFilePath = jsonFilePath.replace(".json", " INTRO.txt");
        let introContentString = fs.readFileSync(txtIntroFilePath).toString();
        if (!introContentString || !introContentString.length) {
          introContentString = null;
        }
        const introContent = introContentString ? parseFileContent(introContentString) : null;
        metadata.introContent = introContent;

        // File 3. "vstupni_dveri_do_khrystyianskoi_dobronravnosti INTRO-2.txt"
        const txtIntro2FilePath = jsonFilePath.replace(".json", " INTRO-2.txt");
        let introContentString2 = readFileSyncOrDefault(txtIntro2FilePath);
        if (!introContentString2 || !introContentString2.length) {
          introContentString2 = null;
        }
        const introContent2 = introContentString2 ? parseFileContent(introContentString2) : null;
        if (introContent2) {
          metadata.introContent2 = introContent2;
        }
      }

      // Image
      const image = SkImagesArray.find(image => image.type === 'treatise' && image.urlId === metadata.urlId);
      if (image) {
        metadata.image = image;
      }
      
      return metadata;
    })
    .filter(item => item);

  return allParsedItems;
}

// DDD
function transformZmistList(zmistList) {
  return zmistList.map(item => {
    if (typeof item === "string") {
      return { title: item };
    } else if (typeof item === "object" && item.title) {

      if (item.illustration) {
        item.illustration = {
          imageUrl: `/images/treatise/${item.illustration}`,
          imageTitle: `Ілюстрація до притчі "${item.title}"`,
          imageAlt: `Ілюстрація до притчі "${item.title}"`,
        };
      }

      return item;
    }
    return item;
  });
}