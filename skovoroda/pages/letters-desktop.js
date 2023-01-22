import { Container, createStyles, Title } from '@mantine/core';
import Link from 'next/link';
import { SkovorodaTextsArray } from '../lib/data/skovorodaTexts';
import { textsPageKey } from '../lib/skovorodaConstants';
import { pathJoinWithoutEndSlash, SkovorodaTextsPath } from '../lib/skovorodaPath';

const useStyles = createStyles(() => ({
}));

export default function SkovorodaLettersPageDesktop({  }) {
  
  const { classes } = useStyles();

  return <Container>
    <Title order={1} mb="md">Листи</Title>
  </Container>
}

export async function getStaticProps({ params }) {

  return {
    props: {
      pageKey: textsPageKey,
      metadataTitle: "Григорій Савич Сковорода - Листи",
      metadataDescription: "Григорій Савич Сковорода - Листи",
    },
  };
}