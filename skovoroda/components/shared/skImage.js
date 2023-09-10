import { createStyles } from "@mantine/core";
import Image from "next/image";

const useStyles = createStyles((theme, params) => {
  if (!params.shadow) {
    params.shadow = "lg";
  }
  return {

    image: {
      borderRadius: theme.radius.md,
      boxShadow: theme.shadows[params.shadow],
      minWidth: "max-content",
      lineHeight: 0,
      img: {
        borderRadius: theme.radius.md,
        objectFit: "cover",
      }
    },
  
  };
});

export default function SkImage({ image, imageUrl, width, height, shadow, disableBottomRadius, alt, title, styleAction }) {

  const { classes } = useStyles({shadow});

  if (image) {
    imageUrl = image.imageUrl;
    alt = image.imageAlt ? image.imageAlt : image.alt;
    title = image.imageTitle ? image.imageTitle : image.title;
  }


  if (!imageUrl || !imageUrl.length) {
    return null;
  }
  const styleObj = { width: width, height: height };
  if (disableBottomRadius) {
    styleObj.borderBottomLeftRadius = "none";
    styleObj.borderBottomRightRadius = "none";
  }

  if (styleAction) {
    styleAction(styleObj);
  }

  return <div className={classes.image} style={styleObj}>
    <Image src={imageUrl} width={width} height={height} style={styleObj} alt={alt} title={title} />
  </div>
}