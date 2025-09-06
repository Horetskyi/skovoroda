import { Center, Container, Flex, Group, List, Space, Stack, Text } from "@mantine/core";
import SkImage from "../shared/skImage";
import Link from "next/link";
import SkDownloadButtonDesktop from "../shared/skDownloadButtonDesktop";
import SkColoredContainerMobile from "../shared/skColoredContainerMobile";
import SkH1Mobile from "../shared/skH1Mobile";
import SkH2Mobile from "../shared/skH2Mobile";
import SkPageNavMenu from "../shared/skPageNavMenu";
import classes from './skTreatisePageMobile.module.scss';
import SkMetaTextView from "../shared/skMetaTextView";
import getTreatiseMenuLinks from "../../lib/utils/menus/getTreatiseMenuLinks";
import ZmistBullet from "./details/zmistBullet";
import { ZmistItem } from "../shared/zmistItem";
import { getIllustrationSourceParam } from "./details/pureFunctions";
import SkSourcesContainerMobile from "../shared/skSourcesContainerMobile";
import { VideoBlockMobile } from "./details/videoBlockMobile";
import { SkQuotesDesktop } from "../shared/skQuotesDesktop";
import SkReadButtonDesktop from "../shared/skReadButtonDesktop";
import SkSkovorodaTextSourcesDesktop from "./details/SkSkovorodaTextSourcesDesktop";

export default function SkTreatisePageMobile({ treatise, sources, translators, skovorodaTextSourcesData }) {

  const preferedVersion = treatise.versions.find(v => v.preferedVersion);
  const preferedTitle = preferedVersion.title;
  const original = treatise.versions.find(v => v.translatorId === 0);
  const originalSource = sources.find(s => s.sourceId === original.sourceId);
  const sourceLabel = "Джерело: ";
  const translatorLabel = "Перекладач: ";
  const isQuotesAvailable = treatise.quotes && treatise.quotes.length;
  const isZmistAvailable = treatise.zmist && treatise.zmist.list && treatise.zmist.list.length;
  const sourcesParams = [];
  if (treatise.image) {
    sourcesParams.push(getIllustrationSourceParam(treatise.image));
  }
  const links = getTreatiseMenuLinks(treatise, sourcesParams, skovorodaTextSourcesData);
  const videoBlock = VideoBlockMobile(treatise);
  const highlightColor = treatise.image ? treatise.image.highlightColor : null;

  function TreatisVersionBlock(version, source) {
    
    const isTranslation = version.translatorId ? true : false;
    const translator = translators.find(t => t.translatorId == version.translatorId);
    const readUrlId = treatise.urlId + (isTranslation ? ("_" + translator.urlId) : "");

    return <Container key={version.urlId} p="0">
      <Center>
        <SkImage 
          key={source.bookCoverImage.imageUrl}
          image={source.bookCoverImage} 
          width={170} 
          height={246} 
          priority
          optimize={true}
        />
      </Center>
      <Space h="md"/>
      
      <Stack p="0" m="0" ta="left" gap="xs">
        <Text className="normalContentText normalContentText_withoutIndent">Назва: <Text fw={400} component="span" className="normalContentText normalContentText_withoutIndent">{version.title}</Text></Text>
        {isTranslation ? 
          <Text className="normalContentText normalContentText_withoutIndent">{translatorLabel}
            <Text fw={400} component="span" className="normalContentText normalContentText_withoutIndent">{translator.fullName3}</Text>
          </Text>
        : null}
        <Text className="normalContentText normalContentText_withoutIndent">Рік видання: {source.productionYear} р.</Text>
        <Text className="normalContentText normalContentText_withoutIndent">{sourceLabel}
          <Link href={source.sourceHref} title={source.sourceFullName}>{source.sourceFullName}</Link>
        </Text>
        <Group mt="sm" spacing={"sm"}>
          {version.fileNames.map(fileName => {
            return <SkDownloadButtonDesktop key={fileName} fileName={fileName} device={'mobile'} textId={treatise.urlId} />
          })}
          {version.isReadAvailable ? <SkReadButtonDesktop key={"read"} device={'mobile'} readUrlId={readUrlId} title={version.title} /> : null}
        </Group>
      </Stack>
    </Container>
  }

  return <>
    <SkH1Mobile text={preferedTitle} color={highlightColor} withBlueImage={true} />
    <SkColoredContainerMobile px="md">

      {treatise.image ? 
        <div className={classes.imageContainer}>
          <SkImage image={treatise.image} priority={true} optimize={true} gentlyShadow={true} fullWidth={true} />
        </div>
        : null}
        
      <SkPageNavMenu links={links} isDesktop={false}/>

      {treatise.introContent2 && treatise.introContent2.lines && treatise.introContent2.lines.length ? <>
        <SkH2Mobile text="Опис твору" mt="xl" mb="md" id="description" />
        <SkMetaTextView metaText={treatise.introContent2} isMobile={true} otherArgs={{ isv2: true }} />
        <Space h="lg" />
      </> : null}
      
      {/* Зміст */}
      { isZmistAvailable ? <>
        <Space h={(treatise.image || treatise.introContent2) ? "xl" : 0}/>
        <SkH2Mobile text="Зміст твору" mb="lg" id="zmist" />
        <List spacing="md" mb="lg" size="sm" className={classes.zmistList} icon={<ZmistBullet />}>
          { treatise.zmist.list.map((item, index) => {
            return <ZmistItem key={`zmist_${index}`} index={index} 
              item={item} 
              chipsWithoutBackground={true}
              isMobile={true} />;
          })}
        </List>
      </> : null}

      { isQuotesAvailable ? <>
        <SkH2Mobile id="quotes" mt={"xl"} text="Цитати" mb="md" />
        <SkQuotesDesktop quotes={treatise.quotes} />
      </> : null}

      <SkH2Mobile text="Оригінал" mb="md" id="downloads" />
      {TreatisVersionBlock(original, originalSource)}
      
      <Space h="xl"/>
      
      <SkH2Mobile text="Переклади" mb="md" />
      {treatise.versions.filter(v => v.translatorId).map((v, index, array) => {
        return <div key={"t"+v.translatorId}>
          {TreatisVersionBlock(v, sources.find(s => s.sourceId === v.sourceId))}
          {(index !== array.length - 1) ? <Space h="md"/> : null}
        </div>
      })}
      <Space h="lg"/>
      <SkSkovorodaTextSourcesDesktop data={skovorodaTextSourcesData} textTitle={preferedTitle} isMobile={true} />

      {/* Video */}
      {videoBlock ? <>
        {videoBlock}
        <Space h="xl"/>
      </> : null}

    </SkColoredContainerMobile>
    <SkSourcesContainerMobile sources={sourcesParams} />
  </>
}