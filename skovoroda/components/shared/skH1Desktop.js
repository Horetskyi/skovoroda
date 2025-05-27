import { Title } from "@mantine/core";
import classes from './skH1Desktop.module.scss'; 

export default function SkH1Desktop({ text, color, maxWidth }) {
  
  let styleObj = {};
  if (color && color.length) {
    styleObj.color = color;
  }
  if (maxWidth) {
    styleObj.maxWidth = `${maxWidth}px`;
  }
  return <Title order={1} mx={"auto"} ta={"center"} className={classes.titleH1} style={styleObj}>
    {text}
  </Title>
}