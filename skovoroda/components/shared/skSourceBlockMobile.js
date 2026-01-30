import { Center, Container, Stack, Text } from "@mantine/core";
import SkImage from "./skImage";
import SkTextLink from "./skTextLink";
import classes from './skSourceBlockMobile.module.scss';
import { getAdjustedHeight } from "../functions/imageFunctions";

// Convert image URL to 120px optimized version for mobile sources
function getOptimized120pxImageUrl(imageUrl) {
  if (!imageUrl) return imageUrl;
  
  // Extract the filename from the path
  const filename = imageUrl.split('/').pop();
  
  // Return the optimized 120px version path
  return `/images/sources-mobile-120/${filename}`;
}

export default function SkSourceBlockMobile(params) {

  if (!params.sourceValue) return null;

  const paragraphClassName = "readFont textOverflow " + classes.paragraph;
  const isLinkAndTextTheSame = (params.sourceHref && !params.sourceHrefAnchorText);
  const height = getAdjustedHeight(120, 200, params.image);

  // Use optimized 120px width image for mobile
  const optimizedImageUrl = getOptimized120pxImageUrl(params.image?.imageUrl);

  return <Container px={"md"}>
    <Stack gap="2px">
      <p className={paragraphClassName}>{params.sourceType}:</p>

      {!isLinkAndTextTheSame ? <p className={paragraphClassName}><b>{params.sourceValue}</b></p> : null}
      
      {params.sourceHref ? <p className={paragraphClassName}>
          <SkTextLink text={params.sourceHrefAnchorText ? params.sourceHrefAnchorText : params.sourceValue} href={params.sourceHref} title={params.linkTitle} />
        </p> : null}

      {params.includeTextValidityWarning ? <Text mt="xs" className='readFont'>⚠️ Ми намагалися зберегти оригінальне форматування тексту, проте адаптація тексту для електронного читання має побічні ефекти. Попереджуємо про <Text component="b">можливі відмінності між форматуванням на сайті та форматуванням в оригіналі.</Text></Text> : null}
      
      {params.image && params.image.isProtected ? <Text mt="xs" className='readFont'>⚠️ <Text component="b">Ілюстрація захищена авторським правом.</Text> Використання в комерційних цілях можливе лише за згодою автора. У некомерційних цілях ілюстрацію можна використовувати з обов’язковим зазначенням авторства.</Text> : null}

    </Stack>
    <Center mt={"sm"}>
      <SkImage imageUrl={optimizedImageUrl} width={120} height={height} shadow={"md"} 
        alt={params.image.alt} title={params.image.title} optimize={true} />
    </Center>
  </Container>;
}