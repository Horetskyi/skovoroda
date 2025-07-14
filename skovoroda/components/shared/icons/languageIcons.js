import UkranianFlagIcon from "./uaFlagIcon";
import XVIIIIcon from "./xviiiIcon";

export function getLeftSectionIcon(language, isAbsolute) {
  if (!language) return null;
  const lower = language.toLowerCase();
  if (lower === 'oldua' || lower === "оригінал") return <XVIIIIcon isAbsolute={isAbsolute} />;
  if (lower === 'ua' || 
    lower.includes('шевчук') || 
    lower.includes('хоткевич') || 
    lower.includes('федорак')) {
    return <UkranianFlagIcon/>;
  }
  return null;
}
