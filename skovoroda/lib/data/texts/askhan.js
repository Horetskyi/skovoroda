import { SkovorodaFiles } from "../skovorodaFiles";
import { SkovorodaSources } from "../skovorodaSources";
import { SkovorodaTranslators } from "../skovorodaTranslators";

export const askhan = {
  id: "askhan",
  writtenDateInfo: {
    dates: [
      {
        text: "початок 1770-х",
        source: SkovorodaSources.povna_akademichna_zbirka_2011,
        page: "347 с."
      },
    ],
  },
  original: {
    source: SkovorodaSources.povna_akademichna_zbirka_2011,
    originalName: "Симфоніа, нареченная Книга Асхань о Познаніи самаго себе",
    files: [
      SkovorodaFiles.askhan.original_pdf,
    ]
  },
  translations: [
    {
      source: SkovorodaSources.piznai_v_sobi_liudynu_1995,
      translator: SkovorodaTranslators.m_kashuba, 
      translatedName: "Симфонія, названа книга Асхань, про пізнання самого себе",
      files: [
        SkovorodaFiles.askhan.kashuba_pdf,
      ]
    },
  ],
}