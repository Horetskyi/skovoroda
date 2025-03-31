import { Container, Flex, Text } from "@mantine/core";
import { SkovorodaAboutUsPath, SkovorodaContactPath, SkovorodaCopyrightPath } from "../../lib/skovorodaPath";
import SkTextLink from "./skTextLink";
import classes from './skFooterDesktop.module.scss'; 

export default function SkFooterDesktop() {
  
  return <footer>
    <Container fluid={true} h={144} bg={"white"} ta={"center"} w={"100%"} className={classes.footer}>
      <Flex 
        ta={"center"}
        gap="lg" 
        justify={"center"}
        align="center"
        direction="row"
        h={144}
        className="normalContentText normalContentText_withoutIndent"
      >
        <SkTextLink href={SkovorodaAboutUsPath} text={"Про нас"} />
        <SkTextLink href={SkovorodaContactPath} text={"Контакти"} />
        <SkTextLink href={SkovorodaCopyrightPath} text={"Правовласникам"} />
      </Flex>
    </Container>
  </footer>
}
