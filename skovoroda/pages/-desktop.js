import { Container, Title } from '@mantine/core';
import Head from 'next/head'
import Image from 'next/image'
import { homePageKey } from '../lib/skovorodaConstants';

export default function HomeDesktop() {
  return <>
    <Container>
      <Title mb="xl" order={1}>Григорій Савич Сковорода</Title>

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