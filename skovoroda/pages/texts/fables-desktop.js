import { Container, List, Space, Text } from "@mantine/core";
import SkH1Desktop from "../../components/shared/skH1Desktop";
import SkColoredContainerDesktop from "../../components/shared/skColoredContainerDesktop";
import { SkovorodaFablesPath, getFableLinkTitle, pathJoin } from "../../lib/skovorodaPath";
import SkTextLink from "../../components/shared/skTextLink";
import { getFablesPageProps } from "../../lib/pagesContent/fablesStatic";
import { prepareFables } from "../../lib/pagesContent/fablesLogic";
import { fablesPageContent } from "../../lib/pagesContent/fablesContent";
import SkH2Desktop from "../../components/shared/skH2Desktop";
import SkTextContentBlockDesktop from "../../components/shared/skTextContentBlockDesktop";
import classes from './fables-desktop.module.scss';

export default function FablesPage({ allFables, fablesTopContent, allSources }) {
  const fables = prepareFables(allFables);
  allSources.sort((a,b) => a.sourceId - b.sourceId);
  fablesTopContent.sort((a,b) => fablesPageContent.contentOrder.indexOf(a.key) - fablesPageContent.contentOrder.indexOf(b.key));
  
  function getListOfFables(from, to) {
    return <List type="ordered" className={`normalContentText normalContentText_withoutIndent ${classes.list}`}>
      {fables.slice(from, to).map(fable => {
        const href = pathJoin(SkovorodaFablesPath, fable.urlId);
        return <List.Item key={fable.urlId} mb="xs">
          <SkTextLink text={fable.fableTitle} title={getFableLinkTitle(fable)} href={href} onHoverStylesOnly={true}>
          </SkTextLink>
        </List.Item>
      })}
    </List>
  }
  
  return <>

    {/* H1 */}
    <Space h="xl"/>
    <SkH1Desktop text="Байки Харківські"/>

    {/* Fables Links */}
    <SkColoredContainerDesktop>
      {getListOfFables(0,30)}
    </SkColoredContainerDesktop>

    {/* FAQ */}
    {fablesTopContent.map((group,index) => {
      function contentBlock(content) {
        return <SkTextContentBlockDesktop key={group.key + content.key} textContent={content.content} isv2={true} />
      }
      const question = group.contents.find(content => content.key === "question");
      const answer1 = group.contents.find(content => content.key === "answer1");
      const answer2 = group.contents.find(content => content.key === "answer2");
      const answer3 = group.contents.find(content => content.key === "answer3");
      const color = index % 2 === 0 ? "indigo" : "gray";
      return <Container key={group.key} p="0">
        <SkColoredContainerDesktop py="0">
          <Space h="lg"/>
          <SkH2Desktop text={question.content[0].text} type="qa" />
        </SkColoredContainerDesktop>
        {answer1 ? <SkColoredContainerDesktop pt="md" pb="lg">
          {contentBlock(answer1)}
        </SkColoredContainerDesktop> : null}
        {answer2 ? <SkColoredContainerDesktop pt="md" pb="lg">
          {contentBlock(answer2)}
        </SkColoredContainerDesktop> : null}
        {answer3 ? <SkColoredContainerDesktop pt="md" pb="lg">
          {contentBlock(answer3)}
        </SkColoredContainerDesktop> : null}
      </Container> 
    })}

    {/* Sources */}
    <SkColoredContainerDesktop py="0" my="0">
      <Space h="lg"/>
      <SkH2Desktop text="Джерела" />
      <Space h="lg"/>
      {allSources.map((source,index) => {
        const text = `[${source.sourceId}] ${source.sourceFullName}`;
        const mt = index ? "sm" : "0";
        return <Text id={"sourceId"+source.sourceId} key={"source"+source.sourceId} className="normalContentText normalContentText_withoutIndent" mt={mt}>{text}</Text>
      })}
      <Space h="xl"/>
    </SkColoredContainerDesktop>
  </>
}

export async function getStaticProps({ params }) {
  return getFablesPageProps();
}