import { Text, Title } from "@mantine/core";
import classes from './skH2MobileV2.module.scss'; 

export default function SkH2MobileV2({ text, subHeader, id }) {

  return <Title order={2} mx={"auto"} ta={"center"} id={id}>
    {text}
    {subHeader ? <Text mt={"sm"} mb={"md"} className={classes.subHeader}>{subHeader}</Text> : null}
  </Title>
}