import fs from "fs";
import path from "path";
import { fixText } from "./auxiliary";
import { parseFileContent } from "../data/utils/readingTextsUtils";
import { SkImagesArray } from "../data/images/skImages";
import { readFileSyncOrDefault } from "./dataReaderHelper";
import { calculateTextStatistics } from "./details/calculateTextStatistics";

export function readAllTreatises(options) {

  const isExcludeContent = options && options.excludeContent ? true : false;
  const isExcludeReadContent = options && options.excludeReadContent ? true : false;
  const isIncludeStatistics = options && options.includeStatistics ? true : false;

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

      // Transform zmist.list (pass filename for SEED support)
      if (metadata.zmist && Array.isArray(metadata.zmist.list) && metadata.zmist.list.length) {
        metadata.zmist.list = transformZmistList(metadata.zmist.list, jsonFileName);
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

        // File 4. "vstupni_dveri_do_khrystyianskoi_dobronravnosti READ.txt"
        const readContentString = readContentStringOrDefault(jsonFilePath.replace(".json", " READ.txt"));
        
        // File 5. "vstupni_dveri_do_khrystyianskoi_dobronravnosti READ NOTES.txt"
        const readContentNotesString = readContentStringOrDefault(jsonFilePath.replace(".json", " READ NOTES.txt"));
        
        const originalVersion = metadata.versions.find(version => version.translatorId === 0);
        originalVersion.isReadAvailable = readContentString ? true : false;
        if (!isExcludeReadContent && originalVersion.isReadAvailable) {
          const isOriginal = true;
          const readContent = parseFileContent(readContentString, isOriginal);
          if (readContent) {
            fs.writeFileSync(path.join(process.cwd(), "lib", "data", "treatises", 'debug', 'debug1.txt'), JSON.stringify(readContent, null, 2));
            originalVersion.readContent = readContent;
            originalVersion.readContentNotes = parseFileContent(readContentNotesString, isOriginal);
            if (isIncludeStatistics) {
              originalVersion.contentStatistics = calculateTextStatistics(originalVersion.readContent);
              fs.writeFileSync(path.join(process.cwd(), "lib", "data", "treatises", 'debug', 'debug1_tatistics.txt'), JSON.stringify(originalVersion.contentStatistics, null, 2));
            }
          }
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

function readContentStringOrDefault(path) {
  let contentString = readFileSyncOrDefault(path);
  if (!contentString || !contentString.length) {
    contentString = null;
  }
  return contentString;
}

// DDD
function transformZmistList(zmistList, treatiseFileName) {
  return zmistList.map(item => {
    if (typeof item === "string") {
      return { title: item };
    } else if (typeof item === "object" && item.title) {

      // --- Add seed file reading for type: "seed" ---
      if (item.type === "seed" && treatiseFileName) {
        // Build SEED.txt file path
        const seedFilePath = path.join(
          process.cwd(),
          "lib",
          "data",
          "treatises",
          treatiseFileName.replace(".json", " SEED.txt")
        );
        if (fs.existsSync(seedFilePath)) {
          const seedContentString = fs.readFileSync(seedFilePath).toString();
          item.seedContent = parseFileContent(seedContentString);
        }
      }
      // ---

      if (item.illustration) {
        item.illustration = {
          imageUrl: `/images/treatise/${item.illustration}`,
          imageTitle: `Ілюстрація до притчі "${item.title}"`,
          imageAlt: `Ілюстрація до притчі "${item.title}"`,
        };
      }

      // --- Enhancement: read and parse songs if 'contains' includes song_xxx ---
      if (Array.isArray(item.contains)) {
        const songs = [];
        item.contains.forEach(contained => {
          // Support both string and object with id/title
          let containedId, containedTitle;
          if (typeof contained === "string") {
            containedId = contained;
            containedTitle = undefined;
          } else if (typeof contained === "object" && contained.id) {
            containedId = contained.id;
            containedTitle = contained.title;
          }
          if (containedId && containedId.startsWith("song_")) {
            // Extract song number from id, e.g. song_15_1 -> 1 (or keep full id if needed)
            const songIdMatch = containedId.match(/^song_(\d+)(?:_(\d+))?$/);
            let songId = containedId;
            if (songIdMatch) {
              songId = songIdMatch[2] ? Number(songIdMatch[2]) : Number(songIdMatch[1]);
            }
            // Build path to song file
            const songFilePath = path.join(process.cwd(), "lib", "data", "treatises", "songs", containedId + ".txt");
            if (fs.existsSync(songFilePath)) {
              const songContentString = fs.readFileSync(songFilePath).toString();
              const content = parseFileContent(songContentString);
              songs.push({
                songId,
                content,
                title: containedTitle ? containedTitle : `Пісня ${songId}`
              });
            }
          }
        });
        if (songs.length) {
          item.songs = songs;
        }
      }
      // ---

      return item;
    }
    return item;
  });
}
