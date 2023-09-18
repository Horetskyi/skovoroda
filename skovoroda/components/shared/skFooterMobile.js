import { Container, Flex, createStyles } from "@mantine/core";
import { SkovorodaAboutUsPath, SkovorodaContactPath, SkovorodaCopyrightPath } from "../../lib/skovorodaPath";
import SkTextLink from "./skTextLink";

const useStyles = createStyles((theme) => ({
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "120px",
  },
}));

export default function SkFooterMobile() {
  
  const { classes } = useStyles();

  return <Container fluid={true} h={120} bg={"gray.1"} ta={"center"} w={"100%"} className={classes.footer}>
    <Flex 
      ta={"center"}
      gap="sm" 
      justify={"center"}
      align="center"
      direction="column"
      h={120}
      className="normalContentText normalContentText_withoutIndent"
    >
      <SkTextLink href={SkovorodaAboutUsPath} text={"Про нас"} />
      <SkTextLink href={SkovorodaContactPath} text={"Контакти"} />
      <SkTextLink href={SkovorodaCopyrightPath} text={"Правовласникам"} />
    </Flex>
  </Container>
}
