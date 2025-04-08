import { Center, List, Space } from "@mantine/core";
import { pathJoinWithoutEndSlash, SkovorodaGardenPath } from "../../lib/skovorodaPath";
import SkH1Desktop from "../../components/shared/skH1Desktop";
import SkColoredContainerDesktop from "../../components/shared/skColoredContainerDesktop";
import SkTextLink from "../../components/shared/skTextLink";
import { getGardenPageProps } from "../../lib/staticProps/gardenStatic";
import SkImage from "../../components/shared/skImage";

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

  return <>

    <SkH1Desktop text="Сад Божественних Пісень"/>

    {/* TODO: Сад божественных пѣсней, прозябшій из зерн Священнаго Писанія */}
  
    {/* Garden Links */}
    <SkColoredContainerDesktop>
      
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
  </>
}

export async function getStaticProps({ params }) {
  return getGardenPageProps();
}