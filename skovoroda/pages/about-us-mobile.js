import { Space } from "@mantine/core";
import SkH1Mobile from "../components/shared/skH1Mobile";
import SkColoredContainerMobile from "../components/shared/skColoredContainerMobile";
import { getAboutUsPageProps } from "../lib/staticProps/aboutUsStatic";
import SkH2Mobile from "../components/shared/skH2Mobile";
import SkTextContentBlockDesktop from "../components/shared/skTextContentBlockDesktop";

export default function AboutUsPage({contentStructure}) {

  return <>
    {contentStructure.sections.map((section, index) => {
        
      const header = section.h1 ? <SkH1Mobile text={section.h1}/> 
        : section.h2 ? <SkH2Mobile text={section.h2}/> 
        : null;

      return <SkColoredContainerMobile key={`section-${index}`} px="md">
        {header}
        <SkTextContentBlockDesktop textContent={section.content} isv2={true} isMobile={true} />
        <Space h={"lg"}/>
      </SkColoredContainerMobile>
    })}
  </>
}

export async function getStaticProps({ params }) {
  return getAboutUsPageProps();
}