
export function newNotesService(sources) {

  const result = {
    sourcesTextContent: [],
    lastNoteNumber: 0,
  };
  result.addNote = function (sourceId) {
    if (!sourceId) {
      return;
    }
    const found = result.sourcesTextContent.find(x => x.meta.sourceId == sourceId);
    if (found) {
      return found.meta.noteNumber; // already exists
    }
    const source = sources.find(x => x.devNumber == sourceId);
    if (!source) {
      return; // source not found
    }
    result.lastNoteNumber++;
    result.sourcesTextContent.push({
      text: source.sourceFullName,
      meta: {
        sourceId: sourceId,
        shortTitle: source.shortTitle,
        isNoteBeginning: true,
        noteNumber: result.lastNoteNumber,
      },
    });
    return result.lastNoteNumber;
  };
  return result;
}