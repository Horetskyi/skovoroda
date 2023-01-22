import { Container, createStyles, Stack, Text, Title } from '@mantine/core';
import Link from 'next/link';
import { textsPageKey } from '../lib/skovorodaConstants';
import { SkovorodaDifferentPath, SkovorodaFablesPath, SkovorodaGardenPath, SkovorodaOtherPoemsPath, SkovorodaTranslatationsPath, SkovorodaTreatisePath } from '../lib/skovorodaPath';

const useStyles = createStyles((theme) => ({

}));

export default function SkovorodaTextsPageDesktop({ }) {
  
  const { classes } = useStyles();

  const items = [
    {
      path: SkovorodaTreatisePath,
      label: "Трактати, Діалоги, Притчі",
      progress: "в процесі",
    },
    {
      path: SkovorodaGardenPath,
      label: "Сад божественних пісень",
      progress: "в процесі",
    },
    {
      path: SkovorodaOtherPoemsPath,
      label: "Інші поезії",
      progress: "в майбутньому",
    },
    {
      path: SkovorodaFablesPath,
      label: "Байки Харківські",
      progress: "в майбутньому",
    },
    {
      path: SkovorodaTranslatationsPath,
      label: "Переклади",
      progress: "в майбутньому",
    },
    {
      path: SkovorodaDifferentPath,
      label: "Різне",
      progress: "в майбутньому",
    },
  ];

  return <Container>
    <Title order={1} mb="md">Твори</Title>
    <Stack>
      {items.map((item, index) => {
        return <div key={index}>
          <Link href={item.path}><a>{item.label}</a></Link>
          <Text span ml="xs">{"("+item.progress+")"}</Text>
        </div>
      })}
    </Stack>
  </Container>
}

export async function getStaticProps({ params }) {

  return {
    props: {
      pageKey: textsPageKey,
      metadataTitle: "Твори - Григорій Савич Сковорода",
      metadataDescription: "Твори - Григорій Савич Сковорода",
    },
  };
}