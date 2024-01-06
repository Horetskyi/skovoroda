
import Link from "next/link";
import classes from './skComponentLink.module.scss'; 

export default function SkComponentLink({children, href}) {
  
  return <Link href={href} className={classes.link}>
    {children}
  </Link>
}


