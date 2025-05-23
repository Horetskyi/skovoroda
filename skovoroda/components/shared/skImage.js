import Image from "next/image";
import classes from './skImage.module.scss';

export default function SkImage({ 
  image, 
  imageUrl, 
  width, 
  height, 
  disableBottomRadius,
  alt, 
  title, 
  styleAction, 
  priority, 
  additionalClassName, 
  onClick,
  shadow,
  optimize,
  proportionWidth,
  gentlyShadow,
  fullWidth,
  fullHeight,
  fullContainerWidth,
}) {

  if (shadow !== false && !gentlyShadow) {
    shadow = true;
  }

  if (image) {
    imageUrl = image.imageUrl;
    alt = image.imageAlt ? image.imageAlt : image.alt;
    title = image.imageTitle ? image.imageTitle : image.title;
    if (image.width) {
      width = image.width;
    }
    if (image.height) {
      height = image.height;
    }
  }

  if (proportionWidth) {
    const ratioDifference = width / proportionWidth;
    width = proportionWidth;
    height = height / ratioDifference;
  }


  if (!imageUrl || !imageUrl.length) {
    return null;
  }
 
  let styleObj = { width: width, height: height };
  if (fullWidth) {
    styleObj = {
      width: "calc(100vw - 50px)",
      height: "fit-content",
    };
  } else if (fullHeight) {
    styleObj = {
      width: "fit-content",
      height: "100%",
    };
  } else if (fullContainerWidth) {
    styleObj = {
      width: "100%",
      height: "fit-content",
      minWidth: "auto",
    };
  }

  if (disableBottomRadius) {
    styleObj.borderBottomLeftRadius = "none";
    styleObj.borderBottomRightRadius = "none";
  }

  if (styleAction) {
    styleAction(styleObj);
  }

  let className = (shadow || gentlyShadow)
    ? (classes.imageV1 + " " + (gentlyShadow ? classes.imageShadowV2 : classes.imageShadowV1))
    : classes.imageWithoutShadow;
  
  if (additionalClassName) {
    className += " " + additionalClassName;
  }

  const unoptimized = optimize ? false : true;

  const decoding = priority ? "sync" : "async";

  return <div className={className} style={styleObj} onClick={onClick}>
    <Image 
      key={imageUrl} 
      src={imageUrl} 
      width={width} 
      height={height} 
      style={styleObj}
      alt={alt}
      title={title}
      priority={priority}
      onClick={onClick}
      quality={100}
      unoptimized={unoptimized}
      decoding={decoding}
    />
  </div>
}