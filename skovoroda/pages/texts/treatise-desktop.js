import { Button, Card, Container, createStyles, Flex, Group, List, Stack, Text, Title } from '@mantine/core';
import Link from 'next/link';
import { useEffect } from 'react';
import LinkToSource from '../../components/textSourceLinkWithTooltip';
import { SkovorodaTextsArray } from '../../lib/data/skovorodaTexts';
import { treatisePageKey } from '../../lib/skovorodaConstants';
import { pathJoinWithoutEndSlash, SkovorodaTextsPath, SkovorodaTreatisePath } from '../../lib/skovorodaPath';
import { gsap } from "gsap/dist/gsap";
import ScrollToPlugin from 'gsap/dist/ScrollToPlugin';

const useStyles = createStyles((theme) => ({
  
  textLink: {
    color: theme.colors.blue[8]
  },

  leftNavMenu3: {
    position: "sticky",
    top: theme.spacing.xl,
    left: 0,
    width: "100%",
  },

  leftNavMenu2: {
    position: "absolute",
    width: `calc(50% - 480px - ${theme.spacing.xl}px - 10px)`,
    top: 0,
    left: theme.spacing.xl,
  },

  leftNavButton: {
    textAlign: "left",
    alignSelf: "flex-start",
    width: "100%",

    ".mantine-Button-inner": {
      minWidth: 0,
      justifyContent: "flex-start",
    },

    ".mantine-Button-label": {
      display: "block",
      textOverflow: "ellipsis",
      height: "auto",
    }
  },

  keyIdeaText: {
    borderRadius: theme.radius.md,
  },

  moreButton: {
    justifyContent: "flex-end",
    alignSelf: "flex-end",
    marginLeft: "auto",
    width: "300px",
  }

}));

export default function SkovorodaTreatisePageDesktop({ textsData }) {
  
  const { classes } = useStyles();
  const pageLinkIndexes = {};

  function getTextBlock(textData, index) {
    
    let translationBlock = <></>;
    if (textData.translations && textData.translations.length) {
      translationBlock = <>
        <Text fw="500" mb="0" size="md">{"Переклади"}</Text>
        <List withPadding={true} listStyleType="none">
          {textData.translations.map(translation => {
            return <List.Item key={translation.id}>
              <Text span>{translation.translatedName}</Text>
              <LinkToSource source={translation.source} pageLinkIndexes={pageLinkIndexes} />
            </List.Item>
          })}
        </List>
      </>;
    }
    
    let writtenDateInfoBlock = undefined;
    if (textData.writtenDateInfo && textData.writtenDateInfo.dates && textData.writtenDateInfo.dates.length) {
      writtenDateInfoBlock = <>
        <Text mt="sm" fw="500" mb="0" size="md">Дата написання</Text>
        <List withPadding={true} listStyleType="circle">
          {textData.writtenDateInfo.dates.map((date, dateIndex) => {
            return <List.Item key={"date-"+dateIndex}>
              <Text>
                {date.text}
                <LinkToSource source={date.source} page={date.page} pageLinkIndexes={pageLinkIndexes}/>
              </Text>
            </List.Item>
          })}
        </List>
      </>
    }

    let ideasBlock = <></>;
    if (textData.keyIdeas && textData.keyIdeas.length) {
      ideasBlock = <>
        <Text mt="sm" fw="500" mb="sm" size="md">Ключові теми</Text>
        <Flex gap="md" ml="md">
          {textData.keyIdeas.map(keyIdea => {
            const color = keyIdea.color + ".0";
            return <Text py="5px" px="md" className={classes.keyIdeaText} 
              key={keyIdea.id} 
              bg={color} 
              size="sm" 
              fw={500}
            >
              {keyIdea.name}
            </Text>
          })}
        </Flex>
      </>
    }

    const href = pathJoinWithoutEndSlash(SkovorodaTreatisePath, textData.id);
    return <Card key={index} py="md" px="xl" radius="md" bg='blue.0' id={textData.id}>
      <Group>
        <Stack spacing="0">
          <Title order={3} mb="md">
            <Link key={index} href={href}>
              <a className={"undecoratedLink blackLink " + classes.textLink}>{"" + (index+1) + ". " + textData.original.originalName}</a>
            </Link>
          </Title>
          {translationBlock}
          {writtenDateInfoBlock}
          {ideasBlock}
        </Stack>
        <Link href={href}>
          <Button className={classes.moreButton} variant='outline'>Завантажити</Button>
        </Link>
      </Group>
    </Card>
  }

  function getLeftNavBlock(textData, index) {
    return <Button key={index} className={`skovoroda-left-nav-button ${classes.leftNavButton}`} 
      variant="subtle"
      size='sm'  
    >
      {"" + (index+1) + ". " + textData.original.originalName}
    </Button>
  }

  gsap.registerPlugin(ScrollToPlugin);
  useEffect(() => {
    document.querySelectorAll(".skovoroda-left-nav-button").forEach((button, index) => {
      if (textsData[index].isRegistered) {
        return;
      }
      const id = textsData[index].id
      console.log("REGISTER: "+id);
      button.addEventListener("click", () => {
        console.log("CLICK: "+id);
        gsap.to(window, {duration: 1, scrollTo:{ y: "#" + id, offsetY: 16}});
      });
      textsData[index].isRegistered = true;
    });
  });

  return <>
    
    <Container>
      <Title ta="center" order={1} mb="xl">Трактати, Діалоги, Притчі</Title>
    </Container>

    <div className={classes.leftNavMenu3}>
      <div className={classes.leftNavMenu2}>
          <Card bg="blue.1" radius="md" px="0" py="md" >
            <Stack spacing="0">
              {textsData.map(getLeftNavBlock)}
            </Stack>
          </Card>
      </div>
    </div>

    <Container>
      <Stack spacing="xl">
        {textsData.map(getTextBlock)}
      </Stack>
    </Container>
  </>
}

export async function getStaticProps({ params }) {

  return {
    props: {
      pageKey: treatisePageKey,
      textsData: SkovorodaTextsArray,
      metadataTitle: "Григорій Савич Сковорода - Трактати, Діалоги, Притчі",
      metadataDescription: "Григорій Савич Сковорода - Трактати, Діалоги, Притчі",
    },
  };
}