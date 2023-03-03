import { Container, createStyles, Stack, Table, Text, Title } from '@mantine/core';
import { IconMail, IconMessage, IconSquareLetterU } from '@tabler/icons';
import Link from 'next/link';
import AnimatedMailComponent from '../components/animatedMailComponent';
import { SkovorodaLettersFrom, SkovorodaLettersTo } from '../lib/data/skovorodaLetters';
import { SkovorodaTextsArray } from '../lib/data/skovorodaTexts';
import { lettersPageKey, textsPageKey } from '../lib/skovorodaConstants';
import { pathJoin, pathJoinWithoutEndSlash, SkovorodaLettersFromPath, SkovorodaTextsPath } from '../lib/skovorodaPath';

const useStyles = createStyles((theme) => ({
  table: {
    "thead": {
      position: "sticky",
      top: "0",
      background: "white",
      "tr": {
        "th:nth-child(1)": {
          minWidth: "360px"
        },
        "th:nth-child(2)": {
          minWidth: "100px"
        },
      }
    },
    "tbody": {
      "tr": {
        "td:nth-child(2)": {
          textAlign: 'right',
          paddingRight: theme.spacing.lg,
        },
        "td:nth-child(n+3)": {
          textAlign: 'center',
          margin: "auto",
        },
      },
      "tr:hover": {
        background: theme.colors.blue[0]
      }
    }
  }
}));

export default function SkovorodaLettersPageDesktop({ allLettersFrom }) {
  
  const { classes } = useStyles();

  const translatorNamesSet = new Set();
  allLettersFrom.forEach(letter => {
    if (!translatorNamesSet.has(letter.translatorName)) {
      translatorNamesSet.add(letter.translatorName);
    }
  });
  const translatorNamesArray = [];
  translatorNamesSet.forEach(value => {
    translatorNamesArray.push(value);
  })


  const letterKeys = [];
  allLettersFrom.forEach(letter => {
    if (!letterKeys.some(key => key.to == letter.to && key.number == letter.number)) {
      letterKeys.push(letter);
    }
  });

  const tableFromRows = letterKeys.map((letterKey, index) => {
    return <tr key={index}>
      <td key="to">{letterKey.to}</td>
      <td key="number">{letterKey.number}</td>
      {translatorNamesArray.map(translatorName => {
        const foundLetter = allLettersFrom.find(letter => 
          letter.to == letterKey.to && 
          letter.number == letterKey.number &&
          letter.translatorName == translatorName);
        return <td key={translatorName}>{foundLetter 
          ? <Link href={pathJoin(SkovorodaLettersFromPath, foundLetter.id)}>
            <a>
              <AnimatedMailComponent uniqueId={foundLetter.id} />
            </a>
          </Link>
          : "-"
        }</td>
      })}
    </tr>
  });

  return <Container>
    <Title order={1} mb="md">Григорій Савич Сковорода - Листи</Title>
    <Title order={2} mb="md">Листи від Сковороди</Title>

    <Table withBorder withColumnBorders className={classes.table} fontSize="md">
      <thead>
        <tr>
          <th>Отримувач</th>
          <th>Лист №</th>
          {translatorNamesArray.map((value, index) => {
            if (value == "Оригінал") {
              return <th key={index}>{value}</th>
            }
            return <th key={index}><Text>Переклад:</Text><Text>{value}</Text></th>
          })}
        </tr>
      </thead>
      <tbody>{tableFromRows}</tbody>
    </Table>

    <Title order={2} mb="md">Листи до Сковороди</Title>
  </Container>
}

export async function getStaticProps(params) {

  const allLettersFrom = SkovorodaLettersFrom.allLetters.map(letter => letter.letterMetadata);
  const allLettersTo = SkovorodaLettersTo.allLetters.map(letter => letter.letterMetadata);

  return {
    props: {
      pageKey: lettersPageKey,
      metadataTitle: "Григорій Савич Сковорода - Листи",
      metadataDescription: "Григорій Савич Сковорода - Листи",
      allLettersFrom,
      allLettersTo,
    },
  };
}