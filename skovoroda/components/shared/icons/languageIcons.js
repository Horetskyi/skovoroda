import UkranianFlagIcon from "./uaFlagIcon";
import XVIIIIcon from "./xviiiIcon";

export function getLeftSectionIcon(language) {
  if (language === 'oldua') return <XVIIIIcon/>;
  if (language === 'ua') return <UkranianFlagIcon/>;
  return null;
}
