import { Button, Card, Container, createStyles, Stack } from "@mantine/core";
import { gsap } from "gsap/dist/gsap";
import ScrollToPlugin from 'gsap/dist/ScrollToPlugin';
import { useEffect } from "react";

const useStyles = createStyles((theme) => ({
  
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
      height: "20px",
    }
  },

}));

export default function SkovorodaLeftNavMenuMobile({items, withOrderNumbers}) {

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
    <Card bg="blue.1" radius="md" px="0" py="md" mx="md" mb="md" >
      <Stack spacing="0">
        {items.map(getLeftNavBlock)}
      </Stack>
    </Card>
  </>
  
}