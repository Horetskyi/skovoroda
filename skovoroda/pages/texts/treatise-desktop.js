import { Button, Card, Container, createStyles, Flex, Group, List, Stack, Text, Title } from '@mantine/core';
import Link from 'next/link';
import LinkToSource from '../../components/textSourceLinkWithTooltip';
import { SkovorodaTextsArray } from '../../lib/data/skovorodaTexts';
import { treatisePageKey } from '../../lib/skovorodaConstants';
import { pathJoinWithoutEndSlash, SkovorodaTreatisePath } from '../../lib/skovorodaPath';
import SkovorodaLeftNavMenuDesktop from '../../components/skovorodaLeftNavMenuDesktop';
import { useState } from 'react';
import { SkovorodaKeyIdeasArray, SkovorodaKeyIdeasMap } from '../../lib/data/skovorodaKeyIdeas';
import { IconX } from '@tabler/icons';

const useStyles = createStyles((theme) => ({
  
  textLink: {
    color: theme.colors.blue[8]
  },

  keyIdeaText: {
    borderRadius: theme.radius.md,
    color: "black"
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

  const [filteredKeyIdeaIds, setFilteredKeyIdeaIds] = useState([]);

  function onKeyIdeaClick(keyIdeaId) {
    if (filteredKeyIdeaIds.includes(keyIdeaId)) {
      const newFilteredKeyIdeaIds = filteredKeyIdeaIds.filter(id => id !== keyIdeaId);
      setFilteredKeyIdeaIds(newFilteredKeyIdeaIds);
      return;
    }
    const newFilteredKeyIdeaIds = [...filteredKeyIdeaIds, keyIdeaId];
    newFilteredKeyIdeaIds.sort((a,b) => SkovorodaKeyIdeasMap.get(a).index - SkovorodaKeyIdeasMap.get(b).index);
    setFilteredKeyIdeaIds(newFilteredKeyIdeaIds);
  }

  function getKeyIdeaButton(keyIdea) {
    
    const isFiltered = filteredKeyIdeaIds.includes(keyIdea.id);

    const rightIcon = isFiltered 
      ? <IconX color='black' size={20} m="0" p="0" />
      : undefined;
    
    return <Button 
        className={classes.keyIdeaText} 
        key={keyIdea.id} 
        color={`${keyIdea.color}.1`} 
        variant="filled"
        size="sm"
        onClick={() => onKeyIdeaClick(keyIdea.id)}
        rightIcon={rightIcon}
      >
        {keyIdea.name}
      </Button>
  }

  function filterTextData(textData) {
    if (!filteredKeyIdeaIds || !filteredKeyIdeaIds.length) {
      return true; // filter disabled
    }
    if (!textData.keyIdeas || !textData.keyIdeas.length) {
      return false;
    }
    const textDataKeyIdeasIds = textData.keyIdeas.map(idea => idea.id);
    return filteredKeyIdeaIds.every(id => textDataKeyIdeasIds.includes(id));
  }

  function getTextBlock(textData, index) {
    
    let translationBlock = <></>;
    if (textData.translations && textData.translations.length) {
      translationBlock = <>
        <Text fw="400" mb="0" size="md" color="gray.7">{"Переклади:"}</Text>
        <List withPadding={true} listStyleType="circle">
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
        <Text mt="sm" fw="400" mb="0" size="md">Дата написання:</Text>
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
        <Text mt="sm" fw="400" mb="sm" size="md">Ключові теми:</Text>
        <Flex gap="md" wrap="wrap">
          {textData.keyIdeas.map(getKeyIdeaButton)}
        </Flex>
      </>
    }

    const href = pathJoinWithoutEndSlash(SkovorodaTreatisePath, textData.id);
    return <Card key={index} p="md" radius="md" bg="gray.0" withBorder={true} id={textData.id}>
      
      <Title order={2} mb="md" ta="left" fw={400}>
        <Link key={index} href={href} className={"undecoratedLink blackLink " + classes.textLink}>
          <span>{"" + (index + 1) + ". "}</span>
          <span className='fontFamilyOldUa'>{textData.original.originalName}</span>
        </Link>
      </Title>
      
      <Group>
        
        <Stack spacing="0">
          {translationBlock}
          {writtenDateInfoBlock}
          {ideasBlock}
        </Stack>

        <Link href={href} className={classes.moreButton}>
          <Button className={classes.moreButton} variant='light'>Завантажити</Button>
        </Link>
      
      </Group>
    </Card>
  }

  const filteredTextsData = textsData.filter(filterTextData);

  return <>
    
    <Container>
      <Title ta="center" order={1} mb="xl" className='bigH1 fontFamilyOldUa'>Трактати, Діалоги, Притчі</Title>
    </Container>

    <SkovorodaLeftNavMenuDesktop withOrderNumbers={true} items={filteredTextsData.map(textData => {
      return {
        label: textData.original.originalName,
        id: textData.id
      };
    })} />

    { filteredKeyIdeaIds.length ? <>
      <Container mb="xl">
        <Flex gap="md" wrap="wrap">
          {filteredKeyIdeaIds.map(keyIdeaId => {
            const keyIdea = SkovorodaKeyIdeasMap.get(keyIdeaId);
            return getKeyIdeaButton(keyIdea);
          })}
        </Flex>
      </Container>
    </> : <></>}

    <Container>
      <Stack spacing="xl">
        {filteredTextsData.map(getTextBlock)}
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