import { Button, Card, Container, createStyles, Stack } from "@mantine/core";
import CustomEase from "gsap/dist/CustomEase";
import { gsap } from "gsap/dist/gsap";
import ScrollToPlugin from 'gsap/dist/ScrollToPlugin';
import { useEffect } from "react";

const useStyles = createStyles((theme) => ({
  

  leftNavMenu3: {
    position: "sticky",
    top: theme.spacing.xl,
    left: 0,
    width: "100%",
  },

  leftNavMenu2: {
    position: "absolute",
    width: `calc(50% - 480px - ${theme.spacing.xl}px - 10px)`,
    top: 0,
    left: theme.spacing.xl,
  },

  leftNavButton: {
    textAlign: "left",
    alignSelf: "flex-start",
    width: "100%",

    ".mantine-Button-inner": {
      minWidth: 0,
      justifyContent: "flex-start",
    },

    ".mantine-Button-label": {
      display: "block",
      textOverflow: "ellipsis",
      height: "auto",
    }
  },

}));

export default function SkovorodaLeftNavMenuDesktop({items, withOrderNumbers}) {

  const { classes } = useStyles();

  gsap.registerPlugin(ScrollToPlugin);
  useEffect(() => {
    document.querySelectorAll(".skovoroda-left-nav-button").forEach((button, index) => {
      if (items[index].isRegistered) {
        return;
      }
      const id = items[index].id;
      button.addEventListener("click", () => {
        gsap.to(window, {
          duration: 0.8, 
          scrollTo:{ y: "#" + id, offsetY: 24},
          ease: "power1.out",
        });
      });
      items[index].isRegistered = true;
    });
  });

  function getLeftNavBlock(item, index) {
    
    const label = (withOrderNumbers ? ("" + (index+1) + ". ") : "") + item.label;

    return <Button key={index} className={`skovoroda-left-nav-button ${classes.leftNavButton}`} 
      variant="subtle"
      size='sm'  
    >
      {label}
    </Button>
  }

  return <>
    <Container></Container>
    <div className={classes.leftNavMenu3}>
      <div className={classes.leftNavMenu2}>
          <Card bg="blue.1" radius="md" px="0" py="md" >
            <Stack spacing="0">
              {items.map(getLeftNavBlock)}
            </Stack>
          </Card>
      </div>
    </div>
  </>
  
}