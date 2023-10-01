import { Button } from "@mantine/core";
import { IconFileDownload } from "@tabler/icons";
import Link from "next/link";

export default function SkDownloadButtonDesktop({ fileName }) {
  
  const fileExtension = getFileExtensionUppercase(fileName);

  return <Link key={fileName} href={"/sources/" + fileName} title={fileName}>
    <Button
      rightIcon={<IconFileDownload/>}
      radius={"md"} 
      variant="light"
      w={140}
      h={40}
      color="indigo"
    >
      {fileExtension}
    </Button>
  </Link> 
}

function getFileExtensionUppercase(fileName) {
  if (fileName.includes(".pdf")) {
    return "PDF";
  }
  if (fileName.includes(".doc")) {
    return "DOC";
  }
  return "FILE";
}