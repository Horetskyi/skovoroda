import { Button, createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  button: {
    background: theme.colors.indigo[0],
    color: "black",
    fontWeight: 300,
    fontSize: '20px',
    lineHeight: '23px',
    letterSpacing: "0.165em",
    textAlign: "center",
    height: "42px",
  },
}));

export default function SkButtonDesktop({ text, onClick, disabled }) {
  
  const { classes } = useStyles();

  function onClickHere() {
    if (!disabled) {
      onClick();
    }
  }

  return <Button className={classes.button} variant="filled" radius={"md"} color="indigo.0" onClick={onClickHere} disabled={disabled}>
    {text}
  </Button>
}
