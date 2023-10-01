import { SkovorodaSourcesArray } from "../data/skovorodaSources";
import { getNoteNumberString } from "../data/utils/notesNumbersSymbols";
import { readAllTreatises } from "../dataReaders/treatisesReader";
import { treatisePageKey } from "../skovorodaConstants";

export function getTreatisesPageProps() {
  
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

  treatises.sort((a,b) => a.orderNumber - b.orderNumber);
  treatises.forEach(treatise => {
    if (treatise.introSourceId) {
      const noteNumber = addNote(treatise.introSourceId);
      if (noteNumber) {
        treatise.introContent[treatise.introContent.length - 1].text = [
          {
            text: treatise.introContent[treatise.introContent.length - 1].text,
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
      metadataTitle: "Трактати, Діалоги, Притчі Григорія Сковорода",
      metadataDescription: "Трактати, Діалоги, Притчі, Солілоквії, Катехізис Григорія Савича Сковороди: Вступні двері до християнської добронравності, Наркіс. Розмова про те: Пізнай себе...",
      shouldBeIndexed: true,
      canonicalPageUrl: "https://www.skovoroda.club/texts/treatise",
    },
  };
}