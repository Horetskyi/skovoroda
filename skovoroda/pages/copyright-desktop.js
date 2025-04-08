import { Center, Space, Text } from "@mantine/core";
import SkH1Desktop from "../components/shared/skH1Desktop";
import SkColoredContainerDesktop from "../components/shared/skColoredContainerDesktop";
import { copyrightContent } from "../lib/staticProps/copyrightContent";
import { getCopyrightPageProps } from "../lib/staticProps/copyrightStatic";

export default function CopyrightPage(props) {

  return <>
    <SkH1Desktop text={copyrightContent.title}/>
    <SkColoredContainerDesktop>
      {copyrightContent.content.map(text => {
        return <Text key={text} mb={"md"} className="normalContentText normalContentText_justify">{text}</Text>
      })}
      <Space h={"lg"}/>
    </SkColoredContainerDesktop>
  </>
}

export async function getStaticProps({ params }) {
  return getCopyrightPageProps();
}