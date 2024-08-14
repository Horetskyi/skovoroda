import { Container, Flex, Space } from "@mantine/core";
import { SkovorodaAboutUsPath, SkovorodaContactPath, SkovorodaCopyrightPath } from "../../lib/skovorodaPath";
import SkTextLink from "./skTextLink";
import classes from './skFooterMobile.module.scss'; 

export default function SkFooterMobile() {
  
  return <footer>
    <Container fluid={true} h={160} bg={"gray.1"} ta={"center"} w={"100%"} className={classes.footer}>
      <Flex 
        ta={"center"}
        gap="0.15rem" 
        justify={"center"}
        align="center"
        direction="column"
        h={160}
        className="normalContentText normalContentText_withoutIndent"
      >
        <SkTextLink href={SkovorodaAboutUsPath} text={"Про нас"} className={classes.footerLink}/>
        <SkTextLink href={SkovorodaContactPath} text={"Контакти"}  className={classes.footerLink}/>
        <SkTextLink href={SkovorodaCopyrightPath} text={"Правовласникам"}  className={classes.footerLink}/>
      </Flex>
    </Container>
  </footer>
}
