import Link from "next/link";
import classes from "./skTagChip.module.scss";
import { Text } from "@mantine/core";

export default function SkTagChip({ content, href, colorClass }) {
  
  if (!href) {
    return <Text className={`normalContentText normalContentText_withoutIndent ${classes.chip} ${classes[colorClass]}`}>
      {content}
    </Text>;
  }

  return <Link href={href} passHref className={`normalContentText normalContentText_withoutIndent ${classes.chipLink} ${classes.chip} ${classes[colorClass]}`}>
    {content}
  </Link>;
}
