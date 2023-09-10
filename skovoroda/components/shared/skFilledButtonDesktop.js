import { Button, Text, createStyles } from "@mantine/core";
import Link from "next/link";

const useStyles = createStyles((theme) => ({

  button: {
    background: theme.colors.indigo[2],
    boxShadow: theme.shadows.md,

    "&:hover": {
      background: theme.colors.indigo[2],
    }
  },

  buttonText: {
    fontStyle: "normal",
    fontWeight: 300,
    fontSize: "20px",
    lineHeight: "23px",
    textAlign: 'center',
    letterSpacing: "0.165em",
    color: "black",
  },

}));

export default function SkFilledButtonDesktop({href, text, width}) {

  const { classes } = useStyles();

  return <>
    <Link key={"href-"+href} href={href}>
      <a>
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
      </a>
    </Link>
  </>
}