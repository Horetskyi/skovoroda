import { Button, Card, Container, createStyles, Flex, Group, List, Stack, Text, Title } from '@mantine/core';
import Link from 'next/link';
import LinkToSource from '../../components/textSourceLinkWithTooltip';
import { SkovorodaTextsArray } from '../../lib/data/skovorodaTexts';
import { treatisePageKey } from '../../lib/skovorodaConstants';
import { pathJoinWithoutEndSlash, SkovorodaTreatisePath } from '../../lib/skovorodaPath';
import SkovorodaLeftNavMenuDesktop from '../../components/skovorodaLeftNavMenuDesktop';

const useStyles = createStyles((theme) => ({
  
  textLink: {
    color: theme.colors.blue[8]
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

  return <>
    
    <Container>
      <Title ta="center" order={1} mb="xl">Трактати, Діалоги, Притчі</Title>
    </Container>

    <SkovorodaLeftNavMenuDesktop withOrderNumbers={true} items={textsData.map(textData => {
      return {
        label: textData.original.originalName,
        id: textData.id
      };
    })} />

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