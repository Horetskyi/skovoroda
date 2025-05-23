import { Title } from "@mantine/core";
import classes from './skH1Mobile.module.scss'; 

export default function SkH1Mobile({ text, color }) {
  let styleObj = {};
  if (color && color.length) {
    styleObj.color = color;
  }
  return <Title 
    order={1} 
    px="lg" mx={"auto"} ta={"center"} className={classes.titleH1} 
    style={styleObj}
  >
    {text}
  </Title>
}