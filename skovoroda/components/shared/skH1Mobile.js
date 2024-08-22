import { Title } from "@mantine/core";
import classes from './skH1Mobile.module.scss'; 
// import SkBaroque1 from "./skBaroque1.svg";

export default function SkH1Mobile(props) {

  // if (props.isBaroque) {
  //   const size = 56;
  //   return <Container p="0" className={classes.containerBaroque}>
  //     <SkBaroque1 className={`${classes.svg} ${classes.svgLeft}`} width={size} height={size}/>
  //     <Title order={1} mx={"auto"} ta={"center"} {...props} className={`${classes.titleH1} ${classes.titleH1Baroque}`}>
  //       {props.text}
  //     </Title>
  //     <SkBaroque1 className={`${classes.svg} ${classes.svgRight}`} width={size} height={size}/>
  //   </Container>
  // }
  return <Title order={1} mx={"auto"} ta={"center"} {...props} className={classes.titleH1}>
    {props.text}
  </Title>
}