import { Title } from "@mantine/core";
import classes from './skH1Mobile.module.scss'; 

export default function SkH1Mobile(props) {

  return <Title order={1} mx={"auto"} mt="xl" mb="md" ta={"center"} {...props} className={classes.titleH1}>
    {props.text}
  </Title>
}