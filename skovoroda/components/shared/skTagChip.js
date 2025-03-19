import Link from "next/link";
import classes from "./skTagChip.module.scss";

export default function SkTagChip({ content, href, colorClass }) {
  return (
    <Link href={href} passHref className={`normalContentText normalContentText_withoutIndent ${classes.chip} ${classes[colorClass]}`}>
      {content}
    </Link>
  );
}
