import { Title } from "@mantine/core";

export default function SkH2Desktop(props) {

  if (props.type === "qa") {
    return <Title order={2} ta={"left"} {...props}>
      {props.text}
    </Title>
  }
  return <Title order={2} mx={"auto"} ta={"center"} {...props}>
    {props.text}
  </Title>
}