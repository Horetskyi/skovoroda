import { Container, Flex, Text } from "@mantine/core";
import { SkovorodaAboutUsPath, SkovorodaContactPath, SkovorodaCopyrightPath } from "../../lib/skovorodaPath";
import { FacebookImageUrl, FacebookLink, TelegramImageUrl, TelegramLink } from "../../lib/smm";
import SkTextLink from "./skTextLink";
import classes from './skFooterDesktop.module.scss';
import FacebookIcon from "../svgs/facebook.svg";
import TelegramIcon from "../svgs/telegram.svg"; 
import Link from "next/link";
import SkImage from "./skImage";

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
