import { Center, Grid, List } from "@mantine/core";
import { pathJoinWithoutEndSlash, SkovorodaGardenPath } from "../../lib/skovorodaPath";
import SkH1Desktop from "../../components/shared/skH1Desktop";
import SkColoredContainerDesktop from "../../components/shared/skColoredContainerDesktop";
import SkTextLink from "../../components/shared/skTextLink";
import { getGardenPageProps } from "../../lib/staticProps/gardenStatic";
import SkImage from "../../components/shared/skImage";
import { getAdjustedWidth } from "../../components/functions/imageFunctions";
import Link from "next/link";
import SkH2DesktopV2 from "../../components/shared/skH2DesktopV2";
import SkImagesGrid from "../../components/shared/skImagesGrid";

export default function SkovorodaGardenPageDesktop({ allSongsMetadata, gardenImageByOlenka }) {
  
  const translatedSongsMetadataMap = new Map();
  allSongsMetadata.forEach(songMetadata => {
    if (songMetadata.translatorId === 0) {
      return;
    }
    if (translatedSongsMetadataMap.has(songMetadata.number)) {
      return;
    }
    translatedSongsMetadataMap.set(songMetadata.number, songMetadata);
  });
  allSongsMetadata
    .filter(songMetadata => songMetadata.translatorId === 0)
    .forEach(songMetadata => {
      if (!translatedSongsMetadataMap.has(songMetadata.number)) {
        translatedSongsMetadataMap.set(songMetadata.number, songMetadata);
      }
    })
  const translatedSongsMetadataArray = Array.from(translatedSongsMetadataMap.values());
  translatedSongsMetadataArray.sort((a,b) => a.number - b.number)

  const gridImages = translatedSongsMetadataArray.filter(song => song.songImage).map(song => {
    return {
      image: song.songImage,
      href: pathJoinWithoutEndSlash(SkovorodaGardenPath, song.id),
      name: song.name
    }
  });

  return <>

    <SkH1Desktop text="Сад Божественних Пісень" withBlueImage={true}/>

    {/* TODO: Сад божественных пѣсней, прозябшій из зерн Священнаго Писанія */}
  
    {/* Garden Links */}
    <SkColoredContainerDesktop pt={-20}>
      
      <Center mr={20} mb={"lg"}>
        <SkImage image={gardenImageByOlenka} width={607} height={642} priority={true} shadow={false} />
      </Center>

      <List type="ordered" className={`normalContentText normalContentText_withoutIndent`}>
        {translatedSongsMetadataArray.map((song, index) => {
          const href = pathJoinWithoutEndSlash(SkovorodaGardenPath, song.id);
          return <List.Item key={"" + index + song.id} mb="xs">
            <SkTextLink text={song.name} title={song.name} href={href} onHoverStylesOnly={true} />
          </List.Item>
        })}
      </List>
    </SkColoredContainerDesktop>

    <SkH2DesktopV2 text="Ілюстрації" subHeader="до Саду Божественних Пісень" />
    <SkImagesGrid images={gridImages} />

  </>
}

export async function getStaticProps({ params }) {
  return getGardenPageProps();
}