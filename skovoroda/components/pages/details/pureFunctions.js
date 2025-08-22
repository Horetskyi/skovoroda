
// SOURCE PARAM
export function getBookSourceParam(source, isNotesExist, includeTextValidityWarning) {
  return {
    sourceType: "Текст" + (isNotesExist ? " і Примітки" : ""),
    sourceValue: source.sourceFullName,
    sourceHref: source.sourceHref,
    image: source.bookCoverImage,
    linkTitle: source.sourceFullName,
    includeTextValidityWarning: includeTextValidityWarning,
  };
}

// SOURCE PARAM
export function getIllustrationSourceParam(image) {
  return {
    sourceType: "Ілюстрація",
    sourceValue: image.author.fullName,
    sourceHref: image.author.link.href,
    sourceHrefAnchorText: image.author.link.href,
    linkTitle: image.author.link.title,
    image: image,
    linkNewTab: true,
  }
} 

// SOURCE PARAMS
export function getAggregatedSourcesParams(page) {
  
  if (!page) return null;

  const sourcesParams = [
    getBookSourceParam(page.source, page.notes, true)
  ];
  if (page.image) {
    sourcesParams.push(getIllustrationSourceParam(page.image));
  }
  return sourcesParams;
}