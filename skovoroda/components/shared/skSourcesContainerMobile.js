import { Space } from "@mantine/core";
import SkColoredContainerMobile from "./skColoredContainerMobile";
import SkSourceBlockMobile from "./skSourceBlockMobile";
import SkH2Mobile from "./skH2Mobile";

export default function SkSourcesContainerMobile({ sources }) {

  if (!sources || !sources.length) {
    return <SkColoredContainerMobile>
      <Space h="xl"/>
    </SkColoredContainerMobile>;
  }

  return <SkColoredContainerMobile pt={0} mt={0}>
    <SkH2Mobile text="Джерела" id="sources" />
    <Space h={"xl"}/>
    {sources.map((source, index) => {
      return <div key={source.sourceValue}>
        <SkSourceBlockMobile {...source}/>
        {(index !== sources.length - 1) ? <Space h="xl"/> : null}
      </div>
    })}
    <Space h="xl"/>
  </SkColoredContainerMobile>;
}