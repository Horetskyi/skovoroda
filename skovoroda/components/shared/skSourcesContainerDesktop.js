import { Space, Text, createStyles } from "@mantine/core";
import SkColoredContainerDesktop from "./skColoredContainerDesktop";
import SkH2Desktop from "./skH2Desktop";
import SkSourceBlockDesktop from "./skSourceBlockDesktop";
import { commonContent } from "../../lib/pagesContent/commonContent";

const useStyles = createStyles((theme) => ({
}));

export default function SkSourcesContainerDesktop({ sources, includeTextValidityWarning }) {

  const { classes } = useStyles();

  return <>
    <SkColoredContainerDesktop color={"indigo.0"}>
      <SkH2Desktop text="Джерела"/>
      <Space h="lg"/>
      {sources.map((source, index) => {
        return <div key={source.sourceValue}>
          <SkSourceBlockDesktop {...source}/>
          {(index !== sources.length - 1) ? <Space h="md"/> : null}

        </div>
      })}
      {includeTextValidityWarning ? <Text mt="lg" className='normalContentText'>{commonContent.textValidityWarning}</Text> : null}
    </SkColoredContainerDesktop>
  </>
}