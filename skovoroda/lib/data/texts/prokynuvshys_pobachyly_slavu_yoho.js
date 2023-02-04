import { SkovorodaFiles } from "../skovorodaFiles";
import { SkovorodaKeyIdeas } from "../skovorodaKeyIdeas";
import { SkovorodaSources } from "../skovorodaSources";
import { SkovorodaTranslators } from "../skovorodaTranslators";

export const prokynuvshys_pobachyly_slavu_yoho = {
  id: "prokynuvshys_pobachyly_slavu_yoho",
  writtenDateInfo: {
    dates: [
      {
        text: "наприкінці 1750-1760-х рр.",
        source: SkovorodaSources.povna_akademichna_zbirka_2011,
        page: "209 с."
      },
    ],
  },
  original: {
    source: SkovorodaSources.povna_akademichna_zbirka_2011,
    originalName: "Убуждшеся видѣша славу его",
    files: [
      SkovorodaFiles.prokynuvshys_pobachyly_slavu_yoho.original_pdf,
    ]
  },
  translations: [
    {
      source: SkovorodaSources.piznai_v_sobi_liudynu_1995,
      translator: SkovorodaTranslators.m_kashuba, 
      translatedName: "Прокинувшись, побачили славу його",
      files: [
        SkovorodaFiles.prokynuvshys_pobachyly_slavu_yoho.kashuba_pdf,
        SkovorodaFiles.prokynuvshys_pobachyly_slavu_yoho.kashuba_doc,
      ]
    },
  ],
  keyIdeas: [
    SkovorodaKeyIdeas.scho_e_spravznya_ludyna,
    SkovorodaKeyIdeas.voskresinnya,
  ]
}