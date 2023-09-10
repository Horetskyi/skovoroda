import { Center, Flex, Group, Space, Text, createStyles } from "@mantine/core";
import { aboutUsContent } from "../lib/pagesContent/aboutUsContent";
import SkImage from "../components/shared/skImage";
import SkH1Desktop from "../components/shared/skH1Desktop";
import SkColoredContainerDesktop from "../components/shared/skColoredContainerDesktop";
import { getAboutUsPageProps } from "../lib/pagesContent/aboutUsStatic";

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
        <SkImage image={image} width={180} height={180} shadow={"sm"} styleAction={styleObj => {
          styleObj.borderRadius = "180px";
        }} />
        <div className={classes.personDescription}>
          {description.map(text => {
            return <Text key={text} className="normalContentText normalContentText_withoutFirstIndent">{text}</Text>
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
      {AboutPerson(aboutUsContent.dimaDescription, aboutUsContent.dimaImage, "gray.0")}
      <Space h={"md"}/>
      {AboutPerson(aboutUsContent.olenkaDescription, aboutUsContent.olenkaImage, "indigo.0")}
    </SkColoredContainerDesktop>
  </>
}

export async function getStaticProps({ params }) {
  return getAboutUsPageProps();
}