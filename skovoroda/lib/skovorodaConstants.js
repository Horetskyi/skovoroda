export const SkovorodaConstants = {
  desktopEnding: "-desktop",
  mobileEnding: "-mobile",
  isProduction: true,
  recommendedMetaDescriptionLength: 200,

  isOriginal: function(type) {
    return type === "original" || type === "Original";
  },

  getTypeText: function(type) {
    return this.isOriginal(type) ? "Оригінал" : "Переклад";
  },

  getColorByType: function(type) {
    return this.isOriginal(type) ? "green" : "yellow";
  },
  getBackgroundColorByType: function(type) {
    return this.getColorByType(type)+".0";
  },
  getTextBackgroundColorByType: function(type) {
    return this.getColorByType(type)+".0";
  },
  getBlockElementsColorByType: function(type) {
    return this.getColorByType(type)+".1";
  },
  getElementsColorByType: function(type, backgroundType) {
    return this.getColorByType(type) + (backgroundType === "block" ? ".2" : ".1");
  },
  getElementsHoverColorByType: function(type, backgroundType) {
    return this.getColorByType(type) + (backgroundType === "block" ? ".1" : ".0");
  },
  getColorInTheme: function(color, theme) {
    const split = color.split('.');
    return theme.colors[split[0]][+split[1]];
  }
};

export const homePageKey = { pageKey: "Home" }; 
export const aboutUsPageKey = { pageKey: "AboutUs", parent: homePageKey };
export const contactPageKey = { pageKey: "Contact", parent: homePageKey };
export const utils1PageKey = { pageKey: "Utils1", parent: homePageKey };
export const textsPageKey = { pageKey: "Texts", parent: homePageKey };
export const treatisePageKey = { pageKey: "Treatise", parent: textsPageKey };
export const treatiseSelectedPageKey = { pageKey: "TreatiseSelected", parent: treatisePageKey };
export const fablesPageKey = { pageKey: "Fables", parent: textsPageKey };
export const fableSelectedPageKey = { pageKey: "FableSelected", parent: fablesPageKey };
export const gardenPageKey = { pageKey: "Garden", parent: textsPageKey };
export const gardenSelectedPageKey = { pageKey: "GardenSelected", parent: gardenPageKey };
export const lettersPageKey = { pageKey: "Letters", parent: homePageKey };
export const lettersFromPageKey = { pageKey: "LettersFrom", parent: lettersPageKey };
export const lettersToPageKey = { pageKey: "LettersTo", parent: lettersPageKey };
