import { Popover, Text } from "@mantine/core";
import SkTextLink from "./skTextLink";
import { IconLink } from "@tabler/icons-react";
import classes from './skBibleText.module.scss'; 
import UkranianFlagIcon from "./icons/uaFlagIcon";

export default function SkBibleText({ bibleCode, bibleType, text, bKey, translation }) {
  
  const popoverText = bibleCodeToLongText(bibleCode);
  const cleanBibleCode = (bibleCode && bibleCode.includes('-') ? bibleCode.split('-')[0] : bibleCode);

  return <Popover position="top" withArrow shadow="md" offset={0} key={bKey}>
    <Popover.Target key={bKey+"target"}>
      <span key={bKey+"span"} className="sk-global-bible-text">{text}</span>
    </Popover.Target>
    <Popover.Dropdown key={bKey+"dropdown"} maw={700}>
      <div key={bKey+"div"}>
        { bibleType === 1 ? <Text className={`readFont ${classes.label}`}>Точна цитата:</Text> : null}
        { bibleType === 2 ? <Text className={`readFont ${classes.label}`}>Неточна цитата:</Text> : null}
        { bibleType === 3 ? <Text className={`readFont ${classes.label}`}>Парафраз:</Text> : null}
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

const bibleBooks = {
  'JHN': 'Євангелія від св. Івана', // die-bibel.de✅
  'MRK': 'Євангелія від св. Марка', // die-bibel.de✅
  'MAT': 'Євангелія від св. Матвія', // die-bibel.de✅
  'LUK': 'Євангелія від св. Луки', // die-bibel.de✅
  'ACT': 'Дії святих апостолів', // die-bibel.de✅
  'SIR': 'Книга Ісуса, сина Сирахового', // die-bibel.de✅
  '1JN': 'Перше соборне послання св. ап. Івана', // die-bibel.de✅
  '2JN': 'Друге послання Івана', // die-bibel.de✅
  '3JN': 'Третє послання Івана', // die-bibel.de✅
  '1TI': 'Перше послання до Тимотея', // die-bibel.de✅
  '2TI': 'Друге послання до Тимофія', // die-bibel.de✅
  'ROM': 'Послання до Римлян', // die-bibel.de✅
  '1CO': 'Перше послання до коринтян', // die-bibel.de✅
  '2CO': 'Друге послання до коринтян', // die-bibel.de✅
  'GAL': 'Послання до Галатів', // die-bibel.de✅
  'EPH': 'Послання до ефесян', // die-bibel.de✅
  'PHP': 'Послання до филип\'ян', // die-bibel.de✅
  '1TH': 'Перше послання до солунян', // die-bibel.de✅
  '2TH': 'Друге послання до солунян', // die-bibel.de✅
  'HEB': 'Послання до євреїв', // die-bibel.de✅
  '1PE': 'Перше послання Петра', // die-bibel.de✅
  '2PE': 'Друге послання Петра', // die-bibel.de✅
  'SNG': 'Пісня над піснями', // die-bibel.de✅
  'WIS': 'Книга Премудрості Соломона', // die-bibel.de✅
  'PSA': 'Книга Псалмів', // die-bibel.de✅
  'JAS': 'Послання Апостола Якова', // die-bibel.de✅
  'JUD': 'Соборне послання св. ап. Іуди', // die-bibel.de✅
  'ISA': 'Книга пророка Ісаї', // die-bibel.de✅
  'JER': 'Книга пророка Єремії', // die-bibel.de✅
  'LAM': 'Плач Єремії', // die-bibel.de✅
  'EZK': 'Книга пророка Єзекіїла', // die-bibel.de✅
  'DAG': 'Книга пророка Даниїла', // die-bibel.de✅
  'HOS': 'Книга пророка Осії', // die-bibel.de✅
  'AMO': 'Книга пророка Амоса', // die-bibel.de✅
  'OBA': 'Книга пророка Авдія', // die-bibel.de✅
  'MIC': 'Книга пророка Михея', // die-bibel.de✅
  'HAB': 'Книга пророка Аввакума', // die-bibel.de✅
  'ZEP': 'Книга пророка Софонії', // die-bibel.de✅
  'ZEC': 'Книга пророка Захарії', // die-bibel.de✅
  'BAR': 'Книга пророка Варуха', // die-bibel.de✅
  'GEN': 'Книга Буття', // die-bibel.de✅
  'EXO': 'Друга книга Мойсеєва: Вихід', // die-bibel.de✅
  'NUM': 'Четверта книга Мойсеєва: Числа', // die-bibel.de✅
  'DEU': 'П\'ята книга Мойсеєва: Повторення Закону', // die-bibel.de✅
  'JOS': 'Книга Ісуса Навина', // die-bibel.de✅
  'JDG': 'Книга Суддів', // die-bibel.de✅
  'RUT': 'Книга Рут', // die-bibel.de✅
  '1SA': 'Перша книга царств', // die-bibel.de✅
  '1CH': 'Перша книга Хроніки', // die-bibel.de✅
  'JOB': 'Книга Йова', // die-bibel.de✅
  'PRO': 'Книга Притч Соломонових', // die-bibel.de✅
  'ECC': 'Книга Екклезіястова', // die-bibel.de✅
  'REV': 'Апокаліпсис', // die-bibel.de✅
};
function bibleCodeToLongText(bibleCode) {
  const parts = bibleCode.split(".");
  const bookCode = parts[0];
  const bookLongText = bibleBooks[bookCode];
  const chapter = parts[1];
  const verse = parts[2];
  return `${bookLongText} ${chapter}:${verse}`;
}
