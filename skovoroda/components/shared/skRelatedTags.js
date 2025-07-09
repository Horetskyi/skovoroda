import { Group } from "@mantine/core";
import FountainIcon from "./../svgs/fountainIcon.svg";
import SkTagChip from "./skTagChip";
import { IconDeer } from "@tabler/icons";
import classes from "./skRelatedTags.module.scss";

const THEME_SLUGS_MAP = new Map([
  ["Сродність", "srodnist"],
  ["Потрібне_Легке", "portibne-lehke"],
  ["Щастя", "shastia"],
  ["Дві_Натури", "dvi-natury"],
  ["Любов", "love"],
  ["Серце", "heart"],
]);

const TYPE_TAG_LABELS_MAP = new Map([
  ["parable", "Притча"],
]);

function getSpecialIcon(specialType) {
  if (!specialType || !specialType.length) return null;
  if (specialType === "fountain") {
    return <FountainIcon key={specialType} className={classes.specialIcon} width={50} height={30} />;
  }
  if (specialType === "symbolsDrawings") {
    return <IconDeer key={specialType} className={classes.specialIcon} width={26} height={26} color="black" />;
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

export default function SkRelatedTags({ type, mainTheme, themes, specialType, relatedSources }) {

  const isThemesExists = themes && themes.length > 0;
  if (!type && !mainTheme && !specialType && !relatedSources && !isThemesExists) {
    return null; // Don't render if there are no tags/icons
  }

  const typeTagLabel = type && TYPE_TAG_LABELS_MAP.get(type); // type of the read
  const themeSlug = mainTheme ? THEME_SLUGS_MAP.get(mainTheme) : null; // mainTheme of the read
  const specialIcon = getSpecialIcon(specialType); // special type of the read
  const relatedSourcesTags = getRelatedSourcesTags(relatedSources);
  const isSpiritualAutobiography = specialType === 'spiritual_autobiography';

  if (!typeTagLabel && !mainTheme && !specialIcon && !relatedSourcesTags && !isSpiritualAutobiography && !isThemesExists) {
    return null; // Don't render if there are no tags/icons
  }

  return (
    <Group mt="0" mb="0" gap="sm">
      {typeTagLabel && <SkTagChip key={type} content={`#${typeTagLabel}`} href={`/texts/parables`} colorClass={type} />}
      {mainTheme && <SkTagChip key={themeSlug} content={`#${mainTheme}`} href={`/themes/${themeSlug}`} colorClass={themeSlug} />}
      {isSpiritualAutobiography && <SkTagChip key='spiritual_autobiography' content='Духовний автопортрет' colorClass='spiritual-autobiography' />}
      {relatedSourcesTags}
      {specialIcon}
      {isThemesExists && themes.map((theme, index) => {
        const themeSlug = THEME_SLUGS_MAP.get(theme);
        if (!themeSlug) return null; // Skip if no slug found
        return <SkTagChip key={`theme_${index}`} content={`#${theme}`} href={`/themes/${themeSlug}`} colorClass={themeSlug} />;
      }).filter(x => x)}
    </Group>
  );
}
