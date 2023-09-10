import { Title, createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({

  titleH1: {
    fontWeight: 200,
    fontStyle: "normal",
    fontSize: "28px",
    lineHeight: "33px",
    letterSpacing: "0.2em",
    textAlign: "center",
    color: "black",
  },

}));

export default function SkH1Mobile(props) {

  const { classes } = useStyles();

  return <Title order={1} mx={"auto"} ta={"center"} {...props} className={classes.titleH1}>
    {props.text}
  </Title>
}