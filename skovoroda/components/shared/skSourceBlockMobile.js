import { Center, Container, Stack, createStyles } from "@mantine/core";
import SkImage from "./skImage";
import SkTextLink from "./skTextLink";

const useStyles = createStyles((theme) => ({
  paragraph: {
    margin: 0,
  }
}));

export default function SkSourceBlockMobile(params) {

  const { classes } = useStyles();

  if (!params.sourceValue) {
    return null;
  }
  const paragraphClassName = "normalContentText normalContentText_withoutIndent textOverflow " + classes.paragraph;
  const isLinkAndTextTheSame = (params.sourceHref && !params.sourceHrefAnchorText);
  
  return <>
    <Container px={"md"}>
      <Stack spacing="2px" my={"sm"}>
        <p className={paragraphClassName}>{params.sourceType}:</p>

        {!isLinkAndTextTheSame ? <p className={paragraphClassName}>{params.sourceValue}</p> : null}
        
        {params.sourceHref ? <p className={paragraphClassName}>
            <SkTextLink text={params.sourceHrefAnchorText ? params.sourceHrefAnchorText : params.sourceValue} href={params.sourceHref} title={params.linkTitle} />
          </p> : null}
      </Stack>
      <Center>
        <SkImage imageUrl={params.image.imageUrl} width={120} height={200} shadow={"md"} alt={params.image.alt} title={params.image.title} />
      </Center>
    </Container>
  </>
}