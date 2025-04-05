
import { Box, Container, Group, Modal, Space } from '@mantine/core';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { prepareFablesDropdownItems, prepareTranslatorsDropdownItems } from '../../lib/pagesContent/fableLogic';
import { SkovorodaFablesPath, pathJoin } from '../../lib/skovorodaPath';
import SkCardWithTwoSelectorsDesktopV2 from '../shared/skCardWithTwoSelectorsDesktopV2';
import SkH1Desktop from '../shared/skH1Desktop';
import SkH2Desktop from '../shared/skH2Desktop';
import SkTextContentBlockDesktop from '../shared/skTextContentBlockDesktop';
import SkSourcesContainerDesktop from '../shared/skSourcesContainerDesktop';
import SkButtonDesktop from '../shared/skButtonDesktop';
import { randomNumberInRangeExcept } from '../../lib/auxiliary';
import SkColoredContainerDesktop from '../shared/skColoredContainerDesktop';
import SkCommentAuthorDesktop from '../shared/skCommentAuthorDesktop';
import SkRelatedThemesDesktop from '../shared/skRelatedThemesDesktop';
import { useDisclosure } from '@mantine/hooks';
import SkImage from '../shared/skImage';
import SkTextLink from '../shared/skTextLink';
import classes from './fablePageDesktop.module.scss';
import { adjustImageHeight } from '../functions/imageFunctions';
import { getIllustrationSourceParam } from './details/pureFunctions';

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
    {
      sourceType: "Текст" + (selectedNotes ? " і Примітки" : ""),
      sourceValue: selectedFable.source.sourceFullName,
      sourceHref: selectedFable.source.sourceHref,
      image: selectedFable.source.bookCoverImage,
      linkTitle: selectedFable.source.sourceFullName,
    },
  ];
  if (isFableImageExists) {
    sourcesParams.push(getIllustrationSourceParam(selectedMetadata.fableImage));
  }

  const prevFableNumber = selectedMetadata.fableNumber - 1;
  const nextFableNumber = selectedMetadata.fableNumber + 1;
  const randomFableNumber = randomNumberInRangeExcept(1, 30, selectedMetadata.fableNumber);

  adjustImageHeight(selectedMetadata.fableImage, 360, 520, 720);

  // const fullFableImage = selectedMetadata.fableImage ? {...selectedMetadata.fableImage} : null;
  // if (fullFableImage) {
  //   adjustImageHeight(fullFableImage, 360, 520, 720);
  // }

  return <>
    
    {/* {isFableImageExists ? <>
      <Modal opened={opened} onClose={close} padding={0} withCloseButton={false} radius={24} keepMounted={true} width={520} mt={"xl"}>
        <SkImage 
          key={selectedMetadata.fableImage.imageUrl}
          additionalClassName={classes.fableImageInModal}
          image={selectedMetadata.fableImage} />
      </Modal>
    </> : null} */}

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
        <SkImage 
          key={selectedMetadata.fableImage.imageUrl}
          image={selectedMetadata.fableImage} 
          fullHeight={true}
        />
      </Modal>
    </> : null}
    
    <Container py="lg">
      <SkCardWithTwoSelectorsDesktopV2 
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
      <Group mt={"md"} mx={0} mb={0} grow className={classes.groupOfButtons} w={560} preventGrowOverflow={false}>
        <SkButtonDesktop text={"<"} onClick={() => selectFableDropdownValue(prevFableNumber)} disabled={prevFableNumber == 0}/>
        <SkButtonDesktop text={"Байка на щастя"} onClick={() => selectFableDropdownValue(randomFableNumber)}/>
        <SkButtonDesktop text={">"} onClick={() => selectFableDropdownValue(nextFableNumber)} disabled={nextFableNumber == 31}/>
      </Group>
      <Space h="lg"/>
      <SkH1Desktop text={h1Text} />
      <Space h="lg"/>

      <div className={classes.fableContainer}>

        {isFableImageExists ? 
          <div className={classes.fableImage}>
            <SkImage 
              image={selectedMetadata.fableImage} 
              width={260} 
              height={360} 
              priority
              onClick={() => open()}
            />
          </div>
          : null}

        <div>
          <SkTextContentBlockDesktop textContent={selectedFable.content} isv2={true} />
        </div>

      </div>
      <SkH2Desktop my="lg" text={"Сила"}/>
      <SkTextContentBlockDesktop textContent={selectedFable.powerContent} isv2={true} />
      {(selectedNotes && selectedNotes.length) ? <>
        <SkH2Desktop my="lg" text={"Примітки"}/>
        <SkTextContentBlockDesktop textContent={selectedNotes} isv3={true} />
      </> : null}
    </Container>
    {(selectedComment && selectedComment.length) ? <>
      <SkColoredContainerDesktop color={"gray.0"}>
        <SkH2Desktop mb="sm" text={"Коментар"}/>
        <SkCommentAuthorDesktop />
        <SkTextContentBlockDesktop textContent={selectedComment} isv2={true}/>
        {selectedCommonMetadata ? <>
          <Space h="md" />
          <SkRelatedThemesDesktop themes={selectedCommonMetadata.relatedThemes} />
        </> : null}
      </SkColoredContainerDesktop>
      </> : null}
    <SkSourcesContainerDesktop sources={sourcesParams} includeTextValidityWarning={true} />
  </>;
}
