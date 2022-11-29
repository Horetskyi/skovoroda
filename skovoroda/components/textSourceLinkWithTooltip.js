import { createStyles, Tooltip } from "@mantine/core";

const useStyles = createStyles((theme) => ({

  linkString: {
    padding: "0 4px",
  }

}));

export default function TextSourceLinkWithTooltip(props) {
  
  const { classes } = useStyles();

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
  const linkString = "[" + pageLinkIndexes[source.sourceName] + "]";
  
  const tooltipLabel = linkString + " " + source.sourceName + (page ? " - " + page : "");

  const tooltipElement = source.sourceHref
   ? <a href={source.sourceHref} className={"gray8 "+classes.linkString}>{linkString}</a>
   : <span className={"gray8 "+classes.linkString}>{linkString}</span>

   return <Tooltip 
    label={tooltipLabel}
    color="gray"
    position="top"
    withArrow
    transition="fade"
  >
    {tooltipElement}
  </Tooltip>
} 