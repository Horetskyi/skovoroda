import { Space, Text } from "@mantine/core";
import SkColoredContainerDesktop from "./skColoredContainerDesktop";
import SkSourceBlockDesktop from "./skSourceBlockDesktop";
import { commonContent } from "../../lib/staticProps/commonContent";
import SkH2DesktopV2 from "./skH2DesktopV2";

export default function SkSourcesContainerDesktop({ sources, includeTextValidityWarning }) {

  if (!sources || !sources.length) {
    return null;
  }

  return <> 
    <SkColoredContainerDesktop py={0}>
      <SkH2DesktopV2 text="Джерела"/>
      <Space h="lg"/>
      {sources.map((source, index) => {
        return <div key={source.sourceValue}>
          <SkSourceBlockDesktop {...source}/>
          {(index !== sources.length - 1) ? <Space h="md"/> : null}

        </div>
      })}
      {includeTextValidityWarning ? <Text mt="lg" className='normalContentText'>{commonContent.textValidityWarning}</Text> : null}
      <Space h="lg"/>
    </SkColoredContainerDesktop>
  </>
}