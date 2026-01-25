
import { Container, Group, Space } from '@mantine/core';
import { useRouter } from 'next/router';
import { useCallback, useMemo, useState } from 'react';
import { SkovorodaGardenPath, pathJoin } from '../../lib/skovorodaPath';
import { nextAvailableNumber, prevAvailableNumber, randomNumberInRangeExcept } from '../../lib/auxiliary';
import classes from './gardenSongPageMobile.module.scss';
import { prepareGardenSongsDropdownItems, prepareGardenSongsTranslatorsDropdownItems } from '../../lib/staticProps/gardenSongLogic';
import SkCardWithTwoSelectorsMobileV2 from '../shared/skCardWithTwoSelectorsMobileV2';
import SkButtonMobile from '../shared/skButtonMobile';
import SkH1Mobile from '../shared/skH1Mobile';
import SkSourcesContainerMobile from '../shared/skSourcesContainerMobile';
import { MusicBlockMobile } from './details/musicBlockMobile';
import SkImage from '../shared/skImage';
import { getBookSourceParam, getIllustrationSourceParam } from './details/pureFunctions';
import SkH2Mobile from '../shared/skH2Mobile';
import SkMetaTextView from '../shared/skMetaTextView';

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

  const sourcesParams = [
    getBookSourceParam(selectedSong.source, selectedNotes, true),
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

  const isSongImageExists = selectedMetadata.songImage && selectedMetadata.songImage.imageUrl && selectedMetadata.songImage.imageUrl.length > 0;
  const highlightColor = selectedMetadata.songImage ? selectedMetadata.songImage.highlightColor : null;
  if (isSongImageExists) {
    sourcesParams.push(getIllustrationSourceParam(selectedMetadata.songImage));
  }

  return <>
    <Container py="lg">
      <SkCardWithTwoSelectorsMobileV2 
        language={selectedMetadata.language}
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
      <Group w={"100%"} px="md" mt={"md"} mx={0} mb={0} grow className={classes.groupOfButtons} preventGrowOverflow={false}>
        <SkButtonMobile text={"<"} onClick={() => selectSongDropdownValue(prevSongNumber.number)} disabled={prevSongNumber.disabled}/>
        <SkButtonMobile text={"Пісня на щастя"} onClick={() => selectSongDropdownValue(randomSongNumber)} color={highlightColor} />
        <SkButtonMobile text={">"} onClick={() => selectSongDropdownValue(nextSongNumber.number)} disabled={nextSongNumber.disabled}/>
      </Group>
      <Space h="lg"/>
      {selectedMetadata.songImage ? (
        <div className={classes.songImageContainer}>
          <SkImage
            image={selectedMetadata.songImage}
            width={selectedMetadata.songImage.width}
            height={selectedMetadata.songImage.height}
            fullContainerWidthPercent={90}
            maxHeight={600}
            maxWidth={"max-content"}
            priority={true}
            optimize={true}
            shadow={false}
          />
        </div>
      ) : null}
      
      {selectedMetadata.nameArray ? <>
        <h1 className={classes.h1}>
          {selectedMetadata.nameArray.map((line, index) => (
            <p key={index} style={{ color: highlightColor || 'inherit' }}>{line}</p>
          ))}
        </h1>
      </> : <SkH1Mobile text={selectedMetadata.name} color={highlightColor} />}

      <Space h="lg"/>

      <SkMetaTextView metaText={selectedSong.songContent} otherArgs={{ isv3: true }} isMobile={true} />

      {(selectedNotes && selectedNotes.length) ? <>
        <SkH2Mobile my="lg" text={"Примітки"}/>
        <SkMetaTextView metaText={selectedNotes} isMobile={true} isNotes={true} /> 
      </> : null}
    </Container>

    <MusicBlockMobile music={selectedMetadata.music} title={"Музика на текст пісні"} />

    <SkSourcesContainerMobile sources={sourcesParams} />
  </>;
}
