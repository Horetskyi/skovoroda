
function file(fileSize, fileName) {
  return {
    fileSize: fileSize,
    fileName: fileName,
    fileExtensionUppercase: fileName.substring(fileName.length - 4).toUpperCase(),
  };
}

export default function getSkovorodaData() {
  
  const source_tvory_u_dvox_tomax_tom_1_1994 = {
    id: "tvory_u_dvox_tomax_tom_1_1994",
    bookCoverImageFileName: "Tvory u dvox tomax. Tom 1 - 1994.jpg",
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
            files: [
              file("12.1 MB", "Г. С. Сковорода - Повна академічна збірка - Леонід Ушкалов - 2011.pdf"),
              file("3.7 MB", "Г. С. Сковорода - Shos.fb2"),
            ]
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