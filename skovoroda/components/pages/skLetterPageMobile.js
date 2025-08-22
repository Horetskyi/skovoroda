
import { Space } from '@mantine/core';
import { useState } from 'react';
import { useRouter } from 'next/router'
import { SkovorodaLettersFromPath, pathJoin } from '../../lib/skovorodaPath';
import { parseLanguages } from '../../lib/skovorodaLanguagesLogic';
import SkTextContentBlockDesktop from '../shared/skTextContentBlockDesktop';
import { getLetterWriterByLetterMetadata } from '../../lib/staticProps/letterWriters';
import SkSourcesContainerDesktop from '../shared/skSourcesContainerDesktop';
import SkColoredContainerMobile from '../shared/skColoredContainerMobile';
import SkH2Mobile from '../shared/skH2Mobile';
import SkH1Mobile from '../shared/skH1Mobile';
import SkCardWithTwoSelectorsMobileV2 from '../shared/skCardWithTwoSelectorsMobileV2';

export default function SkovorodaLetterPageMobile({ 
  selectedLetter,
  selectedNotes, 
  allLettersMetadata, 
  selectedLetterSource, 
  letterType }) 
{

  const router = useRouter();
  function changeRouterPath(id) {
    const newPath = pathJoin(SkovorodaLettersFromPath, id);
    return router.push(newPath, undefined, { scroll: false, shallow: false });
  }

  const selectedMetadata = selectedLetter.letterMetadata;

  // Dropdown 1 hooks
  const [selectedTranslationDropdownValue, selectTranslationDropdownValueInner] = useState(selectedMetadata.translatorName);
  const [translationsDropdownItems, changeTranslationDropdownItems] = useState(
    prepareTranslationsDropdownItems(allLettersMetadata, newSelectedPersonValue(selectedMetadata, letterType), letterType));
  if (translationsDropdownItems.every(item => item.value !== selectedTranslationDropdownValue)) {
    selectTranslationDropdownValueInner(selectedMetadata.translatorName);
  }

  // Dropdown 2 hooks
  const [personsDropdownItems, changePersonsDropdownItems] = useState(
    prepareLettersDropdownItems(allLettersMetadata, selectedMetadata.translatorName, letterType));
  const [selectedPersonDropdownValue, selectPersonDropdownValueInner] = useState(newSelectedPersonValue(selectedMetadata, letterType));
  if (personsDropdownItems.every(item => item.value !== selectedPersonDropdownValue)) {
    selectPersonDropdownValueInner(newSelectedPersonValue(selectedMetadata, letterType));
  }

  // Dropdown 1
  function selectTranslationDropdownValue(value) {
    const id = translationsDropdownItems.find(item => item.value === value).id;
    changeRouterPath(id).then(() => {
      selectTranslationDropdownValueInner(value);
      changePersonsDropdownItems(prepareLettersDropdownItems(allLettersMetadata, value, letterType));
    });
  }

  // Dropdown 2
  function selectPersonDropdownValue(value) {
    const id = personsDropdownItems.find(item => item.value === value).id;
    changeRouterPath(id).then(() => {
      selectPersonDropdownValueInner(value);
      changeTranslationDropdownItems(prepareTranslationsDropdownItems(allLettersMetadata, value, letterType));
    });
  }  

  const isAnyNotes = selectedNotes && selectedNotes.length;
  const sourcesParams = [
    getBookSourceParam(selectedLetterSource, isAnyNotes, true),
  ];

  const letterWriter = getLetterWriterByLetterMetadata(selectedMetadata); // for text in H1
  const h1Text = `Лист №${selectedMetadata.number} до ${letterWriter.genetiveName}`; 

  return <SkColoredContainerMobile px={"md"}>

    <SkCardWithTwoSelectorsMobileV2
      dropdown1={{
        label: "Оберіть переклад",
        data: translationsDropdownItems,
        selectedValue: selectedTranslationDropdownValue,
        onChange: selectTranslationDropdownValue
      }} 
      dropdown2={{
        label: "Оберіть лист",
        data: personsDropdownItems,
        selectedValue: selectedPersonDropdownValue,
        onChange: selectPersonDropdownValue
      }}
    />

    <SkH1Mobile text={h1Text}/>   
    <Space h="lg"/>
    <SkTextContentBlockDesktop textContent={selectedLetter.letterContent} isv2={true} />
    
    {(isAnyNotes) ? <>
      <SkH2Mobile my="lg" text={"Примітки"}/>
      <SkTextContentBlockDesktop textContent={selectedNotes} isv3={true} />
    </> : null}

    <SkSourcesContainerDesktop sources={sourcesParams} />

  </SkColoredContainerMobile>
}

// Auxiliary
function prepareLettersDropdownItems(allLettersMetadata, selectedTranlsatorName, letterType) {
  
  // FILTER AND DISTINCT {
  const set = new Set();
  const result = allLettersMetadata.filter(metadata => {
    if (metadata.translatorName != selectedTranlsatorName) {
      return false; // filter by translator name
    }
    const key = (letterType == "from" ? metadata.to : metadata.from) + metadata.number; // distinct by letter name and number
    if (set.has(key)) {
      return false;
    }
    set.add(key);
    return true;
  });
  set.clear();
  // FILTER AND DISTINCT }

  return result.map(letterMetadata => {
    const languages = parseLanguages(letterMetadata.languages); // for icons in dropdown
    const letterWriter = getLetterWriterByLetterMetadata(letterMetadata); // for text in dropdown
    const label = `Лист №${letterMetadata.number} до ${letterWriter.genetiveName}`; // text in dropdown
    return {
      value: newSelectedPersonValue(letterMetadata, letterType), // tech key for dropdown
      label: label,
      languages: languages,
      id: letterMetadata.id,
      disabled: false,
    };
  });
}

// Auxiliary
function prepareTranslationsDropdownItems(allLettersMetadata, personDropdownValue, letterType) {

  // DISTINCT {
  const result = allLettersMetadata
    .filter(metadata => newSelectedPersonValue(metadata, letterType) == personDropdownValue);
  allLettersMetadata.forEach(metadata => {
    if (result.some(translationMetadata => translationMetadata.translatorName == metadata.translatorName)) {
      return;
    }
    result.push(metadata);
  });
  // DISTINCT }

  return result.map(letterMetadata => {
    const languages = parseLanguages(letterMetadata.languages);
    return {
      value: letterMetadata.translatorName, // tech key for dropdown
      label: letterMetadata.translatorName, // text in dropdown
      id: letterMetadata.id,
      disabled: false,
      languages: languages, // for icons in dropdown
    };
  });
}

// Auxiliary (tech key for dropdown)
function newSelectedPersonValue(letterMetadata, letterType) {
  return (letterType == "from" ? letterMetadata.to : letterMetadata.from) + " - Лист № " + letterMetadata.number;
}
