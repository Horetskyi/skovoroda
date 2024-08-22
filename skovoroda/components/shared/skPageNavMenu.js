import { Card, Flex } from "@mantine/core";
import SkTextLink from "./skTextLink";
import classes from './skPageNavMenu.module.css';

export default function SkPageNavMenu({links, isDesktop}) {

  if (!links || !links.length || links.length <= 1) {
    return null;
  }

  return <Card shadow="xs" py="sm" px="md" radius={"xs"} mb="md" className={isDesktop ? classes.limitWidth : ""}>
    <Flex direction={"column"} gap={isDesktop ? "sm" : "xs"}>
      {links.map(link => <SkTextLink 
        key={link.text}
        text={link.text}
        href={link.href}
        title={link.title || link.text}
        isWidthLimited={true}
        isLinkThick={true}
      />)}
    </Flex>   
  </Card>
   
}