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
        { bibleType === 3 ? <Text className={`readFont ${classes.label}`}>Парафраз:</Text> : null}
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
  'LUK': 'Євангелія від св. Луки',
  'ACT': 'Дії святих апостолів',
  'SIR': 'Книга Ісуса, сина Сирахового',
  '1JN': 'Перше соборне послання св. ап. Івана',
  '3JN': 'Третє послання Івана',
  '1TI': 'Перше послання до Тимотея',
  '2TI': 'Друге послання до Тимофія',
  'ROM': 'Послання до Римлян',
  '1CO': 'Перше послання до коринтян',
  '2CO': 'Друге послання до коринтян',
  'GAL': 'Послання до Галатів',
  'EPH': 'Послання до ефесян',
  'PHP': 'Послання до филип\'ян',
  '1TH': 'Перше послання до солунян',
  '2TH': 'Друге послання до солунян',
  'HEB': 'Послання до євреїв',
  '1PE': 'Перше послання Петра',
  '2PE': 'Друге послання Петра',
  'SNG': 'Пісня над піснями',
  'WIS': 'Книга Премудрості Соломона',
  'PSA': 'Книга Псалмів',
  'JAS': 'Послання Апостола Якова',
  'JUD': 'Соборне послання св. ап. Іуди',
  'ISA': 'Книга пророка Ісаї',
  'JER': 'Книга пророка Єремії',
  'EZK': 'Книга пророка Єзекіїла',
  'DAN': 'Книга пророка Даниїла',
  'HOS': 'Книга пророка Осії',
  'AMO': 'Книга пророка Амоса',
  'OBA': 'Книга пророка Авдія',
  'MIC': 'Книга пророка Михея',
  'HAB': 'Книга пророка Аввакума',
  'ZEP': 'Книга пророка Софонії',
  'ZEC': 'Книга пророка Захарії',
  'BAR': 'Книга пророка Варуха',
  'GEN': 'Книга Буття',
  'EXO': 'Друга книга Мойсеєва: Вихід',
  'NUM': 'Четверта книга Мойсеєва: Числа',
  'DEU': 'П\'ята книга Мойсеєва: Повторення Закону',
  'JOS': 'Книга Ісуса Навина',
  'JDG': 'Книга Суддів',
  'RUT': 'Книга Рут',
  '1SA': 'Перша книга царств',
  '1CH': 'Перша книга Хроніки',
  'JOB': 'Книга Йова',
  'PRO': 'Книга Притч Соломонових',
  'ECC': 'Книга Екклезіястова',
  'REV': 'Апокаліпсис',
};
function bibleCodeToLongText(bibleCode) {
  const parts = bibleCode.split(".");
  const bookCode = parts[0];
  const bookLongText = bibleBooks[bookCode];
  const chapter = parts[1];
  const verse = parts[2];
  return `${bookLongText} ${chapter}:${verse}`;
}
