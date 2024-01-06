
import Link from "next/link";
import { getLinkTitle } from "../../lib/skovorodaPath";
import classes from './skTextLink.module.scss';

export default function SkTextLink({text, href, disableStyles, title, className, isBlank}) {
  
  const pClassName = (disableStyles 
    ? classes.linkWithoutStyles 
    : classes.link) + (className ? (" " + className) : "");

  var linkTitle = title;
  if (!linkTitle || !linkTitle.length) {
    linkTitle = getLinkTitle(href);
  }

  return <Link href={href} title={linkTitle} className={pClassName} target={isBlank ? "_blank" : "_self"} >
    {text}
  </Link>
}


