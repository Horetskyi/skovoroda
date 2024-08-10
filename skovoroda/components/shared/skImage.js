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
  optimize
}) {

  if (shadow !== false) {
    shadow = true;
  }

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

  let className = shadow ? classes.image : classes.imageWithoutShadow;
  if (additionalClassName) {
    className += " " + additionalClassName;
  }

  const unoptimized = optimize ? false : true;

  const decoding = priority ? "sync" : "async";

  return <div className={className} style={styleObj}>
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