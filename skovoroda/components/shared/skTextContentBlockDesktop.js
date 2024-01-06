import { Card, Container, List } from "@mantine/core";
import Link from "next/link";
import { getNoteNumberString, getNoteNumberUpperString } from "../../lib/data/utils/notesNumbersSymbols";
import { gsap } from "gsap/dist/gsap";
import ScrollToPlugin from 'gsap/dist/ScrollToPlugin';
import classes from './skTextContentBlockDesktop.module.scss';

// const useStyles = createStyles((theme, params) => {

//   const isMobile = params.isMobile;
//   const tabSize = isMobile ? 12 : 36; 
//   const leftNumSpacing = 100;

//   return {

    
//   };
// });

export default function SkTextContentBlockDesktop({ textContent, onTextNoteClick, ...others}) {

  if (textContent && textContent.length && textContent[0].isAllIsList) {
    return <List listStyleType="circle">
      {textContent.map((lineObject, index) => {
        const key = "listItem"+index;
        return <List.Item key={key}>
          <SkTextContentBlockDesktop textContent={[{text:lineObject.text}]} {...others} onTextNoteClick={onTextNoteClick} />
        </List.Item> 
      })}
    </List>
  }

  if (textContent && !Array.isArray(textContent)) {
    return <div>
      <SkTextContentBlockDesktop textContent={textContent.beforeMain} others={others} onTextNoteClick={onTextNoteClick} />
      <Container size="fit-content">
        <Card p="0">
          <SkTextContentBlockDesktop textContent={textContent.main} others={others} onTextNoteClick={onTextNoteClick} />
        </Card>
      </Container>
      <SkTextContentBlockDesktop textContent={textContent.afterMain} others={others} onTextNoteClick={onTextNoteClick} />
    </div>
  }

  if (!textContent || !textContent.length) {
    return <></>;
  }

  const disableLeftNotesDisplaying = others.disableLeftNotesDisplaying;
  const isLeftNotesEnabled = !disableLeftNotesDisplaying;

  const plusClassName = others.plusClassName;
  const isMobile = others.isMobile;

  gsap.registerPlugin(ScrollToPlugin);
  
  function onBlockNoteClick(id) {
    gsap.to(window, {
      duration: 0.8, 
      scrollTo:{ y: "#" + id, offsetY: 24},
      ease: "power1.out",
    });
  }

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
    "indent": classes.formatIndent,
    "italic": classes.formatItalic,
    "underline": classes.formatUnderline,
    "bold": classes.formatBold,
  };

  const isNotesBlock = textContent.some(lineObject => lineObject.isNoteBeginning);

  const block = [];
  textContent.forEach(lineObject => {
    const text = lineObject.text;
    let id = undefined;
    let onClick = undefined;
    const formatClassName = lineObject.format ? formatClasses[lineObject.format] : formatClasses["default"];
    const vClassName = (others.isv2 ? classes.blockTextLineV2 
      : others.isv3 ? classes.blockTextLineV3 
      : classes.blockTextLine);
    const normalClassName = formatClassName + " " + vClassName + " " +
      ((lineObject.isNoteBeginning && !others.isMarginDisabled) ? (classes.noteBlockMarginBottom + " ") : "");

    
    // Empty line
    if (!text || (!Array.isArray(text) && !text.trim())) {
      block.push(<p key={block.length} className={classes.emptyLine}></p>);
      return;
    }
    
    // Simple formatting
    if (!Array.isArray(text)) {

      if (lineObject.noteNumber) {
        id = (lineObject.isNoteBeginning ? "note" : "noteInText") + getNoteNumberUpperString(lineObject.noteNumber);
      }
      if (lineObject.isNoteBeginning && lineObject.noteNumber && isLeftNotesEnabled) {
        pushNoteInNotesBlock(block, lineObject, classes, onBlockNoteClick);
      }

      const noteClassName = (lineObject.noteNumber && !lineObject.isNoteBeginning) 
        ? classes.cursorPointer
        : "";

      const totalClassName = `${normalClassName} ${noteClassName}`;

      if (lineObject.isEnterLine) {
        block.push(<p key={block.length} id={id} className={totalClassName}>{text}</p>);
      } else {
        block.push(<span key={block.length} id={id} className={totalClassName}>{text}</span>);
      }
      return;
    }

    // Multi formatting
    const spans = text.map((subText, index) => {

      const noteNumber = lineObject.noteNumber ? lineObject.noteNumber : subText.noteNumber;

      if (index === 0 && noteNumber) {
        id = (lineObject.isNoteBeginning ? "note" : "noteInText") + getNoteNumberUpperString(noteNumber);
      }
      const subFormatClassName = subText.format ? formatClasses[subText.format] : "";

      if (noteNumber && !lineObject.isNoteBeginning) {
        const subId = "noteInText" + getNoteNumberUpperString(noteNumber);

        // Note as a clickable text
        if (onTextNoteClick) {
          return <span 
            key={index}
            id={subId}
            color="gray.9"
            onClick={(event) => onTextNoteClick(event, noteNumber)}
            className={classes.noteLink + " grayForText " + subFormatClassName + " " + classes.cursorPointer}
          >
            {subText.text}
          </span>
        }

        // Note as a Link
        return <Link key={index} href={"#note"+getNoteNumberUpperString(noteNumber)} id={subId} color="gray.9" className={classes.noteLink + " grayForText " + subFormatClassName + " " + classes.noteFont} title={`Примітка ${noteNumber}`}>
          {subText.text}
        </Link>;
      }

      const sourceId = lineObject.sourceId ? lineObject.sourceId : subText.sourceId;
      if (sourceId) {
        const htmlSourceId = "sourceIdInText" + sourceId;

        // Source as a Link
        return <Link key={index} href={"#sourceId"+sourceId} id={htmlSourceId} color="blue.9" className={classes.noteLink + " " + subFormatClassName} title={`Джерело: ${sourceId}}`}>
          {subText.text}
        </Link>;
      }

      // Normal Text
      return <span key={index} className={subFormatClassName} onClick={onClick}>{subText.text}</span>;
    });
    if (lineObject.isNoteBeginning && lineObject.noteNumber && isLeftNotesEnabled) {
      pushNoteInNotesBlock(block, lineObject, classes, onBlockNoteClick);
    }
    block.push(<span id={id} key={block.length} className={normalClassName}>{spans}</span>);
  });

  const allContentClassName = (isMobile ? classes.textContentBlockMobile : classes.textContentBlock) + 
    (plusClassName ? ` ${plusClassName} ` : "") +
    ((isLeftNotesEnabled && isNotesBlock) ? ` ${classes.textContentBlockLeftNotesEnabled} ` : "");

  return <div className={allContentClassName}>{block}</div>;
}

function pushNoteInNotesBlock(block, lineObject, classes, onBlockNoteClick) {
  
  const isLinkVersion = false;
  if (!isLinkVersion) {
    const id = "noteInText"+getNoteNumberUpperString(lineObject.noteNumber);
    block.push(
      <span 
        key={block.length} 
        color="gray.9"
        onClick={() => onBlockNoteClick(id)} 
        className={classes.noteInNotesBlock + " " + classes.noteLink + " grayForText " + classes.noteFont}
      >
        {getNoteNumberString(lineObject.noteNumber)}
      </span>
    );
    return;
  }

  block.push(
    <Link key={block.length} href={"#noteInText"+getNoteNumberUpperString(lineObject.noteNumber)} color="gray.9" className={classes.noteInNotesBlock + " " + classes.noteLink + " grayForText " + classes.noteFont} title={`Примітка ${noteNumber}`}>
      {getNoteNumberString(lineObject.noteNumber)}
    </Link>
  );
}
