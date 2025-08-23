import { Text, Title } from "@mantine/core";

export default function SkH2DesktopV2(props) {

  const styleObj = {};
  if (props.color && props.color.length) {
    styleObj.color = props.color;
  }

  return <Title order={2} mt={"xl"} mx={"auto"} ta={"center"} className="h2-v2" style={styleObj} {...props}>
    {props.text}
    {props.subHeader && <Text className={`h2__subheader font-ysabeau`}> {props.subHeader}</Text>}
  </Title>
}