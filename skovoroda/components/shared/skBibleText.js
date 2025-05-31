import { Popover, Text } from "@mantine/core";
import SkTextLink from "./skTextLink";
import { IconLink } from "@tabler/icons-react";
import classes from './skBibleText.module.scss'; 

export default function SkBibleText({ bibleCode, bibleType, text, bKey }) {
  
  const popoverText = bibleCodeToLongText(bibleCode);

  return <Popover position="top" withArrow shadow="md" offset={0} key={bKey}>
    <Popover.Target key={bKey}>
      <span key={bKey} className="sk-global-bible-text">{text}</span>
    </Popover.Target>
    <Popover.Dropdown key={bKey}>
      <div key={bKey}>
        { bibleType === 1 ? <Text className={`readFont ${classes.label}`}>Точна цитата:</Text> : null}
        { bibleType === 2 ? <Text className={`readFont ${classes.label}`}>Неточна цитата:</Text> : null}
        <SkTextLink
          key={'link'+bKey} 
          text={popoverText}
          href={`https://www.die-bibel.de/en/bible/UTT/${bibleCode}`}
          isBlank={true}
          title={'Читати в Біблії'}
          className={'sk-global-bible-link readFont'}
          iconRight={<IconLink size={16} />}
        />
      </div>
    </Popover.Dropdown>
  </Popover>
}

const bibleBooks = {
  'JHN': 'Євангелія від св. Івана',
  'MRK': 'Євангелія від св. Марка',
  'MAT': 'Євангелія від св. Матвія',
  'ACT': 'Дії святих апостолів',
  'SIR': 'Книга Ісуса, сина Сирахового',
  '1JN': 'Перше соборне послання св. ап. Івана',
  '1TI': 'Перше послання до Тимотея',
  'ROM': 'Послання до Римлян',
  'GAL': 'Послання до Галатів',
  'SNG': 'Пісня над піснями',
  'WIS': 'Книга Премудрості Соломона',
  'PSA': 'Книга Псалмів',
  'JAS': 'Послання Апостола Якова',
  'ISA': 'Книга пророка Ісаї',
  'GEN': 'Книга Буття',
};
function bibleCodeToLongText(bibleCode) {
  const parts = bibleCode.split(".");
  const bookCode = parts[0];
  const bookLongText = bibleBooks[bookCode];
  const chapter = parts[1];
  const verse = parts[2];
  return `${bookLongText} ${chapter}:${verse}`;
}
