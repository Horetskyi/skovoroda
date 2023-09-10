import { Card, Container, createStyles } from "@mantine/core";
import Link from "next/link";
import { getNoteNumberString, getNoteNumberUpperString } from "../../lib/data/utils/notesNumbersSymbols";
import { gsap } from "gsap/dist/gsap";
import ScrollToPlugin from 'gsap/dist/ScrollToPlugin';

const useStyles = createStyles((theme) => {

  const tabSize = 36; 
  const leftNumSpacing = 100;

  return {

    noteFont: {
      fontFamily: 'Nonito',
    },

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
    textContentBlockMobile: {
      textAlign: "left",
      position: "relative",
      height: "inherit",
    },

    textContentBlockLeftNotesEnabled: {
      marginLeft: theme.spacing.lg,
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
    blockTextLineV2: {
      display: 'block',
      marginTop: 0,
      marginBottom: 0,
      fontWeight: 300,
      fontSize: "20px",
      lineHeight: "24px",
      letterSpacing: "0.02em",
      textIndent: theme.spacing.md,
    
      "&:first-of-type": {
        textIndent: 0,
      },
    },
    blockTextLineV3: {
      display: 'block',
      marginTop: 0,
      marginBottom: 0,
      fontWeight: 300,
      fontSize: "20px",
      lineHeight: "24px",
      letterSpacing: "0.02em",
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
      fontSize: "24px",
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
      marginTop: "-6px",
      marginRight: theme.spacing.sm,
      cursor: "pointer",
      fontWeight: 400,
    },
    noteBlockMarginBottom: {
      marginBottom: theme.spacing.md,
    },

  };
});

export default function SkTextContentBlockDesktop({ textContent, onTextNoteClick, ...others}) {

  const { classes } = useStyles();

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
          <a id={subId} color="gray.9" className={classes.noteLink + " grayForText " + subFormatClassName + " " + classes.noteFont} title={`Примітка ${noteNumber}`}>{subText.text}</a>
        </Link>;
      }
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
    <Link key={block.length} href={"#noteInText"+getNoteNumberUpperString(lineObject.noteNumber)}>
      <a color="gray.9" className={classes.noteInNotesBlock + " " + classes.noteLink + " grayForText " + classes.noteFont} title={`Примітка ${noteNumber}`}>
        {getNoteNumberString(lineObject.noteNumber)}
      </a>
    </Link>
  );
}
