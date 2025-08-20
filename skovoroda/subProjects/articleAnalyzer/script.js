/**
  
WHAT SCRIPT DOES?:
 
<understanding_input_files>
Checks all files from "inputs" directory.
Understands that "sviati_ottsi_v_skovorody.txt" relates to "sviati_ottsi_v_skovorody NOTES.txt"
NOTES files has lines like this example:
```
[NoteNumber]3[NoteNumber] [Italic]Лебедев А.[Italic] С. Г. С. Сковорода как богослов // Boпpocы философии и психологии. – 1895. - Кн. 27(2). - С. 170-177.
```
[Italic] should be ignored
[NoteNumber]3[NoteNumber] also should be ignored
</understanding_input_files>

<maintaining_global_sources>
Maintains "outputs/globalSources.json" which contains all books/articles which are referenced in the input files.
Script will not remove anything from globalSources.json by no reason
Script can merge duplicates in globalSources.json by title similarity + author similarity + same year
Script can add new sources to globalSources.json found in NOTES files
globalSources.json example:
```
[
  {
    "id": "ern__hryhoryi_savych_skovoroda_zhyzn_y_uchenye",
    "title": "Григорий Савич Сковорода. Жизнь и учение.",
    "year": 1912,
    "location": "Москва",
    "authorId": "ern_v_f"
  }
]
```
</maintaining_global_sources>

<maintaining_global_authors>
Maintains "outputs/globalAuthors.json" which contains all authors which are referenced in the input files.
Script will not remove anything from globalAuthors.json by no reason
Script can merge duplicates in globalAuthors.json by full name similarity
Script can add new authors to globalAuthors.json found in NOTES files
globalAuthors.json example:
```
[
  {
    "id": "ern_v_f",
    "author": "Зрн В. Ф."
  }
]
```
</maintaining_global_authors>

<analyzing_input_articles_and_generating_outputs>
Script will output analyzed files e.g. "outputs/analyzed__sviati_ottsi_v_skovorody.json"
Analyzed files will contain all unique sources ids which are referenced in the input file as array field 'sources'
Analyzed files will contain all unique source authors ids which are referenced in the input file as array field 'sources_authors'
Analyzed files will contain 'id' with input file name without extension e.g. 'sviati_ottsi_v_skovorody'
Analyzed fields also: notes_count, sentences_count, words_count, characters_count

Analysis also includes finding skovoroda texts mentioned in the text e.g. if text is:
```
Сковорода покликався на Златоуста також у візії «Брань архистратига Михаила со Сатаною». У спеціальній примітці 
```
algorithm will find the match between string "Брань архистратига Михаила со Сатаною" and existed data about all skovoroda texts
and will find that it mathes with text with id "borotba_arhystratiha_mihaila_s_satanoyu"
Also one of the output files will be "outputs/analyzed__sviati_ottsi_v_skovorody.txt" which will contain originalContent with modifications, e.g.
this line:
```
Сковорода покликався на Златоуста також у візії «Брань архистратига Михаила со Сатаною». У спеціальній примітці 
```
will be transformed into:
```
Сковорода покликався на Златоуста також у візії «[META]LINK.treatise.borotba_arhystratiha_mihaila_s_satanoyu[X]Брань архистратига Михаила со Сатаною[META]». У спеціальній примітці
```

analyzed__sviati_ottsi_v_skovorody.json example:
```
{
  "id": "sviati_ottsi_v_skovorody",
  "sources": [
    {
      "id": "ern__hryhoryi_savych_skovoroda_zhyzn_y_uchenye",
      "count": 2 // means referenced twice
    }
  ],
  "sources_authors": [
    {
      "id": "ern_v_f",
      "count": 3 // means referenced three times
    }
  ],
  "notes_count": 40,
  "sentences_count": 500,
  "words_count": 3400,
  "characters_count": 40000,
  "mentioned_skovoroda_texts": [
    {
      "id": "borotba_arhystratiha_mihaila_s_satanoyu",
      "count": 1 // means mentioned once  
    }
  ]
}
```
</analyzing_input_articles_and_generating_outputs>

*/
// ------------------------------------------------

const fs = require('fs');
const path = require('path');
const { transliterateUkrainianToEnglish } = require('./logic/transliteration');
const { textToId } = require('./logic/textToIdTransformer');
const skovorodaTextsData = [
  {
    "id": "borotba_arhystratiha_mihaila_s_satanoyu",
    "possibleTitles": [
      "Брань Михаила с Сатаною",
      "Брань Михаила со Сатаною",
      "Брань архистратига Михаила со Сатаною",
      "Брань архистратига Михаила с Сатаною",
      "Боротьба Архистратига Михаїла зі Сатаною",
      "Боротьба Архистратига Михаїла зі Сатаною про те",
      "Боротьба Архистратига Михаїла зі Сатаною про те легко бути добрим",
      "Боротьба Архистратига Михаїла зі Сатаною про те: легко бути добрим",
      "Брань Архистратига Михаила со Сатаною о сем - Легко быть Благим",
      "Брань Архистратига Михаила со Сатаною о сем",
    ],
    "type": "treatise"
  },
  {
    "id": "zhinka_lotova",
    "possibleTitles": [
      "Жінка Лотова",
      "Жена Лотова",
      "Книжечка о Чтеніи Священнаго Писанія",
      "Книжечка о Чтеніи Священнаго Писанія, нареченна Жена Лотова",
      "Книжечка про читання Святого Письма",
      "Книжечка про читання Святого Письма, названа Жінка Лотова",
    ],
    "type": "treatise"
  }
];


// Directories
const INPUTS_DIR = path.join(__dirname, 'inputs');
const OUTPUTS_DIR = path.join(__dirname, 'outputs');
const GLOBAL_SOURCES_PATH = path.join(OUTPUTS_DIR, 'globalSources.json');
const GLOBAL_AUTHORS_PATH = path.join(OUTPUTS_DIR, 'globalAuthors.json');

// Utility: Read or initialize JSON file
function readOrInitJSON(filePath, defaultValue) {
  if (!fs.existsSync(filePath)) return defaultValue;
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (e) {
    return defaultValue;
  }
}

// Utility: Write JSON file
function writeJSON(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

// Step 1: Scan inputs directory for article and notes files
function getInputFilePairs() {
  if (!fs.existsSync(INPUTS_DIR)) return [];
  const files = fs.readdirSync(INPUTS_DIR);
  const articles = files.filter(f => f.endsWith('.txt') && !f.includes('NOTES'));
  const pairs = articles.map(article => {
    const base = article.replace(/\.txt$/, '');
    const notes = files.find(f => f === `${base} NOTES.txt`);
    return { article, notes };
  });
  return pairs;
}



// Use user's precise parser for each line
const { parseSourcesFromLineStage1 } = require('./logic/parseSourcesFromLine');

// Helper: Extract author and title from a note line (very basic, can be improved)
function extractAuthorAndTitle(line) {
  // Example: Лебедев А. С. Г. С. Сковорода как богослов // ...
  // Try to extract author (before first dot or //), title (after author, before //)
  let author = '', title = '', year = '', location = '';
  let m = line.match(/^([^\.]+\.[^\.]+\.)\s*(.*?)(?:\s*\/\/|\.|\-|\(|$)/);
  if (m) {
    author = m[1].trim();
    title = m[2].trim();
  }
  // Try to extract year (4 digits)
  let yearMatch = line.match(/(1[89][0-9]{2}|20[0-9]{2})/);
  if (yearMatch) year = parseInt(yearMatch[1]);
  // Try to extract location (after year, before . or -)
  let locMatch = line.match(/\d{4}\.\s*([^\.\-]+)/);
  if (locMatch) location = locMatch[1].trim();
  return { author, title, year, location };
}

function parseNotesFile(notesFilePath) {
  const content = fs.readFileSync(notesFilePath, 'utf8');
  const lines = content.split(/\r?\n/).filter(l => l.trim());
  let sources = [];
  let authors = [];
  let notesCount = 0;
  for (let line of lines) {
    if (!line || !line.trim().length) continue;
    notesCount++;
    const parsedArr = parseSourcesFromLineStage1(line);
    if (!parsedArr || !parsedArr.length) continue;
    for (const parsed of parsedArr) {
      if (!parsed || !parsed.authorName || !parsed.title) continue;

      // Add author if not present
      if (parsed.authorName && !authors.find(a => a.author === parsed.authorName || a.id === parsed.authorId)) {
        authors.push({
          id: parsed.authorId, 
          author: parsed.authorName 
        });
      }

      // Add source if not present
      if (parsed.title) {
        const foundSource = sources.find(s => s.title === parsed.title || s.id === parsed.titleId);
        if (foundSource) {
          foundSource.count++;
        } else {
          sources.push({
            id: parsed.titleId,
            title: parsed.title,
            year: parsed.year,
            location: parsed.location,
            authorId: parsed.authorId,
            count: 1
          });
        }
      }
    }
  }
  return { sources, authors, notesCount };
}

function findSimilar(arr, obj, key) {
  
  if (!arr || !arr.length || !obj || !key) return false;

  if (typeof key === 'string') {
    return arr.find(item => item[key] && obj[key] && (''+item[key]).toLowerCase() === (''+obj[key]).toLowerCase());
  }
  if (Array.isArray(key)) {
    return arr.find(item => key.every(k => item[k] && obj[k] && (''+item[k]).toLowerCase() === (''+obj[k]).toLowerCase()));
  }
  return false;
}

function updateGlobalSourcesAuthors(newSources, newAuthors) {
  
  const globalSources = readOrInitJSON(GLOBAL_SOURCES_PATH, []);
  const globalAuthors = readOrInitJSON(GLOBAL_AUTHORS_PATH, []);

  // Authors
  for (let author of newAuthors) {
    if (!author || !author.id || !author.author) continue;
    if (!findSimilar(globalAuthors, author, 'author') &&
        !findSimilar(globalAuthors, author, 'id')) 
    {
      globalAuthors.push(author);
    }
  }

  // Sources
  for (let source of newSources) {
    if (!source || !source.id || !source.title) continue;
    if (!findSimilar(globalSources, source, ['title', 'year']) &&
        !findSimilar(globalSources, source, 'id')) 
    {
      const sourceCopy = { ...source };
      delete sourceCopy.count; // Remove count from global sources
      globalSources.push(sourceCopy);
    }
  }

  writeJSON(GLOBAL_AUTHORS_PATH, globalAuthors);
  writeJSON(GLOBAL_SOURCES_PATH, globalSources);
}


function analyzeArticleFile(articleFilePath, notesData) {
  const content = fs.readFileSync(articleFilePath, 'utf8');
  const sentences = content.split(/[.!?\n]+/).filter(s => s.trim());
  const words = content.split(/\s+/).filter(w => w.trim());
  const chars = content.replace(/\s/g, '');

  // Count sources and authors referenced (very basic: by title/author name occurrence)
  let sources = [], sources_authors = [];
  for (let source of notesData.sources) {
    sources.push({ id: source.id, count: source.count });
  }
  for (let author of notesData.authors) {
    sources_authors.push({ 
      id: author.id, 
      count: notesData.sources.filter(s => s.authorId === author.id).reduce((acc, s) => acc + s.count, 0)
    });
  }

  // Skovoroda texts mention detection and content modification
  let mentioned_skovoroda_texts = [];
  let modifiedContent = content;
  for (let t of skovorodaTextsData) {
    let found = false;
    for (let title of t.possibleTitles) {
      let regex = new RegExp(`([«\"]?)(${title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})([»\"]?)`, 'g');
      let matches = [...content.matchAll(regex)];
      if (matches.length > 0) {
        found = true;
        mentioned_skovoroda_texts.push({ id: t.id, count: matches.length });
        // Replace in content
        modifiedContent = modifiedContent.replace(regex, `[META]LINK.${t.type}.${t.id}[X]$2[META]`);
      }
    }
  }

  return {
    sources,
    sources_authors,
    notes_count: notesData.notesCount,
    sentences_count: sentences.length,
    words_count: words.length,
    characters_count: chars.length,
    mentioned_skovoroda_texts,
    modifiedContent
  };
}

// Step 5: Write analyzed output files
function writeAnalyzedOutputs(baseId, analysis) {
  const jsonPath = path.join(OUTPUTS_DIR, `analyzed__${baseId}.json`);
  const txtPath = path.join(OUTPUTS_DIR, `analyzed__${baseId}.txt`);
  writeJSON(jsonPath, {
    id: baseId,
    sources: analysis.sources,
    sources_authors: analysis.sources_authors,
    notes_count: analysis.notes_count,
    sentences_count: analysis.sentences_count,
    words_count: analysis.words_count,
    characters_count: analysis.characters_count,
    mentioned_skovoroda_texts: analysis.mentioned_skovoroda_texts
  });
  fs.writeFileSync(txtPath, analysis.modifiedContent, 'utf8');
}











// Main workflow
function main() {
  if (!fs.existsSync(OUTPUTS_DIR)) fs.mkdirSync(OUTPUTS_DIR);
  const pairs = getInputFilePairs();
  for (const { article, notes } of pairs) {
    if (!notes) continue; // skip if no notes file
    const baseId = article.replace(/\.txt$/, '');
    const articlePath = path.join(INPUTS_DIR, article);
    const notesPath = path.join(INPUTS_DIR, notes);
    const notesData = parseNotesFile(notesPath);
    updateGlobalSourcesAuthors(notesData.sources, notesData.authors);
    const analysis = analyzeArticleFile(articlePath, notesData);
    writeAnalyzedOutputs(baseId, analysis);
  }
}

main();
