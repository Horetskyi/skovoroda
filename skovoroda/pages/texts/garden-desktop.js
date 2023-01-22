import { Container, Title } from "@mantine/core";
import Link from "next/link";
import { SkovorodaGardenRefactored } from "../../lib/data/skovorodaGarden";
import { gardenPageKey } from "../../lib/skovorodaConstants";
import { pathJoinWithoutEndSlash, SkovorodaGardenPath } from "../../lib/skovorodaPath";

export default function SkovorodaGardenPageDesktop({ allSongsMetadata }) {
  
  return <>
    <Container>
      <Title order={1}>Сад божественных пѣсней, прозябшій из зерн Священнаго Писанія</Title>
      {allSongsMetadata.map((song, index) => {
        return <Link key={index} href={pathJoinWithoutEndSlash(SkovorodaGardenPath, song.id)}>{song.name}</Link>
      })}
    </Container>
  </>
}

export async function getStaticProps({ params }) {

  const allSongsMetadata = SkovorodaGardenRefactored.allSongs.map(song => song.songMetadata);

  return {
    props: {
      pageKey: gardenPageKey,
      allSongsMetadata,
      metadataTitle: "Григорій Савич Сковорода - Сад божественних пісень",
      metadataDescription: "Григорій Савич Сковорода - Сад божественних пісень",
    },
  };
}