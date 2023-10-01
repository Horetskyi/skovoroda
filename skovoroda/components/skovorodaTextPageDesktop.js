
import { Button, Card, Container, Divider, Flex, Stack, Table, Text, Title, createStyles } from '@mantine/core';
import SkovorodaTreatiseSmallBlockDesktop from './SkovorodaTreatiseSmallBlockDesktop';
import LinkToSource from './textSourceLinkWithTooltip';
import { IconBookDownload } from '@tabler/icons';

const useStyles = createStyles((theme) => {
  return {
    h1: {
      width: "fit-content",
      marginLeft: "auto",
      marginRight: "auto",
    },
    h1Divider: {
      marginLeft: theme.spacing.md * -1,
      marginRight: theme.spacing.md * -1,
      marginTop: theme.spacing.sm,
    },
    downloadButton: {
      width: "100%",
    },
    downloadButtonIcon: {
      display: "flex"
    },
    downloadButtonExtensionName: {
      display: "flex",
    },
    downloadButtonFileSize: {
      display: "flex",
    },
  }
});

export default function SkovorodaTextPageDesktop({ treatise }) {

  const { classes } = useStyles();
  const pageLinkIndexes = {};
  const descriptionBlock = <Card radius="md" p="md" m="0" mb="xl" bg="gray.0" shadow='xs'>
    <Text key="label">
      Твір написаний:
    </Text>
    {textData.writtenDateInfo.dates.map((date, index) => {
      return <Text key={"date-"+index}>
        {date.text}
        <LinkToSource source={date.source} page={date.page} pageLinkIndexes={pageLinkIndexes}/>
      </Text>
    })}
  </Card>
  const original = textData.original;
  const originalBlock = <SkovorodaTreatiseSmallBlockDesktop
    key={"original"}
    imageSrc={original.source.bookCoverImageSrc}
    sourceHref={original.source.sourceHref}
    sourceName={original.source.sourceName}
    textName={original.originalName}
    textType="original"
    files={original.files}
  />
  const translationBlocks = textData.translations.map((translation, index) => {
    return <SkovorodaTreatiseSmallBlockDesktop 
      key={"translation-"+index}
      imageSrc={translation.source.bookCoverImageSrc}
      sourceHref={translation.source.sourceHref}
      sourceName={translation.source.sourceName}
      translatorName={translation.translator.fullName}
      textName={translation.translatedName}
      textType="translation"
      files={translation.files}
    />
  }); 

  return <Container>
    <Title 
      order={1} 
      ta="center"
      mb="xl"
      className={classes.h1}
    >
      {textData.original.originalName}
      <Divider className={classes.h1Divider}/>
      {textData.translations[0].translatedName}
    </Title>
    {descriptionBlock}
    {originalBlock}
    {translationBlocks}
    <Stack justify="flex-start" spacing="xs">
    </Stack>
  </Container>
}

function TextManyDownloadsBlock(textData, pageLinkIndexes, classes) {
  const allFiles = [];
  textData.original.files.forEach(file => {
    allFiles.push({ ...file, type: "original", source: textData.original.source, name: textData.original.originalName });
  });
  textData.translations.forEach(translation => {
    translation.files.forEach(file => {
      allFiles.push({ ...file, type: "translation", source: translation.source, name: translation.translatedName });
    });
  });
  return <Card radius="md" p="md" mx="0" my="xl" bg="gray.0" shadow='xs'>
    <Table highlightOnHover={true}>
      <tr>
        <th>Назва</th>
        <th></th>
        <th>Завантажити</th>
      </tr>
      {allFiles.map(file => {
        return <tr key={file.fileName}>
          <td>{file.name}<LinkToSource source={file.source} pageLinkIndexes={pageLinkIndexes}/></td>
          <td>{file.type === "original" ? "Оригінал" : "Переклад"}</td>
          <td>{DownloadButton(file, classes)}</td>
        </tr>
      })}
    </Table>
  </Card>
}

function DownloadButton(file, classes) {
  return <Button 
    title={file.fileName}
    variant="light"
    color="green"
    className={classes.downloadButton}>
    <Flex justify='space-between' direction="row">
      <IconBookDownload className={classes.downloadButtonIcon}/>
      <Text className={classes.downloadButtonExtensionName}>{file.fileExtensionUppercase.replace(".","")}</Text>
      <Text className={classes.downloadButtonFileSize}>({file.fileSize})</Text>
    </Flex>
  </Button>
}