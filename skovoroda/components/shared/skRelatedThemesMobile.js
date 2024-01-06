import { List, Text } from "@mantine/core";

export default function SkRelatedThemesMobile(props) {

  if (!props.themes || !props.themes.length) {
    return null;
  }

  const text = "Пов'язані теми:";
  return <div className="normalContentText normalContentText_withoutIndent">
    <Text fw={400}>{text}</Text>
    <List className="normalContentText normalContentText_withoutIndent">
      {props.themes.map(theme => {
        return <List.Item key={theme}><Text>{theme}</Text></List.Item>
      })}
    </List>
  </div>
}