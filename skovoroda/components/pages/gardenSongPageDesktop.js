import { Container, Group, Modal, Space } from '@mantine/core';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { SkovorodaGardenPath, pathJoin } from '../../lib/skovorodaPath';
import SkCardWithTwoSelectorsDesktopV2 from '../shared/skCardWithTwoSelectorsDesktopV2';
import SkH1Desktop from '../shared/skH1Desktop';
import SkMetaTextView from '../shared/skMetaTextView';
import SkSourcesContainerDesktop from '../shared/skSourcesContainerDesktop';
import SkButtonDesktop from '../shared/skButtonDesktop';
import { nextAvailableNumber, prevAvailableNumber, randomNumberInRangeExcept } from '../../lib/auxiliary';
import classes from './gardenSongPageDesktop.module.scss';
import { prepareGardenSongsDropdownItems, prepareGardenSongsTranslatorsDropdownItems } from '../../lib/staticProps/gardenSongLogic';
import { MusicBlockDesktop } from './details/musicBlockDesktop';
import SkImage from '../shared/skImage';
import { adjustImageHeight } from '../functions/imageFunctions';
import { useDisclosure } from '@mantine/hooks';
import { getBookSourceParam, getIllustrationSourceParam } from './details/pureFunctions';
import SkH2DesktopV2 from '../shared/skH2DesktopV2';

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

  // Image Modal hook
  const [opened, { open, close }] = useDisclosure(false);

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

  const sourcesParams = [
    getBookSourceParam(selectedSong.source, selectedNotes, true),
  ];

  const availableSongNumbers = allSongsMetadata
    .filter(metadata => metadata.translatorId === selectedMetadata.translatorId)
    .map(metadata => metadata.number);
  availableSongNumbers.sort((a,b) => a - b);
  const prevSongNumber = prevAvailableNumber(selectedMetadata.number, availableSongNumbers);
  const nextSongNumber = nextAvailableNumber(selectedMetadata.number, availableSongNumbers);
  const randomSongNumber = randomNumberInRangeExcept(1, 30, selectedMetadata.number, availableSongNumbers);

  const isSongImageExists = selectedMetadata.songImage && selectedMetadata.songImage.imageUrl && selectedMetadata.songImage.imageUrl.length > 0;
  adjustImageHeight(selectedMetadata.songImage, 500, 520, 720);
  const highlightColor = selectedMetadata.songImage ? selectedMetadata.songImage.highlightColor : null;
  if (isSongImageExists) {
    sourcesParams.push(getIllustrationSourceParam(selectedMetadata.songImage));
  }

  return <>

    {isSongImageExists ? <>
      <Modal
        opened={opened} 
        onClose={close} 
        withCloseButton={false}
        overlayProps={{ opacity: 0.9, blur: 100 }}
        classNames={{
          body: classes.fullImageModalBody,
          content: classes.fullImageModalContent,
        }}
      >
        {/* TODO: ADD LEFT RIGHT BUTTONS */}
        <SkImage 
          key={selectedMetadata.songImage.imageUrl}
          image={selectedMetadata.songImage} 
          fullHeight={true}
        />
      </Modal>
    </> : null}

    <Space h="lg"/>
    <Container py="xl">
      <SkCardWithTwoSelectorsDesktopV2 
        language={selectedMetadata.language}
        dropdown1={{
          label: "Оберіть переклад",
          data: translationsDropdownItems,
          selectedValue: selectedTranslatorDropdownValue,
          onChange: selectTranslatorDropdownValue,
        }} 
        dropdown2={{
          label: "Оберіть пісню",
          data: songsDropdownItems,
          selectedValue: selectedSongDropdownValue,
          onChange: selectSongDropdownValue
        }}
        idSuffix="gardensong"
      />
      <Group mt={0} mx={0} mb={0} grow w={392} preventGrowOverflow={false}>
        <SkButtonDesktop text={"<"} onClick={() => selectSongDropdownValue(prevSongNumber.number)} disabled={prevSongNumber.disabled}/>
        <SkButtonDesktop text={"Пісня на щастя"} onClick={() => selectSongDropdownValue(randomSongNumber)} color={highlightColor}/>
        <SkButtonDesktop text={">"} onClick={() => selectSongDropdownValue(nextSongNumber.number)} disabled={nextSongNumber.disabled}/>
      </Group>
      <Space h="xl"/>
      {selectedMetadata.songImage ? (
        <div className={classes.songImageContainer}>
          <SkImage
            image={selectedMetadata.songImage}
            width={selectedMetadata.songImage.width}
            height={selectedMetadata.songImage.height}
            fullWidth={false}
            priority={true}
            optimize={false}
            shadow={false}
            onClick={() => open()}
          />
        </div>
      ) : null}

      
      {selectedMetadata.nameArray ? <>
        <h1 className={classes.h1}>
          {selectedMetadata.nameArray.map((line, index) => (
            <p key={index} style={{ color: highlightColor || 'inherit' }}>{line}</p>
          ))}
        </h1>
      </> : <SkH1Desktop text={selectedMetadata.name} color={highlightColor} isV2={true} disableBackground={true} isCurved={false} />}
      
      <Space h="lg"/>
      
      

      <div className={classes.songContainer}>

        <SkMetaTextView metaText={selectedSong.songContent} otherArgs={{isv2: true}} />

      </div>
      {(selectedNotes && selectedNotes.length) ? <>
        <SkH2DesktopV2 my="lg" text={"Примітки"}/>
        <SkMetaTextView metaText={selectedNotes} otherArgs={{isv3: true}} />
      </> : null}
    </Container>

    <MusicBlockDesktop music={selectedMetadata.music} title={"Музика на текст пісні"} />

    <SkSourcesContainerDesktop sources={sourcesParams}/>
  </>;
}
