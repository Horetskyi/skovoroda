import fs from "fs";
import mammoth from "mammoth";
import path from "path";
import { getFullSongId } from "../sadIds";
import { SkovorodaSources } from "./skovorodaSources";
import { SkovorodaTranslatorsArray } from "./skovorodaTranslators";

const lineFormats = [
  ["[Center]", "center"],
  ["[Right]", "right"],
  ["[Tabs3]", "tabs3"],
  ["[Tab6]", "tabs6"],
  ["[Tab5]", "tabs5"],
  ["[Tab4]", "tabs4"],
  ["[Tab3]", "tabs3"],
  ["[Tab2]", "tabs2"],
  ["[Tab1]", "tabs1"],
  ["[LeftNum9]", "leftNum9"],
  ["[LeftNum8]", "leftNum8"],
  ["[LeftNum7]", "leftNum7"],
  ["[LeftNum6]", "leftNum6"],
  ["[LeftNum5]", "leftNum5"],
  ["[LeftNum4]", "leftNum4"],
  ["[LeftNum3]", "leftNum3"],
  ["[LeftNum2]", "leftNum2"],
  ["[LeftNum1]", "leftNum1"],
].map(value => { return {
  formatInDoc: value[0],
  format: value[1],
}});

function internalCleanSplitDocx(content) {
  const split = content.split('\n');

  // Remove last empty lines
  if (!split[split.length - 1]) {
    split.pop(); 
  }

  const cleanSplit = [];
  var emptyLineCount = 0;
  split.forEach(line => {
    const isEmptyLine = !line || !(line.trim());
    if (isEmptyLine) {
      emptyLineCount++;
    } else {
      emptyLineCount = 0;
    }
    if (emptyLineCount === 2){
      cleanSplit.push("");
    } else if (emptyLineCount === 0) {
      cleanSplit.push(line);
    }
  });
  return cleanSplit;
}

function nameToShortName(name) {
  return name.split("(")[0].trim();
}

function parseDocxSadFile(content) {
  
  const split = internalCleanSplitDocx(content);
  const result = {
    type: "original"
  };
  const textBefore = [];
  const textAfter = [];
  const text = [];
  const notes = [];
  var section = undefined;
  var mainSectionStatus = 0;

  split.forEach((line, index) => {

    const isEmptyLine = !line || !(line.trim());
    const lineObject = { text: line };
    lineFormats.some(lineFormat => {
      if (lineObject.text.includes(lineFormat.formatInDoc)) {
        lineObject.text = lineObject.text.replace(lineFormat.formatInDoc, "").trim();
        lineObject.format = lineFormat.format;
        return true;
      }
      return false;
    });

    if ((index !== (split.length - 1)) && !split[index + 1]) {
      lineObject.isEnterLine = true;
    }

    // Irmologion font
    if (!isEmptyLine) {
      const irmSplit = lineObject.text.split("[Irm]");
      if (irmSplit.length > 1) {
        var irmResult = [];
        irmSplit.forEach((text, index) => {
          if (!text) {
            return;
          }
          if (index % 2 === 0) {
            irmResult.push({ text: text });
          } else {
            irmResult.push({ text: text, format: "irmologion" });
          }
        });
        lineObject.text = irmResult;
      }
    }

    // Section "text"
    if (section === "text") {
      
      if (line.includes("Примітки")) {
        section = "notes";
        return;
      }
      if (line.includes("[MainSection]")) {
        mainSectionStatus++;
        return;
      }
      var workingArray = text;
      if (mainSectionStatus === 0)
        workingArray = textBefore;
      else if (mainSectionStatus === 1)
        workingArray = text;
      else if (mainSectionStatus === 2)
        workingArray = textAfter;
      if (workingArray.length || !isEmptyLine) {
        workingArray.push(lineObject);
      }
      return;
    }

    // Section "notes"
    if (section === "notes") {
      if (!notes.length && isEmptyLine) {
        return;
      }
      notes.push(lineObject);
      return;
    }
    
    // Section begining
    if (index < 40 && line.includes("Назва:")) {
      result.name = line.replace("Назва:", "").trim();
      return;
    }
    if (index < 40 && line.includes("Перекладач:")) {
      const translatorNameEncoded = line.replace("Перекладач:", "").replace('.','').trim();
      if (translatorNameEncoded) {
        result.translator = SkovorodaTranslatorsArray.find(translator => translator.fullName.includes(translatorNameEncoded))
      }
      result.type = "translation";
      return;
    }
    if (index < 40 && line.includes("Джерело:") && line.includes("[") && line.includes("]")) {
      const sourceEncoded = line.replace("Джерело:", "").trim();
      if (sourceEncoded && sourceEncoded.includes("[10]")) {
        result.source = SkovorodaSources.ukrainska_musa_2009;
      }
      section = "text";
      return;
    }
  });
  if (result.type === "translation") {
    result.translatedName = result.name;
  } else if (result.type === "original") {
    result.originalName = result.name;
  }
  result.shortName = nameToShortName(result.name);
  result.textAfter = textAfter;
  result.textBefore = textBefore;
  result.text = text;
  result.notes = notes;
  return result;
}

function fileNameToId(fileName) {
  const songId = fileName.replace(".docx", "");
  return getFullSongId(songId);
}

var skovorodaSad = undefined;

export async function SkovorodaSad() {
  
  if (skovorodaSad) {
    return skovorodaSad;
  }

  const sadArray = [];

  const sadDirectoryPath = path.join(process.cwd(), "lib", "data", "sad");

  const originalDirectoryPath = path.join(sadDirectoryPath, "original");
  const originalFileNames = fs.readdirSync(originalDirectoryPath);
  await Promise.all(originalFileNames.map(async fileName => {
    if (fileName.includes("~")) return;
    const id = fileNameToId(fileName);
    const filePath = path.join(originalDirectoryPath, fileName);
    const text = await mammoth.extractRawText({path: filePath})
    const parsed = parseDocxSadFile(text.value);
    parsed.translates = [];
    parsed.id = id;
    sadArray.push(parsed);
  }));

  const hotkevychDirectoryPath = path.join(sadDirectoryPath, "hotkevych");
  const hotkevychFileNames = fs.readdirSync(hotkevychDirectoryPath);
  await Promise.all(hotkevychFileNames.map(async fileName => {
    if (fileName.includes("~")) return;
    const id = fileNameToId(fileName);
    const filePath = path.join(hotkevychDirectoryPath, fileName);
    const text = await mammoth.extractRawText({path: filePath});
    const parsed = parseDocxSadFile(text.value);
    const sadObject = sadArray.find(x => x.id === id);
    const translationId = "hotkevych";
    parsed.translationId = translationId;
    parsed.id = id + "-" + translationId;
    sadObject.translates.push(parsed);
  }));

  skovorodaSad = {
    originalName: "Сад божественных пѣсней, прозябшій из зерн Священнаго Писанія",
    array: sadArray,
  };

  return skovorodaSad;
}
