
import { createStyles } from "@mantine/core";
import Link from "next/link";
import { getLinkTitle } from "../../lib/skovorodaPath";

const useStyles = createStyles((theme) => ({

  link: {
    fontWeight: 300,
    fontSize: "20px",
    lineHeight: "23px",
    letterSpacing: "0.02em",
    textDecorationLine: "underline",
    color: "#0e3457",
  },
  linkWithoutStyles: {
    textDecorationLine: "none",
    color: "black",
  }
  
}));

export default function SkTextLink({text, href, disableStyles, title, className}) {
  
  const { classes } = useStyles();

  const pClassName = (disableStyles 
    ? classes.linkWithoutStyles 
    : classes.link) + (className ? (" " + className) : "");

  var linkTitle = title;
  if (!linkTitle || !linkTitle.length) {
    linkTitle = getLinkTitle(href);
  }

  return <Link href={href} title={linkTitle} className={pClassName}>
    {text}
  </Link>
}


