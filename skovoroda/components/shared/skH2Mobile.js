import { Title, createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({

  titleH2: {
    fontWeight: 200,
    fontSize: "28px",
    lineHeight: "33px",
    letterSpacing: "0.04em",
  },

}));

// Mobile the same
export default function SkH2Mobile(props) {

  const { classes } = useStyles();

  return <Title order={2} mx={"auto"} ta={"center"} {...props} className={classes.titleH2}>
    {props.text}
  </Title>
}