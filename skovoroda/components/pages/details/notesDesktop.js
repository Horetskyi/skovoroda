import { Title } from "@mantine/core";
import SkTextContentBlockDesktop from "../../shared/skTextContentBlockDesktop";

export default function NotesDesktop({ notes }) {
  if (!notes || !notes.length) {
    return null;
  }
  return <>
    <Title ta={'center'} mt="xl" mb="md" order={2}>Примітки</Title>
    <SkTextContentBlockDesktop textContent={notes} isNotes={true} />
  </>
}