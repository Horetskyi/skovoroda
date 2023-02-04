import { Button, Card, Checkbox, Container, createStyles, Slider, Space, Text, Textarea, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import AnimatedMailComponent from "../components/animatedMailComponent";
import { getNoteNumberString } from "../lib/data/utils/notesNumbersSymbols";
import { textsPageKey, utils1PageKey } from "../lib/skovorodaConstants";
import { gsap } from "gsap/dist/gsap";
import { IconMail } from "@tabler/icons";

const useStyles = createStyles((theme) => ({

}));

var timeline = undefined;

export default function Utils1({ }) {
  
  const { classes } = useStyles();

  const [timeSliderValue, setTimeSliderValue] = useState(1722);

  useEffect(() => {
    if (!timeline) {
      console.log("Timeline initialization")
      timeline = gsap.timeline({paused: true, defaults: { ease: "none"}});
      timeline.fromTo("#skovoroda-image", { scale: 0.25 }, { duration: 1, scale: 1, x: 500 });
    }
  });

  function setTimeSliderValueFacade(value) {
    setTimeSliderValue(value);
    const progressValue = (value - 1722) / (1794 - 1722);
    timeline.progress(progressValue);
  }

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
    <Space />

    <Card w={600} p="xl" withBorder={true} bg="blue.1">
      <IconMail id="skovoroda-image" size={40} />
      <Space h={100} />
      <Slider 
        label={(value) => `${Math.round(value)} рік`} 
        labelAlwaysOn={true} 
        marks={[
          { value: 1722, label: '1722 рік' },
          { value: 1794, label: '1794 рік' },
        ]}
        precision={2}
        min={1722}
        max={1794}
        value={timeSliderValue}
        onChange={(value) => setTimeSliderValueFacade(value)}
      />
    </Card>

    <Space />
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
