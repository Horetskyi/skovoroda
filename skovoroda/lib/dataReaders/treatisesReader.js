import fs from "fs";
import path from "path";
import { fixText } from "./auxiliary";
import { parseFileContent } from "../data/utils/readingTextsUtils";

export function readAllTreatises() {
  const directoryPath = path.join(process.cwd(), "lib", "data", "treatises");
  const fileNames = fs.readdirSync(directoryPath);
  const allParsedItems = fileNames
    .filter(fileName => fileName.includes(".json"))
    .map(jsonFileName => {

      // File 1. "vstupni_dveri_do_khrystyianskoi_dobronravnosti.json"
      const jsonFilePath = path.join(directoryPath, jsonFileName); 
      
      // File 2. "vstupni_dveri_do_khrystyianskoi_dobronravnosti INTRO.txt"
      const txtIntroFilePath = jsonFilePath.replace(".json", " INTRO.txt");
     
      let metadataFileContent = fs.readFileSync(jsonFilePath).toString();
      if (!metadataFileContent || !metadataFileContent.length) {
        return undefined;
      }
      metadataFileContent = fixText(metadataFileContent);
      const metadata = JSON.parse(metadataFileContent);

      let introContentString = fs.readFileSync(txtIntroFilePath).toString();
      if (!introContentString || !introContentString.length) {
        introContentString = null;
      }
      const introContent = introContentString ? parseFileContent(introContentString) : null;
      metadata.introContent = introContent;

      return metadata;
    })
    .filter(item => item);

  return allParsedItems;
}
