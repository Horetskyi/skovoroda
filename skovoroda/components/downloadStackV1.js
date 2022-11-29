import { Button, createStyles, Stack } from "@mantine/core";
import { IconBookDownload } from "@tabler/icons";
import Link from "next/link";

const useStyles = createStyles((theme) => ({
  downloadButton: {
    width: "260px",
  },
}));

export default function DownloadStackV1(props) {

  const { classes } = useStyles();

  return <Stack spacing="0">
    {props.files.map(file => 
    <Link key={"link-"+file.fileName} href={"/sources/" + file.fileName}>
      <Button className={classes.downloadButton} mt="md" variant="light" leftIcon={<IconBookDownload />} title={file.fileName}>
        Завантажити {file.fileExtensionUppercase} ({file.fileSize})
      </Button>
    </Link>
    )}
  </Stack>
}
