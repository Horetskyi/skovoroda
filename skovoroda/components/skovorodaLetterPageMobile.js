
import { Card, Container, Title } from '@mantine/core';
import { useState } from 'react';
import { useRouter } from 'next/router'
import { SkovorodaLettersFromPath, pathJoin } from '../lib/skovorodaPath';
import SkovorodaFomattingInfoBlockDesktop from '../components/skovorodaFomattingInfoBlockDesktop';
import SkovorodaSourceBlockDesktop from '../components/skovorodaSourceBlockDesktop';
import SkTextContentBlockDesktop from './shared/skTextContentBlockDesktop';
import classes from './skovorodaLetterPageMobile.module.scss';
import SkCardWithTwoSelectorsMobileV2 from './shared/skCardWithTwoSelectorsMobileV2';

export default function SkovorodaLetterPageMobile({ 
  selectedLetter,
  selectedNotes, 
  allLettersMetadata, 
  selectedLetterSource, 
  selectedId, 
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
  return <>

    <Container mb="xl">

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

      <Card id="main-content" p="md" mt="md" radius="md" withBorder={true} className={classes.contentCard}>
        <Title ta={'center'} mt="0" mb="md" order={1}>{selectedMetadata.name}</Title>
        <Title ta={'center'} mt="0" mb="xl" order={2}>{"Лист № " + selectedMetadata.number}</Title>    
        <SkTextContentBlockDesktop textContent={selectedLetter.letterContent} />
      </Card>
      
      {isAnyNotes ? <>
        <Title id="notes-content" ta={'center'} mt="md" mb="md" order={2}>Примітки</Title>
        <SkTextContentBlockDesktop textContent={selectedNotes} />
      </> : <></>}

      <SkovorodaSourceBlockDesktop source={selectedLetterSource} mt="md" />

      <Title ta={'center'} mt="md" mb="md" order={2}>Від розробників сайту</Title>
      <SkovorodaFomattingInfoBlockDesktop mt="md" />
    </Container>
    
  </>;
}

// Auxiliary
function prepareLettersDropdownItems(allLettersMetadata, selectedTranlsatorName, letterType) {
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

  return result.map(letterMetadata => {
    return {
      value: newSelectedPersonValue(letterMetadata, letterType),
      label: letterMetadata.name + " - Лист № " + letterMetadata.number,
      id: letterMetadata.id,
      disabled: false,
    };
  });
}

// Auxiliary
function prepareTranslationsDropdownItems(allLettersMetadata, personDropdownValue, letterType) {
  
  // Original, Peleh, Uskalov
  // to-kovalynskii-2

  const result = allLettersMetadata
    .filter(metadata => newSelectedPersonValue(metadata, letterType) == personDropdownValue);

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
function newSelectedPersonValue(letterMetadata, letterType) {
  return (letterType == "from" ? letterMetadata.to : letterMetadata.from) + " - Лист № " + letterMetadata.number;
}
