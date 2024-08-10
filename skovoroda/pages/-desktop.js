import { Flex, Group, Text, Title } from '@mantine/core';
import SkFountain from '../components/shared/skFountain';
import { SkovorodaConstants } from '../lib/skovorodaConstants';
import SkFilledButtonDesktop from '../components/shared/skFilledButtonDesktop';
import { SkovorodaBioPath, SkovorodaQuotesPath, SkovorodaSymbolsPath } from '../lib/skovorodaPath';
import SkColoredContainerDesktop from '../components/shared/skColoredContainerDesktop';
import SkH2Desktop from '../components/shared/skH2Desktop';
import SkTextLink from '../components/shared/skTextLink';
import SkQuoteDesktop from '../components/shared/skQuoteDesktop';
import { getHomePageProps, homePageContent } from '../lib/pagesContent/home';
import SkSourcesContainerDesktop from '../components/shared/skSourcesContainerDesktop';
import classes from './destop.module.scss';
import SkImage from '../components/shared/skImage';
import Link from 'next/link';

export default function HomePageDesktop() { 

  return <>
    <SkColoredContainerDesktop color={"gray.0"}>
      <Group spacing={"md"} position="apart" className={classes.bioGroup} >
        <div className={classes.portraitImage} >
          <SkImage 
            imageUrl={homePageContent.imageUrl} 
            alt={homePageContent.imageAlt}
            title={homePageContent.imageTitle}
            width={332}
            height={406}
            priority
            shadow={false}
            optimize={true}
          />
        </div>
        <div className={classes.bioContent}>
          <Title order={1} className={classes.h1}>{homePageContent.titleLine}</Title>
          <Text mt={"sm"} className={classes.subTitle}>{homePageContent.birthLine}</Text>
          <Text mt={"sm"} className='normalContentText normalContentText_justify normalContentText_withoutIndent'>{homePageContent.shortBio}</Text>
          {SkovorodaConstants.isProduction ? null : <>
            <Group position="right" className={classes.bioButtons} mt={"auto"} mb={0}>
              <SkTextLink text={"Біографія детальніше"} href={SkovorodaBioPath}/>
            </Group>
          </>}
        </div>
      </Group>
    </SkColoredContainerDesktop>

    <SkColoredContainerDesktop color={"indigo.0"} ta={"center"}>
      <SkH2Desktop text={"Цитати"} mb={"lg"} />
      <SkQuoteDesktop mb="md" text={"Як ліки не завжди приємні, так і істина буває сувора."} /> 
      <SkQuoteDesktop mb="md" text={"Все минає, але любов після всього зостається."} /> 
      <SkQuoteDesktop mb="md" text={"Як нерозумно випрошувати те, чого можеш сам досягти!"} /> 
      {SkovorodaConstants.isProduction ? null : <>
        <SkFilledButtonDesktop text={"Більше цитат"} href={SkovorodaQuotesPath} width={267}/>
      </>}
    </SkColoredContainerDesktop>

    <SkColoredContainerDesktop color={"white"} ta={"center"}>
      <SkH2Desktop text={"Символи"} mb={"lg"} />
      <SkFountain />
      <Text mt="sm" mb="md" className='normalContentText normalContentText_justify normalContentText_withoutIndent'>{homePageContent.symbolsText}</Text>
      {SkovorodaConstants.isProduction ? null : <>
        <SkFilledButtonDesktop text={"Більше символів"} href={SkovorodaSymbolsPath} width={267}/>
      </>}
    </SkColoredContainerDesktop>

    <SkColoredContainerDesktop color={"gray.0"}>
      <SkH2Desktop text={homePageContent.textsTitle} mb={"md"} />
      <Flex 
        gap="md" 
        mb="sm"
        direction="column"
      >
        {homePageContent.textsLinks.map(link => {
          return <>
            <Title ml="0" order={3} className="normalContentText">
              <Link key={link.href} href={link.href} title={link.title} className={classes.headerLink}>
                {link.text}
              </Link>
            </Title>
          </>;
        })}
      </Flex>
    </SkColoredContainerDesktop>

    <SkSourcesContainerDesktop sources={homePageContent.sourcesParams} />
  </> 
}

export async function getStaticProps({ params }) { 
  return getHomePageProps();
}