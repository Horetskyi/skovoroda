import { Center, Container, Group, Space } from "@mantine/core";
import { prepareFablesDropdownItems, prepareTranslatorsDropdownItems } from "../../lib/staticProps/fableLogic";
import { useState } from "react";
import { useRouter } from "next/router";
import { SkovorodaFablesPath, pathJoin } from "../../lib/skovorodaPath";
import SkCardWithTwoSelectorsMobileV2 from "../shared/skCardWithTwoSelectorsMobileV2";
import SkH1Mobile from "../shared/skH1Mobile";
import SkTextContentBlockDesktop from "../shared/skTextContentBlockDesktop";
import SkImage from "../shared/skImage";
import SkH2Mobile from "../shared/skH2Mobile";
import SkButtonMobile from "../shared/skButtonMobile";
import { randomNumberInRangeExcept } from "../../lib/auxiliary";
import SkSourcesContainerMobile from "../shared/skSourcesContainerMobile";
import SkColoredContainerMobile from "../shared/skColoredContainerMobile";
import SkCommentAuthorMobile from "../shared/skCommentAuthorMobile";
import SkRelatedThemesMobile from "../shared/skRelatedThemesMobile";
import classes from './fablePageMobile.module.scss';
import { getIllustrationSourceParam } from "./details/pureFunctions";

export default function FablePageMobile({ 
  selectedFable,
  allFablesMetadata,
  allTranslators,
  selectedNotes,
  selectedComment,
  selectedCommonMetadata,
  selectedId,
  deviceEnding
}) {
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

  const fableString = selectedMetadata.translatorId == 0 ? "Басня" : "Байка";
  const h1Text = `${fableString} ${selectedMetadata.fableNumber} – ${selectedMetadata.fableTitle}`;
  const isFableImageExists = selectedMetadata.fableImage && selectedMetadata.fableImage.imageUrl && selectedMetadata.fableImage.imageUrl.length > 0;

  const prevFableNumber = selectedMetadata.fableNumber - 1;
  const nextFableNumber = selectedMetadata.fableNumber + 1;
  const randomFableNumber = randomNumberInRangeExcept(1, 30, selectedMetadata.fableNumber);

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
  const highlightColor = isFableImageExists ? selectedMetadata.fableImage.highlightColor : null;

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
          label: "Оберіть байку",
          data: fablesDropdownItems,
          selectedValue: selectedFableDropdownValue,
          onChange: selectFableDropdownValue
        }}
        idSuffix="fable"
      />
      <Group mt={"md"} mx={"md"} mb={"md"} grow className={classes.groupOfButtons} preventGrowOverflow={false}>
        <SkButtonMobile text={"<"} onClick={() => selectFableDropdownValue(prevFableNumber)} disabled={prevFableNumber == 0}/>
        <SkButtonMobile text={"Байка на щастя"} onClick={() => selectFableDropdownValue(randomFableNumber)} color={highlightColor} />
        <SkButtonMobile text={">"} onClick={() => selectFableDropdownValue(nextFableNumber)} disabled={nextFableNumber == 31}/>
      </Group>
    </Container>
     {isFableImageExists ? <>
      <Center>
        <SkImage imageUrl={selectedMetadata.fableImage.imageUrl} width={221} height={306} 
          shadow={"md"} alt={selectedMetadata.fableImage.alt} title={selectedMetadata.fableImage.title} 
          priority={true} optimize={true} />
      </Center>
      <Space h="sm"/>
    </> : null}
    <Container px="md" >
      <SkH1Mobile text={h1Text} color={highlightColor} />
      <Space h="lg"/>
    </Container>
    <Container px={"md"}>
      <SkTextContentBlockDesktop textContent={selectedFable.content} isv2={true} isMobile={true} />
      <SkH2Mobile mt="md" mb="sm" text={"Сила"}/>
      <SkTextContentBlockDesktop textContent={selectedFable.powerContent} isv2={true} isMobile={true} />
      <Space h="md" />
      {(selectedNotes && selectedNotes.length) ? <>
          <SkH2Mobile mb="sm" text={"Примітки"}/>
          <SkTextContentBlockDesktop textContent={selectedNotes} isv3={true} isMobile={true} />
          <Space h="md" />
        </> : null}
    </Container>
    {(selectedComment && selectedComment.length) ? <>
      <SkColoredContainerMobile color={"gray.0"} px={"md"}>
        <SkH2Mobile mb="sm" text={"Коментар"}/>
        <SkCommentAuthorMobile />
        <SkTextContentBlockDesktop textContent={selectedComment} isv2={true} isMobile={true} />
        {selectedCommonMetadata ? <>
          <Space h="md" />
          <SkRelatedThemesMobile themes={selectedCommonMetadata.relatedThemes} />
        </> : null}
      </SkColoredContainerMobile>
      </> : null}
    <SkSourcesContainerMobile sources={sourcesParams} includeTextValidityWarning={true}/>
  </>
}