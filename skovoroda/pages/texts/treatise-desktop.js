import { Checkbox, Container, Group, Space, Stack, Text, Title, createStyles } from '@mantine/core';
import { treatisePageKey } from '../../lib/skovorodaConstants';
import SkH1Desktop from '../../components/shared/skH1Desktop';
import { readAllTreatises } from '../../lib/dataReaders/treatisesReader';
import Link from 'next/link';
import { SkovorodaTreatisePath, pathJoin } from '../../lib/skovorodaPath';
import SkTextContentBlockDesktop from '../../components/shared/skTextContentBlockDesktop';
import SkH2Desktop from '../../components/shared/skH2Desktop';
import SkColoredContainerDesktop from '../../components/shared/skColoredContainerDesktop';
import { getNoteNumberString } from '../../lib/data/utils/notesNumbersSymbols';
import SkNote from '../../components/shared/skNote';
import { SkovorodaSourcesArray } from '../../lib/data/skovorodaSources';
import { useState } from 'react';

const useStyles = createStyles((theme) => ({
  treatiseContainer: {
    borderRadius: theme.radius.md,
  },
  h2: {
    fontSize: "24px",
    lineHeight: "24px",
  },
  h2Link: {
    fontSize: "24px !important",
    lineHeight: "24px",
    color: theme.colors.blue[9],

    "&:visited": {
      color: theme.colors.blue[9],
    },
  },
  dates: {
    borderLeftColor: theme.colors.blue[2],
    borderLeftStyle: "solid",
    borderLeftWidth: "12px",
  },
  dateBoxContainer: {
    position: "relative"
  },
  dateBox: {
    background: theme.colors.blue[2],
    width: "24px",
    height: "12px",
    position: "absolute",
    top: 0,
    content: "''",
  },
  dateBoxTexts: {
    justifyContent: "space-between",
    gap: 0,
  }
}));

export default function SkovorodaTreatisePageDesktop({ treatises, sourcesTextContent }) {
  
  const { classes } = useStyles();

  treatises.sort((a,b) => a.orderNumber - b.orderNumber);
  
  const [filters, setFilters] = useState([
    {
      key: "Діалог",
      text: "Діалоги",
      checked: true,
    },
    {
      key: "Притча",
      text: "Притчі",
      checked: true,
    },
    {
      key: "Солілоквій",
      text: "Солілоквії *",
      checked: true,
    },
    {
      key: "Катехізис",
      text: "Катехізис",
      checked: true,
    },
  ]);

  function setChecked(filterKey, checked) {
    const newFilters = [...filters];
    const index = newFilters.findIndex(filter => filter.key === filterKey);
    newFilters[index] = { ...newFilters[index], checked: checked }; 
    setFilters(newFilters);
  }

  const filteredTreatiseTypes = filters.filter(f => f.checked).map(f => f.key);
  const filtered = treatises.filter(x => filteredTreatiseTypes.includes(x.treatiseType));

  return <>
    <SkH1Desktop text="Трактати" mt="lg" />
    <SkColoredContainerDesktop>
      <Text mb="sm" className='normalContentText normalContentText_withoutIndent'>Фільтр по типах:</Text>
      <Stack spacing={"xs"} mb="sm">
        {filters.map(filter => {
          return <Checkbox 
            key={filter.key}
            checked={filter.checked}
            onChange={(event) => setChecked(filter.key, event.currentTarget.checked)} 
            className='normalContentText normalContentText_withoutIndent' 
            label={filter.text} 
          />
        })}
      </Stack>
      <Text className='normalContentText normalContentText_withoutIndent'>* Солілоквій – мова, адресована до самого себе.</Text>
    </SkColoredContainerDesktop>
    {filtered.map(treatise => {

      const href = pathJoin(SkovorodaTreatisePath, treatise.urlId);
      const preferedVersion = treatise.versions.find(v => v.preferedVersion);
      const preferedTitle = preferedVersion.title;
      const introContent = treatise.introContent;
      const writtenDate = treatise.writtenDate;
      writtenDate.sort((a,b) => a.year - b.year);
      
      return <Container key={treatise.urlId} w={900} bg={"gray.0"} className={classes.treatiseContainer} p={"md"} mb={"lg"}>
        <Title order={2} pb="sm" className={classes.h2}>
          <Link href={href} className={classes.h2Link + " normalContentText"}>{preferedTitle}</Link>
        </Title>
        <SkTextContentBlockDesktop textContent={introContent} isv2={true} />
        <Container my="sm" px="0" py="6px" className={classes.dates}>
          {writtenDate.map(date => {
            return <Text key={date.text} className='normalContentText'>
              {date.text}
              {date.noteNumber ? <SkNote noteNumber={date.noteNumber} /> : null}
            </Text>
          })}
        </Container>
        <Group className={classes.dateBoxTexts + ' normalContentText normalContentText_withoutIndent'} w={"100%"}>
          <Text>1722 р.</Text>
          <Text>1794 р.</Text>
        </Group>
        <Container p="0" bg="gray.2" h={"12px"} w={"100%"} className={classes.dateBoxContainer}>
          {writtenDate.map(date => {
            const leftPercent = ((date.year - 1722) * 100.0) / 72.0;
            const leftCss = `${leftPercent}%`;
            return <div key={date.text} className={classes.dateBox} style={{ left: leftCss }} />
          })}
        </Container>
      </Container>
    })}
    <SkColoredContainerDesktop color={"gray.1"}>
      <SkH2Desktop text="Посилання" mb="lg"/>
      <SkTextContentBlockDesktop textContent={sourcesTextContent} isv3={true} />
    </SkColoredContainerDesktop>
  </>
}

export async function getStaticProps({ params }) {

  const treatises = readAllTreatises();

  const sourceIds = new Set();
  treatises.forEach(treatise => {
    if (treatise.introSourceId) {
      sourceIds.add(treatise.introSourceId)
    }
    treatise.writtenDate.forEach(date => {
      if (date.sourceId) {
        sourceIds.add(date.sourceId)
      }
    });
  });
  const sources = SkovorodaSourcesArray.filter(source => sourceIds.has(source.devNumber));

  const sourcesTextContent = [];
  let lastNoteNumber = 0;
  function addNote(sourceId) {
    if (!sourceId) {
      return;
    }
    const found = sourcesTextContent.find(x => x.sourceId == sourceId);
    if (found) {
      return found.noteNumber; // already exists
    }
    const source = sources.find(x => x.devNumber == sourceId);
    if (!source) {
      return; // source not found
    }
    lastNoteNumber++;
    sourcesTextContent.push({
      noteNumber: lastNoteNumber,
      sourceId: sourceId,
      text: source.sourceFullName,
      isNoteBeginning: true,
    });
    return lastNoteNumber;
  }

  treatises.forEach(treatise => {
    if (treatise.introSourceId) {
      const noteNumber = addNote(treatise.introSourceId);
      if (noteNumber) {
        treatise.introContent[0].text = [
          {
            text: treatise.introContent[0].text,
          },
          { 
            noteNumber: noteNumber,
            text: " "+getNoteNumberString(noteNumber),
          }
        ];
      }
    }
    treatise.writtenDate.forEach(date => {
      if (date.sourceId) {
        const noteNumber = addNote(date.sourceId);
        if (noteNumber) {
          date.noteNumber = noteNumber;
        }
      }
    })
  });

  return {
    props: {
      pageKey: treatisePageKey,
      treatises: treatises,
      sourcesTextContent: sourcesTextContent,
      metadataTitle: "Трактати, Діалоги, Притчі - Григорій Савич Сковорода",
      metadataDescription: "Трактати, Діалоги, Притчі - Григорій Савич Сковорода",
    },
  };
}