import { List } from "@mantine/core";
import classes from './zmistItem.module.scss';
import SkRelatedTags from "./skRelatedTags";
import { getReadPath } from "../../lib/skovorodaPath";
import SkTextLink from "./skTextLink";
import { IconDots, IconMail, IconMessages, IconMusic, IconPaw, IconSeeding, IconStar } from "@tabler/icons-react";
import Link from "next/link";
import SkMetaTextView from "./skMetaTextView";

export function ZmistItem({ item, index, chipsWithoutBackground }) {

  const hasReadLink = item.read && item.read.length;
  const isLetter = item.type === "intro_letter";
  const isDialog = item.type === "dialog";
  const isSong = item.type === "song";
  const isSeed = item.type === "seed";
  const isStarIcon = item.specialType === "spiritual_autobiography";
  const isPaw = item.typeDisplayHint === "paw";
  const isNoIcon = !isLetter && !isDialog && !isStarIcon && !isPaw && !isSong && !isSeed;
  const containsSong = item.contains && item.contains.length && (
    item.contains.includes("song") ||
    item.contains.some(subItem => typeof subItem === 'string' && subItem.includes("song")) ||
    item.contains.some(subItem => subItem && subItem.id && subItem.id.includes("song"))
  );
  const containedSong = item.contains && item.contains.find(subItem => subItem && subItem.id && subItem.id.includes("song"));
  const containedSongLinkHref = containedSong && ('#song_'+containedSong.id.split('_')[2]);

  const iconInline = containsSong ? <span className={classes.iconInline}>
    {(!containedSongLinkHref) ? <span className={classes.songIconContainer}><IconMusic size={18} className={`${classes.leftSmallIcon} ${classes.leftSmallIconLightBlueColorOnly}`} /></span> : null}
    {(containedSongLinkHref) ? <Link href={containedSongLinkHref}><span className={classes.songIconContainer}><IconMusic size={18} className={`${classes.leftSmallIcon} ${classes.leftSmallIconLightBlueColorOnly}`} /></span></Link> : null}
  </span> : null;

  function getLeftIcon() {
    if (isLetter) return <div className={classes.leftSmallIconContainer}><IconMail size={18} className={`${classes.leftSmallIcon} ${classes.leftSmallIconBroun}`} /></div>;
    if (isDialog) return <div className={classes.leftSmallIconContainer}><IconMessages size={18} className={`${classes.leftSmallIcon} ${classes.leftSmallIconBlue}`} /></div>;
    if (isPaw) return <div className={classes.leftSmallIconContainer}><IconPaw size={18} className={`${classes.leftSmallIcon} ${classes.leftSmallIconBroun}`} /></div>;
    if (isStarIcon) return <div className={classes.leftSmallIconContainer}><IconStar size={18} className={`${classes.leftSmallIcon} ${classes.leftSmallIconGold}`} /></div>;
    if (isSong) return <div className={classes.leftSmallIconContainer}><IconMusic size={18} className={`${classes.leftSmallIcon} ${classes.leftSmallIconLightBlueColorOnly}`} /></div>;
    if (isSeed) return <div className={classes.leftSmallIconContainer}><IconSeeding size={18} className={`${classes.leftSmallIcon} ${classes.leftSmallIconLightGreen}`} /></div>;
    if (isNoIcon) return <div className={classes.leftSmallIconContainer}><IconDots size={18} className={`${classes.leftSmallIcon} ${classes.leftSmallIconGray}`} /></div>;
    return null;
  }
  const leftIcon = getLeftIcon();

  const itemMl = item.indent && item.indent > 0 ? item.indent * 36 : 0;

  const tagsClass = `${classes.tags} ${chipsWithoutBackground ? classes.chipsWithoutBackground : ''}`
  const tagsView = <div className={tagsClass}>
    <SkRelatedTags type={item.type} mainTheme={item.mainTheme} specialType={item.specialType} />
  </div>;

  return (
    <List.Item 
      key={"zmist_" + index} 
      ml={itemMl}
      classNames={{item: classes.listItem}} 
      styles={{itemIcon: { alignSelf: "baseline"}, itemWrapper: { overflow: "visible"}}}>

      <div className={`normalContentText readFont normalContentText_withoutIndent ${classes.flex}`} mb={hasReadLink ? "sm" : "0"}>

        <span>
          {hasReadLink 
            ? <span>{leftIcon}<SkTextLink href={getReadPath(item.read)} text={item.title} title={`Читати \"${item.title}\"`} />{iconInline}{tagsView}</span>
            : <span className={classes.title}>{leftIcon}{item.title}{iconInline}{tagsView}</span>}
        </span>

        {/* Render seedContent if present */}
        {item.type === "seed" && item.seedContent ? <>
          <SkMetaTextView metaText={item.seedContent} otherArgs={{isv3: true, plusClassName: classes.seedContent}} />
        </> : null}

      </div>
    </List.Item>
  );
}
