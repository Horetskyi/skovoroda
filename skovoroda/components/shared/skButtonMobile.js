import { Button } from "@mantine/core";
import classes from './skButtonMobile.module.scss'; 

export default function SkButtonMobile({ text, onClick, disabled, color }) {
  
  function onClickHere() {
    if (!disabled) {
      onClick();
    }
  }

  let styleObj = {};
  if (color && color.length) {
    styleObj.color = color;
  }

  return <Button 
    className={`normalContentText normalContentText_withoutIndent ${classes.button}`}
    variant="filled" 
    radius={"sm"} 
    color="blue.0"
    onClick={onClickHere}
    disabled={disabled}
    style={styleObj}
  >
    {text}
  </Button>
}
