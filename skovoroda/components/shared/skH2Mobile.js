import { Title } from "@mantine/core";

export default function SkH2Mobile(props) {

  return <Title order={2} mx={"auto"} ta={"center"} {...props} >
    {props.text}
  </Title>
}