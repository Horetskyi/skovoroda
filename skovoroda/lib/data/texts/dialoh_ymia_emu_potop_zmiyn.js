import { SkovorodaFiles } from "../skovorodaFiles";
import { SkovorodaSources } from "../skovorodaSources";
import { SkovorodaTranslators } from "../skovorodaTranslators";

export const dialoh_ymia_emu_potop_zmiyn = {
  id: "dialoh_ymia_emu_potop_zmiyn",
  writtenDateInfo: {
    dates: [
      {
        text: "1791 р.",
        source: SkovorodaSources.povna_akademichna_zbirka_2011,
      },
    ],
  },
  original: {
    source: SkovorodaSources.povna_akademichna_zbirka_2011,
    originalName: "Діалог. Имя Ему — Потоп Зміин",
    files: [
      SkovorodaFiles.dialoh_ymia_emu_potop_zmiyn.original_pdf,
    ]
  },
  translations: [
    {
      source: SkovorodaSources.piznai_v_sobi_liudynu_1995,
      translator: SkovorodaTranslators.m_kashuba, 
      translatedName: "Діалог. Назва його — Потоп зміїний",
      files: [
        SkovorodaFiles.dialoh_ymia_emu_potop_zmiyn.kashuba_pdf,
        SkovorodaFiles.dialoh_ymia_emu_potop_zmiyn.kashuba_doc,
      ]
    },
  ],
}