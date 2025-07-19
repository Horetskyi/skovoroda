import { Container, Flex, Group, Popover, Stack, Text } from "@mantine/core";
import SkSkovorodaLogo from "./skSkovorodaLogo3.svg";
import SkDoveLogo from "./skDoveLogo3.svg";
import Link from "next/link";
import { SkovorodaArticlesPath, SkovorodaBioPath, SkovorodaFablesPath, SkovorodaGardenPath, SkovorodaLettersPath, SkovorodaTextsPath, SkovorodaTreatisePath, getLinkTitle } from "../../lib/skovorodaPath";
import { SkovorodaConstants } from "../../lib/skovorodaConstants";
import classes from './skHeaderMenuDesktop.module.scss';
import HeaderBlockSvg from "./../svgs/headerBlock.svg";
import { useState } from "react";
import { IconChevronDown, IconChevronUp } from "@tabler/icons";

export default function SkHeaderMenuDesktop() {
  
  const [openedResources, setOpenedResources] = useState(false);
  const resourcesLinks = [
    {
      href: SkovorodaArticlesPath,
      text: "Статті",
      linkTitle: 'Статті про Григорія Сковороду',
    }
  ];
  

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
        
        
        {/* TODO: RESPONSIVE */}
  
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
            {LinkButton(SkovorodaLettersPath, "Листи", classes)}

            <Popover key="resources" shadow="md" width={200} position="bottom-end" 
              opened={openedResources} 
              onChange={setOpenedResources} 
              keepMounted={true} 
              withinPortal={false}
              classNames={{
                dropdown: classes.menuPopoverDropdown
              }}>
              <Popover.Target>
                <Group key={"resources-box"} className={`linkWithoutDecoration ${classes.buttonText} ${(openedResources ? ' grayMenuColor' : '')}`} onClick={() => setOpenedResources(o => !o)}>
                  <Text className={`headerFont`}>Ресурси</Text>
                  {!openedResources 
                    ? <IconChevronDown className={classes.menuIcon} width={16} height={16} size={16} /> 
                    : <IconChevronUp className={classes.menuIcon} width={16} height={16} size={16} /> }
                </Group>
              </Popover.Target>
              <Popover.Dropdown >
                <Stack spacing={0} onClick={() => setOpenedResources(o => !o)}>
                  {resourcesLinks.map(link => {
                    return <Link key={link.href} href={link.href} title={link.linkTitle} className={`linkWithoutDecoration ${classes.buttonText}`}>
                      {link.text}
                    </Link>
                  })}
                </Stack>
              </Popover.Dropdown>
            </Popover>

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