import Link from "next/link";
import { getNoteNumberString, getNoteNumberUpperString } from "../../lib/data/utils/notesNumbersSymbols";
import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  note: {
    cursor: "pointer",
    fontWeight: 400,
    fontFamily: 'Nonito',
    textDecoration: "none",
  },
}));

export default function SkNote({noteNumber}) {
  const { classes } = useStyles();
  const id = "noteInText" + getNoteNumberUpperString(noteNumber);
  return <Link 
    id={id} 
    key={noteNumber}
    href={"#note"+getNoteNumberUpperString(noteNumber)} 
    color="gray.9"
    className={classes.note + " grayForText"} 
    title={`Примітка ${noteNumber}`}>
    {" "+getNoteNumberString(noteNumber)}
  </Link>
}