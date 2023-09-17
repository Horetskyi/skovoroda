import { Center, Container, Space, Text, createStyles } from "@mantine/core";
import { prepareFablesDropdownItems, prepareTranslatorsDropdownItems } from "../../lib/pagesContent/fableLogic";
import { useState } from "react";
import { useRouter } from "next/router";
import { SkovorodaFablesPath, pathJoin } from "../../lib/skovorodaPath";
import SkCardWithTwoSelectorsMobileV2 from "../shared/skCardWithTwoSelectorsMobileV2";
import SkH1Mobile from "../shared/skH1Mobile";
import SkTextContentBlockDesktop from "../shared/skTextContentBlockDesktop";
import SkImage from "../shared/skImage";
import SkH2Mobile from "../shared/skH2Mobile";
import SkColoredContainerMobile from "../shared/skColoredContainerMobile";
import { commonContent } from "../../lib/pagesContent/commonContent";
import SkSourceBlockMobile from "../shared/skSourceBlockMobile";

const useStyles = createStyles((theme) => ({
  
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

export default function FablePageMobile({ 
  selectedFable,
  allFablesMetadata,
  allTranslators,
  selectedNotes,
  selectedId,
  deviceEnding
}) {
  
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

  return <>
    <SkCardWithTwoSelectorsMobileV2 
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
    <Container px="md">
      <SkH1Mobile text={h1Text} />
    </Container>
    <Space h="md"/>
    {isFableImageExists ? <>
      <Center>
        <SkImage imageUrl={selectedMetadata.fableImage.imageUrl} width={221} height={306} shadow={"md"} alt={selectedMetadata.fableImage.alt} title={selectedMetadata.fableImage.title} priority={true} />
      </Center>
      <Space h="md"/>
    </> : null}
    <Container px={"md"}>
      <SkTextContentBlockDesktop textContent={selectedFable.content} isv2={true} isMobile={true} />
      <SkH2Mobile mt="md" mb="sm" text={"Сила"}/>
      <SkTextContentBlockDesktop textContent={selectedFable.powerContent} isv2={true} isMobile={true} />
      <Space h="md" />
      {(selectedNotes && selectedNotes.length) ? <>
        <SkH2Mobile mb="sm" text={"Примітки"}/>
        <SkTextContentBlockDesktop textContent={selectedNotes} isv3={true} isMobile={true} />
      </> : null}
    </Container>
    <SkColoredContainerMobile color={"indigo.0"}>
      <SkH2Mobile text="Джерела"/>
      <Space h="sm"/>
      <SkSourceBlockMobile {...{
        sourceType: "Текст" + (selectedNotes ? " і Примітки" : ""),
        sourceValue: selectedFable.source.sourceFullName,
        sourceHref: selectedFable.source.sourceHref,
        image: selectedFable.source.bookCoverImage,
        linkTitle: selectedFable.source.sourceFullName,
      }}/>
      {isFableImageExists ? <>
        <Space h="sm"/>
        <SkSourceBlockMobile {...{
          sourceType: "Ілюстрація",
          sourceValue: "Олена Лещенко",
          sourceHref: "https://instagram.com/olenka_art_vision",
          sourceHrefAnchorText: "https://instagram.com/olenka_art_vision",
          image: selectedMetadata.fableImage,
          linkTitle: "Instagram Олени Лещенко"
        }}/>
      </> : null}
      <Text px="md" mt="lg" className='normalContentText'>{commonContent.textValidityWarning}</Text>
    </SkColoredContainerMobile>
  </>
}