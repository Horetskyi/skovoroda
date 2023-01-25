
export default function getSelectedNoteNumbersByContent(content) {

  if (!Array.isArray(content)) {
    content = [content.beforeMain, content.main, content.afterMain].flat();
  }

  const selectedNoteNumbers = content.map(lineObject => {
    if (!Array.isArray(lineObject.text)) {
      return false;
    }
    const lineNoteNumbers = lineObject.text.filter(subText => subText.noteNumber)
      .map(subText => subText.noteNumber);
    if (!lineNoteNumbers || !lineNoteNumbers.length) {
      return false;
    }
    return lineNoteNumbers;
  })
  .filter(noteNumbers => noteNumbers).flat();

  return selectedNoteNumbers;
}
