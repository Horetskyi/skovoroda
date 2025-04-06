import { Title } from "@mantine/core";
import classes from './skH1Desktop.module.scss'; 

export default function SkH1Desktop({text}) {

  return <Title order={1} mx={"auto"} ta={"center"} className={classes.titleH1}>
    {text}
  </Title>
}