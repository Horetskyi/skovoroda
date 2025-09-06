import { Text, Title } from "@mantine/core";
import classes from './skH2MobileV2.module.scss'; 

export default function SkH2MobileV2({ text, subHeader }) {

  return <Title order={2} mx={"auto"} ta={"center"}>
    {text}
    {subHeader ? <Text className={classes.subHeader}>{subHeader}</Text> : null}
  </Title>
}