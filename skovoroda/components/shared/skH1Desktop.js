import { Title, createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({

  titleH1: {
    fontWeight: 200,
    fontStyle: "normal",
    fontSize: "48px",
    lineHeight: "56px",
    letterSpacing: "0.15em",
    textAlign: "center",
    color: "black",
  },

}));

export default function SkH1Desktop(props) {

  const { classes } = useStyles();

  return <Title order={1} mx={"auto"} ta={"center"} {...props} className={classes.titleH1}>
    {props.text}
  </Title>
}