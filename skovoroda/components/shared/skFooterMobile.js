import { Container, Flex, Space } from "@mantine/core";
import { SkovorodaAboutUsPath, SkovorodaContactPath, SkovorodaCopyrightPath } from "../../lib/skovorodaPath";
import SkTextLink from "./skTextLink";
import classes from './skFooterMobile.module.scss'; 

export default function SkFooterMobile() {
  
  return <Container fluid={true} h={144} bg={"gray.1"} ta={"center"} w={"100%"} className={classes.footer}>
    <Flex 
      ta={"center"}
      gap="sm" 
      justify={"center"}
      align="center"
      direction="column"
      h={144}
      className="normalContentText normalContentText_withoutIndent"
    >
      <Space h="xs"/>
      <SkTextLink href={SkovorodaAboutUsPath} text={"Про нас"} />
      <SkTextLink href={SkovorodaContactPath} text={"Контакти"} />
      <SkTextLink href={SkovorodaCopyrightPath} text={"Правовласникам"} />
      <Space h="md"/>
    </Flex>
  </Container>
}
