import { Center, Container, Stack } from "@mantine/core";
import SkImage from "./skImage";
import SkTextLink from "./skTextLink";
import classes from './skSourceBlockMobile.module.scss';

export default function SkSourceBlockMobile(params) {

  if (!params.sourceValue) {
    return null;
  }
  const paragraphClassName = "normalContentText normalContentText_withoutIndent textOverflow " + classes.paragraph;
  const isLinkAndTextTheSame = (params.sourceHref && !params.sourceHrefAnchorText);
  
  return <>
    <Container px={"md"}>
      <Stack gap="2px">
        <p className={paragraphClassName}>{params.sourceType}:</p>

        {!isLinkAndTextTheSame ? <p className={paragraphClassName}>{params.sourceValue}</p> : null}
        
        {params.sourceHref ? <p className={paragraphClassName}>
            <SkTextLink text={params.sourceHrefAnchorText ? params.sourceHrefAnchorText : params.sourceValue} href={params.sourceHref} title={params.linkTitle} />
          </p> : null}
      </Stack>
      <Center mt={"sm"}>
        <SkImage imageUrl={params.image.imageUrl} width={120} height={200} shadow={"md"} alt={params.image.alt} title={params.image.title} />
      </Center>
    </Container>
  </>
}