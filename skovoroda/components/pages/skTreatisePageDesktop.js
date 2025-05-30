import { Container, Flex, Group, List, Paper, Space, Stack, Text, Title } from "@mantine/core";
import SkColoredContainerDesktop from "../shared/skColoredContainerDesktop";
import SkH1Desktop from "../shared/skH1Desktop";
import SkH2Desktop from "../shared/skH2Desktop";
import SkImage from "../shared/skImage";
import Link from "next/link";
import SkDownloadButtonDesktop from "../shared/skDownloadButtonDesktop";
import classes from './skTreatisePageDesktop.module.scss';
import SkPageNavMenu from "../shared/skPageNavMenu";
import SkTextContentBlockDesktop from "../shared/skTextContentBlockDesktop";
import { ZmistItem } from "../shared/zmistItem";
import getTreatiseMenuLinks from "./details/getTreatiseMenuLinks";
import ZmistBullet from "./details/zmistBullet";
import SkSourcesContainerDesktop from "../shared/skSourcesContainerDesktop";
import { getIllustrationSourceParam } from "./details/pureFunctions";
import { VideoBlockDesktop } from "./details/videoBlockDesktop";

// Pure
function anySongInZmist(zmistList) {
  return zmistList && zmistList.some(item => {
    if (item.type === "song") {
      return true;
    } 
    if (item.contains && item.contains.some(subItem => subItem.includes("song"))) {
      return true;
    }
    return false;
  });
}

// Pure
function filterZmistListForSongs(zmistList) {
  return zmistList
    .filter(item => item && item.songs && item.songs.length)
    .flatMap(item => item.songs)
    .filter(song => song && song.content && song.content.length);
}

export default function SkTreatisePageDesktop({ treatise, sources, translators }) {
  
  const preferedVersion = treatise.versions.find(v => v.preferedVersion);
  const preferedTitle = preferedVersion.title;
  const original = treatise.versions.find(v => v.translatorId === 0);
  const originalSource = sources.find(s => s.sourceId === original.sourceId);
  const sourceLabel = "Джерело: ";
  const translatorLabel = "Перекладач: ";
  const isQuotesAvailable = treatise.quotes && treatise.quotes.length;
  const isZmistAvailable = treatise.zmist && treatise.zmist.list && treatise.zmist.list.length;
  const zmistSongs = isZmistAvailable ? filterZmistListForSongs(treatise.zmist.list) : [];
  const isZmistSongsAvailable = zmistSongs && zmistSongs.length > 0;
  const links = getTreatiseMenuLinks(treatise);
  const sourcesParams = [];
  if (treatise.image) {
    sourcesParams.push(getIllustrationSourceParam(treatise.image));
  }
  const videoBlock = VideoBlockDesktop(treatise);
  const highlightColor = treatise.image ? treatise.image.highlightColor : null;

  function TreatisVersionBlock(version, source) {
    const isTranslation = version.translatorId ? true : false;
    const translator = translators.find(t => t.translatorId == version.translatorId);
    return <Container className={classes.bookContainer} key={version.urlId}>
      <div className={classes.bookImage}>
        <SkImage 
          key={source.bookCoverImage.imageUrl}
          image={source.bookCoverImage} 
          width={170} 
          height={246} 
          priority
        />
      </div>
      <Stack p="0" m="0" ta="left" gap={"xs"}>
        <Text className="normalContentText normalContentText_withoutIndent">Назва: <Text fw={400} component="span">{version.title}</Text></Text>
        {isTranslation ? 
          <Text className="normalContentText normalContentText_withoutIndent">{translatorLabel}
            <Text fw={400} component="span">{translator.fullName3}</Text>
          </Text>
        : null}
        <Text className="normalContentText normalContentText_withoutIndent">Рік видання: {source.productionYear} р.</Text>
        <Text className="normalContentText normalContentText_withoutIndent">{sourceLabel}
          <Link href={source.sourceHref} title={source.sourceFullName}>{source.sourceFullName}</Link>
        </Text>
        <Group mt="md" spacing={"sm"}>
          {version.fileNames.map(fileName => {
            return <SkDownloadButtonDesktop key={fileName} fileName={fileName}/>
          })}
        </Group>
      </Stack>
    </Container>
  }

  function Quote(quote, text, index) {
    const key = "quote_" + quote.translatorId + "_" + index;
    return <Text key={key} className="readFont normalContentText">{text}</Text>
  }

  return <>
    <SkH1Desktop text={preferedTitle} color={highlightColor} maxWidth={treatise.maxTitleWidth} />
    <SkColoredContainerDesktop>
      
      <SkPageNavMenu links={links} isDesktop={true}/>

      <div className={classes.imageAndIntroContainer}>
        {treatise.image ? 
          <div className={classes.imageContainer}>
          { treatise.image.isFullWidth
              ? <SkImage image={treatise.image} priority={true} shadow={true} fullContainerWidth={true} />
              : <SkImage image={treatise.image} priority={true} shadow={true} proportionWidth={350} />
            }
          </div>
          : null}
        <div>
          <SkTextContentBlockDesktop textContent={treatise.introContent2} isv2={true} justify={false} />
        </div>
      </div>

      {/* Зміст */}
      { isZmistAvailable ? <>
        <SkH2Desktop text="Зміст твору" mb="lg" id="zmist" />
        <List spacing="xs" mb="xl" size="sm" className={classes.zmistList} icon={<ZmistBullet />}>
          { treatise.zmist.list.map((item, index) => {
            return <ZmistItem key={`zmist_${index}`} index={index} item={item} />;
          })}
        </List>
      </> : null}

      {/* Цитати */}
      { isQuotesAvailable ? <>
        <SkH2Desktop text="Цитати" mb="lg" id="quotes" />
        <Flex direction="column" gap="lg" mb="lg" className={classes.quotesContainer}>
          { treatise.quotes.flatMap(quote => quote.texts.map((text, index) => Quote(quote, text, index)))}
        </Flex>
      </> : null}

      {/* Рукопис */}
      {/* <SkH2Desktop text="Рукопис" mb="lg" id="autograph" />
      <SkImage 
        imageUrl={"/images/86-7-1-2.png"}
        optimize={false}
        width={3536}
        height={4668} 
        fullContainerWidth={true}
        priority={false}
      /> */}

      <SkH2Desktop text="Оригінал" mt="xl" mb="lg" id="downloads" />
      {TreatisVersionBlock(original, originalSource)}
      <Space h="md"/>
      <SkH2Desktop text="Переклади" mb="lg" />
      {treatise.versions.filter(v => v.translatorId).map((v, index, array) => {
        return <div key={"t"+v.translatorId}>
          {TreatisVersionBlock(v, sources.find(s => s.sourceId === v.sourceId))}
          {(index !== array.length - 1) ? <Space h="md"/> : null}
        </div>
      })}
      <Space h="xl"/>

      {/* Songs */}
      { isZmistSongsAvailable ? <>
        <SkH2Desktop text="Пісні" mb="lg" id="zmist_songs" />
        { zmistSongs.map(song => {
          return <Paper key={`zmist_song_${song.songId}`} id={`song_${song.songId}`} withBorder={false} p="md" shadow="xs">
            <Title ta={'center'} fw={700} order={3} mb="md">{song.title}</Title>
            <div className={`normalContentText normalContentText_withoutIndent`}>
              <SkTextContentBlockDesktop textContent={song.content} isv2={true} />
            </div>
          </Paper>
        })}
      </> : null}

      {/* Video */}
      {videoBlock ? <>
        {videoBlock}
        <Space h="xl"/>
      </> : null}

    </SkColoredContainerDesktop>
    <SkSourcesContainerDesktop sources={sourcesParams} />
    <Space h="xl"/>
  </>
}