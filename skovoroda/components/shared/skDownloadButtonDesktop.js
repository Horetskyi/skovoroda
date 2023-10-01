import { Button, createStyles } from "@mantine/core";
import { IconFileDownload } from "@tabler/icons";
import Link from "next/link";

const useStyles = createStyles((theme) => ({
  link: {
    "span": {
      color: "black",
    }
  },
}));

export default function SkDownloadButtonDesktop({ fileName }) {
  
  const { classes } = useStyles();

  const fileExtension = getFileExtensionUppercase(fileName);

  return <Link key={fileName} href={"/sources/" + fileName} title={fileName} className={classes.link}>
    <Button
      rightIcon={<IconFileDownload/>}
      radius={"md"} 
      variant="filled"
      w={140}
      h={40}
      color="indigo.0"
      className="normalContentText normalContentText_withoutIndent"
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