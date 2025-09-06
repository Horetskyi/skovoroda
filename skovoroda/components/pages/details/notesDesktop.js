import { Title } from "@mantine/core";
import SkMetaTextView from "../../shared/skMetaTextView";

export default function NotesDesktop({ notes }) {
  var metaText = notes;
  if (!metaText) return null;
  if (Array.isArray(metaText)) {
    metaText = {
      meta: {},
      lines: metaText
    };
  }
  if (!metaText.lines || !metaText.lines.length) return null;
  return <>
    <Title ta={'center'} mt="xl" mb="md" order={2}>Примітки</Title>
    <SkMetaTextView metaText={metaText} isNotes={true} />
  </>
}