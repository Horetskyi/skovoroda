import { Center, Flex, List } from "@mantine/core";
import { pathJoinWithoutEndSlash, SkovorodaGardenPath } from "../../lib/skovorodaPath";
import SkTextLink from "../../components/shared/skTextLink";
import { getGardenPageProps } from "../../lib/staticProps/gardenStatic";
import SkColoredContainerMobile from "../../components/shared/skColoredContainerMobile";
import SkH1Mobile from "../../components/shared/skH1Mobile";
import SkImage from "../../components/shared/skImage";
import Link from "next/link";
import { getAdjustedWidth } from "../../components/functions/imageFunctions";

export default function SkovorodaGardenPageMobile({ allSongsMetadata, gardenImageByOlenka }) {
  
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

  return <>

    {/* H1 */}
    <SkH1Mobile text="Сад Божественних Пісень"/>
    {/* Сад божественных пѣсней, прозябшій из зерн Священнаго Писанія */}

    <Center mr={20} mt={"sm"}>
      <SkImage image={gardenImageByOlenka} width={290} height={310} priority={true} shadow={false} optimize={true} />
    </Center>

    {/* Garden Links */}
    <SkColoredContainerMobile px="md">
      <List type="ordered" className={`normalContentText normalContentText_withoutIndent`}>
        {translatedSongsMetadataArray.map((song, index) => {
          const href = pathJoinWithoutEndSlash(SkovorodaGardenPath, song.id);
          return <List.Item key={"" + index + song.id} mb="xs">
            <SkTextLink text={song.name} title={song.name} href={href} disableStyles={false} />
          </List.Item>
        })}
      </List>
    </SkColoredContainerMobile>

    <Flex mt={"lg"} mb={"xl"} px={"sm"} gap={"xl"} direction={"column"} ta={"center"}>
      {translatedSongsMetadataArray.filter(song => song.songImage).map((song, index) => {
        const image = song.songImage;
        const href = pathJoinWithoutEndSlash(SkovorodaGardenPath, song.id);
        return <Link href={href} title={song.name} key={"" + index + song.id} mx={"auto"}>
          <SkImage 
            image={image}
            fullWidth={true}
            priority={false} 
            shadow={false}
            alt={song.name}
            optimize={false}
            styleAction={(style) => {
              style.marginLeft = "auto";
              style.marginRight = "auto";
            }}
          />
        </Link>
      })}
    </Flex>

  </>
}

export async function getStaticProps({ params }) {
  return getGardenPageProps();
}