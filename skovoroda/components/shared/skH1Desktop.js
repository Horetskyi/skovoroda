import { Title } from "@mantine/core";
import classes from './skH1Desktop.module.scss'; 

export default function SkH1Desktop(props) {

  return <Title order={1} mx={"auto"} ta={"center"} {...props} className={classes.titleH1}>
    {props.text}
  </Title>
}