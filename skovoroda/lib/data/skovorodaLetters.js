import fs from "fs";
import path from "path";
import { translatorNamesIdsMap } from "./skovorodaTranslators";
import { parseFileContent } from "./utils/readingTextsUtils";

const namesIdsMap = new Map([
  ["Михайло Іванович Ковалинський", "kovalynskii"],
]);

function getLettersDirectoryPath(key) {
  return path.join(process.cwd(), "lib", "data", key);
}

function getLetterId(letter, letterType) {
  const isOriginal = letter.translatorType === "Original";
  const namePartOfId = (letterType == "lettersFrom" ? "to" : "from") + "-" + namesIdsMap.get(letterType == "lettersFrom" ? letter.to : letter.from);
  const originalId = namePartOfId + "-" + letter.number;
  if (isOriginal) {
    return originalId;
  }
  return originalId + "-" + translatorNamesIdsMap.get(letter.translatorName);
}

function readLetters(letterType) {
  const lettersDirectoryPath = getLettersDirectoryPath(letterType);
  const lettersFileNames = fs.readdirSync(lettersDirectoryPath);
  const allParsedLetters = lettersFileNames.filter(fileName => fileName.includes(".json") && !fileName.includes("Примітки")).map(jsonFileName => {
    
    const jsonFilePath = path.join(lettersDirectoryPath, jsonFileName);
    const txtFilePath = jsonFilePath.replace(".json", ".txt");
    
    const letterMetadata = JSON.parse(fs.readFileSync(jsonFilePath).toString());
    letterMetadata.id = getLetterId(letterMetadata, letterType);
    
    const contentString = fs.readFileSync(txtFilePath).toString();
    const content = parseFileContent(contentString);

    return {
      letterMetadata: letterMetadata,
      letterContent: content,
    };
  });
  allParsedLetters.sort((a,b) => a.letterMetadata.number - b.letterMetadata.number);
  return allParsedLetters;
}

function readNotes(letterType) {
  const lettersDirectoryPath = getLettersDirectoryPath(letterType);
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

export const SkovorodaLettersFrom = {
  allLetters: readLetters("lettersFrom"),
  allNotes: readNotes("lettersFrom"),
};

export const SkovorodaLettersTo = {
  allLetters: readLetters("lettersTo"),
  allNotes: readNotes("lettersTo"),
};