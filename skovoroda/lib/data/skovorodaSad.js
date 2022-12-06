import fs from "fs";
import mammoth from "mammoth";
import path from "path";
import { SkovorodaSources } from "./skovorodaSources";
import { SkovorodaTranslatorsArray } from "./skovorodaTranslators";

const lineFormats = [
  {
    formatInDoc: "[Center]",
    format: "center"
  },
  {
    formatInDoc: "[Right]",
    format: "right"
  },
  {
    formatInDoc: "[Tabs3]",
    format: "tabs3"
  },
];

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
  const text = [];
  const notes = [];
  var section = undefined;

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

    // Section "text"
    if (section === "text") {
      if (!text.length && isEmptyLine) {
        return;
      }
      if (line.includes("Примітки")) {
        section = "notes";
        return;
      }
      text.push(lineObject);
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
  result.text = text;
  result.notes = notes;
  return result;
}

function fileNameToId(fileName) {
  return "pisnya-" + fileName.replace(".docx", "");
}

export async function SkovorodaSad() {
  
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
    parsed.id = id + "-hotkevych";
    sadObject.translates.push(parsed);
  }));

  return {
    originalName: "Сад божественных пѣсней, прозябшій из зерн Священнаго Писанія",
    array: sadArray,
  };
}
