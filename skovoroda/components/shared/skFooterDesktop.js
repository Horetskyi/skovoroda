import { Container, Flex, Text } from "@mantine/core";
import { SkovorodaAboutUsPath, SkovorodaContactPath, SkovorodaCopyrightPath } from "../../lib/skovorodaPath";
import SkTextLink from "./skTextLink";
import classes from './skFooterDesktop.module.scss'; 

export default function SkFooterDesktop() {
  
  return <Container fluid={true} h={144} bg={"indigo.1"} ta={"center"} w={"100%"} className={classes.footer}>
    <Flex 
      ta={"center"}
      gap="sm" 
      justify={"center"}
      align="center"
      direction="row"
      h={144}
      className="normalContentText normalContentText_withoutIndent"
    >
      <SkTextLink href={SkovorodaAboutUsPath} text={"Про нас"} />
      <Text>|</Text>
      <SkTextLink href={SkovorodaContactPath} text={"Контакти"} />
      <Text>|</Text>
      <SkTextLink href={SkovorodaCopyrightPath} text={"Правовласникам"} />
    </Flex>
  </Container>
}
