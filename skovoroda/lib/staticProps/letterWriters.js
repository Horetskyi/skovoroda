export const letterWriters = [
  {
    id: "kovalynskii",
    name: "Михайло Іванович Ковалинський",
    genetiveName: "Михайла Івановича Ковалинського",
  },
];

export function getLetterWriterByLetterMetadata(letterMetadata) {
  return letterWriters.find(writer => writer.id === (letterMetadata.to || letterMetadata.from));
}