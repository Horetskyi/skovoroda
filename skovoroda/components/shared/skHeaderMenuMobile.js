import { ActionIcon, Container, Flex, Popover, Stack, Text, Tooltip, createStyles } from "@mantine/core";
import SkSkovorodaLogo from "./skSkovorodaLogo3.svg";
import SkDoveLogo from "./skDoveLogo3.svg";
import Link from "next/link";
import { SkovorodaFablesPath, SkovorodaTreatisePath, getLinkTitle } from "../../lib/skovorodaPath";
import { IconMenu2 } from "@tabler/icons";
import { useState } from "react";

const useStyles = createStyles((theme) => ({

  container: {
    borderBottom: "1px #BCBCBC solid"
  },
  title: {
    fontStyle: "normal",
    fontWeight: 200,
    fontSize: "28px",
    lineHeight: "33px",
    letterSpacing: "0.16em",
  },
  titleLink: {
    marginLeft: 0,
    marginRight: "auto", 
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 500,
    letterSpacing: "0.165em",
    color: "black",
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.sm,
    textDecoration: "none",
  },
  logoLink: {
    marginTop: theme.spacing.sm,
  },
  inProgressText: {
    letterSpacing: "0.03em",
    color: "#202a54",
    margin: "auto",
  },
  svg: {
    filter: "drop-shadow(3px 1px 8px rgba(0, 0, 0, 0.15));",
  },
  dove: {
    position: "absolute",
    top: "34px",
    left: "-8px",
    filter: "drop-shadow(3px 1px 8px rgba(0, 0, 0, 0.15));",
  },
  svgs: {
    position: "relative",
    scale: "0.9",
    marginLeft: theme.spacing.xs,
    marginRight: theme.spacing.xs,
  }
}));

export default function SkHeaderMenuMobile() {
  
  const { classes } = useStyles();
  const [opened, setOpened] = useState(false);
  const links = [
    {
      text: "Трактати",
      href: SkovorodaTreatisePath
    },
    {
      text: "Байки",
      href: SkovorodaFablesPath
    }
  ];

  return <Container fluid={true} h={87} px={"sm"} className={classes.container}>
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

      <Link href={'/'} title={getLinkTitle("/")} className={"undecoratedLink blackLink "+classes.titleLink}>
        <Text className={classes.title}>Сковорода</Text>
      </Link>
      
      <Popover shadow="md" width={200} position="bottom-end" opened={opened} onChange={setOpened}>
        <Popover.Target>
          <ActionIcon variant="transparent" color="gray" radius={"xl"} w={60} h={60} spacing={0} onClick={() => setOpened((o) => !o)}>
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
            <Tooltip label="Додамо трактати, пісні, поезію, переклади, біографію..." position="bottom" color="gray.9" p={"sm"}>
              <Text py={'sm'} ta={"center"} className={classes.inProgressText + " normalContentText normalContentText_withoutIndent"}>Буде більше!</Text>
            </Tooltip>
          </Stack>
          
        </Popover.Dropdown>
      </Popover>

    </Flex>
  </Container>
}
