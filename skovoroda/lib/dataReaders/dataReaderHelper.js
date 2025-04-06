import fs from "fs";
import { parseFileContent } from "../data/utils/readingTextsUtils";

export function readFileSyncOrDefault(path) {
  try {
    return fs.readFileSync(path).toString();
  } catch (error) {
    return null;
  }
}

export function applyNotesV4(metadata, jsonFilePath) {
  if (!metadata || !jsonFilePath || !jsonFilePath.length) {
    return;
  }
  const notesFilePath = jsonFilePath.replace(".json", " NOTES.txt");
  let notesString = readFileSyncOrDefault(notesFilePath);
  if (!notesString || !notesString.length) {
    notesString = null;
  }
  const notes = notesString ? parseFileContent(notesString) : null;
  if (notes) {
    metadata.notes = notes;
  }
}