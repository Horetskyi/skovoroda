
export function newNotesService(sources) {

  const result = {
    sourcesTextContent: [],
    lastNoteNumber: 0,
  };
  result.addNote = function (sourceId) {
    if (!sourceId) {
      return;
    }
    const found = result.sourcesTextContent.find(x => x.sourceId == sourceId);
    if (found) {
      return found.noteNumber; // already exists
    }
    const source = sources.find(x => x.devNumber == sourceId);
    if (!source) {
      return; // source not found
    }
    result.lastNoteNumber++;
    result.sourcesTextContent.push({
      noteNumber: result.lastNoteNumber,
      sourceId: sourceId,
      text: source.sourceFullName,
      shortTitle: source.shortTitle,
      isNoteBeginning: true,
    });
    return result.lastNoteNumber;
  };
  return result;
}