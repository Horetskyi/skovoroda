import { Button } from "@mantine/core";
import { IconFileDownload } from "@tabler/icons-react";
import Link from "next/link";
import { useCallback } from "react";
import classes from './skDownloadButtonDesktop.module.scss'; 

export default function SkDownloadButtonDesktop({ fileName, device, textId }) {

  const fileExtension = getFileExtensionLabel(fileName);

  const handleDownload = useCallback(async (e) => {
    console.log("Download button clicked", fileName, device, textId);
    await fetch('/api/download', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fileName,
        device,
        textId
      })
    });
  }, [fileName, device, textId]);

  return (
    <Link key={fileName} href={"/sources/" + fileName} title={fileName} className={classes.link} passHref>
    <Button
        as="a"
        href={"/sources/" + fileName}
        download
        onClick={handleDownload}
        rightSection={<IconFileDownload/>}
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
        <span>Завантажити <strong>{fileExtension}</strong></span>
      </Button>
    </Link>
  );
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