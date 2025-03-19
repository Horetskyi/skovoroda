import { Container, Space, Text } from "@mantine/core";
import SkH1Desktop from "../shared/skH1Desktop";
import SkTextContentBlockDesktop from "../shared/skTextContentBlockDesktop";
import SkRelatedTags from "../shared/skRelatedTags";

export default function ThemePageDesktop({ selectedTheme }) {
  return (
    <>
      <SkH1Desktop pt="lg" text={selectedTheme.h1} />

      <Container py="lg">
      
        <SkTextContentBlockDesktop textContent={selectedTheme.content} isv2={true} />

        <Space h={"md"}/>

        <SkRelatedTags relatedSources={selectedTheme.relevantItems}/>

      </Container>

    </>
  );
}
