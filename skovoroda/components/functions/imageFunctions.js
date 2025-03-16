
export function getAdjustedHeight(desiredWidth, defaultHeight, image) {
  if (!image || !image.width || !image.height) {
    return defaultHeight;
  }
  return (desiredWidth / image.width) * image.height;
}