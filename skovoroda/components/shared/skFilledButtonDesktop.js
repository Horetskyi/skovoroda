import { Button, Text } from "@mantine/core";
import Link from "next/link";
import classes from './skFilledButtonDesktop.module.scss'; 

export default function SkFilledButtonDesktop({href, text, width}) {

  return <>
    <Link key={"href-"+href} href={href}>
      <Button 
        radius={"md"} 
        variant="filled"
        miw={180}
        w={width ? width : "100%"}
        h={52}
        className={classes.button}
        color="indigo"
      >
        <Text className={classes.buttonText}>{text}</Text>
      </Button>
    </Link>
  </>
}