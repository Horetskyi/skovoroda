import { Button } from "@mantine/core";
import classes from './skButtonMobile.module.scss'; 
import { memo, useCallback, useMemo } from 'react';

const SkButtonMobile = memo(function SkButtonMobile({ text, onClick, disabled, color }) {
  
  const onClickHere = useCallback(() => {
    if (!disabled) {
      onClick();
    }
  }, [disabled, onClick]);

  const styleObj = useMemo(() => {
    if (color && color.length) {
      return { color };
    }
    return {};
  }, [color]);

  return <Button 
    className={`disableTextIndent firstFont ${classes.button}`}
    variant="filled" 
    radius={"sm"} 
    color="blue.0"
    onClick={onClickHere}
    disabled={disabled}
    style={styleObj}
  >
    {text}
  </Button>
});

export default SkButtonMobile;
