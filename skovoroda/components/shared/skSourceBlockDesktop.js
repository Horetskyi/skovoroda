import { Stack } from "@mantine/core";
import SkImage from "./skImage";
import SkTextLink from "./skTextLink";
import classes from './skSourceBlockDesktop.module.scss';
import { getAdjustedHeight } from "../functions/imageFunctions";

export default function SkSourceBlockDesktop(params) {

  if (!params.sourceValue) {
    return null;
  }
  const paragraphClassName = "normalContentText normalContentText_withoutIndent " + classes.paragraph;
  const isLinkAndTextTheSame = (params.sourceHref && !params.sourceHrefAnchorText);
  
  const height = getAdjustedHeight(120, 200, params.image);

  return <>
    <div className={classes.rowContainer}>

      { (params.image && params.image.imageUrl)
        ? <SkImage imageUrl={params.image.imageUrl} width={120} height={height} shadow={"md"} alt={params.image.alt} title={params.image.title} />
        : null }
      
      
      <Stack pl={"md"} gap={"2px"}>
        <p className={paragraphClassName}>{params.sourceType}:</p>

        {!isLinkAndTextTheSame ? <p className={paragraphClassName}>{params.sourceValue}</p> : null}
        
        {params.sourceHref ? <p className={paragraphClassName}>
            <SkTextLink text={params.sourceHrefAnchorText ? params.sourceHrefAnchorText : params.sourceValue} 
              href={params.sourceHref} title={params.linkTitle} 
              isBlank={params.linkNewTab}/>
          </p> : null}

      </Stack>
    </div>
  </>
}