import fs from "fs";
import path from "path";
import { parseFileContent } from "./utils/readingTextsUtils";

const lettersDirectoryPath = path.join(process.cwd(), "lib", "data", "lettersFrom");

const translatorNamesIdsMap = new Map();
translatorNamesIdsMap.set("Петро Пелех", "peleh");
translatorNamesIdsMap.set("Леонід Ушкалов", "uskalov");

const toNamesIdsMap = new Map();
toNamesIdsMap.set("Михайло Іванович Ковалинський", "to-kovalynskii");


function getLetterId(letter) {
  const isOriginal = letter.translatorType === "Original";
  const originalId = toNamesIdsMap.get(letter.to) + "-" + letter.number;
  if (isOriginal) {
    return originalId;
  }
  return originalId + "-" + translatorNamesIdsMap.get(letter.translatorName);
}

function readLetters() {

  const lettersFileNames = fs.readdirSync(lettersDirectoryPath);

  const allParsedLetters = lettersFileNames.filter(fileName => fileName.includes(".json") && !fileName.includes("Примітки")).map(jsonFileName => {
    
    const jsonFilePath = path.join(lettersDirectoryPath, jsonFileName);
    const txtFilePath = jsonFilePath.replace(".json", ".txt");
    
    const letterMetadata = JSON.parse(fs.readFileSync(jsonFilePath).toString());
    letterMetadata.id = getLetterId(letterMetadata);
    
    const contentString = fs.readFileSync(txtFilePath).toString();
    const content = parseFileContent(contentString);

    return {
      letterMetadata: letterMetadata,
      letterContent: content,
    };
  });

  return allParsedLetters;
}

function readNotes() {
  
  const lettersFileNames = fs.readdirSync(lettersDirectoryPath);

  return lettersFileNames.filter(fileName => fileName.includes(".json") && fileName.includes("Примітки")).map(jsonFileName => {
      
      const jsonFilePath = path.join(lettersDirectoryPath, jsonFileName);
      const txtFilePath = jsonFilePath.replace(".json", ".txt");
      
      const notesMetadata = JSON.parse(fs.readFileSync(jsonFilePath).toString());
      const notesString = fs.readFileSync(txtFilePath).toString();
      const notes = parseFileContent(notesString);

      return {
        notes: notes,
        notesMetadata: notesMetadata
      };
    });
}

const allLetters = readLetters();
const allNotes = readNotes();

export const SkovorodaLettersFrom = {
  allLetters: allLetters,
  allNotes: allNotes,
};