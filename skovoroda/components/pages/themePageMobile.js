import { Container, Space } from "@mantine/core";
import SkH1Mobile from "../shared/skH1Mobile";
import SkTextContentBlockDesktop from "../shared/skTextContentBlockDesktop";
import SkRelatedTags from "../shared/skRelatedTags";
import SkH2Mobile from "../shared/skH2Mobile";
import { SkQuotesDesktop } from "../shared/skQuotesDesktop";

export default function ThemePageMobile({ selectedTheme }) {
  return <>
    <SkH1Mobile text={selectedTheme.h1} />
    <Container mb={"md"}>
      <SkTextContentBlockDesktop textContent={selectedTheme.content} isv2={true} isMobile={true} />
      <Space h={"md"}/>
      <SkRelatedTags relatedSources={selectedTheme.relevantItems}/>

      { selectedTheme.quotes && selectedTheme.quotes.length > 0 && (
        <>
          <Space h={"md"}/>
          <SkH2Mobile text="Цитати" mb="lg" id="quotes" />
          <SkQuotesDesktop quotes={selectedTheme.quotes}/>
        </>
      )}

    </Container>
  </>
}
