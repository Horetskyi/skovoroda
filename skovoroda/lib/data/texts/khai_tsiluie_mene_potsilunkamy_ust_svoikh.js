import { SkovorodaFiles } from "../skovorodaFiles";
import { SkovorodaSources } from "../skovorodaSources";
import { SkovorodaTranslators } from "../skovorodaTranslators";

export const khai_tsiluie_mene_potsilunkamy_ust_svoikh = {
  id: "khai_tsiluie_mene_potsilunkamy_ust_svoikh",
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
    originalName: "Да лобжет мя от лобзаній уст своих!",
    files: [
      SkovorodaFiles.khai_tsiluie_mene_potsilunkamy_ust_svoikh.original_pdf,
    ]
  },
  translations: [
    {
      source: SkovorodaSources.piznai_v_sobi_liudynu_1995,
      translator: SkovorodaTranslators.m_kashuba, 
      translatedName: "Хай цілує мене поцілунками уст своїх",
      files: [
        SkovorodaFiles.khai_tsiluie_mene_potsilunkamy_ust_svoikh.kashuba_pdf,
        SkovorodaFiles.khai_tsiluie_mene_potsilunkamy_ust_svoikh.kashuba_doc,
      ]
    },
  ],
}