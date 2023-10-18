import { Container } from "@mantine/core";

export default function SkColoredContainerDesktop({color, ta, children, py, pt, pb}) {
  if (!color) {
    color = "white";
  }
  if (py === undefined && pt === undefined && pb === undefined) {
    py = "lg";
  }
  return <Container m={0} px={0} py={py} pt={pt} pb={pb} bg={color} maw={"initial"}>
    <Container mx={"auto"} my={0} p={0} w={900} ta={ta}>
      {children}
    </Container>
  </Container>
}