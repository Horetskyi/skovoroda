import { Card, Checkbox, Container, Select, Slider, Space, Textarea, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { getNoteNumberString } from "../lib/data/utils/notesNumbersSymbols";
import { utils1PageKey } from "../lib/skovorodaConstants";
import { gsap } from "gsap/dist/gsap";
import classes from './utils1-destop.module.scss';
import SkImage from "../components/shared/skImage";

var timeline = undefined;

const accentsSimpleMap = [
  ['ч','ч́'],
  ['к','ќ'],
  ['а','á'],
  ['о','ó'],
  ['у','у́'],
  ['и','и́'],
  ['ы','ы́'],
  ['е','é'],
  ['э','э́'],
  ['ї','ї́'],
  ['ю','ю́'],
  ['я','я́'],

  [ 'К' , 'Ќ' ],
  [ 'Ч' , 'Ч́' ],
  [ 'А' , 'А́' ],
  [ 'О' , 'О́' ],
  [ 'У' , 'У́' ],
  [ 'И' , 'И́' ],
  [ 'Ы' , 'Ы́' ],
  [ 'Е' , 'Е́' ],
  [ 'Э' , 'Э́' ],
  [ 'Ї' , 'Ї́' ],
  [ 'Ю' , 'Ю́' ],
  [ 'Я' , 'Я́' ],
];
const finalAccentsReplaces = [];
const accentsIndicators = ['´', 'μ', ' ́', '°', '·', '¶'];
accentsIndicators.forEach(after => {
  accentsSimpleMap.forEach(pair => {
    finalAccentsReplaces.push([pair[0] + after, pair[1]]);
  });
});

export default function Utils1({ }) {

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

  const [selectedMode, setMode] = useState("note");
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [noteString, setNoteString] = useState('');
  const [shouldRemoveEnters, setShouldRemoveEnters] = useState(true);
  const [shouldDoAccents, setShouldDoAccents] = useState(true);

  const formatTemplates = [
    {
      name: "[Center]",
      description: "вирівнюти текст по центру",
    },
    {
      name: "[Right]",
      description: "вирівнюти текст по праву сторону",
    },
    {
      name: "[Tab1], [Tab2], [Tab3], [Tab4], [Tab5], [Tab6]",
      description: "відступи",
    },
  ];

  function processInputText(text) {
    if (shouldRemoveEnters) {
      text = text.replaceAll('\n', ' ');
    }
    if (shouldDoAccents) {
      finalAccentsReplaces.forEach(replaces => {
        text = text.replaceAll(replaces[0], replaces[1]);
      });
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
    if (selectedMode == "italic") {
      const italicText =  `[Italic]${selectedText}[Italic]`;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(italicText);
      }
      return;
    }

    const newNoteString = getNoteNumberString(selectedText).trim();
    if (!newNoteString) {
      return;
    }
    setNoteString(newNoteString);
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(newNoteString);
    }

  }

  const imageScale = 0.25;

  return <Container>
    <Title my="xl" order={1}>Utils</Title>
    <Space />

    <SkImage imageUrl={"/images/Screenshot_1.png"} width={2150 * imageScale} height={1316 * imageScale} priority={true} shadow={false} />
    <SkImage imageUrl={"/images/Screenshot_1 copy.png"} width={2150 * imageScale} height={1316 * imageScale} priority={true} shadow={false} />

    {/* <Card w={600} p="xl" withBorder={true} bg="blue.1">
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

    <Space /> */}
    
    <Checkbox checked={shouldRemoveEnters} 
      onChange={(event) => setShouldRemoveEnters(event.currentTarget.checked)} 
      label="Забирати ентери"
      mb="md" />

    <Checkbox checked={shouldDoAccents} 
      onChange={(event) => setShouldDoAccents(event.currentTarget.checked)} 
      label="Фіксати апострофи"
      mb="md" />
    
    
    <Textarea h={350} classNames={{input: classes.utilsTextArea}} className={classes.utilsTextArea} minRows={10} maxRows={10} mb="md" value={inputText} onChange={(event) => setInputTextFacade(event.currentTarget.value)} />
    {/* <Card>
      {[...outputText].map((value, index) => {
        return <span key={index}>{value}</span>
      })}
    </Card> */}

    <Select 
      data={[
        {
          value: "note",
          label: "note",
        },
        {
          value: "italic",
          label: "italic",
        },
      ]} 
      value={selectedMode}
      onChange={(value) => setMode(value)}
    />

    <Textarea h={350} classNames={{input: classes.utilsTextArea}} className={classes.utilsTextArea} id="output" minRows={10} maxRows={10} mb="md" value={outputText} 
      onChange={(event) => setOutputText(event.currentTarget.value)} 
      onSelectCapture={() => makeNote()}
    />

    <h2>Шаблони форматування</h2>

    {formatTemplates.map(t => {
      return <p key={t.name}>
        <b>{t.name}</b> - <span>{t.description}</span>
      </p>
    })}

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
