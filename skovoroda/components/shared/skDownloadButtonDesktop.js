import { Button } from "@mantine/core";
import { IconFileDownload } from "@tabler/icons";
import Link from "next/link";
import classes from './skDownloadButtonDesktop.module.scss'; 

export default function SkDownloadButtonDesktop({ fileName }) {
  
  const fileExtension = getFileExtensionLabel(fileName);
  const buttonLabel = `Завантажити ${fileExtension}`;

  return <Link key={fileName} href={"/sources/" + fileName} title={fileName} className={classes.link}>
    <Button
      rightSection={<IconFileDownload/>}
      radius={"md"} 
      variant="filled"
      w={240}
      h={50}
      color="indigo.1"
      className={`normalContentText normalContentText_withoutIndent ${classes.button}`}
      classNames={{
        section: classes.iconSection
      }}
    >
      {buttonLabel}
    </Button>
  </Link> 
}

function getFileExtensionLabel(fileName) {
  if (fileName.includes(".pdf")) {
    return ".PDF";
  }
  if (fileName.includes(".doc")) {
    return ".DOC";
  }
  return "FILE";
}