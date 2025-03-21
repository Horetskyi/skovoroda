import { Container, Space } from "@mantine/core";
import SkH1Desktop from "../shared/skH1Desktop";
import SkTextContentBlockDesktop from "../shared/skTextContentBlockDesktop";
import SkImage from "../shared/skImage";
import classes from "./readPageDesktop.module.scss";
import SkReadSource from "./details/skReadSource";
import { getBookSourceParam, getIllustrationSourceParam } from "./details/pureFunctions";
import SkSourcesContainerDesktop from "../shared/skSourcesContainerDesktop";
import SkRelatedTags from "../shared/skRelatedTags";
import { adjustImageHeight } from "../functions/imageFunctions";

export default function ReadPageDesktop({ selectedRead }) {

  const sourceGui = SkReadSource(selectedRead);
  adjustImageHeight(selectedRead.image, 650);

  const sourcesParams = [
    getBookSourceParam(selectedRead.source)
  ];
  if (selectedRead.image) {
    sourcesParams.push(getIllustrationSourceParam(selectedRead.image));
  }

  return <>
    <Container py="lg">
      <SkH1Desktop text={selectedRead.title} /> 
      <Space h="lg" />

      <div className={classes.textContainer}>

        {selectedRead.image ? (
          <div className={classes.readImage}>
            <SkImage
              fullWidth={false}
              image={selectedRead.image}
              width={selectedRead.image.width}
              height={selectedRead.image.height}
            />
          </div>
        ) : null}

        <SkTextContentBlockDesktop textContent={selectedRead.content} isv2={true} />
        
      </div>

      <Space h="md"/>

      <SkRelatedTags {...selectedRead} />

      {sourceGui}

    </Container>

    <SkSourcesContainerDesktop sources={sourcesParams} />

    <Space h="xl"/>
  
  </>;
}
