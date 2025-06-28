import { Container, Text } from "@mantine/core";
import SkH1Desktop from "../shared/skH1Desktop";
import SkTextContentBlockDesktop from "../shared/skTextContentBlockDesktop";
import SkImage from "../shared/skImage";
import classes from "./readPageDesktop.module.scss";
import { getAggregatedSourcesParams } from "./details/pureFunctions";
import SkSourcesContainerDesktop from "../shared/skSourcesContainerDesktop";
import SkRelatedTags from "../shared/skRelatedTags";
import { adjustImageHeight } from "../functions/imageFunctions";
import NotesDesktop from "./details/notesDesktop";
import DownloadsDesktop from "./details/downloadsDesktop";
import SkReadSkovorodaSource from "./details/skReadSkovorodaSource";
import SkAuthorDesktop from "./details/skAuthorDesktop";

export default function ReadPageDesktop({ selectedRead }) {

  adjustImageHeight(selectedRead.image, 650);
  return <>
    <SkH1Desktop text={selectedRead.title} /> 
    
    
    <Container>

      { selectedRead.author && selectedRead.author.fullName && selectedRead.type !== "treatise"
        ? <Text ta={'center'} w={'100%'}>{selectedRead.author.fullName}</Text> : null }

      <DownloadsDesktop fileNames={selectedRead.fileNames} device={'desktop'} textId={selectedRead.urlId} />

      <div className={classes.textContainer}>

        {selectedRead.image ? (
          <div className={classes.readImage}>
            <SkImage
              fullWidth={false}
              priority
              image={selectedRead.image}
              width={selectedRead.image.width}
              height={selectedRead.image.height}
            />
            {/* TODO: MAKE IMAGE CLICKABLE */}
          </div>
        ) : null}

        <div>
          <SkTextContentBlockDesktop textContent={selectedRead.content} isv2={true} />
        </div>
      </div>

      <NotesDesktop notes={selectedRead.notes} />
      <SkRelatedTags {...selectedRead} />
      <SkReadSkovorodaSource {...selectedRead} />
      <SkAuthorDesktop author={selectedRead.author} />

    </Container>
    <SkSourcesContainerDesktop sources={getAggregatedSourcesParams(selectedRead)} includeTextValidityWarning={true} />
  </>;
}
