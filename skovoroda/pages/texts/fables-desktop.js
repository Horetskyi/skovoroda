import { Container, List, Space, Text } from "@mantine/core";
import SkH1Desktop from "../../components/shared/skH1Desktop";
import SkColoredContainerDesktop from "../../components/shared/skColoredContainerDesktop";
import { SkovorodaFablesPath, getFableLinkTitle, pathJoin } from "../../lib/skovorodaPath";
import SkTextLink from "../../components/shared/skTextLink";
import { getFablesPageProps } from "../../lib/staticProps/fablesStatic";
import { prepareFables } from "../../lib/staticProps/fablesLogic";
import { fablesPageContent } from "../../lib/staticProps/fablesContent";
import SkH2Desktop from "../../components/shared/skH2Desktop";
import SkMetaTextView from "../../components/shared/skMetaTextView";
import classes from './fables-desktop.module.scss';
import SkH2DesktopV3 from "../../components/shared/skH2DesktopV3";
import SkImagesGrid from "../../components/shared/skImagesGrid";
import { SkImagesArray } from "../../lib/data/images/skImages";
import getFablesMenuLinks from "../../lib/utils/menus/getFablesMenuLinks";
import SkPageNavMenu from "../../components/shared/skPageNavMenu";

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
  
  const gridImages = SkImagesArray.filter(image => image.type === "fable").map((image, index) => {
    image = {...image};
    const fable = allFables.find(fable => fable.fableNumber === image.fableNumber);
    const title = `${image.fableNumber} - ${fable.fableTitle}`;
    const href = pathJoin(SkovorodaFablesPath, fable.urlId);
    return {
      image: image,
      name: title,
      href: href
    }
  });

  const menuLinks = getFablesMenuLinks();

  return <>

    <SkH1Desktop text="Байки Харківські" withBlueImage={true} id="list" />

    {/* Fables Links */}
    <SkColoredContainerDesktop pt={-20}>

      <SkPageNavMenu links={menuLinks} isDesktop={true}/>

      {getListOfFables(0,30)}
    </SkColoredContainerDesktop>

    {/* FAQ */}
    {fablesTopContent.map((group,index) => {
      function contentBlock(content) {
        return <SkMetaTextView 
          key={group.key + content.key}
          metaText={content.content}
          otherArgs={{isv2: true}} 
        />
      }
      const question = group.contents.find(content => content.key === "question");
      const answer1 = group.contents.find(content => content.key === "answer1");
      const answer2 = group.contents.find(content => content.key === "answer2");
      const answer3 = group.contents.find(content => content.key === "answer3");
      const id = index === 0 ? "faq" : null;
      return <Container key={group.key} p="0">
        <SkColoredContainerDesktop py="0">
          <Space h="lg"/>
          <SkH2Desktop text={question.content.lines[0][0].text} type="qa" id={id} />
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

    <SkH2DesktopV3 text="Ілюстрації" subHeader="до Збірки «Байки Харківські»" id="illustrations" />
    <SkImagesGrid images={gridImages} gentlyShadow={true} isVFables={true} />

    {/* Sources */}
    <SkColoredContainerDesktop py="0" my="0">
      <SkH2Desktop text="Джерела" id="sources" />
      <Space h="lg"/>
      {allSources.map((source,index) => {
        const text = `[${source.sourceId}] ${source.sourceFullName}`;
        const mt = index ? "sm" : "0";
        return <Text 
          id={"sourceIdInBlock"+source.sourceId} 
          key={"source"+source.sourceId} 
          className="normalContentText normalContentText_withoutIndent" 
          mt={mt}>
          {text}
        </Text>
      })}
    </SkColoredContainerDesktop>
      
    <Space h="xl"/>
    <Space h="xl"/>

  </>
}

export async function getStaticProps({ params }) {
  return getFablesPageProps();
}