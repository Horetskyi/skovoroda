
import { Container, Group, Modal, Space } from '@mantine/core';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { prepareFablesDropdownItems, prepareTranslatorsDropdownItems } from '../../lib/staticProps/fableLogic';
import { SkovorodaFablesPath, pathJoin } from '../../lib/skovorodaPath';
import SkCardWithTwoSelectorsDesktopV2 from '../shared/skCardWithTwoSelectorsDesktopV2';
import SkH1Desktop from '../shared/skH1Desktop';
import SkTextContentBlockDesktop from '../shared/skTextContentBlockDesktop';
import SkSourcesContainerDesktop from '../shared/skSourcesContainerDesktop';
import SkButtonDesktop from '../shared/skButtonDesktop';
import { randomNumberInRangeExcept } from '../../lib/auxiliary';
import SkColoredContainerDesktop from '../shared/skColoredContainerDesktop';
import SkCommentAuthorDesktop from '../shared/skCommentAuthorDesktop';
import SkRelatedThemesDesktop from '../shared/skRelatedThemesDesktop';
import { useDisclosure } from '@mantine/hooks';
import SkImage from '../shared/skImage';
import classes from './fablePageDesktop.module.scss';
import { adjustImageHeight } from '../functions/imageFunctions';
import { getBookSourceParam, getIllustrationSourceParam } from './details/pureFunctions';
import SkH2DesktopV2 from '../shared/skH2DesktopV2';

export default function FablePageDesktop({ 
  selectedFable,
  allFablesMetadata,
  allTranslators,
  selectedNotes,
  selectedComment,
  selectedCommonMetadata,
  selectedId,
  deviceEnding
}) 
{
  const displayComments = false;

  const router = useRouter();
  function changeRouterPath(urlId) {
    const newPath = pathJoin(SkovorodaFablesPath, urlId);
    return router.push(newPath, undefined, { scroll: false, shallow: false });
  }

  const selectedMetadata = selectedFable.metadata;

  // Dropdown 1 hooks
  const [selectedTranslatorDropdownValue, selectTranslatorDropdownValueInner] = useState(""+selectedMetadata.translatorId);
  const [translationsDropdownItems, changeTranslationDropdownItems] = useState(prepareTranslatorsDropdownItems(allFablesMetadata, selectedMetadata.fableNumber, allTranslators));
  if (translationsDropdownItems.every(item => item.value != selectedTranslatorDropdownValue)) {
    selectTranslatorDropdownValueInner(""+selectedMetadata.translatorId);
  }

  // Dropdown 2 hooks
  const [fablesDropdownItems, changeFablesDropdownItems] = useState(prepareFablesDropdownItems(allFablesMetadata, selectedMetadata.translatorId));
  const [selectedFableDropdownValue, selectFableDropdownValueInner] = useState(""+selectedMetadata.fableNumber);
  if (fablesDropdownItems.every(item => item.value != selectedFableDropdownValue)) {
    selectFableDropdownValueInner(""+selectedMetadata.fableNumber);
  }

  // Image Modal hook
  const [opened, { open, close }] = useDisclosure(false);

  // Dropdown 1
  function selectTranslatorDropdownValue(value) {
    const urlId = translationsDropdownItems.find(item => item.value == value).urlId;
    changeRouterPath(urlId).then(() => {
      selectTranslatorDropdownValueInner(""+value);
      changeFablesDropdownItems(prepareFablesDropdownItems(allFablesMetadata, value));
    });
  }

  // Dropdown 2
  function selectFableDropdownValue(value) {
    const urlId = fablesDropdownItems.find(item => item.value == value).urlId;
    changeRouterPath(urlId).then(() => {
      selectFableDropdownValueInner(""+value);
      changeTranslationDropdownItems(prepareTranslatorsDropdownItems(allFablesMetadata, value, allTranslators));
    });
  }  

  const fableString = selectedMetadata.translatorId === 0 ? "Басня" : "Байка";
  const h1Text = `${fableString} ${selectedMetadata.fableNumber} – ${selectedMetadata.fableTitle}`;
  const isFableImageExists = selectedMetadata.fableImage && selectedMetadata.fableImage.imageUrl && selectedMetadata.fableImage.imageUrl.length > 0;

  const sourcesParams = [
    getBookSourceParam(selectedFable.source, selectedNotes, true),
  ];
  if (isFableImageExists) {
    sourcesParams.push(getIllustrationSourceParam(selectedMetadata.fableImage));
  }

  const prevFableNumber = selectedMetadata.fableNumber - 1;
  const nextFableNumber = selectedMetadata.fableNumber + 1;
  const randomFableNumber = randomNumberInRangeExcept(1, 30, selectedMetadata.fableNumber);

  adjustImageHeight(selectedMetadata.fableImage, 420, 520, 720);
  const highlightColor = isFableImageExists ? selectedMetadata.fableImage.highlightColor : null;

  return <>
    
    {isFableImageExists ? <>
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
          key={selectedMetadata.fableImage.imageUrl}
          image={selectedMetadata.fableImage} 
          fullHeight={true}
        />
      </Modal>
    </> : null}
    
    <Container mt={90} mb={0}>
      <SkCardWithTwoSelectorsDesktopV2 
        language={selectedMetadata.language}
        dropdown1={{
          label: "Оберіть переклад",
          data: translationsDropdownItems,
          selectedValue: selectedTranslatorDropdownValue,
          onChange: selectTranslatorDropdownValue
        }} 
        dropdown2={{
          label: "Оберіть байку",
          data: fablesDropdownItems,
          selectedValue: selectedFableDropdownValue,
          onChange: selectFableDropdownValue
        }}
        idSuffix="fable"
      />
      <Group mt={0} mx={0} mb={0} grow w={392} preventGrowOverflow={false}>
        <SkButtonDesktop text={"<"} onClick={() => selectFableDropdownValue(prevFableNumber)} disabled={prevFableNumber == 0}/>
        <SkButtonDesktop text={"Байка на щастя"} onClick={() => selectFableDropdownValue(randomFableNumber)} color={highlightColor} />
        <SkButtonDesktop text={">"} onClick={() => selectFableDropdownValue(nextFableNumber)} disabled={nextFableNumber == 31}/>
      </Group>
      <SkH1Desktop text={h1Text} color={highlightColor} isV2={true} disableBackground={true} />
      <Space h="lg"/>

      <div className={'textWithImageContainer'}>

        {isFableImageExists ? 
          <div className={'textWithImageContainer__image textWithImageContainer__image_clickable'}>
            <SkImage 
              image={selectedMetadata.fableImage} 
              width={selectedMetadata.fableImage.width} 
              height={selectedMetadata.fableImage.height} 
              fullWidth={false}
              priority
              onClick={() => open()}
              shadow={true}
            />
          </div>
          : null}

        <div>
          <SkTextContentBlockDesktop textContent={selectedFable.content} isv2={true} />
        </div>

      </div>
      <SkH2DesktopV2 mb="lg" mt="xl" text={"Сила"} color={highlightColor} />
      <SkTextContentBlockDesktop textContent={selectedFable.powerContent} isv2={true} />
      <Space h="xl"/>
      {(selectedNotes && selectedNotes.length) ? <>
        <SkH2DesktopV2 my="lg" text={"Примітки"}/>
        <SkTextContentBlockDesktop textContent={selectedNotes} isv3={true} />
      </> : null}
    </Container>
    {(selectedComment && selectedComment.length && displayComments) ? <>
      <SkColoredContainerDesktop color={"gray.0"}>
        <SkH2DesktopV2 mb="sm" text={"Коментар"}/>
        <SkCommentAuthorDesktop />
        <SkTextContentBlockDesktop textContent={selectedComment} isv2={true}/>
        {selectedCommonMetadata ? <>
          <Space h="md" />
          <SkRelatedThemesDesktop themes={selectedCommonMetadata.relatedThemes} />
        </> : null}
      </SkColoredContainerDesktop>
      </> : null}
    <SkSourcesContainerDesktop sources={sourcesParams} />
  </>;
}
