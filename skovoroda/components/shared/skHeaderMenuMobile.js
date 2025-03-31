import { ActionIcon, Container, Flex, Popover, Stack, Text } from "@mantine/core";
import SkSkovorodaLogo from "./skSkovorodaLogo3.svg";
import SkDoveLogo from "./skDoveLogo3.svg";
import Link from "next/link";
import { SkovorodaFablesPath, SkovorodaGardenPath, SkovorodaTreatisePath, getLinkTitle } from "../../lib/skovorodaPath";
import { IconMenu2 } from "@tabler/icons";
import { useState } from "react";
import classes from './skHeaderMenuMobile.module.scss';
import HeaderBlockSvg from "./../svgs/headerBlockMobile.svg";

export default function SkHeaderMenuMobile() {
  
  const [opened, setOpened] = useState(false);
  const links = [
    {
      text: "Трактати",
      href: SkovorodaTreatisePath
    },
    {
      text: "Сад Пісень",
      href: SkovorodaGardenPath
    },
    {
      text: "Байки",
      href: SkovorodaFablesPath
    }
  ];

  return <header>

    <div className={classes.svgHeaderBlockContainer}>
      <HeaderBlockSvg className={classes.svgHeaderBlock} />
    </div>

    <Container fluid={true} h={87} px={"sm"}>
      <Flex 
        gap={0} 
        justify="flex-start"
        align="center"
        direction="row"
        h={87}
      >
        <Link href={'/'} title={getLinkTitle("/")} className={`${classes.logoLink} ${classes.svgs}`}>
          <SkSkovorodaLogo className={classes.svg} width={70} height={75} />
          <SkDoveLogo className={classes.dove} width={40} height={40} />
        </Link>

        <Link href={'/'} title={getLinkTitle("/")} className={"linkWithoutDecoration "+classes.titleLink}>
          <Text className={classes.title}>Сковорода</Text>
        </Link>
        
        <nav>
          <Popover shadow="md" width={200} position="bottom-end" opened={opened} onChange={setOpened} keepMounted={true} withinPortal={false}>
            <Popover.Target>
              <ActionIcon variant="transparent" color="gray" radius={"xl"} w={60} h={60} spacing={0} onClick={() => setOpened((o) => !o)} aria-label="Головне Меню">
                <IconMenu2 size="40px" strokeWidth={1} />
              </ActionIcon>
            </Popover.Target>
            <Popover.Dropdown >
              <Stack onClick={() => setOpened((o) => !o)} spacing={0}>
                {links.map(link => {
                  const linkTitle = getLinkTitle(link.href);
                  return <Link key={link.href} href={link.href} title={linkTitle} className={classes.buttonText + " normalContentText normalContentText_withoutIndent"}>
                    {link.text}
                  </Link>
                })}
              </Stack>
              
            </Popover.Dropdown>
          </Popover>
        </nav>

      </Flex>
    </Container>
  </header>
}
