import { Container } from "@mantine/core";

export default function SkColoredContainerDesktop({color, ta, children, py, pt, pb, cw, relativePosition}) {
  if (!color) {
    color = "white";
  }
  if (py === undefined && pt === undefined && pb === undefined) {
    py = "lg";
  }
  if (!cw) {
    cw = 900;
  }
  const style = {};
  if (relativePosition) {
    style.position = "relative";
  }
  // if (cw) {
  //   style.width = cw + "px";   
  // }
  return <Container m={0} px={0} py={py} pt={pt} pb={pb} bg={color} maw={"initial"}>
    <Container mx={"auto"} my={0} p={0} ta={ta} maw={cw} style={style}>
      {children}
    </Container>
  </Container>
}