import { Card, Flex } from "@mantine/core";
import SkTextLink from "./skTextLink";
import classes from './skPageNavMenu.module.scss';

export default function SkPageNavMenu({ links, isDesktop }) {

  if (!links || !links.length || links.length <= 1) {
    return null;
  }

  const cardClassName = (isDesktop ? `${classes.limitWidth} ${classes.card}` : "");
  const cardContainerClassName = isDesktop ? classes.cardContainer : "";

  return <div className={cardContainerClassName}> 
    <Card shadow="0" py="sm" px="md" radius={"lg"} mb="md" className={cardClassName} withBorder={true}>
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
  </div>
}