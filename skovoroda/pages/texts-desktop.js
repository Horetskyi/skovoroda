import { Card, Container, Image, SimpleGrid, Title } from '@mantine/core';
import Link from 'next/link';
import { textsPageKey } from '../lib/skovorodaConstants';
import { SkovorodaDifferentPath, SkovorodaFablesPath, SkovorodaGardenPath, SkovorodaOtherPoemsPath, SkovorodaTranslatationsPath, SkovorodaTreatisePath } from '../lib/skovorodaPath';
import classes from './texts-desktop.module.scss';

export default function SkovorodaTextsPageDesktop({ }) {
  
  const items = [
    {
      path: SkovorodaTreatisePath,
      label: "Трактати, Діалоги, Притчі",
      imageSrc: "/images/books1.jpg",
    },
    {
      path: SkovorodaGardenPath,
      label: "Сад божественних пісень",
      imageSrc: "/images/garden1.jpg",
    },
    {
      path: SkovorodaOtherPoemsPath,
      label: "Інші поезії",
      imageSrc: "/images/pero.jpg",
    },
    {
      path: SkovorodaFablesPath,
      label: "Байки Харківські",
      imageSrc: "/images/aesops_fables.jpg",
    },
    {
      path: SkovorodaTranslatationsPath,
      label: "Переклади",
      imageSrc: "/images/old-latin.webp",
    },
    {
      path: SkovorodaDifferentPath,
      label: "Різне",
      imageSrc: "/images/others.jpg",
    },
  ];

  return <Container>
    <Title className="fontFamilyOldUa bigH1" order={1} mx={"auto"} ta="center" mb="xl">Твори</Title>
    <SimpleGrid cols={2} spacing="xl" verticalSpacing="xl" mb="xl">
      {items.map((item, index) => {
        return <Link key={index} href={item.path} className={`undecoratedLink blackLink ${classes.link}`}>
          <Card radius="md" p="0" withBorder={true} shadow="md" className={classes.card}>
            <Image 
              className={classes.image}
              src={item.imageSrc}
              alt={item.label}
              height={300}
            />
            <Title className='fontFamilyOldUa' order={2} ta="center" py="md" bg="green.0">{item.label}</Title>
          </Card>
        </Link>
      })}
    </SimpleGrid>
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