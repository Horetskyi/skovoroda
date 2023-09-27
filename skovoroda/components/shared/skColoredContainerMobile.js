import { Container } from "@mantine/core";

export default function SkColoredContainerMobile({color, ta, children, px}) {
  if (!color) {
    color = "white";
  }
  if (!px) {
    px = 0;
  }
  return <Container m={0} px={px} py={"md"} bg={color} maw={"initial"}>
    <Container mx={"auto"} my={0} p={0} w={"100%"} ta={ta}>
      {children}
    </Container>
  </Container>
}