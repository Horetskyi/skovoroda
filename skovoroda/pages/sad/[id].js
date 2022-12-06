
import getStaticPathsCommon from '../../lib/getStaticPathsCommon';
import readDynamicIdCommon from '../../lib/readDynamicIdCommon';
import { SkovorodaSad } from '../../lib/data/skovorodaSad';
import { Card, Container, createStyles, Select, Title } from '@mantine/core';
import { forwardRef, useState } from 'react';
import { SkovorodaConstants } from '../../lib/skovorodaConstants';
import Link from 'next/link';
import { useRouter } from 'next/router'
import { getFullSongId, getOriginalSongId, getSongId } from '../../lib/sadIds';

const useStyles = createStyles((theme) => ({

  emptyLine: {
    height: "14px",
  },

  sadText: {
    "& p": {
      fontSize: theme.fontSizes.md,
      marginBottom: "4px",
      marginTop: 0,
    }
  },

  formatRight: {
    textAlign: 'right',
  },
  formatCenter: {
    textAlign: 'center',
  },
  formatTabs3: {
    marginLeft: "112px",
  },
  formatDefault: {
  },

  selectorLink: {
    textDecoration: "none",
  }

}));

function prepareDropdownSadSongs(allSongsShortData) {
  const result = [];
  allSongsShortData.forEach(data => {
    if (result.findIndex(song => song.value === data.songId) !== -1) {
      return;
    }
    result.push({
      value: data.songId,
      label: data.shortName,
      hrefItem: getFullSongId(data.songId),
    });
  });
  // TODO: Sort
  return result;
}

// "original" and translations
function prepareDropdownSadTypes(sadData) {
  const result = [
    { value: "original", label: "Оригінал", hrefItem: sadData.id },
  ];
  sadData.translates.forEach(translation => {
    const translatorName = translation.translator.fullName;
    const label = "Переклад - " + translatorName;
    result.push({
      value: translatorName,
      label: label,
      hrefItem: translation.id 
    });
  });
  return result;
}

// "original" or some translation
function getDropdownSelectedSadType(sadData, selectedId) {
  if (sadData.id === selectedId) {
    return "original";
  }
  return sadData.translates.find(translate => translate.id === selectedId).translator.fullName;
}

export default function SkovorodaSadPage({ sadData, allSongsShortData, selectedId, deviceEnding }) {

  const { classes } = useStyles();
  const router = useRouter();

  const dropdownSadSongs = prepareDropdownSadSongs(allSongsShortData);
  const [selectedSadSongId, selectDropdownSadSongInner] = useState(getSongId(selectedId));

  const dropdownSadTypes = prepareDropdownSadTypes(sadData);
  const [selectedSadTypeValue, selectDropdownSadTypeInner] = useState(getDropdownSelectedSadType(sadData, selectedId));
  if (dropdownSadTypes.every(type => type.value !== selectedSadTypeValue)) {
    selectDropdownSadTypeInner(getDropdownSelectedSadType(sadData, selectedId));
  }

  async function selectDropdownSadSong(songId) {
    if (songId === getSongId(selectedId)) {
      return;
    }
    const fullSongId = dropdownSadSongs.find(type => type.value === songId).hrefItem;
    router.push("/sad/"+fullSongId, undefined, { scroll: false, shallow: false });
    selectDropdownSadSongInner(songId);
  }

  function setSelectedSadType(value) {
    const fullSongId = dropdownSadTypes.find(type => type.value === value).hrefItem;
    router.push("/sad/"+fullSongId, undefined, { scroll: false, shallow: true });
    selectDropdownSadTypeInner(value);
  }

  // Data processing (Text and Title)
  const selectedTranslate = selectedSadTypeValue === "original" 
    ? undefined 
    : sadData.translates.find(translate => translate.translator.fullName === selectedSadTypeValue);
  const selectedText = selectedTranslate ? selectedTranslate.text : sadData.text;
  const selectedNotes = selectedTranslate ? selectedTranslate.notes : sadData.notes;
  const selectedTitle = selectedTranslate ? selectedTranslate.translatedName : sadData.originalName;
  const formatClasses = {
    "center": classes.formatCenter,
    "right": classes.formatRight,
    "tabs3": classes.formatTabs3, 
    "default": classes.formatDefault,
  }
  const textBlock = [];
  function addToTextBlock(lineObject) {
    const text = lineObject.text;
    const key = textBlock.length;
    const formatClassName = lineObject.format ? formatClasses[lineObject.format] : formatClasses["default"];
    const element = text 
      ? <p key={key} className={formatClassName}>{text}</p>
      : <p key={key} className={classes.emptyLine}></p>
    textBlock.push(element);
  }
  selectedText.forEach(addToTextBlock);
  addToTextBlock({ text: "" });
  addToTextBlock({ text: "Примітки", format: "center" });
  addToTextBlock({ text: "" });
  selectedNotes.forEach(addToTextBlock);

  // Styling
  const bgColor = SkovorodaConstants.getBackgroundColorByType(selectedSadTypeValue);

  // Tech
  const LinkInsideSelect = forwardRef(function LinkInsideSelect({ hrefItem, label, ...others }, ref) { 
    others.className += " " + classes.selectorLink;
    return <Link ref={ref} href={hrefItem}><a {...others}>{label}</a></Link>
  });

  return <>
    <Container pt="lg" mb="xl">
      <Card bg={bgColor} withBorder radius="md">
        <Title ta={'center'} size="h2" mt="0" mb="lg" order={1}>{selectedTitle}</Title>
        <Select 
          variant='filled' 
          itemComponent={LinkInsideSelect} 
          mb="lg" 
          data={dropdownSadSongs} 
          value={selectedSadSongId}
          onChange={selectDropdownSadSong}>
        </Select>
        <Select 
          variant='filled' 
          itemComponent={LinkInsideSelect} 
          mb="lg" 
          data={dropdownSadTypes} 
          value={selectedSadTypeValue}
          onChange={setSelectedSadType}>
        </Select>
        <Container size={600}>
          <Card bg={bgColor} className={classes.sadText}>
            {textBlock}
          </Card>
        </Container>
      </Card>
    </Container>
  </>;
}

// Get all Sad Paths
export async function getStaticPaths() {
  
  const skovorodaSad = await SkovorodaSad();
  const ids = skovorodaSad.array.flatMap(sad => {
    const sadIds = sad.translates.map(translate => translate.id);
    sadIds.push(sad.id);
    return sadIds;
  });
  console.log("All Sad Ids:", ids);
  return getStaticPathsCommon(ids);
}

// Get Sad Data by Id
export async function getStaticProps({ params }) {

  const skovorodaSad = await SkovorodaSad();
  const { id, deviceEnding } = readDynamicIdCommon(params.id);
  const originalId = getOriginalSongId(id);
  const sadData = skovorodaSad.array.find(sad => sad.id === originalId);
  const allSongsShortData = skovorodaSad.array.map(sad => { return {
    songId: getSongId(sad.id),
    shortName: sad.shortName
  }});
  return {
    props: {
      sadData,
      allSongsShortData,
      selectedId: id,
      deviceEnding,
    },
  };
}