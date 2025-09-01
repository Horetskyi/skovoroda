import { Title } from "@mantine/core";
import classes from './skH2MobileV2.module.scss'; 

export default function SkH2MobileV2({ text, isAlternate }) {

  const className = isAlternate ? classes.alternateH2Mobile : "";

  return <Title order={2} mx={"auto"} ta={"center"} className={className}>
    {text}
  </Title>
}