import { Container, Flex, Space } from "@mantine/core";
import { SkovorodaAboutUsPath, SkovorodaContactPath, SkovorodaCopyrightPath } from "../../lib/skovorodaPath";
import SkTextLink from "./skTextLink";
import classes from './skFooterMobile.module.scss'; 
import SkImage from "./skImage";
import Link from "next/link";
import { FacebookImageUrl, FacebookLink, TelegramImageUrl, TelegramLink } from "../../lib/smm";

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

        {/* Social Media Icons */}
        <div className={classes.socialIcons}>
          <Link href={FacebookLink} className={classes.socialIcon} title="Facebook" target="_blank">
            <SkImage imageUrl={FacebookImageUrl} width={40} height={40} optimize={false} gentlyShadow={true} additionalClassName={classes.smmImg}/>
          </Link>
          <Link href={TelegramLink} className={classes.socialIcon} title="Telegram" target="_blank">
            <SkImage imageUrl={TelegramImageUrl} width={40} height={40} optimize={false} gentlyShadow={true} additionalClassName={classes.smmImg}/>
          </Link>
        </div>

      </Flex>
    </Container>
  </footer>
}
