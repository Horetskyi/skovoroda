
export default function getTreatiseMenuLinks(treatise, sourcesParams, skovorodaTextSourcesData) {

  const preferedVersion = treatise.versions.find(v => v.preferedVersion);
  const preferedTitle = preferedVersion.title;

  const isQuotesAvailable = treatise.quotes && treatise.quotes.length;
  const isZmistAvailable = treatise.zmist && treatise.zmist.list && treatise.zmist.list.length;

  const links = [];
  if (treatise.introContent2 && treatise.introContent2.lines && treatise.introContent2.lines.length) {
    links.push({
      href: "#description",
      text: "Опис книги",
      title: "Опис книги - " + preferedTitle,
    });
  }
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
  if (skovorodaTextSourcesData && skovorodaTextSourcesData.length) {
    links.push({
      href: "#skovoroda-sources",
      text: "Джерела Сковороди",
      title: "Джерела Сковороди - " + preferedTitle,
    });
  }
  const isSources = sourcesParams && sourcesParams.length > 0;
  if (isSources) {
    links.push({
      href: "#sources",
      text: "Джерела",
      title: "Джерела - " + preferedTitle,
    });
  }
  return links;
}