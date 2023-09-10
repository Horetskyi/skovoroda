import { Flex, Text, createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({

  container: {
    position: "relative",
    boxShadow: theme.shadows.sm,
    borderRadius: theme.radius.md,
    paddingRight: theme.spacing.md,
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.sm,
    textAlign: "left",
  },

  quotemark: {
    height: "35px",
    position: "absolute",
    width: "19.53px",
    left: "24px",
    top: "8px",
    fontWeight: 300,
    fontSize: "60px",
    lineHeight: "70px",
    textAlign: 'justify',
    letterSpacing: "0.02em",
  },

  text: {
    alignSelf: "center",
    textAlign: "left",
    marginLeft: "60px",
  },

}));
export default function SkQuoteDesktop({text,mb}) {

  const { classes } = useStyles();

  return <>
    <Flex bg={"white"} className={classes.container} mih={64} mb={mb}>
      <Text className={classes.quotemark} color={"gray.6"}>“</Text>
      <Text className={`normalContentText normalContentText_withoutIndent ${classes.text}`}>
        {text}
      </Text>
    </Flex>    
  </>
}