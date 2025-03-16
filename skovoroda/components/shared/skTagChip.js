import { Chip } from "@mantine/core";
import Link from "next/link";
import classes from "./skTagChip.module.scss";

export default function SkTagChip({ content, href, colorClass }) {
  return (
    <Link href={href} passHref>
      <Chip
        checked={false}
        variant="light"
        size="sm"
        radius="sm"
        className={`${classes.chip} ${classes[colorClass]}`}
      >
        {content}
      </Chip>
    </Link>
  );
}
