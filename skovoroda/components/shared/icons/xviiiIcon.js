
import XviiiUaIconSvg from "./xviii_v2_ua.svg";
import classes from './xviiiIcon.module.scss'; 

export default function XVIIIIcon({ width = 40, height = 32, isAbsolute = false }) {
  if (!isAbsolute) {
    width = 30;
    height = 24;
  }
  return <XviiiUaIconSvg className={isAbsolute ? classes.icon : ''} width={width} height={height} />;
}