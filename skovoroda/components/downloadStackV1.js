import { Button, Stack } from "@mantine/core";
import { IconBookDownload } from "@tabler/icons-react";
import Link from "next/link";
import classes from './downloadStackV1.module.scss';

export default function DownloadStackV1(props) {

  return <Stack spacing="md">
    {props.files.map(file => 
    <Link key={"link-"+file.fileName} href={"/sources/" + file.fileName} title={file.fileName}>
      <Button 
        width={280}
        leftIcon={<IconBookDownload/>} 
        title={file.fileName}
        variant="light"
        className={classes.coloredButton}>
        Завантажити {file.fileExtensionUppercase} ({file.fileSize})
      </Button>
    </Link>
    )}
  </Stack>
}
