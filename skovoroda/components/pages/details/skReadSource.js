import { Text } from "@mantine/core";
import SkTextLink from "../../shared/skTextLink";
import { getTreatisePath } from "../../../lib/skovorodaPath";

export default function SkReadSource({sourceTreatiseUrlId, treatiseTitle, title}) {

  if (sourceTreatiseUrlId && treatiseTitle) {
    
    const sourceText = `\"${title}\" є частиною твору `;
    
    return <Text mt="md">
      <Text component="span">{sourceText}</Text> 
      <SkTextLink 
        text={`\"${treatiseTitle}\"`} 
        href={getTreatisePath(sourceTreatiseUrlId)} />
      <Text component="span">.</Text> 
    </Text>
  }

  return null;
}