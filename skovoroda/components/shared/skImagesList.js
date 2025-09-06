import { Flex } from "@mantine/core";
import Link from "next/link";
import SkImage from "./skImage";

// image: { image, name, href }
export default function SkImagesList({ images, gentlyShadow }) {
  
  if (!images || images.length === 0) return null;

  return <Flex mt={"lg"} mb={"xl"} px={"sm"} gap={"xl"} direction={"column"} ta={"center"}>
    {images.filter(image => image.image).map((imageObj, index) => {
      const image = imageObj.image;
      const href = imageObj.href;
      return <Link href={href} title={imageObj.name} key={"" + index} mx={"auto"}>
        <SkImage 
          image={image}
          fullWidth={true}
          priority={false} 
          shadow={false}
          alt={imageObj.name}
          optimize={false}
          styleAction={(style) => {
            style.marginLeft = "auto";
            style.marginRight = "auto";
          }}
          gentlyShadow={gentlyShadow}
        />
      </Link>
    })}
  </Flex>
} 