import { Group } from "@mantine/core";
import FountainIcon from "./../svgs/fountainIcon.svg";
import SkTagChip from "./skTagChip";
import { IconDeer } from "@tabler/icons";
import classes from "./skRelatedTags.module.scss";
import { SkovorodaReadsPath } from "../../lib/skovorodaPath";

const THEME_SLUGS_MAP = new Map([
  ["Сродність", "srodnist"],
]);

const TYPE_TAG_LABELS_MAP = new Map([
  ["parable", "Притча"],
]);

function getSpecialIcon(specialType) {
  if (!specialType || !specialType.length) return null;
  if (specialType === "fountain") {
    return <FountainIcon key={specialType} className={classes.specialIcon} width={60} height={40} />;
  }
  if (specialType === "symbolsDrawings") {
    return <IconDeer key={specialType} className={classes.specialIcon} width={32} height={32} color="black" />;
  }
  return null;
}

function getRelatedSourcesTags(relatedSources) {
  if (!relatedSources || !relatedSources.length) {
    return null;
  }
  return relatedSources.map(source => {
    return <SkTagChip key={source.href} content={`#${source.shortName}`} href={source.href} colorClass={source.sourceType}/>
  });
}

export default function SkRelatedTags({ type, mainTheme, specialType, relatedSources }) {

  const typeTagLabel = type && TYPE_TAG_LABELS_MAP.get(type); // type of the read
  const themeSlug = mainTheme ? THEME_SLUGS_MAP.get(mainTheme) : null; // mainTheme of the read
  const specialIcon = getSpecialIcon(specialType); // special type of the read
  const relatedSourcesTags = getRelatedSourcesTags(relatedSources);

  if (!typeTagLabel && !mainTheme && !specialIcon && !relatedSourcesTags) {
    return null; // Don't render if there are no tags/icons
  }

  return (
    <Group mt="xs" mb="sm" gap="xs">
      {typeTagLabel && <SkTagChip key={type} content={`#${typeTagLabel}`} href={`/texts/parables`} colorClass={type} />}
      {mainTheme && <SkTagChip key={themeSlug} content={`#${mainTheme}`} href={`/themes/${themeSlug}`} colorClass={themeSlug} />}
      {relatedSourcesTags}
      {specialIcon}
    </Group>
  );
}
