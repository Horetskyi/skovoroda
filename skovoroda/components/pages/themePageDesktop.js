import { Container, Space } from "@mantine/core";
import SkH1Desktop from "../shared/skH1Desktop";
import SkMetaTextView from "../shared/skMetaTextView";
import SkRelatedTags from "../shared/skRelatedTags";
import SkH2Desktop from "../shared/skH2Desktop";
import { SkQuotesDesktop } from "../shared/skQuotesDesktop";

export default function ThemePageDesktop({ selectedTheme }) {
  return <>
    <SkH1Desktop text={"Тема: " + selectedTheme.h1} />
    <Container>
      <SkMetaTextView metaText={selectedTheme.content} otherArgs={{isv2: true}} />
      <Space h={"md"}/>
      <SkRelatedTags relatedSources={selectedTheme.relevantItems}/>
      
      { selectedTheme.quotes && selectedTheme.quotes.length > 0 && (
        <>
          <Space h={"md"}/>
          <SkH2Desktop text="Цитати" mb="lg" id="quotes" />
          <SkQuotesDesktop quotes={selectedTheme.quotes}/>
        </>
      )}

    </Container>
  </>
}
