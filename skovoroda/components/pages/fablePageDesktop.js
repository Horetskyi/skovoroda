
import { Container, Space, Text, createStyles } from '@mantine/core';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Image from 'next/image';
import { prepareFablesDropdownItems, prepareTranslatorsDropdownItems } from '../../lib/pagesContent/fableLogic';
import { SkovorodaFablesPath, pathJoin } from '../../lib/skovorodaPath';
import SkCardWithTwoSelectorsDesktopV2 from '../shared/skCardWithTwoSelectorsDesktopV2';
import SkH1Desktop from '../shared/skH1Desktop';
import SkH2Desktop from '../shared/skH2Desktop';
import SkColoredContainerDesktop from '../shared/skColoredContainerDesktop';
import SkTextContentBlockDesktop from '../shared/skTextContentBlockDesktop';
import SkSourceBlockDesktop from '../shared/skSourceBlockDesktop';
import { commonContent } from '../../lib/pagesContent/commonContent';
import SkSourcesContainerDesktop from '../shared/skSourcesContainerDesktop';

const useStyles = createStyles((theme) => ({
  
  fableContainer: {
    display: "flex",
  },

  fableImage: {
    borderRadius: theme.radius.md,
    boxShadow: theme.shadows.lg,
    minWidth: "max-content",
    lineHeight: 0,
    width: 250,
    height: 360,
    img: {
      borderRadius: theme.radius.md,
      objectFit: "cover",
    },
    marginRight: theme.spacing.md, 
  },

  fablePowerTitle: {
    fontWeight: 200,
    fontSize: "36px",
    lineHeight: "33px",
    letterSpacing: "0.04em",
    textAlign: "center",
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    marginLeft: "auto",
    marginRight: "auto",
  },

}));

export default function FablePageDesktop({ 
  selectedFable,
  allFablesMetadata,
  allTranslators,
  selectedNotes,
  selectedId,
  deviceEnding
}) 
{
  const { classes } = useStyles();

  const router = useRouter();
  function changeRouterPath(urlId) {
    const newPath = pathJoin(SkovorodaFablesPath, urlId);
    return router.push(newPath, undefined, { scroll: false, shallow: false });
  }

  const selectedMetadata = selectedFable.metadata;

  // Dropdown 1 hooks
  const [selectedTranslatorDropdownValue, selectTranslatorDropdownValueInner] = useState(selectedMetadata.translatorId);
  const [translationsDropdownItems, changeTranslationDropdownItems] = useState(prepareTranslatorsDropdownItems(allFablesMetadata, selectedMetadata.fableNumber, allTranslators));
  if (translationsDropdownItems.every(item => item.value !== selectedTranslatorDropdownValue)) {
    selectTranslatorDropdownValueInner(selectedMetadata.translatorId);
  }

  // Dropdown 2 hooks
  const [fablesDropdownItems, changeFablesDropdownItems] = useState(prepareFablesDropdownItems(allFablesMetadata, selectedMetadata.translatorId));
  const [selectedFableDropdownValue, selectFableDropdownValueInner] = useState(selectedMetadata.fableNumber);
  if (fablesDropdownItems.every(item => item.value !== selectedFableDropdownValue)) {
    selectFableDropdownValueInner(selectedMetadata.fableNumber);
  }

  // Dropdown 1
  function selectTranslatorDropdownValue(value) {
    const urlId = translationsDropdownItems.find(item => item.value === value).urlId;
    changeRouterPath(urlId).then(() => {
      selectTranslatorDropdownValueInner(value);
      changeFablesDropdownItems(prepareFablesDropdownItems(allFablesMetadata, value));
    });
  }

  // Dropdown 2
  function selectFableDropdownValue(value) {
    const urlId = fablesDropdownItems.find(item => item.value === value).urlId;
    changeRouterPath(urlId).then(() => {
      selectFableDropdownValueInner(value);
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
    sourcesParams.push({
      sourceType: "Ілюстрація",
      sourceValue: "Олена Лещенко",
      sourceHref: "https://instagram.com/olenka_art_vision",
      sourceHrefAnchorText: "https://instagram.com/olenka_art_vision",
      image: selectedMetadata.fableImage,
      linkTitle: "Instagram Олени Лещенко"
    });
  }

  return <>
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
      />
      <Space h="lg"/>
      <SkH1Desktop text={h1Text} />
      <Space h="lg"/>

      <div className={classes.fableContainer}>

        {isFableImageExists ? 
          <div className={classes.fableImage}>
            <Image 
              src={selectedMetadata.fableImage.imageUrl} 
              width={260} 
              height={360} 
              alt={selectedMetadata.fableImage.alt}
              title={selectedMetadata.fableImage.title} 
              priority
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
    <SkSourcesContainerDesktop sources={sourcesParams} includeTextValidityWarning={true} />
  </>;
}
