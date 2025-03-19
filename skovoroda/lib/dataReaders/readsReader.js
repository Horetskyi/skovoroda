import fs from "fs";
import path from "path";
import { fixText } from "./auxiliary";
import { parseFileContent } from "../data/utils/readingTextsUtils";
import { readAllTreatises } from "./treatisesReader";
import { SkovorodaSourcesArray } from "../data/skovorodaSources";
import { pathJoin, SkovorodaTreatisePath } from "../skovorodaPath";

export function readAllReads(options) {

  const isExcludeContent = options && options.excludeContent ? true : false;

  const directoryPath = path.join(process.cwd(), "lib", "data", "reads");
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
      
      // SPECIAL {
      if (metadata.sourceTreatiseUrlId) {
        metadata.treatiseTitle = readAllTreatises()
          .find(t => t.urlId === metadata.sourceTreatiseUrlId)
          .shortTitle;
        metadata.source = SkovorodaSourcesArray.find(source => source.devNumber === metadata.sourceId);
        metadata.relatedSources = [{
          href: pathJoin(SkovorodaTreatisePath, metadata.sourceTreatiseUrlId),
          shortName: metadata.treatiseTitle,
          sourceType: "treatise",
        }];
      }
      // SPECIAL }

      if (!isExcludeContent) {
        // File 2. "vstupni_dveri_do_khrystyianskoi_dobronravnosti.txt"
        const txtContentFilePath = jsonFilePath.replace(".json", ".txt");
        let txtContentString = fs.readFileSync(txtContentFilePath).toString();
        if (!txtContentString || !txtContentString.length) {
          txtContentString = null;
        }
        const introContent = txtContentString ? parseFileContent(txtContentString) : null;
        metadata.content = introContent;
      }
      return metadata;
    })
    .filter(item => item);

  return allParsedItems;
}
