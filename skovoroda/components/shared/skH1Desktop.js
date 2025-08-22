import { Title } from "@mantine/core";
import classes from './skH1Desktop.module.scss'; 

export default function SkH1Desktop({ text, color, maxWidth, fontSize, isV2, disableBackground, withBlueImage, bgLeftMargin }) {

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
  var imageClassName = classes.titleH1;
  if (isV2) {
    imageClassName = disableBackground ? classes.titleH1V2_noBg : classes.titleH1V2;
  }
  var bgSt = {};
  if (withBlueImage) {
    imageClassName = classes.titleH1V2_withBg;
    if (bgLeftMargin) {
      bgSt.marginLeft = `${bgLeftMargin}px`;
    }
  }
  const h1Result = <Title order={1} mx={"auto"} ta={"center"} className={imageClassName} style={styleObj}>
    {text}
  </Title>;
  if (withBlueImage) {
    return <div className={classes.topContainer}>
      <div className={classes.titleBgImageContainer} style={bgSt}>
        <img src="/images/Blue H1.webp" alt="Blue Background" className={classes.titleBgImage} />
      </div>
      {h1Result}
    </div>
  }
  return h1Result;
}