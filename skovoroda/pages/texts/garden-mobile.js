import { Center, List } from "@mantine/core";
import { pathJoinWithoutEndSlash, SkovorodaGardenPath } from "../../lib/skovorodaPath";
import SkTextLink from "../../components/shared/skTextLink";
import { getGardenPageProps } from "../../lib/staticProps/gardenStatic";
import SkColoredContainerMobile from "../../components/shared/skColoredContainerMobile";
import SkH1Mobile from "../../components/shared/skH1Mobile";
import SkImage from "../../components/shared/skImage";
import SkH2MobileV2 from "../../components/shared/skH2MobileV2";
import SkImagesList from "../../components/shared/skImagesList";
import { getPreparedSongsTranslationsList } from "../../lib/staticProps/gardenSongLogic";

export default function SkovorodaGardenPageMobile({ allSongsMetadata, gardenImageByOlenka }) {

  const translatedSongsMetadataArray = getPreparedSongsTranslationsList(allSongsMetadata);
  const imagesList = translatedSongsMetadataArray.filter(song => song.songImage).map(song => {
    return {
      image: song.songImage,
      href: pathJoinWithoutEndSlash(SkovorodaGardenPath, song.id),
      name: song.name
    }
  });

  gardenImageByOlenka.imageUrl = gardenImageByOlenka.imageUrl.replace("/garden/", "/garden mobile/");
  if (gardenImageByOlenka.height) {
    const prevHeight = gardenImageByOlenka.height;
    gardenImageByOlenka.height = 600;
    gardenImageByOlenka.width = Math.round((gardenImageByOlenka.width / prevHeight) * 600);
  }

  return <>

    {/* H1 */}
    <SkH1Mobile text="Сад Божественних Пісень" withBlueImage={true} mb={"xl"} />
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

    <SkH2MobileV2 text={"Ілюстрації"} subHeader="до Саду Божественних Пісень" />
    <SkImagesList images={imagesList} />

  </>
}

export async function getStaticProps({ params }) {
  return getGardenPageProps();
}