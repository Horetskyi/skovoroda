import { Container, Space } from "@mantine/core";
import SkH1Mobile from "../shared/skH1Mobile";
import SkTextContentBlockDesktop from "../shared/skTextContentBlockDesktop";
import SkRelatedTags from "../shared/skRelatedTags";

export default function ThemePageMobile({ selectedTheme }) {
  return <>
    <SkH1Mobile text={selectedTheme.h1} />
    <Container>
      <SkTextContentBlockDesktop textContent={selectedTheme.content} isv2={true} isMobile={true} />
      <Space h={"md"}/>
      <SkRelatedTags relatedSources={selectedTheme.relevantItems}/>
    </Container>
  </>
}
