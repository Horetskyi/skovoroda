import { Button } from "@mantine/core";
import classes from './skButtonDesktop.module.scss'; 

export default function SkButtonDesktop({ text, onClick, disabled }) {
  
  function onClickHere() {
    if (!disabled) {
      onClick();
    }
  }

  return <Button 
    className={classes.button}
    variant="filled"
    radius={"md"}
    color="indigo.0"
    onClick={onClickHere}
    disabled={disabled}
  >
    {text}
  </Button>
}
