export default function getTreatiseMenuLinks(treatise) {

  const preferedVersion = treatise.versions.find(v => v.preferedVersion);
  const preferedTitle = preferedVersion.title;

  const isQuotesAvailable = treatise.quotes && treatise.quotes.length;
  const isZmistAvailable = treatise.zmist && treatise.zmist.list && treatise.zmist.list.length;

  const links = [];
  if (isZmistAvailable) {
    links.push({
      href: "#zmist",
      text: "Зміст Твору",
      title: "Зміст Твору - " + preferedTitle,
    });
  }
  if (isQuotesAvailable) {
    links.push({
      href: "#quotes",
      text: "Цитати",
      title: "Цитати - " + preferedTitle,
    });
  }
  links.push({
    href: "#downloads",
    text: "Завантажити",
    title: "Завантажити - " + preferedTitle,
  });
  return links;
}