import Link from "next/link";
import { getNoteNumberString, getNoteNumberUpperString } from "../../lib/data/utils/notesNumbersSymbols";
import classes from './skNote.module.scss';

export default function SkNote({noteNumber}) {
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