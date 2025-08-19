import { Title } from "@mantine/core";
import classes from './skH1Desktop.module.scss'; 

export default function SkH1Desktop({ text, color, maxWidth, fontSize, isV2, disableBackground }) {
  
  let styleObj = {};
  if (color && color.length) {
    styleObj.color = color;
  }
  if (maxWidth) {
    styleObj.maxWidth = `${maxWidth}px`;
  }
  if (fontSize) {
    styleObj.fontSize = `${fontSize}px`;
  }
  return <Title order={1} mx={"auto"} ta={"center"} className={isV2 ? (disableBackground ? classes.titleH1V2_noBg : classes.titleH1V2) : classes.titleH1} style={styleObj}>
    {text}
  </Title>
}