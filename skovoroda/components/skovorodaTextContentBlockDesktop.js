import { createStyles } from "@mantine/core";
import Link from "next/link";
import { NOTES_NUMBERS_SYMBOLS_ARRAY, NOTES_NUMBERS_SYMBOLS_MAP } from "../lib/data/utils/readingTextsUtils";

const useStyles = createStyles((theme) => {

  const tabSize = 36; 
  const leftNumSpacing = 100;

  return {

    noteLink: {
      textDecoration: "none",
    },

    textContentBlock: {
      textAlign: "justify",
      position: "relative",
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
  
    formatItalic: {
      fontStyle: "italic",
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
    noteBlock: {
      marginBottom: theme.spacing.md,
    }

  };
});

export default function SkovorodaTextContentBlockDesktop({ textContent, ...others}) {

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
  };

  const block = [];
  textContent.forEach(lineObject => {
    const text = lineObject.text;
    let id = undefined;
    const formatClassName = lineObject.format ? formatClasses[lineObject.format] : formatClasses["default"];
    const normalClassName = formatClassName + " " + classes.blockTextLine + " " +
      (lineObject.isNoteBeginning ? classes.noteBlock : "");
    
    // Empty line
    if (!text || (!Array.isArray(text) && !text.trim())) {
      block.push(<p key={block.length} className={classes.emptyLine}></p>);
      return;
    }
    
    // Simple formatting
    if (!Array.isArray(text)) {
      if (lineObject.isNoteBeginning) {
        id = "note"+lineObject.noteNumber;
      }
      if (lineObject.isNoteBeginning && lineObject.noteNumber) {
        block.push(<span key={block.length} className={classes.noteInNotesBlock}>{getNoteNumberString(lineObject.noteNumber)}</span>);
      }
      if (lineObject.isEnterLine) {
        block.push(<p key={block.length} id={id} className={normalClassName}>{text}</p>);
      } else {
        block.push(<span key={block.length} id={id} className={normalClassName}>{text}</span>);
      }
      return;
    }

    // Multi formatting
    const spans = text.map((subText, index) => {

      const subTextText = subText.text;
      const noteNumber = lineObject.noteNumber ? lineObject.noteNumber : subText.noteNumber;

      if (index === 0 && lineObject.isNoteBeginning) {
        id = "note"+noteNumber;
      }

      const subFormatClassName = subText.format ? formatClasses[subText.format] : "";

      if (noteNumber && !lineObject.isNoteBeginning) {
        return <Link key={block.length} href={"#note"+noteNumber}>
          <a color="gray.9" className={classes.noteLink + " grayForText " + subFormatClassName}>{subTextText}</a>
        </Link>;
      }

      return <span key={index} className={subFormatClassName}>{subTextText}</span>;
    });
    if (lineObject.isNoteBeginning && lineObject.noteNumber) {
      block.push(<span key={block.length} className={classes.noteInNotesBlock}>{getNoteNumberString(lineObject.noteNumber)}</span>);
    }
    block.push(<span id={id} key={block.length} className={normalClassName}>{spans}</span>);
  });
  return <div className={classes.textContentBlock} {...others}>{block}</div>;
}

function getNoteNumberString(noteNumber) {
  return [...(""+noteNumber)].map(symbol => NOTES_NUMBERS_SYMBOLS_ARRAY[+symbol]).join("");
}