import Draggable from 'react-draggable';
import { IconX } from '@tabler/icons';
import { gsap } from "gsap/dist/gsap";
import { getNoteNumberUpperString } from '../lib/utils/notesNumbersSymbols';
import { cloneElement, useRef, useState } from 'react';
import { Card, Group, Text } from '@mantine/core';
import classes from './skovorodaDraggableNotesDesktop.module.scss';
import SkMetaTextView from './shared/skMetaTextView';

export default function SkovorodaDraggableNotesDesktop({ children, selectedNotes }) {

  const nodeRef = useRef(null);
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
    
    let moveToX = event.target.offsetLeft - draggableElement.clientWidth / 2;
    let moveToY = event.target.offsetTop - heightAfter - 20;
    
    const parentElement = event.target.offsetParent.offsetParent;
    if (parentElement.id !== "main-content") {
      moveToX += parentElement.offsetLeft;
      moveToY += (parentElement.offsetTop / 2) - 30;
    }

    const moveTo = {x: moveToX, y: moveToY};
    return moveTo;
  }

  function onTextNoteClick(event, noteNumber) {

    const wasVisible = draggableNoteBlockData.visible;
    const selectedNote = selectedNotes.find(note => getNoteNumberUpperString(note.noteNumber) == noteNumber);
    
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

  const draggableNoteBlockClass = classes.draggableNoteBlock + " " +
    (!draggableNoteBlockData.visible ? (classes.hidden + " ") : "");

  return <>
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
              <SkMetaTextView
                metaText={[draggableNoteBlockData.note]}
                otherArgs={{
                  disableLeftNotesDisplaying: true,
                  isMarginDisabled: true
                }}
              />
            </div>

          </> : <></>}
      </Card>
    </Draggable>
    {cloneElement(children, { onTextNoteClick: onTextNoteClick })}
  </>
}
