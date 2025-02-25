import { Button } from "@mantine/core";
import { IconFileDownload } from "@tabler/icons";
import Link from "next/link";
import classes from './skDownloadButtonDesktop.module.scss'; 

export default function SkDownloadButtonDesktop({ fileName }) {
  
  const fileExtension = getFileExtensionLabel(fileName);

  return <Link key={fileName} href={"/sources/" + fileName} title={fileName} className={classes.link}>
    <Button
      rightSection={<IconFileDownload/>}
      radius={"md"} 
      variant="filled"
      w={260}
      h={50}
      color="indigo.1"
      className={`normalContentText normalContentText_withoutIndent ${classes.button}`}
      classNames={{
        section: classes.iconSection
      }}
    >
      <span>Завантажити <strong>{fileExtension}</strong></span>
    </Button>
  </Link> 
}

function getFileExtensionLabel(fileName) {
  if (fileName.includes(".pdf")) {
    return ".PDF";
  }
  if (fileName.includes(".fb2")) {
    return ".FB2";
  }
  if (fileName.includes(".doc")) {
    return ".DOC";
  }
  if (fileName.includes(".epub")) {
    return ".EPUB";
  }
  return "FILE";
}