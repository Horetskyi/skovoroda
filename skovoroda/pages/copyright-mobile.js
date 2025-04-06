import { Center, Container, Space, Text } from "@mantine/core";
import { copyrightContent } from "../lib/staticProps/copyrightContent";
import { getCopyrightPageProps } from "../lib/staticProps/copyrightStatic";
import SkH1Mobile from "../components/shared/skH1Mobile";
import SkColoredContainerMobile from "../components/shared/skColoredContainerMobile";

export default function CopyrightPage(props) {

  return <>
    <Container ph={"md"} >
      <Space h={"lg"}/>
      <Center>
        <SkH1Mobile text={copyrightContent.title}/>
      </Center>
      <SkColoredContainerMobile>
        {copyrightContent.content.map(text => {
          return <Text key={text} mb={"md"} className="normalContentText normalContentText_justify">{text}</Text>
        })}
      </SkColoredContainerMobile>
    </Container>
  </>
}

export async function getStaticProps({ params }) {
  return getCopyrightPageProps();
}