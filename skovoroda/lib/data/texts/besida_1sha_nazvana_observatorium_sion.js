import { SkovorodaFiles } from "../skovorodaFiles";
import { SkovorodaKeyIdeas } from "../skovorodaKeyIdeas";
import { SkovorodaSources } from "../skovorodaSources";
import { SkovorodaTranslators } from "../skovorodaTranslators";

export const besida_1sha_nazvana_observatorium_sion = {
  id: "besida_1sha_nazvana_observatorium_sion",
  writtenDateInfo: {
    dates: [
      {
        text: "початок 1770-х",
        source: SkovorodaSources.povna_akademichna_zbirka_2011,
        page: "441 с."
      },
    ],
  },
  original: {
    source: SkovorodaSources.povna_akademichna_zbirka_2011,
    originalName: "Бесѣда 1-я, нареченная Observatorium. (Сіон)",
    files: [
      SkovorodaFiles.besida_1sha_nazvana_observatorium_sion.original_pdf,
    ]
  },
  translations: [
    {
      source: SkovorodaSources.piznai_v_sobi_liudynu_1995,
      translator: SkovorodaTranslators.m_kashuba, 
      translatedName: "Бесіда 1-ша, названа Observatorium (Сіон)",
      files: [
        SkovorodaFiles.besida_1sha_nazvana_observatorium_sion.kashuba_pdf,
        SkovorodaFiles.besida_1sha_nazvana_observatorium_sion.kashuba_doc,
      ]
    },
  ],
  keyIdeas: [
    SkovorodaKeyIdeas.symbolic_language,
    SkovorodaKeyIdeas.mova_prytch,
    SkovorodaKeyIdeas.scho_e_spravznya_ludyna,
    SkovorodaKeyIdeas.tin_ludyny,
    SkovorodaKeyIdeas.dvi_natury,
    SkovorodaKeyIdeas.voskresinnya,
    SkovorodaKeyIdeas.hto_takyi_philosoph,
    SkovorodaKeyIdeas.dushevnyi_sum,
  ],
}