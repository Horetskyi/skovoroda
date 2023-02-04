
import { Card, Container, createStyles, Flex, Group, Select, Text, Title } from '@mantine/core';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router'
import SkovorodaTextContentBlockDesktop from '../components/skovorodaTextContentBlockDesktop';
import { SkovorodaLettersFromPath, pathJoin } from '../lib/skovorodaPath';
import { LinkInsideSelect } from '../components/auxiliary/linkInsideSelectItem';
import SkovorodaFomattingInfoBlockDesktop from '../components/skovorodaFomattingInfoBlockDesktop';
import SkovorodaSourceBlockDesktop from '../components/skovorodaSourceBlockDesktop';
import CardWithTwoSelectors from './cardWithTwoSelectors';
import Draggable from 'react-draggable';
import { IconArrowsCross, IconCross, IconCrosshair, IconCrossOff, IconMail, IconX } from '@tabler/icons';
import { gsap } from "gsap/dist/gsap";
import { getNoteNumberString, getNoteNumberUpperString } from '../lib/data/utils/notesNumbersSymbols';

const useStyles = createStyles((theme) => ({
  draggableNoteBlock: {
    position: 'absolute',
    zIndex: 100,
    width: "700px",
    maxHeight: "235px",
  },
  draggableNoteBlockInside: {
    maxHeight: "150px",
    overflow: "auto",
  },
  draggableNoteBlockHeader: {
    borderTopLeftRadius: theme.radius.md,
    borderTopRightRadius: theme.radius.md,
    marginLeft: 3-theme.spacing.xl,
    marginRight: -theme.spacing.xl,
    marginTop: -theme.spacing.xl,
    marginBottom: 0,
    flexDirection: "row",
  },
  draggableNoteBlockLabel: {
    cursor: "default",
  },
  draggableNoteBlockCrossIcon: {
    cursor: "pointer",

    ":hover": {
      color: theme.colors.blue[7],
    }
  },
  contentCard: {
    overflow: "visible"
  },
  hidden: {
    visibility: "hidden",
  },

}));

export default function SkovorodaLetterPageDesktop({ 
  selectedLetter,
  selectedNotes, 
  allLettersMetadata, 
  selectedLetterSource, 
  selectedId, 
  letterType }) 
{

  const root = useRef();
  const nodeRef = useRef(null);

  // Draggable Section --

  const [xy, setXy] = useState({ x: 0, y: 0 });
  const [draggableNoteBlockData, setDraggableNoteBlockData] = useState({ 
    visible: false, 
    note: undefined 
  });
  
  function onDraggableStop(event, data) {
    setXy({ x: data.x, y: data.y });
  }

  function closeDraggableNotesBlock() {

    setDraggableNoteBlockData({
      visible: false,
      note: undefined,
    });
  }
  
  function getDraggableMoveTo(event) {
    const draggableElement = document.getElementById("draggable-notes-block");
    const heightAfter = draggableElement.clientHeight;
    const moveToX = event.target.offsetLeft - draggableElement.clientWidth / 2;
    const moveToY = event.target.offsetTop - heightAfter - 20;
    const moveTo = {x: moveToX, y: moveToY};
    return moveTo;
  }

  function onTextNoteClick(event, noteNumber) {

    const wasVisible = draggableNoteBlockData.visible;
    const selectedNote = selectedNotes.find(note => note.noteNumber === noteNumber);
    
    if (!wasVisible) {
      setDraggableNoteBlockData({
        visible: false,
        note: selectedNote,
      });
      setTimeout(() => {
        const moveTo = getDraggableMoveTo(event);
        setXy(moveTo);
        setDraggableNoteBlockData({
          visible: true,
          note: selectedNote,
        });
      }, 50);
      return;
    } 

    setDraggableNoteBlockData({
      visible: true,
      note: selectedNote,
    });

    setTimeout(() => {

      const moveTo = getDraggableMoveTo(event)
      let animation;
      animation = gsap.fromTo("#draggable-notes-block", 
        { 
          x: xy.x, 
          y: xy.y,
        }, 
        { 
          x: moveTo.x, 
          y: moveTo.y, 
          duration: 1, 
          ease: "power2.out",
          onComplete: () => {
            setXy(moveTo);
            animation.invalidate();
            animation.kill();
          }
        });

    },50);
  }

  // Draggable Section --
  

  const { classes } = useStyles();
  const router = useRouter();
  function changeRouterPath(id) {
    const newPath = pathJoin(SkovorodaLettersFromPath, id);
    return router.push(newPath, undefined, { scroll: false, shallow: false });
  }

  const selectedMetadata = selectedLetter.letterMetadata;

  // Dropdown 1 hooks
  const [selectedTranslationDropdownValue, selectTranslationDropdownValueInner] = useState(selectedMetadata.translatorName);
  const [translationsDropdownItems, changeTranslationDropdownItems] = useState(
    prepareTranslationsDropdownItems(allLettersMetadata, newSelectedPersonValue(selectedMetadata, letterType), letterType));
  if (translationsDropdownItems.every(item => item.value !== selectedTranslationDropdownValue)) {
    selectTranslationDropdownValueInner(selectedMetadata.translatorName);
  }

  // Dropdown 2 hooks
  const [personsDropdownItems, changePersonsDropdownItems] = useState(
    prepareLettersDropdownItems(allLettersMetadata, selectedMetadata.translatorName, letterType));
  const [selectedPersonDropdownValue, selectPersonDropdownValueInner] = useState(newSelectedPersonValue(selectedMetadata, letterType));
  if (personsDropdownItems.every(item => item.value !== selectedPersonDropdownValue)) {
    selectPersonDropdownValueInner(newSelectedPersonValue(selectedMetadata, letterType));
  }

  // Dropdown 1
  function selectTranslationDropdownValue(value) {
    const id = translationsDropdownItems.find(item => item.value === value).id;
    changeRouterPath(id).then(() => {
      selectTranslationDropdownValueInner(value);
      changePersonsDropdownItems(prepareLettersDropdownItems(allLettersMetadata, value, letterType));
    });
  }

  // Dropdown 2
  function selectPersonDropdownValue(value) {
    const id = personsDropdownItems.find(item => item.value === value).id;
    changeRouterPath(id).then(() => {
      selectPersonDropdownValueInner(value);
      changeTranslationDropdownItems(prepareTranslationsDropdownItems(allLettersMetadata, value, letterType));
    });
  }  

  const draggableNoteBlockClass = classes.draggableNoteBlock + " " +
    (!draggableNoteBlockData.visible ? (classes.hidden + " ") : "");

  return <>
    <Container mb="xl">

      <CardWithTwoSelectors
        dropdown1={{
          label: "Оберіть переклад",
          data: translationsDropdownItems,
          selectedValue: selectedTranslationDropdownValue,
          onChange: selectTranslationDropdownValue
        }} 
        dropdown2={{
          label: "Оберіть лист",
          data: personsDropdownItems,
          selectedValue: selectedPersonDropdownValue,
          onChange: selectPersonDropdownValue
        }}
      />

      <Card p="md" mt="md" radius="md" withBorder={true} ref={root} className={classes.contentCard}>
        <Title ta={'center'} mt="0" mb="md" order={1}>{selectedMetadata.name}</Title>
        <Title ta={'center'} mt="0" mb="xl" order={2}>{"Лист № " + selectedMetadata.number}</Title>
        
          <Draggable 
            position={xy} 
            nodeRef={nodeRef} 
            onStop={onDraggableStop} 
            cancel={"."+classes.draggableNoteBlockInside}
          >
            <Card 
              className={draggableNoteBlockClass}
              id="draggable-notes-block"
              bg="blue.1"
              radius="md"
              withBorder={true}
              ref={nodeRef}
              p="xl"
              shadow="xs"
            >
                {draggableNoteBlockData.note ? <>
                
                  <Group position="apart" className={classes.draggableNoteBlockHeader}>
                    <Text p="lg" pb="xs" fw={500} span={true} className={classes.draggableNoteBlockLabel}>
                      Примітка {getNoteNumberUpperString(draggableNoteBlockData.note.noteNumber)}
                    </Text>
                    <Text p="lg" pb="xs" span={true} className={classes.draggableNoteBlockCrossIcon}
                      onClick={closeDraggableNotesBlock}
                    >
                      <IconX size={24}/>
                    </Text>
                  </Group>
                  <div className={classes.draggableNoteBlockInside}>
                    <SkovorodaTextContentBlockDesktop 
                      textContent={[draggableNoteBlockData.note]}
                      disableLeftNotesDisplaying={true} 
                      isMarginDisabled={true}
                    />
                  </div>
                
                </> : <></>}
            </Card>
          </Draggable>
        
        <SkovorodaTextContentBlockDesktop onTextNoteClick={onTextNoteClick} textContent={selectedLetter.letterContent} />
      </Card>
      
      {(selectedNotes && selectedNotes.length) ? <>
        <Title ta={'center'} mt="md" mb="md" order={2}>Примітки</Title>
        <SkovorodaTextContentBlockDesktop textContent={selectedNotes} />
      </> : <></>}

      <SkovorodaSourceBlockDesktop source={selectedLetterSource} mt="md" />

      <Title ta={'center'} mt="md" mb="md" order={2}>Від розробників сайту</Title>
      <SkovorodaFomattingInfoBlockDesktop mt="md" />
    </Container>
  </>;
}

// Auxiliary
function prepareLettersDropdownItems(allLettersMetadata, selectedTranlsatorName, letterType) {
  const set = new Set();
  const result = allLettersMetadata.filter(metadata => {
    if (metadata.translatorName != selectedTranlsatorName) {
      return false; // filter by translator name
    }
    const key = (letterType == "from" ? metadata.to : metadata.from) + metadata.number; // distinct by letter name and number
    if (set.has(key)) {
      return false;
    }
    set.add(key);
    return true;
  });
  set.clear();

  return result.map(letterMetadata => {
    return {
      value: newSelectedPersonValue(letterMetadata, letterType),
      label: letterMetadata.name + " - Лист № " + letterMetadata.number,
      id: letterMetadata.id,
      disabled: false,
    };
  });
}

// Auxiliary
function prepareTranslationsDropdownItems(allLettersMetadata, personDropdownValue, letterType) {
  
  // Original, Peleh, Uskalov
  // to-kovalynskii-2

  const result = allLettersMetadata
    .filter(metadata => newSelectedPersonValue(metadata, letterType) == personDropdownValue);

  allLettersMetadata.forEach(metadata => {
    if (result.some(translationMetadata => translationMetadata.translatorName == metadata.translatorName)) {
      return;
    }
    result.push(metadata);
  });

  return result.map(letterMetadata => {
    return {
      value: letterMetadata.translatorName,
      label: letterMetadata.translatorName,
      id: letterMetadata.id,
      disabled: false,
    };
  });
}

// Auxiliary
function newSelectedPersonValue(letterMetadata, letterType) {
  return (letterType == "from" ? letterMetadata.to : letterMetadata.from) + " - Лист № " + letterMetadata.number;
}
