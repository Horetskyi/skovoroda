export const SkovorodaConstants = {
  desktopEnding: "-desktop",
  mobileEnding: "-mobile",

  getColorByType: function(type) {
    return type === "original" ? "green" : "yellow";
  },
  getBackgroundColorByType: function(type) {
    return this.getColorByType(type)+".0";
  },
  getElementsColorByType: function(type) {
    return this.getColorByType(type)+".2";
  },
};