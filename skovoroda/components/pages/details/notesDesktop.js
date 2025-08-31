import { Title } from "@mantine/core";
import SkMetaTextView from "../../shared/skMetaTextView";

export default function NotesDesktop({ notes }) {
  if (!notes || !notes.length) {
    return null;
  }
  return <>
    <Title ta={'center'} mt="xl" mb="md" order={2}>Примітки</Title>
    <SkMetaTextView metaText={notes} isNotes={true} />
  </>
}