
import getStaticPathsCommon from '../../lib/getStaticPathsCommon';
import readDynamicIdCommon from '../../lib/readDynamicIdCommon';
import { SkovorodaSad } from '../../lib/data/skovorodaSad';
import { Card, Container, createStyles, Select, Title } from '@mantine/core';
import { forwardRef, useState } from 'react';
import { SkovorodaConstants } from '../../lib/skovorodaConstants';
import Link from 'next/link';
import { useRouter } from 'next/router'

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

function idToSongId(id) {
  return id.split("-")[1];
}

function prepareSelectSadSongsArray(allSadData) {
  const selectSadSongsArray = [];
  allSadData.forEach(data => {
    const songId = idToSongId(data.id);
    if (selectSadSongsArray.findIndex(song => song.value === songId) !== -1) {
      return;
    }
    selectSadSongsArray.push({
      value: songId,
      label: data.shortName,
      hrefItem: data.id,
    });
  });
  return selectSadSongsArray;
}

function prepareSelectSadTypeArray(sadData) {
  const selectSadTypeArray = [
    { value: "original", label: "Оригінал", hrefItem: sadData.id },
  ];
  sadData.translates.forEach(translate => {
    const translatorName = translate.translator.fullName;
    const label = "Переклад - " + translatorName + " - " + translate.source.year + " р.";
    selectSadTypeArray.push({
      value: translatorName,
      label: label,
      hrefItem: translate.id 
    });
  });
  return selectSadTypeArray;
}

function getSelectSadType(sadData, selectedId) {
  if (sadData.id === selectedId) {
    return "original";
  }
  return sadData.translates.find(translate => translate.id === selectedId).translator.fullName;
}

export default function SkovorodaSadPage({ sadData, allSadData, selectedId, deviceEnding }) {

  const { classes } = useStyles();
  const router = useRouter();

  console.log("selectedId", selectedId);

  // Songs Dropdown Data
  const selectSadSongsArray = prepareSelectSadSongsArray(allSadData);
  const [selectedSadSong, setSelectedSadSongInner] = useState(idToSongId(selectedId));

  // Types Dropdown Data
  const selectSadTypeArray = prepareSelectSadTypeArray(sadData);
  // const [selectSadTypeArray, setSelectSadTypeArray] = useState(prepareSelectSadTypeArray(sadData));
  // if (!selectSadTypeArray.some(type => idToSongId(type.hrefItem) === idToSongId(selectedId))) {
  //   setSelectSadTypeArray(prepareSelectSadTypeArray(sadData));
  // }
  const [selectedSadType, setSelectedSadTypeInner] = useState(getSelectSadType(sadData, selectedId));
  if (selectSadTypeArray.every(type => type.value !== selectedSadType)) {
    setSelectedSadTypeInner(getSelectSadType(sadData, selectedId));
  }

  // Songs Dropdown Logic
  async function setSelectedSadSong(songId) {
    if (songId === idToSongId(selectedId)) {
      return;
    }
    const id = selectSadSongsArray.find(type => type.value === songId).hrefItem;
    router.push("/sad/"+id, undefined, { scroll: false, shallow: false });
    setSelectedSadSongInner(songId);
    // window.location = "/sad/"+id;
    // const response = await fetch("/api/getSadSongData/"+songId);
    // const data = await response.json();
    // const newDefaultSelectedSadType = selectSadTypeArray.find(data => data.hrefItem === id).value;
    // setSelectedSadType(newDefaultSelectedSadType);
  }

  // Types Dropdown Logic
  function setSelectedSadType(value) {
    const id = selectSadTypeArray.find(type => type.value === value).hrefItem;
    router.push("/sad/"+id, undefined, { scroll: false, shallow: true });
    setSelectedSadTypeInner(value);
    // TODO: change selectSadSongsArray according to selected translate/original
  }

  // Data processing (Text and Title)
  const selectedTranslate = selectedSadType === "original" 
    ? undefined 
    : sadData.translates.find(translate => translate.translator.fullName === selectedSadType);
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
  const bgColor = SkovorodaConstants.getBackgroundColorByType(selectedSadType);

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
          data={selectSadSongsArray} 
          value={selectedSadSong}
          onChange={setSelectedSadSong}>
        </Select>
        <Select 
          variant='filled' 
          itemComponent={LinkInsideSelect} 
          mb="lg" 
          data={selectSadTypeArray} 
          value={selectedSadType}
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
  const idParts = id.split('-');
  const originalId = idParts[0]+'-'+idParts[1];
  const sadData = skovorodaSad.array.find(sad => sad.id === originalId);
  const allSadData = skovorodaSad.array.map(sad => { return {
    id: sad.id,
    shortName: sad.shortName,
    type: sad.type,
  }});
  return {
    props: {
      sadData,
      allSadData,
      selectedId: id,
      deviceEnding,
    },
  };
}