
export default function getSkovorodaData() {
  
  const source_tvory_u_dvox_tomax_tom_1_1994 = {
    id: "tvory_u_dvox_tomax_tom_1_1994",
    bookCoverImageName: "Tvory u dvox tomax. Tom 1 - 1994.jpg",
    sourceName: "Сковорода, Григорій. Твори у двох томах. Том 1 - 1994 р.",
  };

  const translator_v_shevchuk = {
    fullName: "Шевчук Валерій Олександрович",
  };

  return {
    texts: [
      {
        id: "narcis",
        translates: [
          {
            source: source_tvory_u_dvox_tomax_tom_1_1994,
            translator: translator_v_shevchuk, 
            translatedName: "Вступні двері до християнської добронравності",
            fileSize: "12.1 MB",
          }
        ],
      },
    ],
    sources: [
      source_tvory_u_dvox_tomax_tom_1_1994,
    ],
    translators: [
      translator_v_shevchuk
    ],
  };
}