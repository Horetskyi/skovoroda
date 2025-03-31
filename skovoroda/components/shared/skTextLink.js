
import Link from "next/link";
import { getLinkTitle } from "../../lib/skovorodaPath";
import classes from './skTextLink.module.scss';

export default function SkTextLink({text, href, disableStyles, onHoverStylesOnly, title, className, isBlank, isWidthLimited, isLinkThick}) {
  
  let pClassName = (disableStyles 
    ? classes.linkWithoutStyles 
    : onHoverStylesOnly 
        ? (classes.linkOnHoverStylesOnly + " linkWithoutDecoration")
        : classes.link) + 
        (className ? (" " + className) : "");

  if (isWidthLimited) {
    pClassName += " " + classes.linkWidthLimited;
  }
  if (isLinkThick) {
    pClassName += " " + classes.linkThick;
  }

  var linkTitle = title;
  if (!linkTitle || !linkTitle.length) {
    linkTitle = getLinkTitle(href);
  }

  return <Link href={href} title={linkTitle} className={pClassName} target={isBlank ? "_blank" : "_self"} >
    {text}
  </Link>
}


