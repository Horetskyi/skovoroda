import { Title, createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({

  titleH2: {
    fontWeight: 200,
    fontSize: "36px",
    lineHeight: "42px",
    letterSpacing: "0.04em",
  },
  titleH2Qa: {
    fontWeight: 300,
    fontSize: "24px",
    lineHeight: "28px",
    letterSpacing: "0.04em",
  },

}));

// Mobile the same
export default function SkH2Desktop(props) {

  const { classes } = useStyles();

  if (props.type === "qa") {
    return <Title order={2} ta={"left"} {...props} className={classes.titleH2Qa}>
      {props.text}
    </Title>
  }

  return <Title order={2} mx={"auto"} ta={"center"} {...props} className={classes.titleH2}>
    {props.text}
  </Title>
}