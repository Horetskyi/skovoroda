
import getStaticPathsCommon from '../../../lib/getStaticPathsCommon';
import readDynamicIdCommon from '../../../lib/readDynamicIdCommon';
import { SkovorodaSad } from '../../../lib/data/skovorodaSad';
import { Card, Container, createStyles, Flex, Select, Title } from '@mantine/core';
import { forwardRef, useState } from 'react';
import { SkovorodaConstants } from '../../../lib/skovorodaConstants';
import Link from 'next/link';
import { useRouter } from 'next/router'
import { getFullSongId, getOriginalSongId, getSongId, getTranslationId } from '../../../lib/sadIds';
import { SkovorodaSadPath } from '../../../lib/skovorodaPath';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons';
import SkovorodaColoredButton from '../../../components/skovorodaColoredButton';

const useStyles = createStyles((theme) => {

  const tabSize = 36; 
  const leftNumSpacing = 100;

  return {

    emptyLine: {
      height: "14px",
    },
    blockTextLine: {
      display: 'block',
    },
    textBlock: {
      overflow: "visible",
      "& span": {
        fontSize: theme.fontSizes.md,
        marginTop: 0,
        marginBottom: 0,
      },
      "& p": {
        fontSize: theme.fontSizes.md,
        marginTop: 0,
        marginBottom: 0,
      }
    },

    sadSongsDropdown: {
      marginLeft: "8px", 
      marginRight: "8px", 
      flex: 'auto',
    },
    sadTypeDropdown: {
      marginLeft: theme.spacing.lg, 
      flex: 'auto',
    },
    sadButton: {
      paddingLeft: theme.spacing.sm,
      paddingRight: theme.spacing.sm,
    },
  
    formatRight: {
      textAlign: 'right',
    },
    formatCenter: {
      textAlign: 'center',
    },
    formatTabs6: {
      marginLeft: `${tabSize*6}px`,
    },
    formatTabs5: {
      marginLeft: `${tabSize*5}px`,
    },
    formatTabs4: {
      marginLeft: `${tabSize*4}px`,
    },
    formatTabs3: {
      marginLeft: `${tabSize*3}px`,
    },
    formatTabs2: {
      marginLeft: `${tabSize*2}px`,
    },
    formatTabs1: {
      marginLeft: `${tabSize}px`,
    },
    formatDefault: {
    },
    formatIrmologion: {
      fontFamily: 'Irmologion ieUcs',
    },
    formatLeftNum9: {
      "::before": {
        content: '"9."',
        position: 'absolute',
        left: `-${leftNumSpacing}px`,
      }
    },
    formatLeftNum8: {
      "::before": {
        content: '"8."',
        position: 'absolute',
        left: `-${leftNumSpacing}px`,
      }
    },
    formatLeftNum7: {
      "::before": {
        content: '"7."',
        position: 'absolute',
        left: `-${leftNumSpacing}px`,
      }
    },
    formatLeftNum6: {
      "::before": {
        content: '"6."',
        position: 'absolute',
        left: `-${leftNumSpacing}px`,
      }
    },
    formatLeftNum5: {
      "::before": {
        content: '"5."',
        position: 'absolute',
        left: `-${leftNumSpacing}px`,
      }
    },
    formatLeftNum4: {
      "::before": {
        content: '"4."',
        position: 'absolute',
        left: `-${leftNumSpacing}px`,
      }
    },
    formatLeftNum3: {
      "::before": {
        content: '"3."',
        position: 'absolute',
        left: `-${leftNumSpacing}px`,
      }
    },
    formatLeftNum2: {
      "::before": {
        content: '"2."',
        position: 'absolute',
        left: `-${leftNumSpacing}px`,
      }
    },
    formatLeftNum1: {
      "::before": {
        content: '"1."',
        position: 'absolute',
        left: `-${leftNumSpacing}px`,
      }
    },
  
    selectorLink: {
      textDecoration: "none",
      fontSize: theme.fontSizes.md,
      paddingTop: theme.spacing.xs,
      paddingBottom: theme.spacing.xs,
      paddingLeft: `${theme.spacing.md} !important`,
    },

    originalSelect: {
      "& input": {
        background: SkovorodaConstants.getColorInTheme(SkovorodaConstants.getElementsColorByType("original"), theme),

        "&:hover": {
          background: SkovorodaConstants.getColorInTheme(SkovorodaConstants.getElementsHoverColorByType("original"), theme),
        }
      }
    },
    translateSelect: {
      "& input": {
        background: SkovorodaConstants.getColorInTheme(SkovorodaConstants.getElementsColorByType("translate"), theme),

        "&:hover": {
          background: SkovorodaConstants.getColorInTheme(SkovorodaConstants.getElementsHoverColorByType("translate"), theme),
        }
      }
    },

  };
});

function prepareDropdownSadSongs(allSongsShortData, selectedId, translatorFullName) {
  const result = [];
  const translationId = getTranslationId(selectedId);
  allSongsShortData.forEach(data => {
    if (result.findIndex(song => song.value === data.songId) !== -1) {
      return;
    }
    if (translationId) {
      const isTranslationExists = data.translates.some(translation => translation.translationId === translationId);
      result.push({
        value: data.songId,
        label: (isTranslationExists 
          ? data.shortName.replace("Пѣснь", "Пісня").replace("-я", "")
          : `Пісню ${data.songId} ${translatorFullName} не перекладав`),
        hrefItem: getFullSongId(data.songId, translationId),
        disabled: !isTranslationExists,
      });    
      return;
    }
    result.push({
      value: data.songId,
      label: data.shortName,
      hrefItem: getFullSongId(data.songId),
      disabled: false,
    });
  });
  return result;
}

// "original" and translations
function prepareDropdownSadTypes(sadData) {
  const result = [
    { value: "original", label: "Оригінал - Повна академічна збірка", hrefItem: sadData.id },
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

  const [selectedSadTypeValue, selectDropdownSadTypeInner] = useState(getDropdownSelectedSadType(sadData, selectedId));
  const [dropdownSadSongs, selectDropdownSadSongs] = useState(prepareDropdownSadSongs(allSongsShortData, selectedId, selectedSadTypeValue));
  const [selectedSadSongId, selectDropdownSadSongInner] = useState(getSongId(selectedId));

  const dropdownSadTypes = prepareDropdownSadTypes(sadData);
  if (dropdownSadTypes.every(type => type.value !== selectedSadTypeValue)) {
    selectDropdownSadTypeInner(getDropdownSelectedSadType(sadData, selectedId));
  }

  async function selectDropdownSadSong(songId) {
    songId = "" + songId;
    if (songId === getSongId(selectedId)) {
      return;
    }
    const song = dropdownSadSongs.find(type => type.value === songId);
    if (!song || song.disabled) {
      return;
    }
    const fullSongId = song.hrefItem;
    router.push(SkovorodaSadPath+fullSongId, undefined, { scroll: false, shallow: false });
    selectDropdownSadSongInner(songId);
  }

  function setSelectedSadType(value) {
    const fullSongId = dropdownSadTypes.find(type => type.value === value).hrefItem;
    router.push(SkovorodaSadPath+fullSongId, undefined, { scroll: false, shallow: true });
    selectDropdownSadSongs(prepareDropdownSadSongs(allSongsShortData, fullSongId, value));
    selectDropdownSadTypeInner(value);
  }

  function prevSongClicked() {
    selectDropdownSadSong(+getSongId(selectedId) - 1);
  }
  function nextSongClicked() {
    selectDropdownSadSong(+getSongId(selectedId) + 1);
  }

  // Data processing (Text and Title)
  const selectedTranslate = selectedSadTypeValue === "original" 
    ? undefined 
    : sadData.translates.find(translate => translate.translator.fullName === selectedSadTypeValue);
  const selectedData = selectedTranslate ? selectedTranslate : sadData;
  const selectedNotes = selectedTranslate ? selectedTranslate.notes : sadData.notes;
  const selectedTitle = selectedTranslate ? selectedTranslate.translatedName : sadData.originalName;
  const formatClasses = {
    "center": classes.formatCenter,
    "right": classes.formatRight,
    "tabs6": classes.formatTabs6, 
    "tabs5": classes.formatTabs5, 
    "tabs4": classes.formatTabs4, 
    "tabs3": classes.formatTabs3, 
    "tabs2": classes.formatTabs2, 
    "tabs1": classes.formatTabs1,  
    "leftNum9": classes.formatLeftNum9, 
    "leftNum8": classes.formatLeftNum8, 
    "leftNum7": classes.formatLeftNum7, 
    "leftNum6": classes.formatLeftNum6, 
    "leftNum5": classes.formatLeftNum5, 
    "leftNum4": classes.formatLeftNum4, 
    "leftNum3": classes.formatLeftNum3, 
    "leftNum2": classes.formatLeftNum2, 
    "leftNum1": classes.formatLeftNum1, 
    "irmologion": classes.formatIrmologion, 
    "default": classes.formatDefault,
  }
  const textBeforeBlock = [];
  const textBlock = [];
  const textAfterBlock = [];
  const notesBlock = [];

  function addToTextBlockInner(block, lineObject) {
    const text = lineObject.text;
    const key = block.length;
    const formatClassName = lineObject.format ? formatClasses[lineObject.format] : formatClasses["default"];
    const normalClassName = formatClassName + " " + classes.blockTextLine;
    if (!text) {
      block.push(<p key={key} className={classes.emptyLine}></p>);
      return;
    }
    if (!Array.isArray(text)) {
      if (lineObject.isEnterLine) {
        block.push(<p key={key} className={normalClassName}>{text}</p>);
      } else {
        block.push(<span key={key} className={normalClassName}>{text}</span>);
      }
      return;
    }
    const spans = text.map((subText, index) => {
      const subFormatClassName = subText.format ? formatClasses[subText.format] : "";
      return <span key={index} className={subFormatClassName}>{subText.text}</span>;
    });
    block.push(<span key={key} className={normalClassName}>{spans}</span>);
  }
  function addToTextBeforeBlock(lineObject) { addToTextBlockInner(textBeforeBlock, lineObject) };
  function addToTextBlock(lineObject) { addToTextBlockInner(textBlock, lineObject) };
  function addToTextAfterBlock(lineObject) { addToTextBlockInner(textAfterBlock, lineObject) };
  function addToNotesBlock(lineObject) { addToTextBlockInner(notesBlock, lineObject) };

  selectedData.textBefore.forEach(addToTextBeforeBlock);
  selectedData.text.forEach(addToTextBlock);
  selectedData.textAfter.forEach(addToTextAfterBlock);
  selectedNotes.forEach((note, index) => {
    addToNotesBlock(note);
    if (index !== (selectedNotes.length-1)) {
      addToNotesBlock({ text: "" });
    }
  });

  const header1Text = selectedSadTypeValue === "original" 
    ? "Сад божественных пѣсней, прозябшій из зерн Священнаго Писанія"
    : "Сад божественних пісень, що проріс із зерен священного писання";

  // Styling
  const colorType = selectedSadTypeValue;
  const textBgColor = SkovorodaConstants.getTextBackgroundColorByType(colorType);
  const selectClassName = selectedTranslate ? classes.translateSelect : classes.originalSelect;

  // Tech
  const LinkInsideSelect = forwardRef(function LinkInsideSelect({ hrefItem, disabled, label, ...others }, ref) { 
    others.className += " " + classes.selectorLink;
    if (disabled) {
      return <span ref={ref} {...others}>{label}</span>
    }
    return <Link ref={ref} href={hrefItem}><a {...others}>{label}</a></Link>
  });

  return <>
    <Container mb="xl">
      <Title ta={'center'} mt="lg" mb="lg" order={1}>{header1Text}</Title>
      <Flex
        justify="flex-start"
        align="center"
        direction="row"
        wrap="wrap"
        mb="lg"
      >
        <SkovorodaColoredButton 
          size="lg"
          radius="md"
          onClick={prevSongClicked}
          colortype={colorType}
          className={classes.sadButton}
          disabled={getSongId(selectedId)==1}
        >
          <IconChevronLeft size={16} />
        </SkovorodaColoredButton>
        <Select 
          size="lg"
          radius="md"
          variant='filled' 
          itemComponent={LinkInsideSelect} 
          data={dropdownSadSongs} 
          value={selectedSadSongId}
          onChange={selectDropdownSadSong}
          className={selectClassName + " " + classes.sadSongsDropdown}>
        </Select>
        <SkovorodaColoredButton 
          size="lg"
          radius="md"
          onClick={nextSongClicked}
          colortype={colorType}
          className={classes.sadButton}
          disabled={getSongId(selectedId)==30}
        >
          <IconChevronRight size={16} />
        </SkovorodaColoredButton>
        <Select 
          size="lg"
          radius="md"
          variant='filled' 
          itemComponent={LinkInsideSelect} 
          data={dropdownSadTypes} 
          value={selectedSadTypeValue}
          onChange={setSelectedSadType}
          className={selectClassName + " " + classes.sadTypeDropdown}>
        </Select>
      </Flex>
      <Card bg={textBgColor} p="xl" radius="lg">
        <Title ta={'center'} mt="0" mb="md" order={2}>{selectedTitle}</Title>
        <Card p="0" mb="0" bg={textBgColor} className={classes.textBlock}>
          {textBeforeBlock}
        </Card>
        <Container size="fit-content">
          <Card p="0" bg={textBgColor} className={classes.textBlock}>
            {textBlock}
          </Card>
        </Container>
        <Card p="0" bg={textBgColor} className={classes.textBlock}>
          {textAfterBlock}
        </Card>
        <Title ta={'center'} mt="xl" mb="md" order={3}>Примітки</Title>
        <Card p="0" bg={textBgColor} className={classes.textBlock}>
          {notesBlock}
        </Card>
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
    shortName: sad.shortName,
    translates: sad.translates.map(translation => {
      return {
        translationId: translation.translationId,
        shortName: translation.shortName,
      };
    }),
  }});
  allSongsShortData.sort((a,b) => (+a.songId > +b.songId) ? 1 : ((+b.songId > +a.songId) ? -1 : 0))
  return {
    props: {
      sadData,
      allSongsShortData,
      selectedId: id,
      deviceEnding,
    },
  };
}