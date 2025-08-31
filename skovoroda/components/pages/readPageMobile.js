import { Center, Container, Space } from "@mantine/core";
import SkH1Mobile from "../shared/skH1Mobile";
import SkMetaTextView from "../shared/skMetaTextView";
import SkImage from "../shared/skImage";
import SkRelatedTags from "../shared/skRelatedTags";
import SkSourcesContainerMobile from "../shared/skSourcesContainerMobile";
import SkReadSkovorodaSource from "./details/skReadSkovorodaSource";
import { getAggregatedSourcesParams } from "./details/pureFunctions";
import NotesDesktop from "./details/notesDesktop";
import DownloadsDesktop from "./details/downloadsDesktop";
import SkAuthorDesktop from "./details/skAuthorDesktop";
import SkAuthorMobile from "./details/skAuthorMobile";

export default function ReadPageMobile({ selectedRead }) {

  return (
    <>
      <SkH1Mobile text={selectedRead.title} />

      {selectedRead.image ? (
        <>
          <Center>
            <SkImage
              image={selectedRead.image}
              fullWidth={true}
              width={selectedRead.image.width}
              height={selectedRead.image.height}
              shadow={"md"}
              alt={selectedRead.image.alt}
              title={selectedRead.image.title}
              priority={true}
              optimize={true}
            />
          </Center>
          <Space h="md" />
        </>
      ) : null}

      <Container px={"md"}>

        <DownloadsDesktop fileNames={selectedRead.fileNames} withHeader={false} device={'mobile'} textId={selectedRead.urlId} />
        <SkMetaTextView metaText={selectedRead.content} otherArgs={{isv2: true}} isMobile={true} />
        <Space h="md" />
        <NotesDesktop notes={selectedRead.notes} />
        <SkRelatedTags {...selectedRead} />
        <SkReadSkovorodaSource {...selectedRead}/>
        <SkAuthorMobile author={selectedRead.author} />
        <Space h="lg" />

      </Container>

      <SkSourcesContainerMobile sources={getAggregatedSourcesParams(selectedRead)} />
    </>
  );
}
