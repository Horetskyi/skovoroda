import { Center, Container, Space, Text, createStyles } from "@mantine/core";
import SkImage from "../components/shared/skImage";
import SkH1Mobile from "../components/shared/skH1Mobile";
import SkColoredContainerMobile from "../components/shared/skColoredContainerMobile";
import { aboutUsContent } from "../lib/pagesContent/aboutUsContent";
import { getAboutUsPageProps } from "../lib/pagesContent/aboutUsStatic";
import SkH2Mobile from "../components/shared/skH2Mobile";

const useStyles = createStyles((theme) => ({

 
}));

export default function AboutUsPage(props) {
  const { classes } = useStyles();

  function AboutPerson(description, image, color) {
    return <>
      <Center>
        <SkImage image={image} width={120} height={120} shadow={"lg"} priority={true} styleAction={styleObj => {
          styleObj.borderRadius = "120px";
        }} />
      </Center>
      <Space h="md"/>
      {description.map((text, index) => {
        const className = "normalContentText" + ((index == 0) ? " normalContentText_withoutIndent normalContentText_center" : "");
        return <Text key={text} mb={"sm"} className={className}>{text}</Text>
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
        {aboutUsContent.mainText.map(text => {
          return <Text key={text} className="normalContentText" mb={"sm"}>{text}</Text>
        })}
        <Space h={"md"}/>
        <SkH2Mobile text={aboutUsContent.title2}/>
        <Space h={"md"}/>
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