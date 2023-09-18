import { Button, createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  button: {
    background: theme.colors.indigo[0],
    color: "black",
    fontWeight: 300,
    fontSize: '14px',
    lineHeight: '16px',
    textAlign: "center",
  },
}));

export default function SkButtonMobile({ text, onClick, disabled }) {
  
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
