import { Container, Group, Space, Stack, Text, createStyles } from "@mantine/core";
import SkColoredContainerDesktop from "../shared/skColoredContainerDesktop";
import SkH1Desktop from "../shared/skH1Desktop";
import SkH2Desktop from "../shared/skH2Desktop";
import SkImage from "../shared/skImage";
import Link from "next/link";
import SkDownloadButtonDesktop from "../shared/skDownloadButtonDesktop";

const useStyles = createStyles((theme) => ({
  
  bookContainer: {
    display: "flex",
  },
  bookImage: {
    borderRadius: theme.radius.md,
    boxShadow: theme.shadows.lg,
    minWidth: "max-content",
    lineHeight: 0,
    width: 170,
    height: 246,
    img: {
      borderRadius: theme.radius.md,
      objectFit: "cover",
    },
    marginRight: theme.spacing.md, 
  },

}));

export default function SkTreatisePageDesktop({ treatise, sources, translators }) {
  
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
      <Stack p="0" m="0" ta="left" spacing="xs">
        <Text className="normalContentText normalContentText_withoutIndent">Назва: {version.title}</Text>
        {isTranslation ? 
          <Text className="normalContentText normalContentText_withoutIndent">{translatorLabel}
            <Text fw={400} component="span">{translator.fullName3}</Text>
          </Text>
        : null}
        <Text className="normalContentText normalContentText_withoutIndent">Рік видання: {source.productionYear} р.</Text>
        <Text className="normalContentText normalContentText_withoutIndent">{sourceLabel}
          <Link href={source.sourceHref}>{source.sourceFullName}</Link>
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
    <SkColoredContainerDesktop>
      <SkH1Desktop text={preferedTitle} mb="lg" />
      <SkH2Desktop text="Оригінал" mb="md" />
      {TreatisVersionBlock(original, originalSource)}
      <Space h="md"/>
      <SkH2Desktop text="Переклади" mb="md" />
      {treatise.versions.filter(v => v.translatorId).map((v, index, array) => {
        return <div key={"t"+v.translatorId}>
          {TreatisVersionBlock(v, sources.find(s => s.sourceId === v.sourceId))}
          {(index !== array.length - 1) ? <Space h="md"/> : null}
        </div>
      })}
    </SkColoredContainerDesktop>
  </>
}