import { Card, Flex, List, Text } from "@mantine/core";
import SkTextLink from "./skTextLink";
import classes from "./skPageNavMenu.module.scss";

export default function SkPageNavMenu({ links, isDesktop }) {
  if (!links || !links.length || links.length <= 1) {
    return null;
  }

  if (isDesktop) {
    return <div className={classes.cardContainer}>
      <Card shadow="0" py="sm" px="md" radius={"lg"} mb="md" className={`${classes.limitWidth} ${classes.card}`} withBorder={false}>
        <Flex direction={"column"} gap={"sm"}>
          <Text className={classes.topLabel} >Навігація:</Text>
          {links.map((link) => (
            <SkTextLink 
              key={link.text}
              text={link.text}
              href={link.href}
              title={link.title || link.text}
              className={classes.menuLink} 
              isWidthLimited={true}
              isLinkThick={true}
            />
          ))}
        </Flex>
      </Card>
    </div>
  }

  return <div className={classes.cardContainerMobile}>
    <Text className={`${classes.topLabelMobile} firstFont`} mb="sm">
      Вміст веб-сторінки:
    </Text>
    <List>
      {links.map((link) => (
        <List.Item key={link.text}>
          <SkTextLink 
            key={link.text}
            text={link.text}
            href={link.href}
            title={link.title || link.text}
            className={`firstFont ${classes.fontMediumSize}`} 
            isWidthLimited={true}
          />
        </List.Item>
      ))}
    </List>
  </div>
}
