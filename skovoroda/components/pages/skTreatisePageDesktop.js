import { Container, Group, List, Paper, Space, Stack, Text, Title } from "@mantine/core";
import SkColoredContainerDesktop from "../shared/skColoredContainerDesktop";
import SkH1Desktop from "../shared/skH1Desktop";
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
import { SkQuotesDesktop } from "../shared/skQuotesDesktop";
import SkReadButtonDesktop from "../shared/skReadButtonDesktop";
import SkSkovorodaTextSourcesDesktop from "./details/SkSkovorodaTextSourcesDesktop";
import SkH2DesktopV2 from "../shared/skH2DesktopV2";

// Pure
function filterZmistListForSongs(zmistList) {
  return zmistList
    .filter(item => item && item.songs && item.songs.length)
    .flatMap(item => item.songs)
    .filter(song => song && song.content && song.content.length);
}

export default function SkTreatisePageDesktop({ treatise, sources, translators, skovorodaTextSourcesData }) {
  
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
          <Link href={source.sourceHref} title={source.sourceFullName} className="blackLink">{source.sourceFullName}</Link>
        </Text>
        <Group mt="md" spacing={"sm"}>
          {version.fileNames.map(fileName => {
            return <SkDownloadButtonDesktop key={fileName} fileName={fileName} device={'desktop'} textId={treatise.urlId} />
          })}
          {version.isReadAvailable ? <SkReadButtonDesktop key={"read"} device={'desktop'} readUrlId={treatise.urlId} title={version.title} /> : null}
        </Group>
      </Stack>
    </Container>
  }

  return <>
    <SkH1Desktop text={preferedTitle} color={highlightColor} maxWidth={treatise.maxTitleWidth} isV2={true} />
    <SkColoredContainerDesktop py={0}>
      
      <SkPageNavMenu links={links} isDesktop={true}/>

      {treatise.image || treatise.introContent2 ?
      <div className={classes.imageAndIntroContainer}>
        {treatise.image ? 
          <div className={classes.imageContainer}>
          { treatise.image.isFullWidth
              ? <SkImage image={treatise.image} priority={true} shadow={false} fullContainerWidth={true} additionalClassName={classes.borderRadius} />
              : <SkImage image={treatise.image} priority={true} shadow={false} proportionWidth={350} additionalClassName={classes.image2} />
            }
          </div>
          : null}
        <div>
          <SkTextContentBlockDesktop textContent={treatise.introContent2} isv2={true} justify={false} />
        </div>
      </div> : null}

      {/* Зміст */}
      { isZmistAvailable ? <>
        <SkH2DesktopV2 text="Зміст твору" mt={treatise.image || treatise.introContent2 ? "xl" : 0} mb="lg" id="zmist" />
        <List spacing="xs" mb="xl" size="sm" className={classes.zmistList} icon={<ZmistBullet />}>
          { treatise.zmist.list.map((item, index) => {
            return <ZmistItem key={`zmist_${index}`} index={index} item={item} />;
          })}
        </List>
      </> : null}

      {/* Цитати */}
      { isQuotesAvailable ? <>
        <SkH2DesktopV2 text="Цитати" mb="lg" id="quotes" />
        <SkQuotesDesktop quotes={treatise.quotes}/>
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

      <SkH2DesktopV2 text={"Оригінал"} subHeader={"(Староукраїнська мова)"} mt="xl" mb="lg" id="downloads" />
      {TreatisVersionBlock(original, originalSource)}
      <Space h="md"/>
      <SkH2DesktopV2 text="Переклади" subHeader={"на сучасну українську мову"} mb="lg" />
      {treatise.versions.filter(v => v.translatorId).map((v, index, array) => {
        return <div key={"t"+v.translatorId}>
          {TreatisVersionBlock(v, sources.find(s => s.sourceId === v.sourceId))}
          {(index !== array.length - 1) ? <Space h="md"/> : null}
        </div>
      })}
      <Space h="xl"/>
    </SkColoredContainerDesktop>
    <SkSkovorodaTextSourcesDesktop data={skovorodaTextSourcesData} textTitle={preferedTitle} />
    <SkColoredContainerDesktop py={0}>
      {/* Songs */}
      { isZmistSongsAvailable ? <>
        <SkH2DesktopV2 text="Пісні" mb="lg" id="zmist_songs" />
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
    <Space h="xl"/>
  </>
}