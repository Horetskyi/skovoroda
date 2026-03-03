
import { Container, Group, Space } from '@mantine/core';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { SkovorodaGardenPath, pathJoin } from '../../lib/skovorodaPath';
import { nextAvailableNumber, prevAvailableNumber, randomNumberInRangeExcept } from '../../lib/auxiliary';
import classes from './gardenSongPageMobile.module.scss';
import { prepareGardenSongsDropdownItems, prepareGardenSongsTranslatorsDropdownItems } from '../../lib/staticProps/gardenSongLogic';
import SkCardWithTwoSelectorsMobileV2 from '../shared/skCardWithTwoSelectorsMobileV2';
import SkButtonMobile from '../shared/skButtonMobile';
import { wrapYatInSpans } from '../shared/wrapYatInSpans';
import SkH1Mobile from '../shared/skH1Mobile';
import SkSourcesContainerMobile from '../shared/skSourcesContainerMobile';
import { MusicBlockMobile } from './details/musicBlockMobile';
import SkImage from '../shared/skImage';
import { getBookSourceParam, getIllustrationSourceParam } from './details/pureFunctions';
import SkH2Mobile from '../shared/skH2Mobile';
import SkMetaTextView from '../shared/skMetaTextView';

const SONG_VIEW_ARGS = { isv3: true };

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
  useEffect(() => {
    if (translationsDropdownItems.every(item => item.value != selectedTranslatorDropdownValue)) {
      selectTranslatorDropdownValueInner(""+selectedMetadata.translatorId);
    }
  }, [translationsDropdownItems, selectedTranslatorDropdownValue, selectedMetadata.translatorId]);

  // Dropdown 2 hooks
  const [songsDropdownItems, changeSongsDropdownItems] = useState(prepareGardenSongsDropdownItems(allSongsMetadata, selectedMetadata.translatorId));
  const [selectedSongDropdownValue, selectSongDropdownValueInner] = useState(""+selectedMetadata.number);
  useEffect(() => {
    if (songsDropdownItems.every(item => item.value != selectedSongDropdownValue)) {
      selectSongDropdownValueInner(""+selectedMetadata.number);
    }
  }, [songsDropdownItems, selectedSongDropdownValue, selectedMetadata.number]);

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

  const availableSongNumbers = useMemo(() => {
    return allSongsMetadata
      .filter(metadata => metadata.translatorId === selectedMetadata.translatorId)
      .map(metadata => metadata.number)
      .sort((a,b) => a - b);
  }, [allSongsMetadata, selectedMetadata.translatorId]);
  const prevSongNumber = useMemo(() => prevAvailableNumber(selectedMetadata.number, availableSongNumbers), [selectedMetadata.number, availableSongNumbers]);
  const nextSongNumber = useMemo(() => nextAvailableNumber(selectedMetadata.number, availableSongNumbers), [selectedMetadata.number, availableSongNumbers]);
  const randomSongNumber = useMemo(() => randomNumberInRangeExcept(1, 30, selectedMetadata.number, availableSongNumbers), [selectedMetadata.number, availableSongNumbers]);

  const songImage = useMemo(() => {
    if (!selectedMetadata.songImage) return null;
    const img = { ...selectedMetadata.songImage };
    img.imageUrl = img.imageUrl.replace("/garden/", "/garden mobile/");
    if (img.height) {
      const prevHeight = img.height;
      img.height = 600;
      img.width = Math.round((img.width / prevHeight) * 600);
    }
    return img;
  }, [selectedMetadata.songImage]);
  const isSongImageExists = songImage && songImage.imageUrl && songImage.imageUrl.length > 0;
  const highlightColor = songImage ? songImage.highlightColor : null;

  const sourcesParams = useMemo(() => {
    const params = [getBookSourceParam(selectedSong.source, selectedNotes, true)];
    if (isSongImageExists) {
      params.push(getIllustrationSourceParam(songImage));
    }
    return params;
  }, [selectedSong.source, selectedNotes, isSongImageExists, songImage]);

  const onClickPrev = useCallback(() => selectSongDropdownValue(prevSongNumber.number), [selectSongDropdownValue, prevSongNumber]);
  const onClickRandom = useCallback(() => selectSongDropdownValue(randomSongNumber), [selectSongDropdownValue, randomSongNumber]);
  const onClickNext = useCallback(() => selectSongDropdownValue(nextSongNumber.number), [selectSongDropdownValue, nextSongNumber]);

  const nameArrayNodes = useMemo(() => {
    if (!selectedMetadata.nameArray) return null;
    return selectedMetadata.nameArray.map((line, index) => (
      <p key={index} style={{ color: highlightColor || 'inherit' }}>{wrapYatInSpans(line)}</p>
    ));
  }, [selectedMetadata.nameArray, highlightColor]);

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
        <SkButtonMobile text={"<"} onClick={onClickPrev} disabled={prevSongNumber.disabled}/>
        <SkButtonMobile text={"Пісня на щастя"} onClick={onClickRandom} color={highlightColor} />
        <SkButtonMobile text={">"} onClick={onClickNext} disabled={nextSongNumber.disabled}/>
      </Group>
      <Space h="lg"/>
      {isSongImageExists ? (
        <div className={classes.songImageContainer}>
          <SkImage
            image={songImage}
            width={songImage.width}
            height={songImage.height}
            fullContainerWidthScreen={90}
            maxHeight={600}
            maxWidth={"auto"}
            priority={true}
            optimize={true}
            shadow={false}
          />
        </div>
      ) : null}
      
      {nameArrayNodes ? <>
        <h1 className={classes.h1}>
          {nameArrayNodes}
        </h1>
      </> : <SkH1Mobile text={selectedMetadata.name} color={highlightColor} />}

      <Space h="lg"/>

      <SkMetaTextView metaText={selectedSong.songContent} otherArgs={SONG_VIEW_ARGS} isMobile={true} />

      {(selectedNotes && selectedNotes.length) ? <>
        <SkH2Mobile my="lg" text={"Примітки"}/>
        <SkMetaTextView metaText={selectedNotes} isMobile={true} isNotes={true} /> 
      </> : null}
    </Container>

    <MusicBlockMobile music={selectedMetadata.music} title={"Музика на текст пісні"} />

    <SkSourcesContainerMobile sources={sourcesParams} />
  </>;
}
