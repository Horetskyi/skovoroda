
import getStaticPathsCommon from '../../../lib/getStaticPathsCommon';
import readDynamicIdCommon from '../../../lib/readDynamicIdCommon';
import { SkovorodaLettersFrom } from '../../../lib/data/skovorodaLetters';
import { SkovorodaSourcesArray } from '../../../lib/data/skovorodaSources';
import SkovorodaLetterPageDesktop from '../../../components/skovorodaLetterPageDesktop';
import { lettersFromPageKey } from '../../../lib/skovorodaConstants';
import getSelectedNoteNumbersByContent from '../../../lib/getSelectedNoteNumbersByContent';

export default function SkovorodaLetterFromPage({ ...params }) {
  return <SkovorodaLetterPageDesktop {...params} letterType="from" />
}

// Get all Letters From Paths
export function getStaticPaths() {
  
  const allLetterIds = SkovorodaLettersFrom.allLetters.map(letter => letter.letterMetadata.id);
  console.log("All Letters From Ids:", allLetterIds);
  return getStaticPathsCommon(allLetterIds);
}

// Get Letter From Data by Id
export function getStaticProps({ params }) {

  const { id, deviceEnding } = readDynamicIdCommon(params.id);
  const selectedLetter = SkovorodaLettersFrom.allLetters.find(letter => letter.letterMetadata.id == id);
  const allLettersMetadata = SkovorodaLettersFrom.allLetters.map(letter => letter.letterMetadata);
  const selectedLetterSource = SkovorodaSourcesArray.find(source => source.devNumber == selectedLetter.letterMetadata.source);
  const selectedNoteNumbers = getSelectedNoteNumbersByContent(selectedLetter.letterContent);

  const selectedNotes = SkovorodaLettersFrom.allNotes.filter(notes => 
    notes.notesMetadata.source == selectedLetter.letterMetadata.source &&
    notes.notesMetadata.name == selectedLetter.letterMetadata.name)
    .flatMap(notes => notes.notes)
    .filter(lineObject => selectedNoteNumbers.includes(lineObject.noteNumber) ||
      lineObject.letterNumber == selectedLetter.letterMetadata.number);

  // Map translatorName:
  selectedLetter.letterMetadata.translatorName = mapTranslatorName(selectedLetter.letterMetadata.translatorName);
  allLettersMetadata.forEach(metadata => {
    metadata.translatorName = mapTranslatorName(metadata.translatorName);
  });

  return {
    props: {
      pageKey: lettersFromPageKey,
      breadcrumbLabel: selectedLetter.letterMetadata.name + " - Лист № " + selectedLetter.letterMetadata.number,
      selectedId: id,
      metadataTitle: selectedLetter.letterMetadata.name + " - " + selectedLetter.letterMetadata.number + " - Григорій Савич Сковорода",
      metadataDescription: selectedLetter.letterMetadata.name + " - " + selectedLetter.letterMetadata.number + " - Григорій Савич Сковорода",
      selectedLetter,
      selectedNotes,
      allLettersMetadata,
      selectedLetterSource,
      deviceEnding,
    },
  };
}

// Auxiliary
const translatorNamesMap = new Map([
  ["Леонід Ушкалов", 'Редактор перекладів - Леонід Ушкалов'],
  ["Петро Пелех", "Перекладач - Петро Пелех"],
]);
function mapTranslatorName(translatorName) {
  if (translatorNamesMap.has(translatorName)) {
    return translatorNamesMap.get(translatorName);
  }
  return translatorName;
}
