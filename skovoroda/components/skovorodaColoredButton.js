import { Button, createStyles } from "@mantine/core";
import { SkovorodaConstants } from "../lib/skovorodaConstants";

const useStyles = createStyles((theme) => ({
  coloredButton: {
    color: "black",
    padding: "0 12px"
  }
}));

export default function SkovorodaColoredButton(props) {

  const colorType = props.colortype;
  const backgroundType = props.backgroundType;
  const { classes } = useStyles();

  const elementColor = SkovorodaConstants.getElementsColorByType(colorType, backgroundType);
  const elementHoverColor = SkovorodaConstants.getElementsHoverColorByType(colorType, backgroundType);

  return <Button 
    {...props}  
    variant="filled"
    bg={elementColor}
    styles={(theme) => ({
      root: {
        '&:hover': {
          backgroundColor: SkovorodaConstants.getColorInTheme(elementHoverColor, theme),
        },
      },
    })} 
    className={classes.coloredButton}>
    {props.children}
  </Button>
}
