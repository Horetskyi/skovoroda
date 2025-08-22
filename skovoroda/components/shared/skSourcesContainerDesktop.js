import { Flex, Space } from "@mantine/core";
import SkColoredContainerDesktop from "./skColoredContainerDesktop";
import SkSourceBlockDesktop from "./skSourceBlockDesktop";
import SkH2DesktopV2 from "./skH2DesktopV2";

export default function SkSourcesContainerDesktop({ sources }) {

  if (!sources || !sources.length) {
    return <SkColoredContainerDesktop py={0}>
      <Space h="xl"/>
      <Space h="xl"/>
    </SkColoredContainerDesktop>;
  }

  return <SkColoredContainerDesktop py={0}>
    <SkH2DesktopV2 text="Джерела" mb="xl" />
    <Flex direction={"column"} gap={"md"}>
      {sources.map((source, index) => {
        return <div key={source.sourceValue}>
          <SkSourceBlockDesktop {...source}/>
          {(index !== sources.length - 1) ? <Space h="md"/> : null}
        </div>
      })}
    </Flex>
    <Space h="xl"/>
    <Space h="xl"/>
  </SkColoredContainerDesktop>;
}