
import getStaticPathsCommon from '../../../lib/getStaticPathsCommon';
import readDynamicIdCommon from '../../../lib/readDynamicIdCommon';
import { Card, Container, Select, Title } from '@mantine/core';
import { useState } from 'react';
import { useRouter } from 'next/router'
import { SkovorodaLettersFrom } from '../../../lib/data/skovorodaLettersFrom';
import SkovorodaTextContentBlockDesktop from '../../../components/skovorodaTextContentBlockDesktop';
import { SkovorodaLettersFromPath, pathJoin } from '../../../lib/skovorodaPath';
import { LinkInsideSelect } from '../../../components/auxiliary/linkInsideSelectItem';
import SkovorodaFomattingInfoBlockDesktop from '../../../components/skovorodaFomattingInfoBlockDesktop';
import { SkovorodaSourcesArray } from '../../../lib/data/skovorodaSources';
import SkovorodaSourceBlockDesktop from '../../../components/skovorodaSourceBlockDesktop';

export default function SkovorodaLetterFromPage({ selectedLetter, selectedNotes, allLettersMetadata, selectedLetterSource, selectedId, deviceEnding }) {

  const router = useRouter();
  function changeRouterPath(id) {
    const newPath = pathJoin(SkovorodaLettersFromPath, id);
    return router.push(newPath, undefined, { scroll: false, shallow: false });
  }

  const selectedMetadata = selectedLetter.letterMetadata;

  // Dropdown 1 hooks
  const [selectedTranslationDropdownValue, selectTranslationDropdownValueInner] = useState(selectedMetadata.translatorName);
  const [translationsDropdownItems, changeTranslationDropdownItems] = useState(
    prepareTranslationsDropdownItems(allLettersMetadata, newSelectedPersonValue(selectedMetadata)));
  if (translationsDropdownItems.every(item => item.value !== selectedTranslationDropdownValue)) {
    selectTranslationDropdownValueInner(selectedMetadata.translatorName);
  }

  // Dropdown 2 hooks
  const [personsDropdownItems, changePersonsDropdownItems] = useState(
    prepareLettersDropdownItems(allLettersMetadata, selectedMetadata.translatorName));
  const [selectedPersonDropdownValue, selectPersonDropdownValueInner] = useState(newSelectedPersonValue(selectedMetadata));
  if (personsDropdownItems.every(item => item.value !== selectedPersonDropdownValue)) {
    selectPersonDropdownValueInner(newSelectedPersonValue(selectedMetadata));
  }

  // Dropdown 1
  function selectTranslationDropdownValue(value) {
    const id = translationsDropdownItems.find(item => item.value === value).id;
    changeRouterPath(id).then(() => {
      selectTranslationDropdownValueInner(value);
      changePersonsDropdownItems(prepareLettersDropdownItems(allLettersMetadata, value));
    });
  }

  // Dropdown 2
  function selectPersonDropdownValue(value) {
    const id = personsDropdownItems.find(item => item.value === value).id;
    changeRouterPath(id).then(() => {
      selectPersonDropdownValueInner(value);
      changeTranslationDropdownItems(prepareTranslationsDropdownItems(allLettersMetadata, value));
    });
  }  

  return <>
    <Container mb="xl">
      <Select 
        size="md"
        searchable
        mb="md"
        itemComponent={LinkInsideSelect} 
        data={translationsDropdownItems} 
        value={selectedTranslationDropdownValue}
        onChange={selectTranslationDropdownValue}>
      </Select>
      <Select 
        size="md"
        searchable
        mb="md"
        itemComponent={LinkInsideSelect} 
        data={personsDropdownItems} 
        value={selectedPersonDropdownValue}
        onChange={selectPersonDropdownValue}>
      </Select>
      <Title ta={'center'} mt="0" mb="md" order={1}>{selectedMetadata.name}</Title>
      <Title ta={'center'} mt="0" mb="md" order={2}>{selectedMetadata.number}</Title>
      <SkovorodaTextContentBlockDesktop textContent={selectedLetter.letterContent} />
      
      {(selectedNotes && selectedNotes.length) ? <>
        <Title ta={'center'} mt="md" mb="md" order={2}>Примітки</Title>
        <SkovorodaTextContentBlockDesktop textContent={selectedNotes} />
      </> : <></>}

      <Title ta={'center'} mt="md" mb="md" order={2}>Джерело</Title>
      <SkovorodaSourceBlockDesktop source={selectedLetterSource} mt="md" />

      <Title ta={'center'} mt="md" mb="md" order={2}>Від розробників сайту</Title>
      <SkovorodaFomattingInfoBlockDesktop mt="md" />
    </Container>
  </>;
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

  const selectedNoteNumbers = selectedLetter.letterContent.map(lineObject => {
      if (!Array.isArray(lineObject.text)) {
        return false;
      }
      const lineNoteNumbers = lineObject.text.filter(subText => subText.noteNumber)
        .map(subText => subText.noteNumber);
      if (!lineNoteNumbers || !lineNoteNumbers.length) {
        return false;
      }
      return lineNoteNumbers;
    })
    .filter(noteNumbers => noteNumbers).flat();

  const selectedNotes = SkovorodaLettersFrom.allNotes.filter(notes => 
    notes.notesMetadata.source == selectedLetter.letterMetadata.source &&
    notes.notesMetadata.name == selectedLetter.letterMetadata.name)
    .flatMap(notes => notes.notes)
    .filter(lineObject => selectedNoteNumbers.includes(lineObject.noteNumber));

  // Map translatorName:
  selectedLetter.letterMetadata.translatorName = mapTranslatorName(selectedLetter.letterMetadata.translatorName);
  allLettersMetadata.forEach(metadata => {
    metadata.translatorName = mapTranslatorName(metadata.translatorName);
  });

  return {
    props: {
      selectedLetter,
      selectedNotes,
      allLettersMetadata,
      selectedLetterSource,
      selectedId: id,
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

// Auxiliary
function prepareLettersDropdownItems(allLettersMetadata, selectedTranlsatorName) {
  const set = new Set();
  const result = allLettersMetadata.filter(metadata => {
    if (metadata.translatorName != selectedTranlsatorName) {
      return false; // filter by translator name
    }
    const key = metadata.to + metadata.number; // distinct by letter name and number
    if (set.has(key)) {
      return false;
    }
    set.add(key);
    return true;
  });
  set.clear();

  return result.map(letterMetadata => {
    return {
      value: newSelectedPersonValue(letterMetadata),
      label: letterMetadata.name + " - " + letterMetadata.number,
      id: letterMetadata.id,
      disabled: false,
    };
  });
}

// Auxiliary
function prepareTranslationsDropdownItems(allLettersMetadata, personDropdownValue) {
  
  // Original, Peleh, Uskalov
  // to-kovalynskii-2

  const result = allLettersMetadata
    .filter(metadata => newSelectedPersonValue(metadata) == personDropdownValue);

  allLettersMetadata.forEach(metadata => {
    if (result.some(translationMetadata => translationMetadata.translatorName == metadata.translatorName)) {
      return;
    }
    result.push(metadata);
  });

  return result.map(letterMetadata => {
    return {
      value: letterMetadata.translatorName,
      label: letterMetadata.translatorName,
      id: letterMetadata.id,
      disabled: false,
    };
  });
}

// Auxiliary
function newSelectedPersonValue(letterMetadata) {
  return letterMetadata.to + " - " + letterMetadata.number;
}
