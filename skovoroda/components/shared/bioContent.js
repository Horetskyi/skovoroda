import { IconSchool, IconMusic, IconDirections, IconBook, IconStar, IconHome } from '@tabler/icons-react';
import SkImage from './skImage';
import { parseFileContent } from '../../lib/utils/readingTextsUtils';

export function getBioContent() {

  const iconSize = 28;
  const iconStroke = 1;

  const studentDesign = {
    icon: <IconSchool size={iconSize} stroke={iconStroke} />,
    bg: 'blue.1',
    bg2: 'blue.0',
  };
  const eventDesign = {
    icon: <IconStar size={iconSize} stroke={iconStroke}/>,
    bg: 'yellow.2',
    bg2: 'yellow.1',
  };
  const freeDesign = {
    icon: <SkImage imageUrl={"/images/icons/dove-icon.png"} width={24} height={24} priority={false} shadow={false}/>,
    bg: 'indigo.1',
    bg2: 'indigo.0',
  };
  const teacherDesign = {
    icon: <IconBook size={iconSize} stroke={iconStroke}/>,
    bg: 'orange.1',
    bg2: 'orange.0',
  };
  const singerDesing = {
    icon: <IconMusic size={iconSize} stroke={iconStroke} />,
    bg: 'pink.1',
    bg2: 'pink.0',
  };
  const childhoodDesign = {
    icon: <IconHome size={iconSize} stroke={iconStroke}/>,
    bg: 'yellow.1',
    bg2: 'yellow.0',
  };
  const travelDesign = {
    icon: <IconDirections size={iconSize} stroke={iconStroke} />,
    bg: 'green.1',
    bg2: 'green.0',
  };

  const childhoodContent = `
  Григорій Сковорода народився у ніч на 22 листорада за старим стилем у сім'ї козака Сави і його дружини Пелагеї. 
  У семирічному віці його віддали в дяківську школу. Юнак учився читати (буквар, граматику, Псалтир, Часослов), писати, лічити, співати в церкві на крилосі. 
  З дитинства Григорій має чудовий голос, а тому вчащає до церковного хору, знає мало не всі мелодії й наспіви. Пасучи череду в полі чи гуляючи в гаю, він часто виграє на сопілці чабанських і релігійних пісень або імітує пташині голосові переливи.
`

  const shortBioMoments = [
    {
      id: 'childhood',
      text: 'Дитинство в Чорнухах',
      detailsTextParsed: parseFileContent(childhoodContent),
      timeText: '1722 р. - 1734 р.',
      locationText: 'Полтавщина, Чорнухи',
      design: childhoodDesign,
    },
    {
      id: 'student-1',
      text: 'Студент Києво-Могилянської академії',
      detailsText: 'Вступає до Києво-Могилянської академії.',
      timeText: '1734 р.  - 1741 р.',
      locationText: 'Київ',
      design: studentDesign,
    },
    {
      id: 'singer-court-chapel',
      text: 'Співак придворної капели',
      timeText: '1742 р. - 1744 р.',
      locationText: 'Санкт-Петербург, Москва',
      design: singerDesing,
    },
    {
      id: 'student-2',
      text: 'Студент Києво-Могилянської академії (вдруге)',
      detailsText: 'Продовжує навчання в класі філософії.',
      timeText: '1744 р. - 1745 р.',
      locationText: 'Київ',
      design: studentDesign,
    },
    {
      id: 'travel-hungary',
      text: 'Подорожує в Угорщину та інші місця',
      timeText: '1745 р. - 1750 р.',
      locationText: 'Угорщина, Європа',
      design: travelDesign,
    },
    {
      id: 'teacher-1',
      text: 'Викладач поетики в Переясловському колегіумі',
      detailsText: 'Сковорода викладає поетику в Переясловському колегіумі до якого його запросив єпископ Никодим Срібницький.',
      timeText: '1750 р. - 1751 р.',
      locationText: 'Переяслав',
      design: teacherDesign,
    },
    {
      id: 'student-3',
      text: 'Студент Києво-Могилянської академії (втретє)',
      detailsText: "Навчання на курсі богослів'я.",
      timeText: '1751 р - 1753 р.',
      locationText: 'Київ',
      design: studentDesign,
    },
    {
      id: 'teacher-2',
      text: 'Вихователь старшого сина Степана Томари Василя',
      locationText: "Село Каврай, Черкаська область",
      timeText: '1753 р. - 1759 р.',
      design: teacherDesign,
    },
    {
      id: 'event-dream',
      text: 'Сон про Гнану Правду',
      locationText: "Село Каврай, Черкаська область",
      timeText: '24 листопада 1758 р.',
      design: eventDesign,
    },
    {
      id: 'teacher-2-1',
      text: 'Викладач поетики в Харківському колегіумі',
      detailsText: 'Іосаф Миткевич, ставши єпископом у Білгороді, за рекомендацією Якубовича 1759 року запрошує Сковороду викладати піїтику в Харківському колґіумі.',
      locationText: 'Харків',
      timeText: '1759 р. - 1760 р.',
      design: teacherDesign,
    },
    {
      id: 'free-philosopher-1',
      text: 'Вільний філософ',
      locationText: 'Село Стариця, Харківщина',
      timeText: '1760 р. - 1762 р.',
      design: freeDesign,
    },
    {
      id: 'event-kovalinsky',
      text: 'Знайомство зі студентом Ковалинським',
      locationText: 'Харків',
      timeText: 'весна 1762 р.',
      design: eventDesign,
    },
    {
      id: 'teacher-3',
      text: 'Викладач курсів синтаксими та грецької мови в Харківському колегіумі',
      locationText: 'Харків',
      timeText: '1762 р. - 1764 р.',
      design: teacherDesign,
    },
    {
      id: 'free-philosopher-2',
      text: 'Вільний філософ (вдруге)',
      detailsText: 'Про цей період мало що відомо',
      locationText: 'Харків',
      timeText: '1764 р. - 1768 р.',
      design: freeDesign,
    },
    {
      id: 'teacher-4',
      text: 'Викладач Катехізису в "додаткових класах" в Харківському колегіумі',
      locationText: 'Харків',
      timeText: '1768 р. - 1769 р.',
      design: teacherDesign,
    },
    {
      id: 'event-mystic-ecstasy',
      text: 'Містичний екстаз',
      locationText: 'Охтирка',
      timeText: 'серпень 1770 р.',
      design: eventDesign,
    },
    {
      id: 'free-philosopher-3',
      text: 'Вільний філософ 3',
      locationText: 'Харків; село Гужвинське, Харківщина; Київ; Острозьк; Таволзька слобода; село Бабаї, Харківщина; Село Гусинка; Вільшанська Іванівка, Харківщина',
      timeText: '1769 р. - 1794 р.',
      design: freeDesign,
    },
  ];

  return { 
    shortBioMoments: shortBioMoments,
  };
}