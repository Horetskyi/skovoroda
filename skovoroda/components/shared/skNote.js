import Link from "next/link";
import { getNoteNumberString, getNoteNumberUpperString } from "../../lib/utils/notesNumbersSymbols";
import classes from './skNote.module.scss';

export default function SkNote({noteNumber, title}) {
  const id = "noteInText" + getNoteNumberUpperString(noteNumber);
  title = title || `Примітка ${noteNumber}`;
  return <Link 
    id={id} 
    key={noteNumber}
    href={"#note"+getNoteNumberUpperString(noteNumber)} 
    color="gray.9"
    className={classes.note + " grayForText"} 
    title={title}>
    {" "+getNoteNumberString(noteNumber)}
  </Link>
}