import { Tooltip } from "@mantine/core";
import { getNoteNumberString } from "../lib/data/utils/notesNumbersSymbols";
import classes from './textSourceLinkWithTooltip.module.scss';

export default function LinkToSource(props) {
  
  const source = props.source;
  const page = props.page;
  const pageLinkIndexes = props.pageLinkIndexes;

  if (!pageLinkIndexes[source.sourceName]) {
    if (!pageLinkIndexes.lastIndex) {
      pageLinkIndexes.lastIndex = 0;
    }
    pageLinkIndexes[source.sourceName] = pageLinkIndexes.lastIndex + 1;  
    pageLinkIndexes.lastIndex += 1;
  }
  const linkNumber = pageLinkIndexes[source.sourceName];
  const linkString = "⁽" + getNoteNumberString(linkNumber) + "⁾";
  const tooltipLabel = linkString + " " + source.sourceName + (page ? " - " + page : "");

  const tooltipElement = source.sourceHref
   ? <a href={source.sourceHref} color="gray.9" className={classes.linkString}>{linkString}</a>
   : <span color="gray.9" className={classes.linkString}>{linkString}</span>

   return <Tooltip 
    label={tooltipLabel}
    color="gray.8"
    position="top"
    withArrow
    transition="fade"
  >
    {tooltipElement}
  </Tooltip>
} 