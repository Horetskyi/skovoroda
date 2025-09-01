import { Container, List, Space, Text } from "@mantine/core";
import SkH1Mobile from "../../components/shared/skH1Mobile";
import { SkovorodaFablesPath, getFableLinkTitle, pathJoin } from "../../lib/skovorodaPath";
import SkTextLink from "../../components/shared/skTextLink";
import { prepareFables } from "../../lib/staticProps/fablesLogic";
import { getFablesPageProps } from "../../lib/staticProps/fablesStatic";
import SkColoredContainerMobile from "../../components/shared/skColoredContainerMobile";
import SkH2Mobile from "../../components/shared/skH2Mobile";
import SkMetaTextView from "../../components/shared/skMetaTextView";
import { fablesPageContent } from "../../lib/staticProps/fablesContent";
import SkFablesCarousel from "../../components/shared/skFablesCarousel";

export default function FablesPage({ allFables, fablesTopContent, allSources }) {
  
  const fables = prepareFables(allFables);
  allSources.sort((a,b) => a.sourceId - b.sourceId);
  fablesTopContent.sort((a,b) => fablesPageContent.contentOrder.indexOf(a.key) - fablesPageContent.contentOrder.indexOf(b.key));

  return <>

    <SkH1Mobile text="Байки Харківські" withBlueImage={true} mb={"xl"} />

    <SkColoredContainerMobile py={0}>
      <Container p={0}>

        {/* Fables Links */}
        <List ml="md" type="ordered" className="normalContentText normalContentText_withoutIndent">
          {fables.map(fable => {
            const href = pathJoin(SkovorodaFablesPath, fable.urlId);
            return <List.Item key={fable.urlId}>
              <SkTextLink text={fable.fableTitle} title={getFableLinkTitle(fable)} href={href} disableStyles={false}>
              </SkTextLink>
            </List.Item>
          })}
        </List>
        <Space h="md" />
      </Container>
    </SkColoredContainerMobile>

    <SkFablesCarousel allFables={allFables} isMobile={true} />

    <SkColoredContainerMobile py={0}>
      <Container p={0}>

        {/* FAQ */}
        {fablesTopContent.map((group,index) => {
          function contentBlock(content) {
            return <SkMetaTextView 
              key={group.key + content.key} 
              metaText={content.content}
              otherArgs={{isv2: true}}
              isMobile={true} />
          }
          const question = group.contents.find(content => content.key === "question");
          const answer1 = group.contents.find(content => content.key === "answer1");
          const answer2 = group.contents.find(content => content.key === "answer2");
          const answer3 = group.contents.find(content => content.key === "answer3");
          const color = index % 2 === 0 ? "indigo" : "gray";
          return <Container key={group.key} p="0">
            <SkColoredContainerMobile px="md" py="0">
              <Space h="md"/>
              <SkH2Mobile text={question.content.lines[0][0].text} type="qa" />
            </SkColoredContainerMobile>
            {answer1 ? <SkColoredContainerMobile px="md">
              {contentBlock(answer1)}
            </SkColoredContainerMobile> : null}
            {answer2 ? <SkColoredContainerMobile px="md">
              {contentBlock(answer2)}
            </SkColoredContainerMobile> : null}
            {answer3 ? <SkColoredContainerMobile px="md">
              {contentBlock(answer3)}
            </SkColoredContainerMobile> : null}
          </Container> 
        })}

        {/* Sources */}
        <SkColoredContainerMobile py="0" my="0">
          <Container px="md" py="md">
            <SkH2Mobile text="Джерела" pb="md"/>
            {allSources.map((source,index) => {
              const text = `[${source.sourceId}] ${source.sourceFullName}`;
              const mt = index ? "xs" : "0";
              return <Text id={"sourceIdInBlock"+source.sourceId} key={"source"+source.sourceId} className="normalContentText normalContentText_withoutIndent" mt={mt}>{text}</Text>
            })}
          </Container>
        </SkColoredContainerMobile>

      </Container>
    </SkColoredContainerMobile>
  </>
}

export async function getStaticProps({ params }) {
  return getFablesPageProps();
}