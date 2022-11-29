import { SkovorodaConstants } from "./skovorodaConstants";

export default function readDynamicIdCommon(id) {

  const deviceEnding = 
    id.includes(SkovorodaConstants.desktopEnding) ? SkovorodaConstants.desktopEnding
    : id.includes(SkovorodaConstants.mobileEnding) ? SkovorodaConstants.mobileEnding
    : "";

  const idWithoutEnding = id
    .replace(SkovorodaConstants.desktopEnding, "")
    .replace(SkovorodaConstants.mobileEnding, "");

  return {
    id: idWithoutEnding,
    deviceEnding: deviceEnding,
  }
}