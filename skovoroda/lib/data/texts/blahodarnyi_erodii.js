import { SkovorodaFiles } from "../skovorodaFiles";
import { SkovorodaSources } from "../skovorodaSources";
import { SkovorodaTranslators } from "../skovorodaTranslators";

export const blahodarnyi_erodii = {
  id: "blahodarnyi_erodii",
  writtenDateInfo: {
    dates: [
      {
        text: "1787 р.",
        source: SkovorodaSources.povna_akademichna_zbirka_2011,
        page: "910 c."
      },
    ],
  },
  original: {
    source: SkovorodaSources.povna_akademichna_zbirka_2011,
    originalName: "Благодарный Еродій",
    files: [
      SkovorodaFiles.ubohii_zhaivoronok.original_pdf,
    ]
  },
  translations: [
    {
      source: SkovorodaSources.tvory_u_dvox_tomax_tom_2_1994,
      translator: SkovorodaTranslators.v_shevchuk, 
      translatedName: "Вдячний Еродій",
      files: [
        SkovorodaFiles.blahodarnyi_erodii.shevchuk_pdf,
        SkovorodaFiles.blahodarnyi_erodii.shevchuk_doc,
      ]
    },
  ],
}