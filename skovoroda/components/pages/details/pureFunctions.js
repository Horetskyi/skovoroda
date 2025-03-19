
export function getBookSourceParam(source, isNotesExist) {
  return {
    sourceType: "Текст" + (isNotesExist ? " і Примітки" : ""),
    sourceValue: source.sourceFullName,
    sourceHref: source.sourceHref,
    image: source.bookCoverImage,
    linkTitle: source.sourceFullName,
  };
}

export function getIllustrationSourceParam(image) {

  const anchorText = getCapitalizedDomainNameFromHref(image.author.href);

  return {
    sourceType: `Ілюстрація`,
    sourceValue: image.author.fullName,
    sourceHref: image.author.href,
    sourceHrefAnchorText: anchorText,
    linkNewTab: true,
    linkTitle: `Ілюстратор: ${image.author.fullName}`,
    image: image,
  };
}

function getCapitalizedDomainNameFromHref(href) {
  try {
    const hostname = new URL(href).hostname.replace("www.", ""); // Extract domain without "www."
    const domainName = hostname.split(".")[0]; // Get the main part before the first dot
    return domainName.charAt(0).toUpperCase() + domainName.slice(1); // Capitalize first letter
  } catch (error) {
    return href; // Return original if invalid URL
  }
}