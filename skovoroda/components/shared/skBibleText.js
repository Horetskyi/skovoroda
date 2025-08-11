import { Popover, Text } from "@mantine/core";
import SkTextLink from "./skTextLink";
import { IconLink } from "@tabler/icons-react";
import classes from './skBibleText.module.scss'; 
import UkranianFlagIcon from "./icons/uaFlagIcon";
import { bibleBooks } from "../../lib/shared/bible";

export default function SkBibleText({ bibleCode, bibleType, text, bKey, translation }) {
  
  const popoverText = bibleCodeToLongText(bibleCode);
  const cleanBibleCode = (bibleCode && bibleCode.includes('-') ? bibleCode.split('-')[0] : bibleCode);

  return <Popover position="top" withArrow shadow="md" offset={0} key={bKey}>
    <Popover.Target key={bKey+"target"}>
      <span key={bKey+"span"} className="sk-global-bible-text">{text}</span>
    </Popover.Target>
    <Popover.Dropdown key={bKey+"dropdown"} className={classes.dropdown}>
      <div key={bKey+"div"}>
        { bibleType === 1 ? <Text className={`readFont ${classes.label}`}>Точна цитата:</Text> : null}
        { bibleType === 2 ? <Text className={`readFont ${classes.label}`}>Неточна цитата:</Text> : null}
        { bibleType === 3 ? <Text className={`readFont ${classes.label}`}>Парафраз:</Text> : null}
        { bibleType === 4 ? <Text className={`readFont ${classes.label}`}>Алюзія:</Text> : null}
        <SkTextLink
          key={'link'+bKey} 
          text={popoverText}
          href={`https://www.die-bibel.de/en/bible/UTT/${cleanBibleCode}`}
          isBlank={true}
          title={'Читати в Біблії'}
          className={'sk-global-bible-link readFont'}
          iconRight={<IconLink size={16} />}
        />
        { (translation && translation.length) ? <Text key={`trs${bKey}`} className={`readFont ${classes.label}`}>
          <UkranianFlagIcon />{` : ${translation}`}
        </Text> : null }
      </div>
    </Popover.Dropdown>
  </Popover>
}

function bibleCodeToLongText(bibleCode) {
  const parts = bibleCode.split(".");
  const bookCode = parts[0];
  const bookLongText = bibleBooks[bookCode];
  const chapter = parts[1];
  const verse = parts[2];
  return `${bookLongText} ${chapter}:${verse}`;
}
