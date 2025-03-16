import { Container, Space } from "@mantine/core";
import SkH1Desktop from "../shared/skH1Desktop";
import SkTextContentBlockDesktop from "../shared/skTextContentBlockDesktop";
import SkImage from "../shared/skImage";
import classes from "./readPageDesktop.module.scss";
import SkReadSource from "./details/skReadSource";
import { adjustImageHeight, getBookSourceParam, getIllustrationSourceParam } from "./details/pureFunctions";
import SkSourcesContainerDesktop from "../shared/skSourcesContainerDesktop";
import SkRelatedTags from "../shared/skRelatedTags";

export default function ReadPageDesktop({ selectedRead }) {

  const sourceGui = SkReadSource(selectedRead);
  adjustImageHeight(selectedRead.illustration, 650);

  const sourcesParams = [
    getBookSourceParam(selectedRead.source)
  ];
  if (selectedRead.illustration) {
    sourcesParams.push(getIllustrationSourceParam(selectedRead.illustration));
  }

  return <>
    <Container py="lg">
      <SkH1Desktop text={selectedRead.title} /> 
      <Space h="lg" />

      <div className={classes.textContainer}>

        {selectedRead.illustration ? (
          <div className={classes.readImage}>
            <SkImage
              fullWidth={false}
              image={selectedRead.illustration}
              width={selectedRead.illustration.width}
              height={selectedRead.illustration.height}
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
  
  </>;
}
