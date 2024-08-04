import { Button, Container, Flex, Text } from "@mantine/core";
import SkSkovorodaLogo from "./skSkovorodaLogo3.svg";
import SkDoveLogo from "./skDoveLogo3.svg";
import Link from "next/link";
import { SkovorodaBioPath, SkovorodaFablesPath, SkovorodaGardenPath, SkovorodaTextsPath, SkovorodaTreatisePath, getLinkTitle } from "../../lib/skovorodaPath";
import { SkovorodaConstants } from "../../lib/skovorodaConstants";
import classes from './skHeaderMenuDesktop.module.scss';

export default function SkHeaderMenuDesktop() {
  
  return <Container fluid={true} h={100} px={"lg"} className={classes.container}>
    <Flex 
      gap="sm" 
      justify="flex-start"
      align="center"
      direction="row"
      h={100}
    >
      <Link href={'/'} title={getLinkTitle("/")} className={classes.svgs}>
        <SkSkovorodaLogo className={classes.svg} width={92} height={98} />
        <SkDoveLogo className={`${classes.svg} ${classes.dove}`} width={50} height={50}></SkDoveLogo>
      </Link>

      <Link href={'/'} title={getLinkTitle("/")} className={"undecoratedLink blackLink "+classes.titleLink}>
        <Text className={classes.title}>Сковорода</Text>
      </Link>
      
      {SkovorodaConstants.isProduction ? null : LinkButton(SkovorodaBioPath, "Біографія", classes)}
      {SkovorodaConstants.isProduction ? null : LinkButton(SkovorodaTextsPath, "Твори", classes)}
      
      {LinkButton(SkovorodaTreatisePath, "Трактати", classes)}
      {LinkButton(SkovorodaGardenPath, "Сад Пісень", classes)}
      {LinkButton(SkovorodaFablesPath, "Байки", classes)}
    
    </Flex>
  </Container>
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
        color="indigo"
      >
        <Text className={classes.buttonText}>{text}</Text>
      </Button>
    </Link>
  </>
}