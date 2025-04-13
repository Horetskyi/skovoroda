import { Space } from "@mantine/core";
import SkH1Desktop from "../components/shared/skH1Desktop";
import SkColoredContainerDesktop from "../components/shared/skColoredContainerDesktop";
import { getAboutUsPageProps } from "../lib/staticProps/aboutUsStatic";
import SkH2Desktop from "../components/shared/skH2Desktop";
import SkTextContentBlockDesktop from "../components/shared/skTextContentBlockDesktop";

export default function AboutUsPage({contentStructure}) {

  return <>
    {contentStructure.sections.map((section, index) => {
      
      const header = section.h1 ? <SkH1Desktop text={section.h1}/> 
        : section.h2 ? <SkH2Desktop text={section.h2}/> 
        : null;

      const headerSpace = section.h2 ? <Space h={"md"}/> : null;

      return <SkColoredContainerDesktop key={`section-${index}`}>
        {header}
        {headerSpace}
        <SkTextContentBlockDesktop textContent={section.content} isv2={true} />
        <Space h={"md"}/>
      </SkColoredContainerDesktop>
    })}
  </>
}

export async function getStaticProps({ params }) {
  return getAboutUsPageProps();
}