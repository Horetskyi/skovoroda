import { Center, Container, Space, Text, createStyles } from "@mantine/core";
import { copyrightContent } from "../lib/pagesContent/copyrightContent";
import { getCopyrightPageProps } from "../lib/pagesContent/copyrightStatic";
import SkH1Mobile from "../components/shared/skH1Mobile";
import SkColoredContainerMobile from "../components/shared/skColoredContainerMobile";

const useStyles = createStyles((theme) => ({
}));

export default function CopyrightPage(props) {

  const { classes } = useStyles();

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
        <Space h={"md"}/>
      </SkColoredContainerMobile>
    </Container>
  </>
}

export async function getStaticProps({ params }) {
  return getCopyrightPageProps();
}