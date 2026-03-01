import { Box, Flex, Space, Text, Title } from '@mantine/core';
import { getTreatisePath, SkovorodaGardenPath, SkovorodaTreatisePath } from '../lib/skovorodaPath';
import SkColoredContainerDesktop from '../components/shared/skColoredContainerDesktop';
import SkTextLink from '../components/shared/skTextLink';
import { getHomePageProps } from '../lib/staticProps/home';
import classes from './destop.module.scss';
import SkImage from '../components/shared/skImage';
import Link from 'next/link';
import ListItemSeedSvg from '../components/svgs/listItemSeed.svg'
import { getAdjustedHeight } from '../components/functions/imageFunctions';
import SkNote from '../components/shared/skNote';
import SkMetaTextView from '../components/shared/skMetaTextView';

function ArrowSvg() {
  return <svg width="201" height="8" viewBox="0 0 201 8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M200.334 4.35355C200.529 4.15829 200.529 3.84171 200.334 3.64645L197.152 0.464466C196.956 0.269204 196.64 0.269204 196.444 0.464466C196.249 0.659728 196.249 0.976311 196.444 1.17157L199.273 4L196.444 6.82843C196.249 7.02369 196.249 7.34027 196.444 7.53553C196.64 7.7308 196.956 7.7308 197.152 7.53553L200.334 4.35355ZM0 4.5H199.98V3.5H0V4.5Z" fill="black"/>
  </svg>;
}

export default function HomePageDesktop({sourcesTextContent}) {

  const philosopherReadMoreLink = {
    href: SkovorodaTreatisePath, // getBioPath('philosopher')
    title: 'Сковорода - перший український філософ',
    anchor: 'Читати трактати', // 'Читати більше',
  }; 

  const listItem = <ListItemSeedSvg width={15} height={19} />;

  function CenterH2(title) {
    return <Title order={2} ta="center" mb={28}>{title}</Title>
  }

  function ListH2(title) {
    return <Title order={2} mb={28}>{title}</Title>
  }

  function ListItem(content) {
    return <div className={classes.listItem}>
      {listItem}
      <Text>{content}</Text>
    </div>
  }

  function Note(sourceId, pageNumber) {
    const source = sourcesTextContent.find(source => source.meta.sourceId == sourceId);
    if (!source) return null;
    const pageNumberText = pageNumber ? ` (сторінка ${pageNumber})` : '';
    return <SkNote noteNumber={source.meta.noteNumber} title={`Джерело: ${source.meta.shortTitle}${pageNumberText}`} />;
  }

  return (
    <>
      <SkColoredContainerDesktop color="white" cw={1090} relativePosition={true}>

        {/* Title Section */}
        <Box className={classes.headerContainer}>
          <Title order={1} className={classes.h1}>
            <p>Григорій</p>
            <p>Варсава</p>
            <p>Сковорода</p>
          </Title>
          <span className={classes.dateFirst}>1722</span>
          <span className={classes.dateLast}>1794</span>
        </Box>

        <Box className={classes.imageSection}>
          <SkImage
            imageUrl="/images/Skovoroda Statue.webp"
            alt="Statue of Skovoroda"
            title="Statue of Skovoroda"
            width={515}
            height={687}
            priority
            shadow={true}
            optimize={false}
            styleAction={(os) => {
              os.borderRadius = 28;
            }}
          />
        </Box>

        {/* Curve from Title */}
        <svg className={classes.svgFromTitle} width="832" height="1281" viewBox="0 0 832 1281" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M194 1C194 1 2.76374 211 52.3828 313C102.002 415 -21.9998 447 5.38151 599C32.7628 751 275.696 1142.83 831 1280" stroke="#999999"/>
        </svg>

        <Box className={classes.nameSection}>
          <Title order={2}>Син миру</Title>
          <Text className={`normalContentText normalContentText_withoutIndent`}>
            Походить від слова &quot;Варсава&quot;. <br />
            Вар (єврейське слово) — означає син; <br />
            Сава (сирське слово) — означає суботу, спокій, свято, мир. Отже, Вар-Сава — син миру.
          </Text>
        </Box>

        <svg className={classes.svgFromName} width="195" height="247" viewBox="0 0 195 247" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M194.5 1C13.5 54 125 204 1 246" stroke="#999999"/>
        </svg>

        <Text className={`normalContentText normalContentText_withoutIndent ${classes.name2}`} ta={"left"}>
          також ім’я <br />
          батька Сковороди
        </Text>

        <Flex className={classes.flexContainer}>
          <Box className={classes.listContainer}>
            {ListH2("Філософ")}
            {ListItem(<>Застосовував на практиці найкращі стародавні принципи, такі як: <b>“Пізнай себе”</b>, володій собою, тримайся міри, будь доброчесним, пізнавай Час і Ритм.</>)}
            {ListItem("Написав чимало трактатів, філософських віршів та байок.")}
            {ListItem(<><b><SkTextLink text={"“Наркіс. Розмова про те: пізнай себе”"} href={getTreatisePath('narcis')} title={"Читати твір Сковороди: Наркіс - Пізнай Себе"} onHoverStylesOnly={true}/></b> називають першою пам’яткою оригінальної філософської думки в східних слов’ян.{Note(1, 274)}</>)}
            {ListItem("Черпав у Платона, Епікура, Аристотеля, Плутарха, Цицерона, Сенеки та багатьох інших великих філософів.")}
            <Link className={classes.linkContainer} href={philosopherReadMoreLink.href} title={philosopherReadMoreLink.title} target="_self" >
              <Text>{philosopherReadMoreLink.anchor}</Text>
              <div className={classes.linkArrow}>{ArrowSvg()}</div>
            </Link>
          </Box>
          <Box ml={"xl"} mt={80}>
            <SkImage
              imageUrl="/images/Old pocket watch.webp"
              alt="Старий карманний годинник на старій книзі, а поруч жовті рози, що в'януть"
              title="Час, як філософська категорія, як невід'ємна частина життя і роздумів Сковороди"
              width={400}
              height={getAdjustedHeight(400, 4000, { width: 6000, height: 4000 })}
              shadow={true}
              optimize={false}
              styleAction={(os) => {
                os.borderRadius = 28;
              }}
            />
          </Box>
        </Flex>
        
        <Flex className={classes.flexContainer}>
          <Box mr={"xl"}>
            <SkImage
              imageUrl="/images/Cherubs.webp"
              alt="Зображення херувима на стіні храму"
              title="Херувим"
              width={400}
              height={getAdjustedHeight(400, 2667, { width: 4000, height: 2667 })}
              shadow={true}
              optimize={false}
              styleAction={(os) => {
                os.borderRadius = 28;
              }}
            />
          </Box>
          <Box className={classes.listContainer}>
            {ListH2("Богослов")}
            {ListItem("З самого дитинства співав священні пісні. Вчив, що справжнє щастя тільки в пізнанні Бога, в дієвій Любові.")}
            {ListItem("Багато творів Сковороди мають зерна з Біблії - цитати, над якими розмірковує філософ.")}
            {ListItem("Центральна тема і кінцева точка всіх роздумів - Христос, істинна Людина.")}
            {ListItem(<>Вся творчість Сковороди – це один-єдиний великий коментар до Святого Письма, це спроба розгадати потаємний сенс біблійних образів-символів. Ось чому Сковорода називав сам себе <b>“любитилем священної Біблії”</b>.{Note(1, 281)}</>)}
            {ListItem(<>Читав катехізис <SkTextLink href={getTreatisePath("vstupni_dveri_do_khrystyianskoi_dobronravnosti")} text={"“Вхідні двері до доброго християнського життя”"} onHoverStylesOnly={true} title={"Вхідні двері до доброго християнського життя - Сковорода"}/> у “додаткових класах” Харківського колегіуму.{Note(1, 114)}</>)}
          </Box>
        </Flex>

        <Flex className={classes.flexContainer}>
          <Box mr={"xl"}>
            <SkImage
              imageUrl="/images/Skovoroda Poet.webp"
              alt="Сковорода студент пише в зошиті пером, по старому паперу"
              title="Сковорода - поет"
              width={400}
              height={getAdjustedHeight(400, 3000, { width: 4500, height: 3000 })}
              shadow={true}
              optimize={false}
              styleAction={(os) => {
                os.borderRadius = 28;
              }}
            />
          </Box>
          <Box className={classes.listContainer}>
            {ListH2("Поет")}
            {ListItem(<><b>Цілого себе навіки присвятив музам.</b>{Note(16, 75)}</>)}
            {ListItem(<>Знаменитий вірш <b>“De libertate”</b></>)}
            {ListItem(<>Збірка <b><SkTextLink text={"“Сад Божественних Пісень”"} title={"Збірка Сковороди - Сад Божественних Пісень"} href={SkovorodaGardenPath} onHoverStylesOnly={true}/></b>, яка містить в собі приклад різних віршових форм включаючи новаторські.</>)}
            {ListItem(<>Написав власний підручник: &quot;Роздуми про поезію та керівництво до її мистецтва&quot;.</>)}
            {ListItem(<>І багато інших віршів та пісень.</>)}
          </Box>
          {/* TODO: LATER ON: Читати більше */}
        </Flex>

        <Flex className={classes.flexContainer}>
          <Box className={classes.listContainer} mx={"auto"}>
            {ListH2("Педагог")}
            {ListItem(<>Мав широке коло учнів поза державними установами, і дотепер має багато послідовників.</>)}
            {ListItem(<>Досліджував тему педагогіки у своїй творчості, так в творі <b><SkTextLink text={"“Вдячний Еродій”"} href={getTreatisePath("blahodarnyi_erodii")} onHoverStylesOnly={true} title={"Твір Сковороди про виховання та освіту - Вдячний Еродій"}/></b> лелека має розмову з мавпою Пішек про різницю в навчанні у попугаїв та у Природи. Ідея сродності теж про це, хто до якого навчання схильний.</>)}
            {ListItem(<>Викладав поетику у Переяславському та Харківському колегіумі.</>)}
            {ListItem(<>Написав власний підручник: &quot;Роздуми про поезію та керівництво до її мистецтва&quot;.</>)}
            {ListItem(<>Великий вчитель Свободи, щирого Серця й істинного Щастя.{Note(16, 6)}</>)}
          </Box>
          {/* TODO: LATER ON: Читати більше */}
        </Flex>

        <Flex className={classes.flexContainer}>
          <Box className={classes.listContainer}>
            {ListH2("Композитор")}
            {ListItem(<>Компонував духовні концерти, із відомих <b>“Відправа на вісім голосів”</b>, наспів духовної пісні <b>“Іже херувими”</b>, “Христос Воскресе”, “Воскресеніє день” та інші.</>)}
            {ListItem(<>Писав поезії та музику до неї: колядку <b>“Ангели, знижайтеся”, “Всякому городу нрав і права”, “Ой ти, пташко жовтобоко”</b> та інші.</>)}
            {ListItem(<>Сам співав, грав на сопілці, флейті, скприці, бандурі, гуслях.</>)}
            {ListItem(<>Писав музику в різних жанрах – і світських, і духовних, і фолькльорних.</>)}
          </Box>
          <Box ml={"xl"}>
            <SkImage
              imageUrl="/images/Choir.webp"
              alt="Хор, деталь з ікони 17 століття"
              title="Хор, деталь з ікони XVII століття"
              width={400}
              height={getAdjustedHeight(400, 567, { width: 452, height: 567 })}
              shadow={true}
              optimize={false}
              styleAction={(os) => {
                os.borderRadius = 28;
              }}
            />
          </Box>
          {/* TODO: LATER ON: Читати більше */}
        </Flex>

      </SkColoredContainerDesktop>

      <Space h={100}/>

      <SkColoredContainerDesktop py={"xl"}>
        {CenterH2("Джерела")}
        <SkMetaTextView metaText={sourcesTextContent} otherArgs={{ isv3: true }} />
        <Space h='md'/>
      </SkColoredContainerDesktop>
        
    </>
  );
}

export async function getStaticProps({ params }) { 
  return getHomePageProps();
}