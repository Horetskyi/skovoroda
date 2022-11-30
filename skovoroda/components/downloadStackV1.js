import { Button, createStyles, Stack } from "@mantine/core";
import { IconBookDownload } from "@tabler/icons";
import Link from "next/link";

const useStyles = createStyles((theme) => ({
  downloadButton: {
    width: "260px",
    color: "black",
  }
}));

export default function DownloadStackV1(props) {

  const color = props.color;

  const { classes } = useStyles();

  return <Stack spacing="0">
    {props.files.map(file => 
    <Link key={"link-"+file.fileName} href={"/sources/" + file.fileName}>
      <Button 
        bg={color+".2"} 
        className={classes.downloadButton}
        mt="md"
        variant="filled"
        styles={(theme) => ({
          root: {
            '&:hover': {
              backgroundColor: theme.colors[color][3],
            },
          },
        })} 
        leftIcon={<IconBookDownload/>} 
        title={file.fileName}
      >
        Завантажити {file.fileExtensionUppercase} ({file.fileSize})
      </Button>
    </Link>
    )}
  </Stack>
}
