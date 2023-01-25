import { Container, createStyles, Stack, Title } from '@mantine/core';
import Link from 'next/link';
import { SkovorodaLettersFrom, SkovorodaLettersTo } from '../lib/data/skovorodaLetters';
import { SkovorodaTextsArray } from '../lib/data/skovorodaTexts';
import { lettersPageKey, textsPageKey } from '../lib/skovorodaConstants';
import { pathJoin, pathJoinWithoutEndSlash, SkovorodaLettersFromPath, SkovorodaTextsPath } from '../lib/skovorodaPath';

const useStyles = createStyles(() => ({
}));

export default function SkovorodaLettersPageDesktop({ allLettersFrom }) {
  
  const { classes } = useStyles();

  return <Container>
    <Title order={1} mb="md">Григорій Савич Сковорода - Листи</Title>
    <Title order={2} mb="md">Листи від Сковороди</Title>
    <Stack mb="md">
      {allLettersFrom
        .filter(letter => letter.translatorType === "Original")
        .map((letter, index) => {

        return <Link key={index} href={pathJoin(SkovorodaLettersFromPath, letter.id)}>
          <a>{letter.name + " - " + letter.number}</a>
        </Link>
      })}
    </Stack>
    <Title order={2} mb="md">Листи до Сковороди</Title>
  </Container>
}

export async function getStaticProps({ params }) {

  const allLettersFrom = SkovorodaLettersFrom.allLetters.map(letter => letter.letterMetadata);
  const allLettersTo = SkovorodaLettersTo.allLetters.map(letter => letter.letterMetadata);

  return {
    props: {
      pageKey: lettersPageKey,
      metadataTitle: "Григорій Савич Сковорода - Листи",
      metadataDescription: "Григорій Савич Сковорода - Листи",
      allLettersFrom,
      allLettersTo,
    },
  };
}