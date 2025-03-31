import { Button, Container, Flex, Text } from "@mantine/core";
import SkSkovorodaLogo from "./skSkovorodaLogo3.svg";
import SkDoveLogo from "./skDoveLogo3.svg";
import Link from "next/link";
import { SkovorodaBioPath, SkovorodaFablesPath, SkovorodaGardenPath, SkovorodaTextsPath, SkovorodaTreatisePath, getLinkTitle } from "../../lib/skovorodaPath";
import { SkovorodaConstants } from "../../lib/skovorodaConstants";
import classes from './skHeaderMenuDesktop.module.scss';
import HeaderBlockSvg from "./../svgs/headerBlock.svg";

export default function SkHeaderMenuDesktop() {
  
  return <header>

    <div className={classes.svgHeaderBlockContainer}>
      <HeaderBlockSvg className={classes.svgHeaderBlock} />
    </div>

    <Container fluid={true} h={100} px={"lg"}>
      <Flex 
        gap="sm" 
        justify="flex-start"
        align="center"
        direction="row"
        h={100}
      >
        <Link href={'/'} title={getLinkTitle("/")} className={classes.logoSvgs}>
          <SkSkovorodaLogo className={`${classes.logoSvg}`} width={92} height={98} />
          <SkDoveLogo className={`${classes.logoSvg} ${classes.logoSvgDove}`} width={50} height={50}></SkDoveLogo>
        </Link>

        <Link href={'/'} title={getLinkTitle("/")} className={"undecoratedLink blackLink "+classes.titleLink}>
          <Text className={`linkWithoutDecoration ${classes.title}`}>Сковорода</Text>
        </Link>
        
        {SkovorodaConstants.isProduction ? null : LinkButton(SkovorodaBioPath, "Біографія", classes)}
        {SkovorodaConstants.isProduction ? null : LinkButton(SkovorodaTextsPath, "Твори", classes)}
        
        <nav>
          <Flex 
            gap={40}
            mr={40} 
            justify="flex-start"
            align="center"
            direction="row"
            h={100}
          >
            {LinkButton(SkovorodaTreatisePath, "Трактати", classes)}
            {LinkButton(SkovorodaGardenPath, "Сад Пісень", classes)}
            {LinkButton(SkovorodaFablesPath, "Байки", classes)}
          </Flex>
        </nav>
      
      </Flex>

    </Container>
  </header>
}

function LinkButton(href, text, classes) {
  const linkTitle = getLinkTitle(href);
  return <>
    <Link key={"href-"+href} href={href} title={linkTitle} className={`linkWithoutDecoration ${classes.buttonText}`}>
      <Text className={`headerFont`}>{text}</Text>
    </Link>
  </>
}