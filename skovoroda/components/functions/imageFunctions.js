
// when width is known
export function getAdjustedHeight(desiredWidth, defaultHeight, image) {
  if (!image || !image.width || !image.height) {
    return defaultHeight;
  }
  return (desiredWidth / image.width) * image.height;
}

// when height is known
export function getAdjustedWidth(desiredHeight, defaultWidth, image) {
  if (!image || !image.width || !image.height) {
    return defaultWidth;
  }
  return (desiredHeight / image.height) * image.width;
}

export function adjustImageHeight(image, desiredHeight, defaultWidth, defaultHeight) {

  if (!image) {
    return;
  }

  if (!image.width) {
    image.width = defaultWidth;
  }
  if (!image.height) {
    image.height = defaultHeight;
  }

  const imageHeight = desiredHeight;
  const imageWidth = (imageHeight / image.height) * image.width;
  image.height = imageHeight;
  image.width = imageWidth;
}