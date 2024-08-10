import { Center, Container, Flex, Space, Text, Title } from "@mantine/core";
import { getHomePageProps, homePageContent } from "../lib/pagesContent/home";
import SkImage from "../components/shared/skImage";
import SkColoredContainerMobile from "../components/shared/skColoredContainerMobile";
import SkQuoteDesktop from "../components/shared/skQuoteDesktop";
import SkFountain from "../components/shared/skFountain";
import SkSourcesContainerMobile from "../components/shared/skSourcesContainerMobile";
import SkH2Mobile from "../components/shared/skH2Mobile";
import classes from './mobile.module.scss';
import Link from "next/link";

export default function HomePageMobile() {

  return <>
    <Container px={"md"}>
      <Space h={"md"}/>
      <Center>
        <SkImage 
          width={198} 
          height={243} 
          alt={homePageContent.imageAlt} 
          title={homePageContent.imageTitle}
          imageUrl={homePageContent.imageUrl}
          shadow={"md"}
          priority={true}
          optimize={true}
        />
      </Center>
      <Space h={"md"}/>
      <Title order={1} className={classes.h1} ta={"center"}>{homePageContent.titleLine}</Title>
      <Text mt={"sm"} className='normalContentText normalContentText_withoutIndent' ta={"center"}>{homePageContent.birthLine}</Text>
      <Text mt={"sm"} className='normalContentText'>{homePageContent.shortBio}</Text>
    </Container>
    <Space h={"md"}/>
    <SkColoredContainerMobile color={"indigo.0"} ta={"center"}>
      <SkH2Mobile text={"Цитати"} mb={"md"} />
      <Container px={"md"}>
        <SkQuoteDesktop mb="sm" text={"Як ліки не завжди приємні, так і істина буває сувора."} /> 
        <SkQuoteDesktop mb="sm" text={"Все минає, але любов після всього зостається."} /> 
        <SkQuoteDesktop mb="sm" text={"Як нерозумно випрошувати те, чого можеш сам досягти!"} /> 
      </Container>
    </SkColoredContainerMobile>
    <SkColoredContainerMobile color={"white"} ta={"center"}>
      <SkH2Mobile text={"Символи"} mb={"lg"} />
      <Container px={"md"}>
        <SkFountain isMobile={true}/>
        <Text mt="sm" className='normalContentText' ta={"left"}>{homePageContent.symbolsText}</Text>
      </Container>
    </SkColoredContainerMobile>
    <SkColoredContainerMobile color={"gray.0"}>
      <SkH2Mobile text={homePageContent.textsTitle} mb={"md"} />
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
    </SkColoredContainerMobile>
    <SkSourcesContainerMobile sources={homePageContent.sourcesParams} />
  </>
}

export async function getStaticProps({ params }) {
  return getHomePageProps();
}