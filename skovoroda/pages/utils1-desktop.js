import { Button, Card, Checkbox, Container, createStyles, Text, Textarea, Title } from "@mantine/core";
import { useState } from "react";
import { getNoteNumberString } from "../lib/data/utils/notesNumbersSymbols";
import { textsPageKey, utils1PageKey } from "../lib/skovorodaConstants";

const useStyles = createStyles((theme) => ({

}));

export default function Utils1({ }) {
  
  const { classes } = useStyles();

  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [noteString, setNoteString] = useState('');
  const [shouldRemoveEnters, setShouldRemoveEnters] = useState(true);

  function processInputText(text) {
    if (shouldRemoveEnters) {
      return text.replaceAll('\n', ' ');
    }
    return text;
  }

  function setInputTextFacade(newInputText) {
    setInputText(newInputText);
    setOutputText(processInputText(newInputText));
  }

  function makeNote() {
    const selectedText = document.getSelection().toString();
    if (!selectedText) {
      return;
    }
    const newNoteString = getNoteNumberString(selectedText).trim();
    if (!newNoteString) {
      return;
    }
    setNoteString(newNoteString);
    navigator.clipboard.writeText(newNoteString);
  }

  return <Container>
    <Title my="xl" order={1}>Utils</Title>
    <Checkbox checked={shouldRemoveEnters} onChange={(event) => setShouldRemoveEnters(event.currentTarget.checked)} label="Забирати ентери" />
    <Textarea minRows={10} maxRows={10} mb="md" value={inputText} onChange={(event) => setInputTextFacade(event.currentTarget.value)} />
    {/* <Card>
      {[...outputText].map((value, index) => {
        return <span key={index}>{value}</span>
      })}
    </Card> */}

    <Textarea id="output" minRows={10} maxRows={10} mb="md" value={outputText} 
      onChange={(event) => setOutputText(event.currentTarget.value)} 
      onSelectCapture={() => makeNote()}
    />
  </Container>
}
export async function getStaticProps({ params }) {

  return {
    props: {
      pageKey: utils1PageKey,
      metadataTitle: "Development - Григорій Савич Сковорода",
      metadataDescription: "Development - Григорій Савич Сковорода",
    },
  };
}