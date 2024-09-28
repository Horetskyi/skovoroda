import { Button, Container, Flex, Image, Text } from "@mantine/core";
import SkSkovorodaLogo from "./skSkovorodaLogo3.svg";
import SkDoveLogo from "./skDoveLogo3.svg";
import Link from "next/link";
import { SkovorodaBioPath, SkovorodaFablesPath, SkovorodaGardenPath, SkovorodaTextsPath, SkovorodaTreatisePath, getLinkTitle } from "../../lib/skovorodaPath";
import { SkovorodaConstants } from "../../lib/skovorodaConstants";
import classes from './skHeaderMenuDesktop.module.scss';
import HeaderBlockSvg from "./../svgs/headerBlock.svg";
// import SkBaroque1 from "./skBaroque1.svg";

export default function SkHeaderMenuDesktop() {
  
  return <header>

    <div className={classes.svgHeaderBlockContainer}>
      <HeaderBlockSvg className={classes.svgHeaderBlock} />
    </div>

    {/* EXPERIMENTS WITH HEADER WITH SHADOWS */}
    {/* <img src={"/images/headerBlock.svg"} w={"100%"} h={"110px"} className={classes.svgHeaderBlock2} /> */}

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
          <Text className={classes.title}>Сковорода</Text>
        </Link>
        
        {SkovorodaConstants.isProduction ? null : LinkButton(SkovorodaBioPath, "Біографія", classes)}
        {SkovorodaConstants.isProduction ? null : LinkButton(SkovorodaTextsPath, "Твори", classes)}
        
        <nav>
          <Flex 
            gap="sm" 
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
      
      {/* EXPERIMENTS */}
      {/* <div className={`${classes.svgBaroque1Container} ${classes.svgBaroque1ContainerLeft}`}>
        <SkBaroque1 className={`${classes.svgBaroque1}`} width="160" height="160" />
      </div>
      <div className={`${classes.svgBaroque1Container} ${classes.svgBaroque1ContainerRight}`}>
        <SkBaroque1 className={`${classes.svgBaroque1}`} width="160" height="160" />
      </div> */}


    </Container>
  </header>
}

function LinkButton(href, text, classes) {
  const linkTitle = getLinkTitle(href);
  return <>
    <Link key={"href-"+href} href={href} title={linkTitle}>
      <Button 
        radius={"md"} 
        variant="light"
        w={180}
        h={52}
        color="indigo.5"
      >
        <Text className={classes.buttonText}>{text}</Text>
      </Button>
    </Link>
  </>
}