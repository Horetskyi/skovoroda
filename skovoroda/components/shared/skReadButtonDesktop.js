import { Button } from "@mantine/core";
import { IconBook } from "@tabler/icons-react";
import Link from "next/link";
import { useCallback } from "react";
import classes from './skDownloadButtonDesktop.module.scss'; 
import { getReadPath } from "../../lib/skovorodaPath";

export default function SkReadButtonDesktop({ device, readUrlId, title }) {

  const readHref = getReadPath(readUrlId);

  const handleClick = useCallback(async (e) => {
    console.log("Read button clicked", device, readUrlId, title);
  }, [device, readUrlId, title]);

  return (
    <Link key={'read'+readUrlId} href={readHref} title={title} className={classes.link} passHref>
    <Button
        as="a"
        href={readHref}
        onClick={handleClick}
        rightSection={<IconBook/>}
        radius={"md"} 
        variant="filled"
        color="blue.0"
        w={260}
        h={50}
        className={`normalContentText normalContentText_withoutIndent ${classes.button}`}
        classNames={{
          section: classes.iconSection
        }}
      >
        <span>Читати</span>
      </Button>
    </Link>
  );
}
