import fs from "fs";
import path from "path";
import { translatorNamesIdsMap } from "../data/skovorodaTranslators";
import { parseFileContent } from "../data/utils/readingTextsUtils";

function getLettersDirectoryPath(key) {
  return path.join(process.cwd(), "lib", "data", key);
}

function getLetterId(letter, letterType) {
  const isOriginal = letter.translatorType === "Original";
  const writerId = letterType == "lettersFrom" ? letter.to : letter.from;
  const originalId = writerId + "-" + letter.number;
  if (isOriginal) return originalId;
  return originalId + "-" + translatorNamesIdsMap.get(letter.translatorName);
}

function readJsonOrDefault(jsonFilePath) {
  try {
    return JSON.parse(fs.readFileSync(jsonFilePath).toString());
  } catch {
    return undefined;
  }
}

function readLetters(letterType) {
  const lettersDirectoryPath = getLettersDirectoryPath(letterType);
  const lettersFileNames = fs.readdirSync(lettersDirectoryPath);
  const allParsedLetters = lettersFileNames.filter(fileName => fileName.includes(".json") && !fileName.includes("Примітки")).map(jsonFileName => {
    
    const jsonFilePath = path.join(lettersDirectoryPath, jsonFileName);
    const txtFilePath = jsonFilePath.replace(".json", ".txt");
    const letterMetadata = readJsonOrDefault(jsonFilePath);
    if (!letterMetadata) return undefined;

    // Metadata
    letterMetadata.id = getLetterId(letterMetadata, letterType);
    
    // Content
    const contentString = fs.readFileSync(txtFilePath).toString();
    const content = parseFileContent(contentString);

    return {
      letterMetadata: letterMetadata,
      letterContent: content,
    };
  }).filter(letter => letter);
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