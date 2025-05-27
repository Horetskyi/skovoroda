import { Text, List } from "@mantine/core";
import classes from './zmistItem.module.scss';
import SkRelatedTags from "./skRelatedTags";
import { getReadPath } from "../../lib/skovorodaPath";
import SkTextLink from "./skTextLink";
import { IconDots, IconMail, IconMessages, IconMusic, IconPaw, IconSeeding, IconStar } from "@tabler/icons-react";

export function ZmistItem({ item, index }) {

  const hasReadLink = item.read && item.read.length;
  const isLetter = item.type === "intro_letter";
  const isDialog = item.type === "dialog";
  const isSong = item.type === "song";
  const isSeed = item.type === "seed";
  const isStarIcon = item.specialType === "spiritual_autobiography";
  const isPaw = item.typeDisplayHint === "paw";
  const isNoIcon = !isLetter && !isDialog && !isStarIcon && !isPaw && !isSong && !isSeed;
  const containsSong = item.contains && item.contains.length && item.contains.includes("song");
  
  return (
    <List.Item 
      key={"zmist_" + index} 
      classNames={{item: classes.listItem}} 
      styles={{itemIcon: { alignSelf: "baseline"}, itemWrapper: { overflow: "visible"}}}>

      <div className={`normalContentText readFont normalContentText_withoutIndent ${classes.flex}`} mb={hasReadLink ? "sm" : "0"}>

        { isLetter ? <div className={classes.leftSmallIconContainer}><IconMail size={18} className={`${classes.leftSmallIcon} ${classes.leftSmallIconBroun}`} /></div> : null}
        { isDialog ? <div className={classes.leftSmallIconContainer}><IconMessages size={18} className={`${classes.leftSmallIcon} ${classes.leftSmallIconBlue}`} /></div> : null}
        { isPaw ? <div className={classes.leftSmallIconContainer}><IconPaw size={18} className={`${classes.leftSmallIcon} ${classes.leftSmallIconBroun}`} /></div> : null}
        { isStarIcon ? <div className={classes.leftSmallIconContainer}><IconStar size={18} className={`${classes.leftSmallIcon} ${classes.leftSmallIconGold}`} /></div> : null}
        { isSong ? <div className={classes.leftSmallIconContainer}><IconMusic size={18} className={`${classes.leftSmallIcon} ${classes.leftSmallIconLightBlueColorOnly}`} /></div> : null}
        { isSeed ? <div className={classes.leftSmallIconContainer}><IconSeeding size={18} className={`${classes.leftSmallIcon} ${classes.leftSmallIconGray}`} /></div> : null}
        { isNoIcon ? <div className={classes.leftSmallIconContainer}><IconDots size={18} className={`${classes.leftSmallIcon} ${classes.leftSmallIconGray}`} /></div> : null}

        {hasReadLink 
          ? <SkTextLink href={getReadPath(item.read)} text={item.title} title={`Читати \"${item.title}\"`} />
          : <span className={classes.title}>{item.title}</span>}

        {containsSong ? <div className={classes.songIconContainer}><IconMusic size={18} className={`${classes.leftSmallIcon} ${classes.leftSmallIconLightBlueColorOnly}`} /></div> : null}

        <div className={classes.tags}>
          <SkRelatedTags type={item.type} mainTheme={item.mainTheme} specialType={item.specialType} />
        </div>

      </div>

    </List.Item>
  );
}
