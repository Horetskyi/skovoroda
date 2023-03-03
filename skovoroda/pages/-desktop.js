import { Button, Container, createStyles, Group, SimpleGrid, Title } from '@mantine/core';
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link';
import SkovorodaFountain from '../components/skovorodaFountain';
import { homePageKey } from '../lib/skovorodaConstants';
import { SkovorodaBioPath, SkovorodaLettersPath, SkovorodaTextsPath } from '../lib/skovorodaPath';

const useStyles = createStyles((theme) => ({

  button: {
    flexGrow: 1,
  }

}));

export default function HomeDesktop() {

  const { classes } = useStyles();

  const items = [
    {
      href: SkovorodaBioPath,
      label: "Біографія",
    },
    {
      href: SkovorodaTextsPath,
      label: "Твори",
    },
    {
      href: SkovorodaLettersPath,
      label: "Листи",
    },
  ]

  return <>
    <Container>
      <Title className="fontFamilyOldUa bigH1" mb={20} mt="xl" ta={"center"} order={1}>Григорій Савич Сковорода</Title>
      <SkovorodaFountain />
      <SimpleGrid mt="xl" cols={3} >
        {items.map((item, index) => {
          return <Link key={index} href={item.href}><a>
            <Button w="100%" variant='light' size='xl' className={`fontFamilyOldUa ${classes.button}`}>{item.label}</Button>
          </a></Link>
        })}
      </SimpleGrid>
    </Container>
  </>
}

export async function getStaticProps({ params }) {

  return {
    props: {
      pageKey: homePageKey,
      metadataTitle: "Григорій Савич Сковорода",
      metadataDescription: "Григорій Савич Сковорода",
    },
  };
}