import fs from "fs";
import path from "path";
import { fixText } from "./auxiliary";
import { parseFileContent } from "../data/utils/readingTextsUtils";
import { getReadRelatedItem, getTreariseRelatedItem, getTreatiseShortTitle } from "./details/auxiliaryMethods";
import { readAllTreatises } from "./treatisesReader";
import { readAllReads } from "./readsReader";
import { getTreatisePath, pathJoinWithoutEndSlash } from "../skovorodaPath";

export function readAllThemes() {

  const allTreatises = readAllTreatises({excludeContent: true});
  const allReads = readAllReads({excludeContent: true});

  const directoryPath = path.join(process.cwd(), "lib", "data", "themes");
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

      // RELEVANT ITEMS {
      // TODO: theme.relevantItems = [ + fables, songs, otherThemes ]
      metadata.relevantItems = [];
      allTreatises
        .filter(treatise => treatise.relevantThemes && treatise.relevantThemes.includes(metadata.themeKey))
        .map(treatise => getTreariseRelatedItem(treatise))
        .forEach(item => metadata.relevantItems.push(item));
      allReads
        .filter(read => read.mainTheme && read.mainTheme === metadata.themeKey)
        .map(read => getReadRelatedItem(read))
        .forEach(item => metadata.relevantItems.push(item)); 
      // RELEVANT ITEMS }

      // QUOTES {
      metadata.quotes = [];
      allTreatises
        .filter(treatise => 
          treatise.relevantThemes && 
          treatise.relevantThemes.includes(metadata.themeKey) && 
          treatise.quotes && 
          treatise.quotes.length)
        .flatMap(treatise => treatise.quotes
          .filter(quotes => quotes.texts && quotes.texts.length)
          .flatMap(quotes => quotes.texts)
          .filter(quote => quote && quote.text && quote.themes && quote.themes.includes(metadata.themeKey))
          .map(quote => ({
            text: quote.text,
            href: getTreatisePath(treatise.urlId),
            sourceType: "treatise",
            shortName: getTreatiseShortTitle(treatise),
          }))
        )
        .forEach(item => metadata.quotes.push(item));
      console.log(`Found ${metadata.quotes.length} quotes for theme ${metadata.themeKey}`);
      // QUOTES }

      // File 2. "vstupni_dveri_do_khrystyianskoi_dobronravnosti.txt"
      const txtContentFilePath = jsonFilePath.replace(".json", ".txt");
      let txtContentString = fs.readFileSync(txtContentFilePath).toString();
      if (!txtContentString || !txtContentString.length) {
        txtContentString = null;
      }
      const introContent = txtContentString ? parseFileContent(txtContentString) : null;
      metadata.content = introContent;
      return metadata;
    })
    .filter(item => item);

  return allParsedItems;
}
