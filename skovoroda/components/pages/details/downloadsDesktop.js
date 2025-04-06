import { Group } from "@mantine/core";
import SkDownloadButtonDesktop from "../../shared/skDownloadButtonDesktop";
import SkH2Desktop from "../../shared/skH2Desktop";

export default function DownloadsDesktop({ fileNames, withHeader }) {
  if (!fileNames || !fileNames.length) {
    return null;
  }
  return <>
    {withHeader ? <SkH2Desktop mt="xl" text="Завантажити" /> : null}
    <Group mt="xl" mb="xl" spacing={"sm"}>
      {fileNames.map(fileName => {
        return <SkDownloadButtonDesktop key={fileName} fileName={fileName}/>
      })}
    </Group>
  </>
}