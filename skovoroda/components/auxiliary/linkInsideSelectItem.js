import { createStyles } from "@mantine/core";
import Link from "next/link";
import { forwardRef } from "react";
import { languagesToShortString } from "../../lib/skovorodaLanguagesLogic";

const useStyles = createStyles(() => {
  return {
    selectorLink: {
      textDecoration: "none",
    },
  };
});

export default function LinkInsideSelectItem({ id, disabled, label, ...others }, ref) {

  const { classes } = useStyles();

  others.className += " " + classes.selectorLink;
  if (disabled) {
    return <span ref={ref} {...others}>{label}</span>
  }
  return <Link ref={ref} href={id}><a {...others}>{label}</a></Link>
}

export const LinkInsideSelect = forwardRef(function LinkInsideSelect({ ...others }, ref) { 
  return <LinkInsideSelectItem ref={ref} { ...others } />
});
