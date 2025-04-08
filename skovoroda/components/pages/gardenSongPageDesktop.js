
import { Container, Group, Space } from '@mantine/core';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { SkovorodaGardenPath, pathJoin } from '../../lib/skovorodaPath';
import SkCardWithTwoSelectorsDesktopV2 from '../shared/skCardWithTwoSelectorsDesktopV2';
import SkH1Desktop from '../shared/skH1Desktop';
import SkH2Desktop from '../shared/skH2Desktop';
import SkTextContentBlockDesktop from '../shared/skTextContentBlockDesktop';
import SkSourcesContainerDesktop from '../shared/skSourcesContainerDesktop';
import SkButtonDesktop from '../shared/skButtonDesktop';
import { nextAvailableNumber, prevAvailableNumber, randomNumberInRangeExcept } from '../../lib/auxiliary';
import classes from './gardenSongPageDesktop.module.scss';
import { prepareGardenSongsDropdownItems, prepareGardenSongsTranslatorsDropdownItems } from '../../lib/staticProps/gardenSongLogic';
import { MusicBlockDesktop } from './details/musicBlockDesktop';

export default function GardenSongPageDesktop({ 
  allSongsMetadata,
  selectedSong,
  selectedNotes,
  allTranslators,
  selectedId,
  deviceEnding
}) 
{
  const router = useRouter();
  function changeRouterPath(urlId) {
    const newPath = pathJoin(SkovorodaGardenPath, urlId);
    return router.push(newPath, undefined, { scroll: false, shallow: false });
  }

  const selectedMetadata = selectedSong.songMetadata;

  // Dropdown 1 hooks
  const [selectedTranslatorDropdownValue, selectTranslatorDropdownValueInner] = useState(""+selectedMetadata.translatorId);
  const [translationsDropdownItems, changeTranslationDropdownItems] = useState(prepareGardenSongsTranslatorsDropdownItems(allSongsMetadata, selectedMetadata.number, allTranslators));
  if (translationsDropdownItems.every(item => item.value != selectedTranslatorDropdownValue)) {
    selectTranslatorDropdownValueInner(""+selectedMetadata.translatorId);
  }

  // Dropdown 2 hooks
  const [songsDropdownItems, changeSongsDropdownItems] = useState(prepareGardenSongsDropdownItems(allSongsMetadata, selectedMetadata.translatorId));
  const [selectedSongDropdownValue, selectSongDropdownValueInner] = useState(""+selectedMetadata.number);
  if (songsDropdownItems.every(item => item.value != selectedSongDropdownValue)) {
    selectSongDropdownValueInner(""+selectedMetadata.number);
  }

  // Dropdown 1
  function selectTranslatorDropdownValue(value) {
    const urlId = translationsDropdownItems.find(item => item.value == value).id;
    changeRouterPath(urlId).then(() => {
      selectTranslatorDropdownValueInner(""+value);
      changeSongsDropdownItems(prepareGardenSongsDropdownItems(allSongsMetadata, value));
    });
  }

  // Dropdown 2
  function selectSongDropdownValue(value) {
    const urlId = songsDropdownItems.find(item => item.value == value).id;
    changeRouterPath(urlId).then(() => {
      selectSongDropdownValueInner(""+value);
      changeTranslationDropdownItems(prepareGardenSongsTranslatorsDropdownItems(allSongsMetadata, value, allTranslators));
    });
  }  

  const h1Text = selectedMetadata.name;

  const sourcesParams = [
    {
      sourceType: "Текст" + (selectedNotes ? " і Примітки" : ""),
      sourceValue: selectedSong.source.sourceFullName,
      sourceHref: selectedSong.source.sourceHref,
      image: selectedSong.source.bookCoverImage,
      linkTitle: selectedSong.source.sourceFullName,
    },
  ];

  const availableSongNumbers = allSongsMetadata
    .filter(metadata => metadata.translatorId === selectedMetadata.translatorId)
    .map(metadata => metadata.number);
  availableSongNumbers.sort((a,b) => a - b);
  const prevSongNumber = prevAvailableNumber(selectedMetadata.number, availableSongNumbers);
  const nextSongNumber = nextAvailableNumber(selectedMetadata.number, availableSongNumbers);
  const randomSongNumber = randomNumberInRangeExcept(1, 30, selectedMetadata.number, availableSongNumbers);

  return <>
    <Space h="lg"/>
    <Container py="xl">
      <SkCardWithTwoSelectorsDesktopV2 
        dropdown1={{
          label: "Оберіть переклад",
          data: translationsDropdownItems,
          selectedValue: selectedTranslatorDropdownValue,
          onChange: selectTranslatorDropdownValue
        }} 
        dropdown2={{
          label: "Оберіть пісню",
          data: songsDropdownItems,
          selectedValue: selectedSongDropdownValue,
          onChange: selectSongDropdownValue
        }}
        idSuffix="gardensong"
      />
      <Group mt={"md"} mx={0} mb={0} grow className={classes.groupOfButtons} w={560} preventGrowOverflow={false}>
        <SkButtonDesktop text={"<"} onClick={() => selectSongDropdownValue(prevSongNumber.number)} disabled={prevSongNumber.disabled}/>
        <SkButtonDesktop text={"Пісня на щастя"} onClick={() => selectSongDropdownValue(randomSongNumber)}/>
        <SkButtonDesktop text={">"} onClick={() => selectSongDropdownValue(nextSongNumber.number)} disabled={nextSongNumber.disabled}/>
      </Group>
      <Space h="xl"/>
      <SkH1Desktop text={h1Text} />
      <Space h="lg"/>

      <div className={classes.songContainer}>

        <div className={`normalContentText normalContentText_withoutIndent`}>
          <SkTextContentBlockDesktop textContent={selectedSong.songContent} isv2={true} />
        </div>

      </div>
      {(selectedNotes && selectedNotes.length) ? <>
        <SkH2Desktop my="lg" text={"Примітки"}/>
        <SkTextContentBlockDesktop textContent={selectedNotes} isv3={true} />
      </> : null}
    </Container>

    <MusicBlockDesktop music={selectedMetadata.music} title={"Музика на текст пісні"} />

    <SkSourcesContainerDesktop sources={sourcesParams} includeTextValidityWarning={true} />
  </>;
}
