import getStaticPathsCommon from '../../../lib/getStaticPathsCommon';
import readDynamicIdCommon from '../../../lib/readDynamicIdCommon';
import { SkovorodaSourcesArray } from '../../../lib/data/skovorodaSources';
import { lettersFromPageKey, SkovorodaConstants } from '../../../lib/skovorodaConstants';
import dynamic from 'next/dynamic';
import { SkovorodaLettersFrom } from '../../../lib/dataReaders/lettersReader';
import { getLetterWriterByLetterMetadata } from '../../../lib/staticProps/letterWriters';
import getSelectedNoteNumbersByContent from '../../../lib/metaTextUsages/getSelectedNoteNumbersByContent';
const SkovorodaLetterPageDesktop = dynamic(() => import('../../../components/pages/skLetterPageDesktop'));
const SkovorodaLetterPageMobile = dynamic(() => import('../../../components/pages/skLetterPageMobile'));

export default function SkovorodaLetterFromPage({ ...params }) {

  return params.deviceEnding === SkovorodaConstants.desktopEnding 
    ? <SkovorodaLetterPageDesktop {...params} letterType="from" />
    : <SkovorodaLetterPageMobile {...params} letterType="from" />
}

// Get all Letters From Paths
export function getStaticPaths() {
  
  const allLetterIds = SkovorodaLettersFrom.allLetters.map(letter => letter.letterMetadata.id);
  // console.log("All Letters From Ids:", allLetterIds);
  return getStaticPathsCommon(allLetterIds);
}

// Get Letter From Data by Id
export function getStaticProps({ params }) {

  const { id, deviceEnding } = readDynamicIdCommon(params.id);
  const selectedLetter = SkovorodaLettersFrom.allLetters.find(letter => letter.letterMetadata.id == id);
  const allLettersMetadata = SkovorodaLettersFrom.allLetters.map(letter => letter.letterMetadata);
  const selectedLetterSource = SkovorodaSourcesArray.find(source => source.devNumber == selectedLetter.letterMetadata.source);
  const selectedNoteNumbers = getSelectedNoteNumbersByContent(selectedLetter.letterContent);

  const selectedNotesTmp = SkovorodaLettersFrom.allNotes.filter(notes => 
    notes.notesMetadata.source == selectedLetter.letterMetadata.source &&
    notes.notesMetadata.id === (selectedLetter.letterMetadata.to || selectedLetter.letterMetadata.from))
    .flatMap(notes => notes.notes);

  const selectedNotes = selectedNotesTmp.filter(lineObject => selectedNoteNumbers.includes(lineObject.noteNumber) ||
      lineObject.letterNumber == selectedLetter.letterMetadata.number);
  
  const letterWriter = getLetterWriterByLetterMetadata(selectedLetter.letterMetadata);
  return {
    props: {
      // APP LEVEL {
      pageKey: lettersFromPageKey,
      breadcrumbLabel: selectedLetter.letterMetadata.name + " - Лист № " + selectedLetter.letterMetadata.number,
      deviceEnding,
      // APP LEVEL }

      // SEO {
      shouldBeIndexed: true,
      metadataTitle: `Лист Сковороди до ${letterWriter.genetiveName} №${selectedLetter.letterMetadata.number}`,
      metadataDescription: SkovorodaConstants.contentToMetaDescription(selectedLetter.letterContent),
      metadataKeywords: ['Листи Сковороди', letterWriter.name],
      metadataAuthorUrl: "https://uk.wikipedia.org/wiki/Сковорода_Григорій_Савич",
      canonicalPageUrl: "https://www.skovoroda.club/letters/from/" + id,
      // SEO }
      
      selectedId: id,
      selectedLetter,
      selectedNotes,
      allLettersMetadata,
      selectedLetterSource,
    },
  };
}
