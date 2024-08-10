import { homePageKey } from "../skovorodaConstants";
import { getLinkTitle, SkovorodaFablesPath, SkovorodaGardenPath, SkovorodaTreatisePath } from "../skovorodaPath";

export function getHomePageProps() {
  return {
    props: {
      pageKey: homePageKey,
      metadataTitle: "Григорій Савич Сковорода — Український Філософ",
      metadataDescription: "Філософ-містик, богослов, поет, педагог і композитор літургійної музики. Мав значний вплив на сучасників і подальші покоління своїми байками, піснями, філософськими творами, а також способом життя, через що його називають ”Українським Сократом”.",
      metadataKeywords: ["Григорій Савич Сковорода", "Григорій Сковорода","Український філософ","Філософія Сковороди"],
      shouldBeIndexed: true,
      canonicalPageUrl: "https://www.skovoroda.club/",
      facebookImageUrl: "https://www.skovoroda.club/images/SkovorodaPortrait2.webp",
    },
  };
}

const homePageImage = {
  imageUrl: "/images/SkovorodaPortrait2.webp",
  alt: "Портрет Сковороди",
  title: "Портрет Сковороди",
}
export const homePageContent = {
  imageUrl: homePageImage.imageUrl,
  imageTitle: homePageImage.title,
  imageAlt: homePageImage.alt,
  titleLine: "Григорій Савич Сковорода",
  birthLine: "22 листопада 1722 — 29 жовтня 1794",
  shortBio: "Український філософ-містик, богослов, поет, педагог і композитор літургійної музики. Мав значний вплив на сучасників і подальші покоління своїми байками, піснями, філософськими творами, а також способом життя, через що його називають ”Українським Сократом”.",
  symbolsText: 'Бог подібний до багатого фонтана, що наповнює різні посудини за їх місткістю. Над фонтаном оцей напис: "Нерівна усім рівність". Ллються із різних трубок різні струмені у різні посудини, що стоять навколо фонтана. Менша посудина має менше, однак у тому дорівнює більшій, що однаково повна.',
  sourcesParams: [
    {
      sourceType: "Портрет",
      sourceValue: "Катерина Ткаченко. Г. Сковорода. 2010. Фрагмент.",
      sourceHref: "https://www.facebook.com/Katerynaart/",
      sourceHrefAnchorText: "https://www.facebook.com/Katerynaart/",
      image: homePageImage,
      linkTitle: "Facebook Катерини Ткаченко"
    }
  ],
  textsTitle: "Творчість Сковороди",
  textsLinks: [
    {
      text: "Трактати",
      href: SkovorodaTreatisePath
    },
    {
      text: "Сад Божественних Пісень",
      href: SkovorodaGardenPath
    },
    {
      text: "Байки Харківські",
      href: SkovorodaFablesPath
    }
  ].map(link => {
    link.title = getLinkTitle(link.href);
    return link;
  }),
};