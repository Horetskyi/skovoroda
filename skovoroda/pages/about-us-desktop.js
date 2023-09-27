import { Center, Flex, Group, Space, Text, createStyles } from "@mantine/core";
import { aboutUsContent } from "../lib/pagesContent/aboutUsContent";
import SkImage from "../components/shared/skImage";
import SkH1Desktop from "../components/shared/skH1Desktop";
import SkColoredContainerDesktop from "../components/shared/skColoredContainerDesktop";
import { getAboutUsPageProps } from "../lib/pagesContent/aboutUsStatic";
import SkH2Desktop from "../components/shared/skH2Desktop";
import SkTextContentBlockDesktop from "../components/shared/skTextContentBlockDesktop";

const useStyles = createStyles((theme) => ({
  personBlock: {
    borderRadius: "180px",
    boxShadow: theme.shadows.xl,
  },
  personDescription: {
    paddingRight: "80px",
    paddingLeft: theme.spacing.md,
    paddingTop: theme.spacing.md,
  }
}));

export default function AboutUsPage(props) {

  const { classes } = useStyles();

  function AboutPerson(description, image, color) {
    return <>
      <Flex className={classes.personBlock} bg={color}>
        <SkImage image={image} width={180} height={180} shadow={"sm"} priority={true} styleAction={styleObj => {
          styleObj.borderRadius = "180px";
        }} />
        <div className={classes.personDescription}>
          {description.map(text => {
            return <Text key={text} className="normalContentText normalContentText_justify normalContentText_withoutFirstIndent">{text}</Text>
          })}
        </div>
      </Flex>
    </>
  }

  return <>
    <Space h={"lg"}/>
    <Center>
      <SkH1Desktop text={aboutUsContent.title}/>
    </Center>
    <SkColoredContainerDesktop>
      <SkTextContentBlockDesktop textContent={props.parsedContent} isv2={true} />
      <Space h={"lg"}/>
      <SkH2Desktop text={aboutUsContent.title2}/>
      <Space h={"lg"}/>
      {AboutPerson(aboutUsContent.dimaDescription, aboutUsContent.dimaImage, "gray.0")}
      <Space h={"lg"}/>
      {AboutPerson(aboutUsContent.olenkaDescription, aboutUsContent.olenkaImage, "indigo.0")}
    </SkColoredContainerDesktop>
  </>
}

export async function getStaticProps({ params }) {
  return getAboutUsPageProps();
}