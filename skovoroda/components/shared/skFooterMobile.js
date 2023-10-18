import { Container, Flex, Space, createStyles } from "@mantine/core";
import { SkovorodaAboutUsPath, SkovorodaContactPath, SkovorodaCopyrightPath } from "../../lib/skovorodaPath";
import SkTextLink from "./skTextLink";

const useStyles = createStyles((theme) => ({
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "144px",
  },
}));

export default function SkFooterMobile() {
  
  const { classes } = useStyles();

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
