import { SkovorodaFiles } from "../skovorodaFiles";
import { SkovorodaSources } from "../skovorodaSources";
import { SkovorodaTranslators } from "../skovorodaTranslators";

export const besida_nazvana_dvoie = {
  id: "besida_nazvana_dvoie",
  writtenDateInfo: {
    dates: [
      {
        text: "1781 р.",
        source: SkovorodaSources.povna_akademichna_zbirka_2011,
      },
    ],
  },
  original: {
    source: SkovorodaSources.povna_akademichna_zbirka_2011,
    originalName: "Бесѣда, нареченная Двое: о том, что Блаженным быть легко",
    files: [
      SkovorodaFiles.besida_nazvana_dvoie.original_pdf,
    ]
  },
  translations: [
    {
      source: SkovorodaSources.piznai_v_sobi_liudynu_1995,
      translator: SkovorodaTranslators.m_kashuba, 
      translatedName: "Бесіда, названа Двоє, про те, що легко бути блаженним",
      files: [
        SkovorodaFiles.besida_nazvana_dvoie.kashuba_pdf,
        SkovorodaFiles.besida_nazvana_dvoie.kashuba_doc,
      ]
    },
  ],
}