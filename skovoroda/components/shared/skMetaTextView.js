import { Card, Container, List, Title } from "@mantine/core";
import Link from "next/link";
import { getNoteNumberString, getNoteNumberUpperString } from "../../lib/utils/notesNumbersSymbols";
import SkH2Mobile from "./skH2Mobile";
import SkH2Desktop from "./skH2Desktop";
import SkTextLink from "./skTextLink";
import dynamic from 'next/dynamic';

const SkBibleText = dynamic(() => import('./skBibleText'), { ssr: true });
const SkOldUaExplainedText = dynamic(() => import('./skOldUaExplainedText'), { ssr: true });
const SkFountain = dynamic(() => import('./skFountain'), { ssr: false });
import { metaTextSomeLinePiece } from "../../lib/metaTextUsages/metaTextUsageUtils";
import addOrderedNumbersToMetaText from "../../lib/metaTextUsages/addOrderedNumbersToMetaText";
import { parseBibleCode } from "../../lib/shared/bible";
import classes from './skMetaTextView.module.scss';
import { getCharacterPath } from "../../lib/skovorodaPath";

const neverCombineClasses = [
  classes.formatTabs6,
  classes.formatTabs5,
  classes.formatTabs4,
  classes.formatTabs3,
  classes.formatTabs2,
  classes.formatTabs1,
];

async function onNoteClick(id) {
  const { gsap } = await import('gsap/dist/gsap');
  const ScrollToPlugin = (await import('gsap/dist/ScrollToPlugin')).default;
  gsap.registerPlugin(ScrollToPlugin);
  gsap.to(window, {
    duration: 0.5, 
    scrollTo:{ y: "#" + id, offsetY: 24},
    ease: "power1.out",
  });
}

export default function SkMetaTextView({ metaText, otherArgs, isMobile, isNotes }) {
  if (!metaText) return null;
  if (Array.isArray(metaText)) {
    metaText = {
      meta: {},
      lines: metaText
    };
  }
  if (!metaText || !metaText.lines || !metaText.lines.length) return null;

  addOrderedNumbersToMetaText(metaText);

  // LEGACY {
  if (!otherArgs) otherArgs = {};
  if (otherArgs.isNotes) otherArgs.isv3 = true;
  // LEGACY }
  
  // PARAMETERS {
  const disableLeftNotesDisplaying = otherArgs.disableLeftNotesDisplaying;
  const isLeftNotesEnabled = !disableLeftNotesDisplaying;
  const plusClassName = otherArgs.plusClassName;
  if (otherArgs.justify !== false) otherArgs.justify = true;
  const isJustifyEnabled = otherArgs.justify;
  const isNotesBlock = metaTextSomeLinePiece(metaText, piece => piece.isNoteBeginning);
  // PARAMETERS }

  // FORMAT {
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
    "default": "", 
    "indent": classes.formatIndent,
    "italic": classes.formatItalic,
    "i": classes.formatItalic,
    "underline": classes.formatUnderline,
    "u": classes.formatUnderline,
    "bold": classes.formatBold,
    "b": classes.formatBold,
    "header2": classes.formatHeader2,
    "header3": classes.formatHeader3,
    "header4": classes.formatHeader3,
  };
  const solveFormatClassName = (format, shouldExcludeNeverCombineClass) => {
    if (!format) return "";
    if (!Array.isArray(format)) format = [format];
    var classNames = format.map(f => {
      if (isMobile) {
        if (f === "tabs2") f = "tabs1";
        if (f === "tabs3") f = "tabs1";
        if (f === "tabs4") f = "tabs1";
        if (f === "tabs5") f = "tabs1";
        if (f === "tabs6") f = "tabs1";
      }
      return (f && formatClasses[f]) ? formatClasses[f] : "";
    }).filter(className => className);
    if (shouldExcludeNeverCombineClass) {
      classNames = classNames.filter(className => !neverCombineClasses.includes(className));
    }
    if (!classNames.length) return '';
    const resultFormatClassName = classNames.join(' ');
    return resultFormatClassName;
  }
  function solvePieceFormatClassName(piece, shouldExcludeNeverCombineClass) {
    if (!piece) return '';
    if (!piece.meta) return '';
    if (piece.meta.f) return solveFormatClassName(piece.meta.f, shouldExcludeNeverCombineClass);
    if (piece.meta.format) return solveFormatClassName(piece.meta.format, shouldExcludeNeverCombineClass);
    return '';
  }
  function getNormalClassName(piece) {

    const formatClassName = solvePieceFormatClassName(piece);
    
    const vClassName = (otherArgs.isv2 ? classes.blockTextLineV2 
      : otherArgs.isv3 ? classes.blockTextLineV3 
      : classes.blockTextLine);
    
      const isThisPieceNoteBeginning = piece && piece.meta && piece.meta.isNoteBeginning;

    const normalClassName = formatClassName + " " + vClassName + " " +
      ((isThisPieceNoteBeginning && !otherArgs.isMarginDisabled) ? (classes.noteBlockMarginBottom + " ") : "");
    
      return normalClassName;
  }
  // FORMAT }
    
  // ALL IS LIST {
  if (metaText.meta && metaText.meta.isAllIsList) {
    return <List listStyleType="circle" className="readFont">
      {metaText.lines.map((line,index) => {
        return <List.Item key={line.n}>
          <SkMetaTextLine 
            key={line.n}
            line={line} 
            otherArgs={otherArgs} 
            index={index}
            getNormalClassName={getNormalClassName}
            solvePieceFormatClassName={solvePieceFormatClassName}
            isMobile={isMobile}
          />
        </List.Item> 
      })}
    </List>
  }
  // ALL IS LIST }

  const allContentClassName = (isMobile ? (isNotes ? classes.textContentBlockMobileNotes : classes.textContentBlockMobile) : classes.textContentBlock) + 
    (plusClassName ? ` ${plusClassName} ` : "") +
    ((isLeftNotesEnabled && isNotesBlock) ? ` ${classes.textContentBlockLeftNotesEnabled} ` : "") +
    (!isMobile && isJustifyEnabled ? ` normalContentText_justify ` : "") +
    (` readFont `);

  const beforeMainSectionNodes = [];
  const mainSectionNodes = [];
  const afterMainSectionNodes = [];

  var isMainSectionWas = false;
  var isMainSectionNow = false;
  metaText.lines.forEach((line,index) => {
    if (line === "MAIN_SECTION_BEGIN") {
      isMainSectionNow = true;
      isMainSectionWas = true;
      return;
    }
    if (line === "MAIN_SECTION_END") {
      isMainSectionNow = false;
      return;
    }
    const lineNode = <SkMetaTextLine 
      key={line.n}
      line={line}
      otherArgs={otherArgs}
      getNormalClassName={getNormalClassName}
      solvePieceFormatClassName={solvePieceFormatClassName}
      index={index}
      isMobile={isMobile}
      isNotes={isNotes}
    />;
    if (!lineNode) return;
    if (isMainSectionNow) {
      mainSectionNodes.push(lineNode);
    } else if (isMainSectionWas && !isMainSectionNow) {
      afterMainSectionNodes.push(lineNode);
    } else {
      beforeMainSectionNodes.push(lineNode);
    }
  });

  if (!mainSectionNodes.length) {
    if (!beforeMainSectionNodes.length) return null;
    return <div key="metaTextView" className={allContentClassName}>{beforeMainSectionNodes}</div>;
  }

  return <div key="metaTextView" 
    className={`normalContentText normalContentText_withoutIndent ${!isMobile && !isNotes ? 'w_100' : ''}`}>
    {beforeMainSectionNodes.length ? <div key="beforeMainSection" className={allContentClassName}>{beforeMainSectionNodes}</div> : null}
    {mainSectionNodes.length ? <>
      <Container size="fit-content" key={"mainSection"} p={isMobile ? 0 : undefined} w={'fit-content'}>
        <Card p="0">
          <div className={allContentClassName}>{mainSectionNodes}</div>
        </Card>
      </Container>
    </> : null}
    {afterMainSectionNodes.length ? <div key="afterMainSection" className={allContentClassName}>{afterMainSectionNodes}</div> : null}
  </div>
}

function SkMetaTextLinePiece({ piece, solvePieceFormatClassName, index, isMobile, prevPieceFormatClassName, shouldExcludeNeverCombineClass }) {

  // PARAMETERS {
  const isIncludesNeverCombineClass = prevPieceFormatClassName && neverCombineClasses.some(c => prevPieceFormatClassName.includes(c));
  const pieceFormatClassName = solvePieceFormatClassName(piece, isIncludesNeverCombineClass || shouldExcludeNeverCombineClass);
  // PARAMETERS }

  // NESTING {
  if (piece.innerParsedTextArray && piece.innerParsedTextArray.length) {
    const innerElement = <span key={piece.text + index} className={pieceFormatClassName}>
      {piece.innerParsedTextArray.map((subPiece, subIndex) => {
        return <SkMetaTextLinePiece
          key={subPiece.n}
          piece={subPiece}
          solvePieceFormatClassName={solvePieceFormatClassName}
          index={(piece.text) + index + (subIndex * 1000)}
          isMobile={isMobile}
          prevPieceFormatClassName={pieceFormatClassName}
          shouldExcludeNeverCombineClass={shouldExcludeNeverCombineClass}
        />;
      })}
    </span>;
    if (piece.meta && piece.meta.bible) {
      return newBibleElement(piece, pieceFormatClassName, innerElement)
    }
    return innerElement;
  }
  // NESTING } 

  // ELEMENTS/HEADERS {
  if (piece.meta && (piece.meta.f === "header2" || piece.meta.f === "h2" || piece.meta.el === 'h2')) {
    if (isMobile) return <SkH2Mobile key={piece.n} mt="md" mb="md" text={piece.text}/>;
    return <SkH2Desktop key={piece.n} mt="md" mb="md" text={piece.text}/>;
  }
  if (piece.meta && (piece.meta.f === "header3" || piece.meta.f === "h3" || piece.meta.el === 'h3')) {
    return <Title order={3} key={piece.n} mt="md" mb="md" ta={'center'}>{piece.text}</Title>;
  }
  if (piece.meta && (piece.meta.f === "header4" || piece.meta.f === "h4" || piece.meta.el === 'h4')) {
    return <Title order={4} key={piece.n} mt="md" mb="md" ta={'center'}>{piece.text}</Title>;
  }
  // ELEMENTS/HEADERS }

  // LINK:
  if (piece.meta && piece.meta.link) {
    return <SkTextLink  
      key={piece.n}
      text={piece.text}
      href={piece.meta.link}
      isBlank={true}
      title={piece.text}
    />;
  }
  
  // CHARACTER LINK:
  if (piece.meta && piece.meta.character) {
    const characterUrlId = piece.meta.character;
    const characterPath = getCharacterPath(characterUrlId);
    return <SkTextLink  
      key={piece.n}
      text={piece.text}
      href={characterPath}
      isBlank={true}
      title={piece.text}
    />;
  }

  // BIBLE VERSE:
  if (piece.meta && piece.meta.bible) return newBibleElement(piece, pieceFormatClassName); 

  // OLD UA DICTIONARY:
  if (piece.meta && piece.meta.explanations) return newOldUaElement(piece, pieceFormatClassName); // TODO Formatting?

  // NOTE IN TEXT:
  if (piece.meta && !piece.meta.isNoteBeginning && piece.meta.noteNumber) {
    return newNoteInText(piece, solvePieceFormatClassName);
  }

  // SOURCE ID IN TEXT
  const sourceIdInText = newSourceIdInText(piece, pieceFormatClassName);
  if (sourceIdInText) return sourceIdInText;

  // FORMATTED TEXT:
  if (piece.text && piece.text.length) {
    return <span key={piece.n} className={pieceFormatClassName}>{piece.text}</span>;
  }
  return null;
}

function SkMetaTextLine({ 
  line, 
  otherArgs, 
  solvePieceFormatClassName, 
  getNormalClassName, 
  index,
  isMobile
}) {

  // PARAMETERS {
  const lineIndex = index;
  const isSkipEmptyLines = otherArgs.isNotes;
  const disableLeftNotesDisplaying = otherArgs.disableLeftNotesDisplaying ? true : false;
  const isLeftNotesEnabled = !disableLeftNotesDisplaying;
  // PARAMETERS }

  // EMPTY LINE {
  const isEmptyLine = !line || line === "EMPTY_LINE" || line.length === 0; // TODO: trim everything
  if (isEmptyLine) {
    if (isSkipEmptyLines) return null;
    return <p key={"EMPTY_LINE_"+index} className={classes.emptyLine}></p>;
  }
  // EMPTY LINE } 

  // FOUNTAIN {
  if (line === "FOUNTAIN") {
    return <SkFountain key={"FOUNTAIN_"+index} isMobile={isMobile} />;
  }
  // FOUNTAIN }

  if (!Array.isArray(line)) line = [line];

  const normalClassName = ((line.length === 1) || (line.length && line[0] && line[0].meta && line[0].meta.isNoteBeginning)) ? getNormalClassName(line[0]) : getNormalClassName();
  const isIncludesNeverCombineClass = normalClassName && neverCombineClasses.some(c => normalClassName.includes(c));

  const lineNodes = line.map((piece, index) => {
    return <SkMetaTextLinePiece
      key={piece.n}
      piece={piece}
      solvePieceFormatClassName={solvePieceFormatClassName}
      index={(lineIndex * 1000) + index}
      isMobile={isMobile}
      shouldExcludeNeverCombineClass={isIncludesNeverCombineClass}
    />;
  }).filter(pieceNode => pieceNode);
  if (!lineNodes.length) return null;


  // NOTE IN NOTES BLOCK:
  var noteInBlock = null;
  const firstPiece = line[0];
  if (firstPiece.meta && firstPiece.meta.isNoteBeginning && firstPiece.meta.noteNumber && isLeftNotesEnabled) {
    noteInBlock = newNoteInNotesBlock(firstPiece);
  }

  return <p key={line[0].n} className={normalClassName}>{noteInBlock}{lineNodes}</p>;
}

function newOldUaElement(piece, pieceFormatClassName) {
  return <SkOldUaExplainedText 
    key={piece.n} 
    text={piece.text} 
    explanations={piece.meta.explanations} 
    additionalClassName={pieceFormatClassName}
  />;
}

function newBibleElement(piece, pieceFormatClassName, inner) {
  const parsedBibleCode = parseBibleCode(piece.meta.bible);
  return <SkBibleText 
    key={piece.n} 
    text={inner || piece.text} 
    parsedBibleCode={parsedBibleCode} 
    translation={piece.meta.translation}
    additionalClassName={pieceFormatClassName}
  />;
}

function newNoteInNotesBlock(piece) {
  
  if (!piece || !piece.meta || !piece.meta.noteNumber) return null;

  const isLinkVersion = false;
  const noteNumber = piece.meta.noteNumber;
  const noteInTextId = "noteInText"+getNoteNumberUpperString(noteNumber);
  const noteInBlockId = "noteInBlock"+getNoteNumberUpperString(noteNumber);

  if (!isLinkVersion) {

    // GSAP SCROLL VERSION:
    return <span 
      key={piece.n}
      id={noteInBlockId} 
      color="gray.9"
      onClick={() => onNoteClick(noteInTextId)} 
      className={classes.noteInNotesBlock + " " + classes.noteLink + " grayForText " + classes.noteFont}
    >
      {getNoteNumberString(noteNumber)}
    </span>;
  }

  // LINK VERSION:
  return <Link 
    key={piece.n} 
    id={noteInBlockId} 
    href={"#noteInText"+getNoteNumberUpperString(noteNumber)} 
    color="gray.9" 
    className={classes.noteInNotesBlock + " " + classes.noteLink + " grayForText " + classes.noteFont} 
    title={`Примітка ${noteNumber}`}
  >
    {getNoteNumberString(noteNumber)}
  </Link>;
}

function newNoteInText(piece, pieceFormatClassName) {

  const noteNumber = (piece && piece.meta && piece.meta.noteNumber) ? piece.meta.noteNumber : null;
  const isNoteBeginning = piece && piece.meta && piece.meta.isNoteBeginning;
  if (!noteNumber || isNoteBeginning) return null;

  const noteInTextId = "noteInText" + getNoteNumberUpperString(noteNumber);
  const noteInBlockId = "noteInBlock" + getNoteNumberUpperString(noteNumber);
  const isLinkVersion = false;

  // GSAP SCROLL VERSION:
  if (!isLinkVersion) {
    return <span 
      key={piece.n}
      id={noteInTextId}
      color="gray.9"
      onClick={() => onNoteClick(noteInBlockId)}
      className={classes.noteLink + " grayForText " + pieceFormatClassName + " " + classes.cursorPointer}
    >
      {piece.text}
    </span>;
  }

  // LINK VERSION:
  return <Link 
    key={piece.n} 
    href={"#noteInBlock"+getNoteNumberUpperString(noteNumber)} 
    id={noteInTextId} 
    color="gray.9" 
    className={classes.noteLink + " grayForText " + pieceFormatClassName + " " + classes.noteFont} 
    title={`Примітка ${noteNumber}`}>
    {piece.text}
  </Link>;
}

function newSourceIdInText(piece, pieceFormatClassName) {

  if (!piece || !piece.meta || !piece.meta.sourceId) return null;

  const sourceId = piece.meta.sourceId;
  const sourceIdInText = "sourceIdInText" + sourceId;
  const sourceIdInBlock = "sourceIdInBlock" + sourceId;
  const isLinkVersion = false;

  // GSAP SCROLL VERSION:
  if (!isLinkVersion) {
    return <span 
      key={piece.n}
      id={sourceIdInText}
      color="gray.9"
      onClick={() => onNoteClick(sourceIdInBlock)}
      className={classes.noteLink + " grayForText " + pieceFormatClassName + " " + classes.cursorPointer}
    >
      {piece.text}
    </span>;
  }

  // LINK VERSION:
  return <Link 
    key={piece.n} 
    href={'#'+sourceIdInBlock} 
    id={sourceIdInText} 
    color="blue.9" 
    className={classes.noteLink + " " + pieceFormatClassName} 
    title={`Джерело: ${sourceId}`}>
    {piece.text}
  </Link>;
}