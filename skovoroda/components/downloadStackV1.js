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

  const { classes } = useStyles();

  return <Stack spacing="md">
    {props.files.map(file => 
    <Link key={"link-"+file.fileName} href={"/sources/" + file.fileName}>
      <Button 
        width={260}
        leftIcon={<IconBookDownload/>} 
        title={file.fileName}
        variant="light"
        className={classes.coloredButton}>
        Завантажити {file.fileExtensionUppercase} ({file.fileSize})
      </Button>
      {/* <Button 
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
      </Button> */}
    </Link>
    )}
  </Stack>
}
