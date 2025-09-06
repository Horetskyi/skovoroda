import { Grid } from "@mantine/core";
import { getAdjustedWidth } from "../functions/imageFunctions";
import Link from "next/link";
import SkImage from "./skImage";

// image: { image, name, href }
export default function SkImagesGrid({ images, gentlyShadow, isVFables }) {
  
  if (!images || images.length === 0) return null;

  return <Grid mt={"lg"} mb={"lg"} px={"xl"} 
    ta={isVFables ? "center" : null} 
    justify={isVFables ? "center" : null} 
    align={isVFables ? "center" : null}
  >
    {images.filter(image => image && image.image).map((image, index) => {
      const imageImg = image.image;
      const href = image.href;
      const height = 500;
      const width = getAdjustedWidth(height, 300, imageImg);
      imageImg.height = height;
      imageImg.width = width;
      return <Grid.Col key={"" + index} span={isVFables ? 6 : 4} mb={"xl"} ta={"center"}>
        <Link href={href} title={image.name}>
          <SkImage 
            image={imageImg}
            width={width} 
            height={height} 
            priority={false} 
            shadow={false}
            alt={image.name}
            optimize={false}
            gentlyShadow={gentlyShadow}
            styleAction={styleObj => {
              if (isVFables && index % 2 === 0) {
                styleObj.margin = "0 0 0 auto";
              }
            }}
          />
        </Link>
      </Grid.Col>
    })}
  </Grid>
} 