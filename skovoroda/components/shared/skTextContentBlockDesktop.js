import { Card, Container, List, Title } from "@mantine/core";
import Link from "next/link";
import { getNoteNumberString, getNoteNumberUpperString } from "../../lib/data/utils/notesNumbersSymbols";
import { gsap } from "gsap/dist/gsap";
import ScrollToPlugin from 'gsap/dist/ScrollToPlugin';
import classes from './skTextContentBlockDesktop.module.scss';
import SkH2Mobile from "./skH2Mobile";
import SkH2Desktop from "./skH2Desktop";
import { readableFontClassName } from "../functions/robotoFont";
import SkTextLink from "./skTextLink";
import SkBibleText from "./skBibleText";
import SkOldUaExplainedText from "./skOldUaExplainedText";
import SkFountain from "./skFountain";

export default function SkTextContentBlockDesktop({ textContent, onTextNoteClick, ...others}) {

  // LEGACY {
  if (others.isNotes) {
    others.isv3 = true;
  }
  const isSkipEmptyLines = others.isNotes;
  // LEGACY }
  
  // TECHNICAL {
  const keyPrefix = others.keyPrefix ? others.keyPrefix : "k";
  var lastKey = 0;
  function newKey() {
    lastKey++;
    return keyPrefix + lastKey;
  }
  // TECHNICAL }
    
  if (textContent && textContent.length && textContent[0].isAllIsList) {
    return <List listStyleType="circle">
      {textContent.map(lineObject => {
        return <List.Item key={newKey()}>
          <SkTextContentBlockDesktop 
            key={newKey()}
            textContent={[{text:lineObject.text}]}
            keyPrefix={newKey()}
            {...others}
            onTextNoteClick={onTextNoteClick} />
        </List.Item> 
      })}
    </List>
  }

  if (textContent && !Array.isArray(textContent)) {
    return <div key={newKey()}>
      <SkTextContentBlockDesktop key={newKey()} textContent={textContent.beforeMain} others={others} onTextNoteClick={onTextNoteClick} />
      <Container size="fit-content" key={newKey()}>
        <Card p="0">
          <SkTextContentBlockDesktop key={newKey()} textContent={textContent.main} others={others} onTextNoteClick={onTextNoteClick} />
        </Card>
      </Container>
      <SkTextContentBlockDesktop key={newKey()} textContent={textContent.afterMain} others={others} onTextNoteClick={onTextNoteClick} />
    </div>
  }

  if (!textContent || !textContent.length) {
    return <></>;
  }

  const disableLeftNotesDisplaying = others.disableLeftNotesDisplaying;
  const isLeftNotesEnabled = !disableLeftNotesDisplaying;

  const plusClassName = others.plusClassName;
  const isMobile = others.isMobile;
  if (others.justify !== false) {
    others.justify = true;
  }
  const isJustifyEnabled = others.justify;

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
    "default": "", // classes.formatDefault, // Optimization: no need to add default class every time
    "indent": classes.formatIndent,
    "italic": classes.formatItalic,
    "underline": classes.formatUnderline,
    "bold": classes.formatBold,
    "header2": classes.formatHeader2,
    "header3": classes.formatHeader3,
    "header4": classes.formatHeader3,
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
      if (!isSkipEmptyLines) {
        block.push(<p key={newKey()} className={classes.emptyLine}></p>);
      }
      return;
    }

    // Fountain
    if (text && text.length && !Array.isArray(text) && text.trim() === "[FOUNTAIN]") {
      console.log("Fountain detected in textContentBlockDesktop");
      block.push(
        <SkFountain key={newKey()} isMobile={isMobile} />
      );
      return;
    }

    // H2
    if (lineObject.format === "header2") {
      if (isMobile) {
        block.push(
          <SkH2Mobile key={newKey()} mt="md" mb="md" text={lineObject.text}/>
        );
      } else {
        block.push(
          <SkH2Desktop key={newKey()} mt="md" mb="md" text={lineObject.text}/>
        );
      }
      return;
    }

    // H3
    if (lineObject.format === "header3") {
      block.push(
        <Title order={3} key={newKey()} mt="md" mb="md" ta={'center'}>{lineObject.text}</Title>
      );
      return;
    }

    // H4
    if (lineObject.format === "header4") {
      block.push(
        <Title order={4} key={newKey()} mt="md" mb="md" ta={'center'}>{lineObject.text}</Title>
      );
      return;
    }

    // Handle links
    if (lineObject.isLink) {
      block.push(<SkTextLink
        key={newKey()} 
        text={lineObject.text}
        href={lineObject.url}
        isBlank={true}
        title={lineObject.text}
      />)
      return;
    }

    // Handle Bible Text
    if (lineObject.bibleCode) {
      block.push(newBibleElement(lineObject, newKey()));
      return;
    }

    // Handle OldUa Text
    if (lineObject.explanations) {
      block.push(newOldUaElement(lineObject, newKey()));
      return;
    }
    
    // Simple formatting
    if (!Array.isArray(text)) {

      if (lineObject.noteNumber) {
        id = (lineObject.isNoteBeginning ? "note" : "noteInText") + getNoteNumberUpperString(lineObject.noteNumber);
      }
      if (lineObject.isNoteBeginning && lineObject.noteNumber && isLeftNotesEnabled) {
        pushNoteInNotesBlock(block, lineObject, classes, onBlockNoteClick, newKey());
      }

      const noteClassName = (lineObject.noteNumber && !lineObject.isNoteBeginning) 
        ? classes.cursorPointer
        : "";

      const totalClassName = `${normalClassName} ${noteClassName}`;

      if (lineObject.isEnterLine) {
        block.push(<p key={newKey()} id={id} className={totalClassName}>{text}</p>);
      } else {
        block.push(<span key={newKey()} id={id} className={totalClassName}>{text}</span>);
      }
      return;
    }

    // Multi formatting
    const spans = text.map((subText, index) => {

      const noteNumber = lineObject.noteNumber ? lineObject.noteNumber : subText.noteNumber;

      if (index === 0 && noteNumber) {
        id = (lineObject.isNoteBeginning ? "note" : "noteInText") + getNoteNumberUpperString(noteNumber);
      }
      const subFormatClassName = (subText.format && formatClasses[subText.format]) ? formatClasses[subText.format] : "";

      if (noteNumber && !lineObject.isNoteBeginning) {
        const subId = "noteInText" + getNoteNumberUpperString(noteNumber);

        // Note as a clickable text
        if (onTextNoteClick) {
          return <span 
            key={newKey()}
            id={subId}
            color="gray.9"
            onClick={(event) => onTextNoteClick(event, noteNumber)}
            className={classes.noteLink + " grayForText " + subFormatClassName + " " + classes.cursorPointer}
          >
            {subText.text}
          </span>
        }

        // Note as a Link
        return <Link key={newKey()} href={"#note"+getNoteNumberUpperString(noteNumber)} id={subId} color="gray.9" className={classes.noteLink + " grayForText " + subFormatClassName + " " + classes.noteFont} title={`Примітка ${noteNumber}`}>
          {subText.text}
        </Link>;
      }

      const sourceId = lineObject.sourceId ? lineObject.sourceId : subText.sourceId;
      if (sourceId) {
        const htmlSourceId = "sourceIdInText" + sourceId;

        // Source as a Link
        return <Link key={newKey()} href={"#sourceId"+sourceId} id={htmlSourceId} color="blue.9" className={classes.noteLink + " " + subFormatClassName} title={`Джерело: ${sourceId}}`}>
          {subText.text}
        </Link>;
      }

      // Handle links
      if (subText.isLink) {
        // console.log("Link Text2:", subText.url, subText.text);
        return <SkTextLink
          key={newKey()}
          text={subText.text}
          href={subText.url}
          isBlank={true}
          title={subText.text}
        />;
      }

      // Handle Bible Text
      if (subText.bibleCode) {
        return newBibleElement(subText, newKey());
      }

      // Handle OldUa Text
      if (subText.explanations) {
        return newOldUaElement(subText, newKey());
      }

      // Normal Text
      return <span key={newKey()} className={subFormatClassName} onClick={onClick}>{subText.text}</span>;
    });
    if (lineObject.isNoteBeginning && lineObject.noteNumber && isLeftNotesEnabled) {
      pushNoteInNotesBlock(block, lineObject, classes, onBlockNoteClick, newKey());
    }
    block.push(<span id={id} key={newKey()} className={normalClassName}>{spans}</span>);
  });

  const allContentClassName = (isMobile ? classes.textContentBlockMobile : classes.textContentBlock) + 
    (plusClassName ? ` ${plusClassName} ` : "") +
    ((isLeftNotesEnabled && isNotesBlock) ? ` ${classes.textContentBlockLeftNotesEnabled} ` : "") +
    (!isMobile && isJustifyEnabled ? ` ${classes.textContentBlockJustify} ` : "") +
    (` ${readableFontClassName} `);

  return <div key={newKey()} className={allContentClassName}>{block}</div>;
}

function newOldUaElement(lineObject, key) {
  return <SkOldUaExplainedText explanations={lineObject.explanations} text={lineObject.text} skKey={key} />;
}

function newBibleElement(lineObject, key) {
  return <SkBibleText bibleCode={lineObject.bibleCode} bibleType={lineObject.bibleType} text={lineObject.text} bKey={key} translation={lineObject.translation} />;
}

function pushNoteInNotesBlock(block, lineObject, classes, onBlockNoteClick, key) {
  
  const isLinkVersion = false;
  if (!isLinkVersion) {
    const id = "noteInText"+getNoteNumberUpperString(lineObject.noteNumber);
    block.push(
      <span 
        key={key} 
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
    <Link key={key} href={"#noteInText"+getNoteNumberUpperString(lineObject.noteNumber)} color="gray.9" className={classes.noteInNotesBlock + " " + classes.noteLink + " grayForText " + classes.noteFont} title={`Примітка ${noteNumber}`}>
      {getNoteNumberString(lineObject.noteNumber)}
    </Link>
  );
}
