export const SkovorodaConstants = {
  desktopEnding: "-desktop",
  mobileEnding: "-mobile",

  getColorByType: function(type) {
    return type === "original" ? "green" : "magnolia";
  },
  getBackgroundColorByType: function(type) {
    return this.getColorByType(type)+".1";
  },
  getTextBackgroundColorByType: function(type) {
    return this.getColorByType(type)+".1";
  },
  getElementsColorByType: function(type) {
    return this.getColorByType(type)+".2";
  },
  getElementsHoverColorByType: function(type) {
    return this.getColorByType(type)+".1";
  },
  getColorInTheme: function(color, theme) {
    const split = color.split('.');
    return theme.colors[split[0]][+split[1]];
  }
};