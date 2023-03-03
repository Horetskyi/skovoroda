
import { Card, Container, Select, Text, Title } from '@mantine/core';
import { useRouter } from 'next/router';
import { useState } from 'react';
import CardWithTwoSelectorsDesktop from '../../../components/cardWithTwoSelectorsDesktop';
import SkovorodaFomattingInfoBlockDesktop from '../../../components/skovorodaFomattingInfoBlockDesktop';
import SkovorodaSourceBlockDesktop from '../../../components/skovorodaSourceBlockDesktop';
import SkovorodaTextContentBlockDesktop from '../../../components/skovorodaTextContentBlockDesktop';
import { SkovorodaGardenRefactored } from '../../../lib/data/skovorodaGarden';
import { SkovorodaSourcesArray } from '../../../lib/data/skovorodaSources';
import getSelectedNoteNumbersByContent from '../../../lib/getSelectedNoteNumbersByContent';
import getStaticPathsCommon from '../../../lib/getStaticPathsCommon';
import readDynamicIdCommon from '../../../lib/readDynamicIdCommon';
import { gardenSelectedPageKey } from '../../../lib/skovorodaConstants';
import { pathJoin, SkovorodaGardenPath } from '../../../lib/skovorodaPath';

export default function SkovorodaGardenPageRefactored({ 
  selectedSong,
  allSongsMetadata,
  selectedSongSource,
  selectedNotes,
  selectedId,
  deviceEnding
}) 
{
  const router = useRouter();
  function changeRouterPath(id) {
    const newPath = pathJoin(SkovorodaGardenPath, id);
    return router.push(newPath, undefined, { scroll: false, shallow: false });
  }

  const selectedMetadata = selectedSong.songMetadata;

  // Dropdown 1 hooks
  const [selectedTranslationDropdownValue, selectTranslationDropdownValueInner] = useState(selectedMetadata.translatorName);
  const [translationsDropdownItems, changeTranslationDropdownItems] = useState(
    prepareTranslationsDropdownItems(allSongsMetadata, selectedMetadata.number));
  if (translationsDropdownItems.every(item => item.value !== selectedTranslationDropdownValue)) {
    selectTranslationDropdownValueInner(selectedMetadata.translatorName);
  }

  // Dropdown 2 hooks
  const [songsDropdownItems, changeSongsDropdownItems] = useState(
    prepareSongsDropdownItems(allSongsMetadata, selectedMetadata.translatorName));
  const [selectedSongDropdownValue, selectSongDropdownValueInner] = useState(selectedMetadata.number);
  if (songsDropdownItems.every(item => item.value !== selectedSongDropdownValue)) {
    selectSongDropdownValueInner(selectedMetadata.number);
  }

  // Dropdown 1
  function selectTranslationDropdownValue(value) {
    const id = translationsDropdownItems.find(item => item.value === value).id;
    changeRouterPath(id).then(() => {
      selectTranslationDropdownValueInner(value);
      changeSongsDropdownItems(prepareSongsDropdownItems(allSongsMetadata, value));
    });
  }

  // Dropdown 2
  function selectSongDropdownValue(value) {
    const id = songsDropdownItems.find(item => item.value === value).id;
    changeRouterPath(id).then(() => {
      selectSongDropdownValueInner(value);
      changeTranslationDropdownItems(prepareTranslationsDropdownItems(allSongsMetadata, value));
    });
  }  

  return <>
    <Container mb="xl">

      <CardWithTwoSelectorsDesktop 
        dropdown1={{
          label: "Оберіть переклад",
          data: translationsDropdownItems,
          selectedValue: selectedTranslationDropdownValue,
          onChange: selectTranslationDropdownValue
        }} 
        dropdown2={{
          label: "Оберіть пісню",
          data: songsDropdownItems,
          selectedValue: selectedSongDropdownValue,
          onChange: selectSongDropdownValue
        }}
      />

      <Card p="md" radius="md" withBorder={true}>
        <Title ta={'center'} mt="0" mb="md" order={1}>{selectedMetadata.name}</Title>
        <SkovorodaTextContentBlockDesktop textContent={selectedSong.songContent} />
      </Card>      
      
      {(selectedNotes && selectedNotes.length) ? <>
        <Title ta={'center'} mt="md" mb="md" order={2}>Примітки</Title>
        <SkovorodaTextContentBlockDesktop textContent={selectedNotes} />
      </> : <></>}

      <SkovorodaSourceBlockDesktop source={selectedSongSource} />

      <Title ta={'center'} mt="md" mb="md" order={2}>Від розробників сайту</Title>
      <SkovorodaFomattingInfoBlockDesktop mt="md" />
    </Container>
  </>;
}


// Auxiliary
function prepareSongsDropdownItems(allSongsMetadata, selectedTranlsatorName) {
  const set = new Set();
  const result = allSongsMetadata.filter(metadata => {
    if (metadata.translatorName != selectedTranlsatorName) {
      return false; // filter by translator name
    }
    const key = metadata.number; // distinct by number
    if (set.has(key)) {
      return false;
    }
    set.add(key);
    return true;
  });
  set.clear();

  return result.map(letterMetadata => {
    return {
      value: letterMetadata.number,
      label: letterMetadata.number + " - " + letterMetadata.name,
      id: letterMetadata.id,
      disabled: false,
    };
  });
}

// Auxiliary
function prepareTranslationsDropdownItems(allSongsMetadata, songNumber) {
  
  const result = allSongsMetadata.filter(metadata => metadata.number == songNumber);
  
  allSongsMetadata.forEach(metadata => {
    if (result.some(translationMetadata => translationMetadata.translatorName == metadata.translatorName)) {
      return;
    }
    result.push(metadata);
  });

  return result.map(songMetadata => {
    return {
      value: songMetadata.translatorName,
      label: songMetadata.translatorName,
      id: songMetadata.id,
      disabled: false,
    };
  });
}

// Get all Songs Paths
export async function getStaticPaths() {
  
  const allSongIds = SkovorodaGardenRefactored.allSongs.map(song => song.songMetadata.id);
  console.log("All Garden Songs Ids:", allSongIds);
  return getStaticPathsCommon(allSongIds);
}

// Get Garden Data by Id
export async function getStaticProps({ params }) {
  
  const { id, deviceEnding } = readDynamicIdCommon(params.id);
  const selectedSong = SkovorodaGardenRefactored.allSongs.find(song => song.songMetadata.id == id);
  const allSongsMetadata = SkovorodaGardenRefactored.allSongs.map(song => song.songMetadata);
  const selectedSongSource = SkovorodaSourcesArray.find(source => source.devNumber == selectedSong.songMetadata.source);
  const selectedNoteNumbers = getSelectedNoteNumbersByContent(selectedSong.songContent);
  
  const selectedNotes = SkovorodaGardenRefactored.allNotes.filter(notes => 
    notes.notesMetadata.source == selectedSong.songMetadata.source &&
    notes.notesMetadata.translatorName == selectedSong.songMetadata.translatorName)
    .flatMap(notes => notes.notes)
    .filter(lineObject => selectedNoteNumbers.includes(lineObject.noteNumber) ||
      lineObject.songNumber == selectedSong.songMetadata.number);

  allSongsMetadata.sort((a,b) => a.number - b.number);

  return {
    props: {
      pageKey: gardenSelectedPageKey,
      breadcrumbLabel: selectedSong.songMetadata.name,
      selectedId: id,
      metadataTitle: selectedSong.songMetadata.name + " - Григорій Савич Сковорода",
      metadataDescription: selectedSong.songMetadata.name + " - Григорій Савич Сковорода",
      selectedSong,
      selectedNotes,
      allSongsMetadata,
      selectedSongSource,
      deviceEnding,
    },
  };
}