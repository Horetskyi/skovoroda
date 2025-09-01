import { Popover, Text } from "@mantine/core";
import SkTextLink from "./skTextLink";
import { IconLink } from "@tabler/icons-react";
import classes from './skBibleText.module.scss'; 
import UkranianFlagIcon from "./icons/uaFlagIcon";
import { getBibleBookNameByCode } from "../../lib/shared/bible";

export default function SkBibleText({ parsedBibleCode, text, translation, additionalClassName }) {
  
  if (!parsedBibleCode) return null;
  if (!text) return null;

  const popoverText = bibleCodeToLongText(parsedBibleCode);
  const dieBibelCleanBibleCode = parsedBibleCode.bibleCode.includes('-') 
    ? parsedBibleCode.bibleCode.split('-')[0] 
    : parsedBibleCode.bibleCode;
  const bibleType = parsedBibleCode.bibleType;

  const textClassName = `sk-global-bible-text ${additionalClassName || ''}`;

  return <Popover position="top" withArrow shadow="md" offset={0}>
    <Popover.Target key={"target"}>
      <span key={"span"} className={textClassName}>{text}</span>
    </Popover.Target>
    <Popover.Dropdown key={"dropdown"} className={classes.dropdown}>
      <div key={"div"}>
        { bibleType === 1 ? <Text className={`readFont ${classes.label}`}>Точна цитата:</Text> : null}
        { bibleType === 2 ? <Text className={`readFont ${classes.label}`}>Неточна цитата:</Text> : null}
        { bibleType === 3 ? <Text className={`readFont ${classes.label}`}>Парафраз:</Text> : null}
        { bibleType === 4 ? <Text className={`readFont ${classes.label}`}>Алюзія:</Text> : null}
        <SkTextLink
          key={'link'} 
          text={popoverText}
          href={`https://www.die-bibel.de/en/bible/UTT/${dieBibelCleanBibleCode}`}
          isBlank={true}
          title={'Читати в Біблії'}
          className={'sk-global-bible-link readFont'}
          iconRight={<IconLink size={16} />}
        />
        { (translation && translation.length) ? <Text key={`trs`} className={`readFont ${classes.label}`}>
          <UkranianFlagIcon />{` : ${translation}`}
        </Text> : null }
      </div>
    </Popover.Dropdown>
  </Popover>
}

function bibleCodeToLongText(parsedBibleCode) {
  if (!parsedBibleCode) return '';
  const bookName = getBibleBookNameByCode(parsedBibleCode.bibleCode);
  const chapter = parsedBibleCode.chapter;
  const verse = parsedBibleCode.verse;
  return `${bookName} ${chapter}:${verse}`;
}
