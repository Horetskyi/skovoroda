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
  },
  fixMetaDescription: function(metaDescription) {
    const recommendedDescriptionLength = this.recommendedMetaDescriptionLength;
    if (metaDescription.length > recommendedDescriptionLength) {
      return metaDescription.substring(0, recommendedDescriptionLength - 3) + "...";
    }
    return metaDescription;
  },
  
  contentToMetaDescription: function(content, initialMetaDescription, lastTryDescription) {
    
    var metaDescription = initialMetaDescription || "";

    if (!content || (!content.length && !content.main)) return lastTryDescription ? lastTryDescription : metaDescription;
    if (content.main) {
      content = content.main;
    }

    const recommendedDescriptionLength = this.recommendedMetaDescriptionLength;
    var contentIndex = 0;
    while (metaDescription.length < recommendedDescriptionLength && contentIndex < content.length) {
      const lineObject = content[contentIndex];
      const contentArray = Array.isArray(lineObject.text) ? lineObject.text : [lineObject];
      const text = contentArray
        .filter(line => !line.noteNumber && !line.isNoteBeginning)
        .map(line => line.text)
        .join("");

      if (text.length + metaDescription.length <= recommendedDescriptionLength) {
        metaDescription += " " + text;
      } else {
        metaDescription += " " + text.substring(0, recommendedDescriptionLength - metaDescription.length) + "...";
        break;
      }
      contentIndex++;
    }
    return metaDescription;
  }
};

export const homePageKey = { pageKey: "Home" }; 
export const copyrightPageKey = { pageKey: "Copyright", parent: homePageKey };
export const aboutUsPageKey = { pageKey: "AboutUs", parent: homePageKey };
export const contactPageKey = { pageKey: "Contact", parent: homePageKey };
export const utils1PageKey = { pageKey: "Utils1", parent: homePageKey };
export const textsPageKey = { pageKey: "Texts", parent: homePageKey };
export const testPageKey = { pageKey: "Test", parent: homePageKey };
export const themePageKey = { pageKey: "Theme", parent: homePageKey };
export const characterPageKey = { pageKey: "Character", parent: homePageKey };
export const readPageKey = { pageKey: "Read", parent: textsPageKey };
export const treatisePageKey = { pageKey: "Treatise", parent: textsPageKey };
export const parablesPageKey = { pageKey: "Parables", parent: textsPageKey };
export const treatiseSelectedPageKey = { pageKey: "TreatiseSelected", parent: treatisePageKey };
export const fablesPageKey = { pageKey: "Fables", parent: textsPageKey };
export const fableSelectedPageKey = { pageKey: "FableSelected", parent: fablesPageKey };
export const gardenPageKey = { pageKey: "Garden", parent: textsPageKey };
export const gardenSelectedPageKey = { pageKey: "GardenSelected", parent: gardenPageKey };
export const lettersPageKey = { pageKey: "Letters", parent: homePageKey };
export const articlesPageKey = { pageKey: "Articles", parent: homePageKey };
export const lettersFromPageKey = { pageKey: "LettersFrom", parent: lettersPageKey };
export const lettersToPageKey = { pageKey: "LettersTo", parent: lettersPageKey };
