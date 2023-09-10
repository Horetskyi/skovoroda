import { SkovorodaFiles } from "../skovorodaFiles";
import { SkovorodaSources } from "../skovorodaSources";
import { SkovorodaTranslators } from "../skovorodaTranslators";

export const ubohii_zhaivoronok = {
  id: "ubohii_zhaivoronok",
  writtenDateInfo: {
    dates: [
      {
        text: "1787 р.",
        source: SkovorodaSources.povna_akademichna_zbirka_2011,
        page: "933 c."
      },
    ],
  },
  original: {
    source: SkovorodaSources.povna_akademichna_zbirka_2011,
    originalName: "Убогій Жайворонок",
    files: [
      SkovorodaFiles.ubohii_zhaivoronok.original_pdf,
    ]
  },
  translations: [
    {
      source: SkovorodaSources.tvory_u_dvox_tomax_tom_2_1994,
      translator: SkovorodaTranslators.v_shevchuk, 
      translatedName: "Убогий Жайворонок",
      files: [
        SkovorodaFiles.ubohii_zhaivoronok.shevchuk_pdf,
        SkovorodaFiles.ubohii_zhaivoronok.shevchuk_doc,
      ]
    },
  ],
}