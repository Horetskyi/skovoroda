import { Text, List } from "@mantine/core";
import classes from './zmistItem.module.scss';
import SkRelatedTags from "./skRelatedTags";
import { getReadPath } from "../../lib/skovorodaPath";
import SkTextLink from "./skTextLink";

export function ZmistItem({ item, index }) {

  const hasReadLink = item.read && item.read.length;
  
  const titleContent = hasReadLink ? (
    <Text className={`normalContentText normalContentText_withoutIndent`}>
      <SkTextLink href={getReadPath(item.read)} text={item.title} title={`Читати \"${item.title}\"`} />
    </Text>
  ) : (
    <Text className={`normalContentText normalContentText_withoutIndent`}>
      {item.title}
    </Text>
  );
  return (
    <List.Item key={"zmist_" + index} classNames={{item: classes.listItem}} styles={{itemIcon: { alignSelf: "baseline"}, itemWrapper: { overflow: "visible"}}}>
      
      {titleContent}

      <SkRelatedTags type={item.type} mainTheme={item.mainTheme} specialType={item.specialType} />

    </List.Item>
  );
}
