import { Card, Container, Flex, Group, Space, Stack, Text } from "@mantine/core";
import SkColoredContainerDesktop from "../shared/skColoredContainerDesktop";
import SkH1Desktop from "../shared/skH1Desktop";
import SkH2Desktop from "../shared/skH2Desktop";
import SkImage from "../shared/skImage";
import Link from "next/link";
import SkDownloadButtonDesktop from "../shared/skDownloadButtonDesktop";
import classes from './skTreatisePageDesktop.module.scss';
import SkPageNavMenu from "../shared/skPageNavMenu";

export default function SkTreatisePageDesktop({ treatise, sources, translators }) {
  
  const preferedVersion = treatise.versions.find(v => v.preferedVersion);
  const preferedTitle = preferedVersion.title;
  const original = treatise.versions.find(v => v.translatorId === 0);
  const originalSource = sources.find(s => s.sourceId === original.sourceId);
  const sourceLabel = "Джерело: ";
  const translatorLabel = "Перекладач: ";
  const isQuotesAvailable = treatise.quotes && treatise.quotes.length;
  const links = [];
  if (isQuotesAvailable) {
    links.push({
      href: "#quotes",
      text: "Цитати",
      title: "Цитати - " + preferedTitle,
    });
  }
  links.push({
    href: "#downloads",
    text: "Скачати",
    title: "Скачати - " + preferedTitle,
  });

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
        <Text className="normalContentText normalContentText_withoutIndent">Назва: {version.title}</Text>
        {isTranslation ? 
          <Text className="normalContentText normalContentText_withoutIndent">{translatorLabel}
            <Text fw={400} component="span">{translator.fullName3}</Text>
          </Text>
        : null}
        <Text className="normalContentText normalContentText_withoutIndent">Рік видання: {source.productionYear} р.</Text>
        <Text className="normalContentText normalContentText_withoutIndent">{sourceLabel}
          <Link href={source.sourceHref} title={source.sourceFullName}>{source.sourceFullName}</Link>
        </Text>
        <Group mt="sm" spacing={"sm"}>
          {version.fileNames.map(fileName => {
            return <SkDownloadButtonDesktop key={fileName} fileName={fileName}/>
          })}
        </Group>
      </Stack>
    </Container>
  }

  function Quote(quote, text, index) {
    const key = "quote_" + quote.translatorId + "_" + index;
    return <Text key={key} className="normalContentText">{text}</Text>
  }

  return <>
    <SkColoredContainerDesktop>
      <SkH1Desktop text={preferedTitle} mb="lg" />
      <SkPageNavMenu links={links} isDesktop={true}/>
      { isQuotesAvailable ? <>
        <SkH2Desktop text="Цитати" mb="lg" id="quotes" />
        <Flex direction="column" gap="lg" mb="lg">
          { treatise.quotes.flatMap(quote => quote.texts.map((text, index) => Quote(quote, text, index)))}
        </Flex>
      </> : null}
      <SkH2Desktop text="Оригінал" mb="lg" id="downloads" />
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
    </SkColoredContainerDesktop>
  </>
}