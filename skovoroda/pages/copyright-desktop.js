import { Center, Space, Text, createStyles } from "@mantine/core";
import SkH1Desktop from "../components/shared/skH1Desktop";
import SkColoredContainerDesktop from "../components/shared/skColoredContainerDesktop";
import { copyrightContent } from "../lib/pagesContent/copyrightContent";
import { getCopyrightPageProps } from "../lib/pagesContent/copyrightStatic";

const useStyles = createStyles((theme) => ({
}));

export default function CopyrightPage(props) {

  const { classes } = useStyles();

  return <>
    <Space h={"lg"}/>
    <Center>
      <SkH1Desktop text={copyrightContent.title}/>
    </Center>
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