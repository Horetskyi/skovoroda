
import XviiiUaIconSvg from "./xviii_v2_ua.svg";
import classes from './xviiiIcon.module.scss'; 

export default function XVIIIIcon({ width = 40, height = 32 }) {
  return <XviiiUaIconSvg className={classes.icon} width={width} height={height} />;
}