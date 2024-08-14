
import { Container, Group, Space } from '@mantine/core';
import { useRouter } from 'next/router';
import { useCallback, useMemo, useState } from 'react';
import { SkovorodaGardenPath, pathJoin } from '../../lib/skovorodaPath';
import SkH2Desktop from '../shared/skH2Desktop';
import SkTextContentBlockDesktop from '../shared/skTextContentBlockDesktop';
import { nextAvailableNumber, prevAvailableNumber, randomNumberInRangeExcept } from '../../lib/auxiliary';
import classes from './gardenSongPageMobile.module.scss';
import { prepareGardenSongsDropdownItems, prepareGardenSongsTranslatorsDropdownItems } from '../../lib/pagesContent/gardenSongLogic';
import SkCardWithTwoSelectorsMobileV2 from '../shared/skCardWithTwoSelectorsMobileV2';
import SkButtonMobile from '../shared/skButtonMobile';
import SkH1Mobile from '../shared/skH1Mobile';
import SkSourcesContainerMobile from '../shared/skSourcesContainerMobile';

export default function GardenSongPageMobile({ 
  allSongsMetadata,
  selectedSong,
  selectedNotes,
  allTranslators,
  selectedId,
  deviceEnding
}) 
{
  const router = useRouter();
  const changeRouterPath = useCallback((urlId) => {
    const newPath = pathJoin(SkovorodaGardenPath, urlId);
    return router.push(newPath, undefined, { scroll: false, shallow: false });
  }, [router]);

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
  const selectTranslatorDropdownValue = useCallback((value) => {
    const urlId = translationsDropdownItems.find(item => item.value == value).id;
    changeRouterPath(urlId).then(() => {
      selectTranslatorDropdownValueInner(""+value);
      changeSongsDropdownItems(prepareGardenSongsDropdownItems(allSongsMetadata, value));
    });
  }, [translationsDropdownItems, changeRouterPath, allSongsMetadata]);

  // Dropdown 2
  const selectSongDropdownValue = useCallback((value) => {
    const urlId = songsDropdownItems.find(item => item.value == value).id;
    changeRouterPath(urlId).then(() => {
      selectSongDropdownValueInner(""+value);
      changeTranslationDropdownItems(prepareGardenSongsTranslatorsDropdownItems(allSongsMetadata, value, allTranslators));
    });
  }, [songsDropdownItems, changeRouterPath, allSongsMetadata, allTranslators]);

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

  const availableSongNumbers = useMemo(() => {
    return allSongsMetadata
      .filter(metadata => metadata.translatorId === selectedMetadata.translatorId)
      .map(metadata => metadata.number)
      .sort((a,b) => a - b);
  }, [allSongsMetadata, selectedMetadata.translatorId]);
  const prevSongNumber = useMemo(() => prevAvailableNumber(selectedMetadata.number, availableSongNumbers), [selectedMetadata.number, availableSongNumbers]);
  const nextSongNumber = useMemo(() => nextAvailableNumber(selectedMetadata.number, availableSongNumbers), [selectedMetadata.number, availableSongNumbers]);
  const randomSongNumber = useMemo(() => randomNumberInRangeExcept(1, 30, selectedMetadata.number, availableSongNumbers), [selectedMetadata.number, availableSongNumbers]);

  return <>
    <Container py="lg">
      <SkCardWithTwoSelectorsMobileV2 
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
      <Group mt={"md"} mx={0} mb={0} grow className={classes.groupOfButtons} preventGrowOverflow={false}>
        <SkButtonMobile text={"<"} onClick={() => selectSongDropdownValue(prevSongNumber.number)} disabled={prevSongNumber.disabled}/>
        <SkButtonMobile text={"Пісня на щастя"} onClick={() => selectSongDropdownValue(randomSongNumber)}/>
        <SkButtonMobile text={">"} onClick={() => selectSongDropdownValue(nextSongNumber.number)} disabled={nextSongNumber.disabled}/>
      </Group>
      <Space h="lg"/>
      <SkH1Mobile text={h1Text} />
      <Space h="lg"/>

      <div className={classes.songContainer}>

        <div className={`normalContentText normalContentText_withoutIndent`}>
          <SkTextContentBlockDesktop textContent={selectedSong.songContent} isv2={true} isMobile={true} />
        </div>

      </div>
      {(selectedNotes && selectedNotes.length) ? <>
        <SkH2Desktop my="lg" text={"Примітки"}/>
        <SkTextContentBlockDesktop textContent={selectedNotes} isv3={true} isMobile={true} />
      </> : null}
    </Container>
    <SkSourcesContainerMobile sources={sourcesParams} includeTextValidityWarning={true} />
  </>;
}
