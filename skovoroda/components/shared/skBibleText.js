import { Popover, Text } from "@mantine/core";
import SkTextLink from "./skTextLink";
import { IconLink } from "@tabler/icons-react";

export default function SkBibleText({ bibleCode, text, key }) {
  
  const popoverText = bibleCodeToLongText(bibleCode);

  return <Popover position="top" withArrow shadow="md" offset={0}>
    <Popover.Target>
      <span key={key} className="sk-global-bible-text">{text}</span>
    </Popover.Target>
    <Popover.Dropdown>
      <SkTextLink
        key={'link'+key} 
        text={popoverText}
        href={`https://www.die-bibel.de/en/bible/UTT/${bibleCode}`}
        isBlank={true}
        title={'Читати в Біблії'}
        className={'sk-global-bible-link readFont'}
        iconRight={<IconLink size={16} />}
      />
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
  'WIS': 'Книга Премудрості Соломона'
};
function bibleCodeToLongText(bibleCode) {
  const parts = bibleCode.split(".");
  const bookCode = parts[0];
  const bookLongText = bibleBooks[bookCode];
  const chapter = parts[1];
  const verse = parts[2];
  return `${bookLongText} ${chapter}:${verse}`;
}
