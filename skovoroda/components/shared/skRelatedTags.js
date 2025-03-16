import { Group } from "@mantine/core";
import FountainIcon from "./../svgs/fountainIcon.svg";
import SkTagChip from "./skTagChip";
import { IconDeer } from "@tabler/icons";
import classes from "./skRelatedTags.module.scss";

const THEME_SLUGS_MAP = new Map([
  ["Сродність", "srodnist"],
]);

const TYPE_TAG_LABELS_MAP = new Map([
  ["parable", "Притча"],
]);

function getSpecialIcon(specialType) {
  if (!specialType || !specialType.length) return null;
  if (specialType === "fountain") {
    return <FountainIcon className={classes.specialIcon} width={60} height={40} />;
  }
  if (specialType === "symbolsDrawings") {
    return <IconDeer className={classes.specialIcon} width={32} height={32} color="black" />;
  }
  return null;
}

export default function SkRelatedTags({ type, mainTheme, specialType }) {
  const typeTagLabel = type && TYPE_TAG_LABELS_MAP.get(type);
  const themeSlug = mainTheme ? THEME_SLUGS_MAP.get(mainTheme) : null;
  const specialIcon = getSpecialIcon(specialType);

  if (!typeTagLabel && !mainTheme && !specialIcon) {
    return null; // Don't render if there are no tags/icons
  }

  return (
    <Group mt="xs" mb="sm" gap="xs">
      {typeTagLabel && <SkTagChip content={`#${typeTagLabel}`} href={`/texts/parables`} colorClass={type} />}
      {mainTheme && <SkTagChip content={`#${mainTheme}`} href={`/themes/${themeSlug}`} colorClass={themeSlug} />}
      {specialIcon}
    </Group>
  );
}
