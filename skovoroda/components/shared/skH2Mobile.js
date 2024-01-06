import { Title, createStyles } from "@mantine/core";
import classes from './skH2Mobile.module.scss';

// Mobile the same
export default function SkH2Mobile(props) {

  if (props.type === "qa") {
    return <Title order={2} ta={"left"} {...props} className={classes.titleH2Qa}>
      {props.text}
    </Title>
  }

  return <Title order={2} mx={"auto"} ta={"center"} {...props} className={classes.titleH2}>
    {props.text}
  </Title>
}