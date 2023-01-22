import { SkovorodaFiles } from "../skovorodaFiles";
import { SkovorodaSources } from "../skovorodaSources";
import { SkovorodaTranslators } from "../skovorodaTranslators";

export const narcis = {
  id: "narcis",
  writtenDateInfo: {
    dates: [
      {
        text: "1769-1771 рр. напиcаний",
        source: SkovorodaSources.povna_akademichna_zbirka_2011,
      },
      {
        text: "у середині 1780-x нова редакція твору",
        source: SkovorodaSources.povna_akademichna_zbirka_2011,
      },
      {
        text: "1793-1794 рр. написаний пролог",
        source: SkovorodaSources.povna_akademichna_zbirka_2011,
      },
    ],
  },
  original: {
    source: SkovorodaSources.povna_akademichna_zbirka_2011,
    originalName: "Наркісс. Разглагол о том: Узнай Себе",
    files: [
      SkovorodaFiles.narcis.original_pdf,
    ]
  },
  translations: [
    {
      source: SkovorodaSources.tvory_u_dvox_tomax_tom_1_1994,
      translator: SkovorodaTranslators.v_shevchuk, 
      translatedName: "Наркіс. Розмова про те: Пізнай себе",
      files: [
        SkovorodaFiles.narcis.shevchuk_pdf,
      ]
    },
  ],
}