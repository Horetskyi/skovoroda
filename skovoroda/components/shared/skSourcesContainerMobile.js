import { Space, Text } from "@mantine/core";
import { commonContent } from "../../lib/staticProps/commonContent";
import SkColoredContainerMobile from "./skColoredContainerMobile";
import SkSourceBlockMobile from "./skSourceBlockMobile";
import SkH2Mobile from "./skH2Mobile";

export default function SkSourcesContainerMobile({ sources, includeTextValidityWarning }) {

  if (!sources || !sources.length) {
    return null;
  }

  return <>
    <SkColoredContainerMobile>
      <SkH2Mobile text="Джерела" />
      <Space h={"xl"}/>
      {sources.map((source, index) => {
        return <div key={source.sourceValue}>
          <SkSourceBlockMobile {...source}/>
          {(index !== sources.length - 1) ? <Space h="xl"/> : null}

        </div>
      })}
      {includeTextValidityWarning ? <Text px={"md"} mt="xl" className='normalContentText'>{commonContent.textValidityWarning}</Text> : null}
    </SkColoredContainerMobile>
    <Space h="xl"/>
  </>
}