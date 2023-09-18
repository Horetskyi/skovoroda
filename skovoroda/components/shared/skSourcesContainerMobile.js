import { Space, Text, createStyles } from "@mantine/core";
import { commonContent } from "../../lib/pagesContent/commonContent";
import SkColoredContainerMobile from "./skColoredContainerMobile";
import SkSourceBlockMobile from "./skSourceBlockMobile";
import SkH2Mobile from "./skH2Mobile";

const useStyles = createStyles((theme) => ({
}));

export default function SkSourcesContainerMobile({ sources, includeTextValidityWarning }) {

  const { classes } = useStyles();

  return <>
    <SkColoredContainerMobile color={"indigo.0"}>
      <SkH2Mobile text="Джерела" />
      <Space h={"md"}/>
      {sources.map((source, index) => {
        return <div key={source.sourceValue}>
          <SkSourceBlockMobile {...source}/>
          {(index !== sources.length - 1) ? <Space h="md"/> : null}

        </div>
      })}
      {includeTextValidityWarning ? <Text px={"md"} mt="md" className='normalContentText'>{commonContent.textValidityWarning}</Text> : null}
    </SkColoredContainerMobile>
  </>
}