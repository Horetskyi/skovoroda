import { Text, Title } from "@mantine/core";

export default function SkH2DesktopV3({ color, text, subHeader }) {

  const styleObj = {};
  if (color && color.length) {
    styleObj.color = color;
  }

  return <Title order={2} mt={"xl"} mx={"auto"} ta={"center"} className="h2-v2" style={styleObj}>
    {text}
    {subHeader && <Text className={`h2__subheader font-ysabeau`}> {subHeader}</Text>}
  </Title>
}