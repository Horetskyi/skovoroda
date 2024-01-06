import { Button } from "@mantine/core";
import classes from './skButtonMobile.module.scss'; 

export default function SkButtonMobile({ text, onClick, disabled }) {
  
  function onClickHere() {
    if (!disabled) {
      onClick();
    }
  }

  return <Button className={classes.button} variant="filled" radius={"md"} color="indigo.0" onClick={onClickHere} disabled={disabled}>
    {text}
  </Button>
}
