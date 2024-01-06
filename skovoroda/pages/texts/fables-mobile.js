import { Container, List, Space, Spoiler, Text } from "@mantine/core";
import SkH1Mobile from "../../components/shared/skH1Mobile";
import { SkovorodaFablesPath, getFableLinkTitle, pathJoin } from "../../lib/skovorodaPath";
import SkTextLink from "../../components/shared/skTextLink";
import { prepareFables } from "../../lib/pagesContent/fablesLogic";
import { getFablesPageProps } from "../../lib/pagesContent/fablesStatic";
import SkColoredContainerMobile from "../../components/shared/skColoredContainerMobile";
import SkH2Mobile from "../../components/shared/skH2Mobile";
import SkTextContentBlockDesktop from "../../components/shared/skTextContentBlockDesktop";
import { fablesPageContent } from "../../lib/pagesContent/fablesContent";
import classes from './fables-mobile.module.scss';

export default function FablesPage({ allFables, fablesTopContent, allSources }) {
  const fables = prepareFables(allFables);
  allSources.sort((a,b) => a.sourceId - b.sourceId);
  fablesTopContent.sort((a,b) => fablesPageContent.contentOrder.indexOf(a.key) - fablesPageContent.contentOrder.indexOf(b.key));

  return <>
    <SkColoredContainerMobile py={0}>
      <Container p={0}>

        {/* H1 */}
        <Space h="md" />
        <SkH1Mobile px="md" text="Байки Харківські"/>
        <Space h="md" />

        {/* Fables Links */}
        <Spoiler px="md" maxHeight={120} showLabel="Більше..." hideLabel="Менше" 
          className="normalContentText normalContentText_withoutIndent"
          classNames={{
            "control": classes.spoilerControlButton
          }}
        >
          <List type="ordered" className="normalContentText normalContentText_withoutIndent">
            {fables.map(fable => {
              const href = pathJoin(SkovorodaFablesPath, fable.urlId);
              return <List.Item key={fable.urlId}>
                <SkTextLink text={fable.fableTitle} title={getFableLinkTitle(fable)} href={href} disableStyles={false}>
                </SkTextLink>
              </List.Item>
            })}
          </List>
        </Spoiler>
        <Space h="md" />

        {/* FAQ */}
        {fablesTopContent.map((group,index) => {
          function contentBlock(content) {
            return <SkTextContentBlockDesktop key={group.key + content.key} textContent={content.content} isv2={true} isMobile={true} />
          }
          const question = group.contents.find(content => content.key === "question");
          const answer1 = group.contents.find(content => content.key === "answer1");
          const answer2 = group.contents.find(content => content.key === "answer2");
          const answer3 = group.contents.find(content => content.key === "answer3");
          const color = index % 2 === 0 ? "indigo" : "gray";
          return <Container key={group.key} p="0">
            <SkColoredContainerMobile color={color+".0"} px="md" py="0">
              <Space h="md"/>
              <SkH2Mobile text={question.content[0].text} type="qa" />
            </SkColoredContainerMobile>
            {answer1 ? <SkColoredContainerMobile color={color+".0"} px="md">
              {contentBlock(answer1)}
            </SkColoredContainerMobile> : null}
            {answer2 ? <SkColoredContainerMobile color={color+".1"} px="md">
              {contentBlock(answer2)}
            </SkColoredContainerMobile> : null}
            {answer3 ? <SkColoredContainerMobile color={color+".2"} px="md">
              {contentBlock(answer3)}
            </SkColoredContainerMobile> : null}
          </Container> 
        })}

        {/* Sources */}
        <SkColoredContainerMobile color="indigo.1" py="0" my="0">
          <Container px="md" py="md">
            <SkH2Mobile text="Джерела" pb="md"/>
            {allSources.map((source,index) => {
              const text = `[${source.sourceId}] ${source.sourceFullName}`;
              const mt = index ? "xs" : "0";
              return <Text id={"sourceId"+source.sourceId} key={"source"+source.sourceId} className="normalContentText normalContentText_withoutIndent" mt={mt}>{text}</Text>
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