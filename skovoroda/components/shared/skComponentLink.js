
import { createStyles } from "@mantine/core";
import Link from "next/link";

const useStyles = createStyles((theme) => ({

  link: {
    textDecorationLine: "none",
  },
  
}));

export default function SkComponentLink({children, href}) {
  
  const { classes } = useStyles();

  return <Link href={href} className={classes.link}>
    {children}
  </Link>
}


