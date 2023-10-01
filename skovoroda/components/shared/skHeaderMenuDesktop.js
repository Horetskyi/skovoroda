import { Button, Container, Flex, Text, Tooltip, createStyles } from "@mantine/core";
import SkSkovorodaLogo from "./skSkovorodaLogo3.svg";
import SkDoveLogo from "./skDoveLogo3.svg";
import Link from "next/link";
import { SkovorodaBioPath, SkovorodaFablesPath, SkovorodaTextsPath, SkovorodaTreatisePath, getLinkTitle } from "../../lib/skovorodaPath";
import { SkovorodaConstants } from "../../lib/skovorodaConstants";

const useStyles = createStyles((theme) => ({

  container: {
    borderBottom: "1px #BCBCBC solid"
  },
  title: {
    fontStyle: "normal",
    fontWeight: 100,
    fontSize: "36px",
    lineHeight: "42px",
    letterSpacing: "0.5em",
  },
  titleLink: {
    marginLeft: theme.spacing.sm,
    marginRight: "auto", 
  },
  buttonText: {
    fontStyle: "normal",
    fontWeight: 300,
    fontSize: "20px",
    lineHeight: "23px",
    textAlign: 'center',
    letterSpacing: "0.165em",
    color: "black",
  },
  inProgressText: {
    fontWeight: 300,
    fontSize: "20px",
    lineHeight: "23px",
    letterSpacing: "0.03em",
    color: "#202a54"
  },
  svg: {
    filter: "drop-shadow(3px 1px 8px rgba(0, 0, 0, 0.15));",
  },
  dove: {
    position: "absolute",
    top: "41px",
    left: "-8px",
    filter: "drop-shadow(3px 1px 8px rgba(0, 0, 0, 0.15));",
  },
  svgs: {
    position: "relative",
    scale: "0.8",
  }

}));

export default function SkHeaderMenuDesktop() {
  
  const { classes } = useStyles();

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
      
      <Tooltip label="Додамо трактати, пісні, поезію, переклади, біографію..." position="bottom" color="gray.9" p={"sm"}>
        <Text mr="md" className={classes.inProgressText}>Буде більше!</Text>
      </Tooltip>

      {LinkButton(SkovorodaTreatisePath, "Трактати", classes)}
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