import { Container } from "@mantine/core";

export default function SkColoredContainerMobile({color, ta, children}) {
  if (!color) {
    color = "white";
  }
  return <Container m={0} px={0} py={"md"} bg={color} maw={"initial"}>
    <Container mx={"auto"} my={0} p={0} w={"100%"} ta={ta}>
      {children}
    </Container>
  </Container>
}