import fs from "fs";
import path from "path";
import { SkovorodaSourcesArray } from "../data/skovorodaSources";
import { readAllTreatises } from "./treatisesReader";
import { metaTextProcessor } from "../metaTextProcessor/metaTextProcessor";

export function readAllCharacters() {

  const allSources = SkovorodaSourcesArray;
  const allTreatises = readAllTreatises({ excludeContent: true, excludeReadContent: true });

  const directoryPath = path.join(process.cwd(), "lib", "data", "characters");
  const fileNames = fs.readdirSync(directoryPath);
  const allParsedItems = fileNames
    .filter(fileName => fileName.includes(".json"))
    .map(jsonFileName => {

      // File 1. "Jacob.json"
      const jsonFilePath = path.join(directoryPath, jsonFileName); 
      let metadataFileContent = fs.readFileSync(jsonFilePath).toString();
      if (!metadataFileContent || !metadataFileContent.length) return undefined;
      const metadata = JSON.parse(metadataFileContent);

      metadata.about.forEach(item => {
        item.text = metaTextProcessor(item.text);
        const source = allSources.find(s => s.sourceId === item.sourceId);
        if (source) {
          item.source = source;
        }
      });

      metadata.texts = metadata.texts.map(urlId => {
        const treatise = allTreatises.find(t => t.urlId === urlId);
        const preferedVersion = treatise.versions.find(v => v.preferedVersion);
        const preferedTitle = preferedVersion.title;
        return {
          urlId,
          title: preferedTitle,
        };
      });

      return metadata;
    })
    .filter(item => item);

  return allParsedItems;
}
