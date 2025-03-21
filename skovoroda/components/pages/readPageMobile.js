import { Center, Container, Space } from "@mantine/core";
import SkH1Mobile from "../shared/skH1Mobile";
import SkTextContentBlockDesktop from "../shared/skTextContentBlockDesktop";
import SkImage from "../shared/skImage";
import SkRelatedTags from "../shared/skRelatedTags";
import SkSourcesContainerMobile from "../shared/skSourcesContainerMobile";
import SkReadSource from "./details/skReadSource";
import { getBookSourceParam, getIllustrationSourceParam } from "./details/pureFunctions";

export default function ReadPageMobile({ selectedRead }) {

  const sourceGui = SkReadSource(selectedRead);
  const sourcesParams = [
    getBookSourceParam(selectedRead.source)
  ];
  if (selectedRead.image) {
    sourcesParams.push(getIllustrationSourceParam(selectedRead.image));
  }

  return (
    <>
      <Space h="md" />
      <Container px="md">
        <SkH1Mobile text={selectedRead.title} />
      </Container>
      <Space h="md" />

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
        <SkTextContentBlockDesktop textContent={selectedRead.content} isv2={true} isMobile={true} />
        <Space h="md" />
      
        <SkRelatedTags {...selectedRead} />

        {sourceGui}

        <Space h="lg" />

      </Container>

      <SkSourcesContainerMobile sources={sourcesParams} />
    </>
  );
}
