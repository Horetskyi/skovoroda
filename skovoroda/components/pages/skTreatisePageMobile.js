import { Center, Container, Group, Space, Stack, Text, createStyles } from "@mantine/core";
import SkImage from "../shared/skImage";
import Link from "next/link";
import SkDownloadButtonDesktop from "../shared/skDownloadButtonDesktop";
import SkColoredContainerMobile from "../shared/skColoredContainerMobile";
import SkH1Mobile from "../shared/skH1Mobile";
import SkH2Mobile from "../shared/skH2Mobile";

const useStyles = createStyles((theme) => ({
}));

export default function SkTreatisePageMobile({ treatise, sources, translators }) {
  
  const { classes } = useStyles();

  const preferedVersion = treatise.versions.find(v => v.preferedVersion);
  const preferedTitle = preferedVersion.title;
  const original = treatise.versions.find(v => v.translatorId === 0);
  const originalSource = sources.find(s => s.sourceId === original.sourceId);
  const sourceLabel = "Джерело: ";
  const translatorLabel = "Перекладач: ";

  function TreatisVersionBlock(version, source) {
    const isTranslation = version.translatorId ? true : false;
    const translator = translators.find(t => t.translatorId == version.translatorId);
    return <Container key={version.urlId} p="0">
      <Center>
        <SkImage 
          key={source.bookCoverImage.imageUrl}
          image={source.bookCoverImage} 
          width={170} 
          height={246} 
          priority
        />
      </Center>
      <Space h="md"/>
      
      <Stack p="0" m="0" ta="left" spacing="xs">
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

  return <>
    <SkColoredContainerMobile px="md">
      <SkH1Mobile text={preferedTitle} mb="md"/>
      <SkH2Mobile text="Оригінал" mb="md" />
      {TreatisVersionBlock(original, originalSource)}
      <Space h="md"/>
      <SkH2Mobile text="Переклади" mb="md" />
      {treatise.versions.filter(v => v.translatorId).map((v, index, array) => {
        return <div key={"t"+v.translatorId}>
          {TreatisVersionBlock(v, sources.find(s => s.sourceId === v.sourceId))}
          {(index !== array.length - 1) ? <Space h="md"/> : null}
        </div>
      })}
    </SkColoredContainerMobile>
  </>
}