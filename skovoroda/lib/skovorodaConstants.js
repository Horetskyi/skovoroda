export const SkovorodaConstants = {
  desktopEnding: "-desktop",
  mobileEnding: "-mobile",

  isOriginal: function(type) {
    return type === "original" || type === "Original";
  },

  getTypeText: function(type) {
    return this.isOriginal(type) ? "Оригінал" : "Переклад";
  },

  getColorByType: function(type) {
    return this.isOriginal(type) ? "green" : "lilac";
  },
  getBackgroundColorByType: function(type) {
    return this.getColorByType(type)+".1";
  },
  getTextBackgroundColorByType: function(type) {
    return this.getColorByType(type)+".1";
  },
  getBlockElementsColorByType: function(type) {
    return this.getColorByType(type)+".3";
  },
  getElementsColorByType: function(type, backgroundType) {
    return this.getColorByType(type) + (backgroundType === "block" ? ".3" : ".2");
  },
  getElementsHoverColorByType: function(type, backgroundType) {
    return this.getColorByType(type) + (backgroundType === "block" ? ".2" : ".1");
  },
  getColorInTheme: function(color, theme) {
    const split = color.split('.');
    return theme.colors[split[0]][+split[1]];
  }
};
