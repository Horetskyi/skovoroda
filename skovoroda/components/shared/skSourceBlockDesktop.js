import { Stack, Text } from "@mantine/core";
import SkImage from "./skImage";
import SkTextLink from "./skTextLink";
import classes from './skSourceBlockDesktop.module.scss';
import { getAdjustedHeight } from "../functions/imageFunctions";

export default function SkSourceBlockDesktop(params) {

  if (!params.sourceValue) return null;
  
  const paragraphClassName = "readFont " + classes.paragraph;
  const isLinkAndTextTheSame = (params.sourceHref && !params.sourceHrefAnchorText);
  const height = getAdjustedHeight(120, 200, params.image);

  return <div className={classes.rowContainer}>

    { (params.image && params.image.imageUrl)
      ? <SkImage imageUrl={params.image.imageUrl} width={120} height={height} shadow={"sm"} alt={params.image.alt} title={params.image.title} />
      : null }
    
    
    <Stack pl={"md"} gap={"xs"}>
      <p className={paragraphClassName}>{params.sourceType}:</p>

      {!isLinkAndTextTheSame ? <p className={paragraphClassName}><b>{params.sourceValue}</b></p> : null}

      {params.sourceHref ? <p className={paragraphClassName}>
          <SkTextLink text={params.sourceHrefAnchorText ? params.sourceHrefAnchorText : params.sourceValue} 
            href={params.sourceHref} title={params.linkTitle} 
            isBlank={params.linkNewTab}/>
        </p> : null}

      {params.includeTextValidityWarning ? <Text mt="xs" className='readFont'>⚠️ Ми намагалися зберегти оригінальне форматування тексту, проте адаптація тексту для електронного читання має побічні ефекти. Попереджуємо про <Text component="b">можливі відмінності між форматуванням на сайті та форматуванням в оригіналі.</Text></Text> : null}

      {params.image && params.image.isProtected ? <Text mt="xs" className='readFont'>⚠️ <Text component="b">Ілюстрація захищена авторським правом.</Text> Використання в комерційних цілях можливе лише за згодою автора. У некомерційних цілях ілюстрацію можна використовувати з обов’язковим зазначенням авторства.</Text> : null}

    </Stack>
  </div>
}