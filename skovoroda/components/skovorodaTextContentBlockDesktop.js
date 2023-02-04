import { Card, Container, createStyles } from "@mantine/core";
import Link from "next/link";
import { getNoteNumberString, getNoteNumberUpperString } from "../lib/data/utils/notesNumbersSymbols";

const useStyles = createStyles((theme) => {

  const tabSize = 36; 
  const leftNumSpacing = 100;

  return {

    noteLink: {
      textDecoration: "none",
    },
    cursorPointer: {
      cursor: 'pointer',
    },

    textContentBlock: {
      textAlign: "justify",
      position: "relative",
      height: "inherit",
    },

    emptyLine: {
      height: "32px",
      margin: "0",
    },
    blockTextLine: {
      display: 'block',
      fontSize: theme.fontSizes.md,
      marginTop: 0,
      marginBottom: 0,
      lineHeight: "32px",
    },
  
    formatUnderline: {
      textDecoration: "underline"
    },
    formatItalic: {
      fontStyle: "italic",
    },
    formatBold: {
      fontWeight: "600",
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
    formatIndent: {
      textIndent: `${tabSize}px`,
    },
    noteInNotesBlock: {
      position: 'absolute',
      right: "100%",
      marginTop: "2px",
      marginRight: theme.spacing.xs,
    },
    noteBlockMarginBottom: {
      marginBottom: theme.spacing.md,
    },

  };
});

export default function SkovorodaTextContentBlockDesktop({ textContent, onTextNoteClick, ...others}) {

  if (textContent && !Array.isArray(textContent)) {
    return <>
      <SkovorodaTextContentBlockDesktop textContent={textContent.beforeMain} others={others} onTextNoteClick={onTextNoteClick} />
      <Container size="fit-content">
        <Card p="0">
          <SkovorodaTextContentBlockDesktop textContent={textContent.main} others={others} onTextNoteClick={onTextNoteClick} />
        </Card>
      </Container>
      <SkovorodaTextContentBlockDesktop textContent={textContent.afterMain} others={others} onTextNoteClick={onTextNoteClick} />
    </>
  }

  if (!textContent || !textContent.length) {
    return <></>;
  }

  const disableLeftNotesDisplaying = others.disableLeftNotesDisplaying;
  const isLeftNotesEnabled = !disableLeftNotesDisplaying;

  const plusClassName = others.plusClassName;

  const { classes } = useStyles();

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

  const block = [];
  textContent.forEach(lineObject => {
    const text = lineObject.text;
    let id = undefined;
    let onClick = undefined;
    const formatClassName = lineObject.format ? formatClasses[lineObject.format] : formatClasses["default"];
    const normalClassName = formatClassName + " " + classes.blockTextLine + " " +
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
        pushNoteInNotesBlock(block, lineObject, classes);
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

        return <Link key={index} href={"#note"+getNoteNumberUpperString(noteNumber)}>
          <a id={subId} color="gray.9" className={classes.noteLink + " grayForText " + subFormatClassName}>{subText.text}</a>
        </Link>;
      }
      return <span key={index} className={subFormatClassName} onClick={onClick}>{subText.text}</span>;
    });
    if (lineObject.isNoteBeginning && lineObject.noteNumber && isLeftNotesEnabled) {
      pushNoteInNotesBlock(block, lineObject, classes);
    }
    block.push(<span id={id} key={block.length} className={normalClassName}>{spans}</span>);
  });
  return <div className={classes.textContentBlock + (plusClassName ? ` ${plusClassName}` : "")} {...others}>{block}</div>;
}

function pushNoteInNotesBlock(block, lineObject, classes) {
  block.push(
    <Link key={block.length} href={"#noteInText"+getNoteNumberUpperString(lineObject.noteNumber)}>
      <a color="gray.9" className={classes.noteInNotesBlock + " " + classes.noteLink + " grayForText"}>
        {getNoteNumberString(lineObject.noteNumber)}
      </a>
    </Link>
  );
}
