import { Box, Flex, Space, Text, Title } from '@mantine/core';
import { getTreatisePath, SkovorodaGardenPath, SkovorodaTreatisePath } from '../lib/skovorodaPath';
import SkColoredContainerDesktop from '../components/shared/skColoredContainerDesktop';
import SkTextLink from '../components/shared/skTextLink';
import { getHomePageProps } from '../lib/pagesContent/home';
import classes from './destop.module.scss';
import SkImage from '../components/shared/skImage';
import Link from 'next/link';
import ListItemSeedSvg from '../components/svgs/listItemSeed.svg'
import { getAdjustedHeight } from '../components/functions/imageFunctions';
import SkNote from '../components/shared/skNote';
import SkTextContentBlockDesktop from '../components/shared/skTextContentBlockDesktop';

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
    const source = sourcesTextContent.find(source => source.sourceId === sourceId);
    if (!source) return null;
    const pageNumberText = pageNumber ? ` (сторінка ${pageNumber})` : '';
    return <SkNote noteNumber={source.noteNumber} title={`Джерело: ${source.shortTitle}${pageNumberText}`} />;
  }

  const openQuote = <svg width="28" height="26" viewBox="0 0 28 26" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.84 24.3285C6.008 25.0325 5.08 25.3845 4.056 25.3845C3.096 25.3845 2.264 25.0325 1.56 24.3285C0.856001 23.4965 0.504001 22.3445 0.504001 20.8725C0.504001 18.8885 1.016 16.5845 2.04 13.9605C3.064 11.3365 4.44 8.77649 6.168 6.28048C7.896 3.78448 9.784 1.80049 11.832 0.328485L13.56 2.44049C11.96 3.72049 10.52 5.25648 9.24 7.04848C8.024 8.84048 7.032 10.6965 6.264 12.6165C5.496 14.4725 5.016 16.1685 4.824 17.7045H5.208C6.232 17.7045 7.064 17.9925 7.704 18.5685C8.216 19.2085 8.472 19.9445 8.472 20.7765C8.472 22.1845 7.928 23.3685 6.84 24.3285ZM15.768 24.3285C15.704 24.3285 15.672 24.2965 15.672 24.2325C15.032 23.5285 14.712 22.4085 14.712 20.8725C14.712 18.8885 15.224 16.5845 16.248 13.9605C17.272 11.3365 18.648 8.77649 20.376 6.28048C22.104 3.78448 23.992 1.80049 26.04 0.328485L27.768 2.44049C26.168 3.72049 24.728 5.25648 23.448 7.04848C22.232 8.84048 21.24 10.6965 20.472 12.6165C19.704 14.4725 19.224 16.1685 19.032 17.7045H19.416C20.44 17.7045 21.272 17.9925 21.912 18.5685C22.424 19.2085 22.68 19.9445 22.68 20.7765C22.68 22.1845 22.136 23.3685 21.048 24.3285C20.216 25.0325 19.288 25.3845 18.264 25.3845C17.304 25.3845 16.472 25.0325 15.768 24.3285Z" fill="black"/>
  </svg>;
  const closeQuote = <svg width="28" height="26" viewBox="0 0 28 26" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.824 1.67249C7.656 0.968487 8.584 0.616488 9.608 0.616488C10.568 0.616488 11.4 0.968487 12.104 1.67249L12.392 2.24848L12.68 2.72848C12.68 2.79249 12.68 2.82449 12.68 2.82449C12.744 2.82449 12.776 2.85649 12.776 2.92049C12.904 3.24049 13 3.59249 13.064 3.97648C13.128 4.36048 13.16 4.77648 13.16 5.22449C13.16 7.14448 12.648 9.41648 11.624 12.0405C10.6 14.6645 9.224 17.2245 7.496 19.7205C5.768 22.2165 3.88 24.2325 1.832 25.7685L0.00800061 23.5605C1.672 22.2805 3.112 20.7445 4.328 18.9525C5.608 17.1605 6.632 15.3365 7.4 13.4805C8.232 11.5605 8.712 9.86448 8.84 8.39248H8.552C7.528 8.39248 6.696 8.07248 6.056 7.43249C5.544 6.85649 5.288 6.08849 5.288 5.12849C5.288 4.48849 5.416 3.88049 5.672 3.30449C5.928 2.66448 6.312 2.12048 6.824 1.67249ZM21.032 1.67249C21.864 0.968487 22.792 0.616488 23.816 0.616488C24.776 0.616488 25.608 0.968487 26.312 1.67249L26.6 2.24848L26.888 2.72848C26.888 2.79249 26.888 2.82449 26.888 2.82449C26.952 2.82449 26.984 2.85649 26.984 2.92049C27.112 3.24049 27.208 3.59249 27.272 3.97648C27.336 4.36048 27.368 4.77648 27.368 5.22449C27.368 7.14448 26.856 9.41648 25.832 12.0405C24.808 14.6645 23.432 17.2245 21.704 19.7205C19.976 22.2165 18.088 24.2325 16.04 25.7685L14.216 23.5605C15.88 22.2805 17.32 20.7445 18.536 18.9525C19.816 17.1605 20.84 15.3365 21.608 13.4805C22.44 11.5605 22.92 9.86448 23.048 8.39248H22.76C21.736 8.39248 20.904 8.07248 20.264 7.43249C19.752 6.85649 19.496 6.08849 19.496 5.12849C19.496 4.48849 19.624 3.88049 19.88 3.30449C20.136 2.66448 20.52 2.12048 21.032 1.67249Z" fill="black"/>
  </svg>;

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
            Походить від слова "Варсава". <br />
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
          <Box w={590}>
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
          <Box w={590}>
            {ListH2("Богослов")}
            {ListItem("З самого дитинства співав священні пісні. Вчив, що справжнє щастя тільки в пізнанні Бога, в дієвій Любові.")}
            {ListItem("Багато творів Сковороди мають зерна з Біблії - цитати, над якими розмірковує філософ.")}
            {ListItem("Центральна тема і кінцева точка всіх роздумів - Христос, істинна Людина.")}
            {ListItem(<>Вся творчість Сковороди – це один-єдиний великий коментар до Святого Письма, це спроба розгадати потаємний сенс біблійних образів-символів. Ось чому Сковорода називав сам себе <b>“любитилем священної Біблії”</b>.{Note(1, 281)}</>)}
            {ListItem(<>Читав катехізис <SkTextLink href={getTreatisePath("vstupni_dveri_do_khrystyianskoi_dobronravnosti")} text={"“Вхідні двері до доброго християнського життя”"} onHoverStylesOnly={true} title={"Вхідні двері до доброго християнського життя - Сковорода"}/> у “додаткових класах” Харківського колегіуму.{Note(1, 114)}</>)}
          </Box>
        </Flex>

        <Box className={classes.quoteSection}>
          <div className={classes.quoteMark}>{openQuote}</div>
          <Text className={classes.quoteText}>
            Не ору-бо, <br />
            не сію, ані куплю дію, <br />
            ані воюю, відкидаю усяку <br />
            житейську печаль. <br />
            <span className={classes.indent2}>Що ж дію?</span><br/>
            Ось що: завжди благословляючи Господа, оспівуємо Воскресіння Його. Вчуся, друже мій, вдячності: це моя справа!<br/>
            <span className={classes.indent3}>Вчуся бути задоволеним усім тим, що дав мені в </span><br />
            <span className={classes.indent3}>житті Божий промисел.</span><br />
            <span className={classes.indent3}>Невдячна воля – це ключ пекельних</span><br />
            <span className={classes.indent3}>мук, а вдячне серце – це рай</span><br />
            <span className={classes.indent3}>насолод.</span><br />
            <span className={classes.quoteAuthor}>
              Сковорода{Note(1, 287)}
            </span>
          </Text>
          <div className={`${classes.quoteMark} ${classes.quoteMarkClose}`}>{closeQuote}</div>
          {/* TODO: LATER ON: Читати більше */}
        </Box>

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
          <Box w={590}>
            {ListH2("Поет")}
            {ListItem(<><b>Цілого себе навіки присвятив музам.</b>{Note(16, 75)}</>)}
            {ListItem(<>Знаменитий вірш <b>“De libertate”</b></>)}
            {ListItem(<>Збірка <b><SkTextLink text={"“Сад Божественних Пісень”"} title={"Збірка Сковороди - Сад Божественних Пісень"} href={SkovorodaGardenPath} onHoverStylesOnly={true}/></b>, яка містить в собі приклад різних віршових форм включаючи новаторські.</>)}
            {ListItem(<>Написав власний підручник: "Роздуми про поезію та керівництво до її мистецтва".</>)}
            {ListItem(<>І багато інших віршів та пісень.</>)}
          </Box>
          {/* TODO: LATER ON: Читати більше */}
        </Flex>

        <Flex className={classes.flexContainer}>
          <Box w={590} mx={"auto"}>
            {ListH2("Педагог")}
            {ListItem(<>Мав широке коло учнів поза державними установами, і дотепер має багато послідовників.</>)}
            {ListItem(<>Досліджував тему педагогіки у своїй творчості, так в творі <b><SkTextLink text={"“Вдячний Еродій”"} href={getTreatisePath("blahodarnyi_erodii")} onHoverStylesOnly={true} title={"Твір Сковороди про виховання та освіту - Вдячний Еродій"}/></b> лелека має розмову з мавпою Пішек про різницю в навчанні у попугаїв та у Природи. Ідея сродності теж про це, хто до якого навчання схильний.</>)}
            {ListItem(<>Викладав поетику у Переяславському та Харківському колегіумі.</>)}
            {ListItem(<>Написав власний підручник: "Роздуми про поезію та керівництво до її мистецтва".</>)}
            {ListItem(<>Великий вчитель Свободи, щирого Серця й істинного Щастя.{Note(16, 6)}</>)}
          </Box>
          {/* TODO: LATER ON: Читати більше */}
        </Flex>

        <Flex className={classes.flexContainer}>
          <Box w={590}>
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
        <SkTextContentBlockDesktop textContent={sourcesTextContent} isv3={true} />
        <Space h='md'/>
      </SkColoredContainerDesktop>
        
    </>
  );
}

export async function getStaticProps({ params }) { 
  return getHomePageProps();
}