import { Center, Container, Space, Text, createStyles } from "@mantine/core";
import SkImage from "../components/shared/skImage";
import SkH1Mobile from "../components/shared/skH1Mobile";
import SkColoredContainerMobile from "../components/shared/skColoredContainerMobile";
import { aboutUsContent } from "../lib/pagesContent/aboutUsContent";
import { getAboutUsPageProps } from "../lib/pagesContent/aboutUsStatic";

const useStyles = createStyles((theme) => ({

 
}));

export default function AboutUsPage(props) {
  const { classes } = useStyles();

  function AboutPerson(description, image, color) {
    return <>
      <Center>
        <SkImage image={image} width={120} height={120} shadow={"lg"} styleAction={styleObj => {
          styleObj.borderRadius = "120px";
        }} />
      </Center>
      <Space h="md"/>
      {description.map(text => {
        return <Text key={text} className="normalContentText">{text}</Text>
      })}
    </>
  }

  return <>
    <Space h={"md"}/>
    <Center>
      <SkH1Mobile text={aboutUsContent.title}/>
    </Center>
    <SkColoredContainerMobile>
      <Container px={"md"}>
        {AboutPerson(aboutUsContent.dimaDescription, aboutUsContent.dimaImage, "gray.0")}
        <Space h={"md"}/>
        {AboutPerson(aboutUsContent.olenkaDescription, aboutUsContent.olenkaImage, "indigo.0")}
      </Container>
    </SkColoredContainerMobile>
  </>
}

export async function getStaticProps({ params }) {
  return getAboutUsPageProps();
}