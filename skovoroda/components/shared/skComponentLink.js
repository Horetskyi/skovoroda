
import { createStyles } from "@mantine/core";
import Link from "next/link";

const useStyles = createStyles((theme) => ({

  link: {
    textDecorationLine: "none",
  },
  
}));

export default function SkComponentLink({children, href}) {
  
  const { classes } = useStyles();

  return <Link href={href}>
    <a className={classes.link}>{children}</a>
  </Link>
}


