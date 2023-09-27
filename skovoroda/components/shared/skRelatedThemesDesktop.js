import { List, Text, createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({

  group: {
    gap: theme.spacing.sm,
  },

}));

export default function SkRelatedThemesDesktop(props) {

  const { classes } = useStyles();
 
  if (!props.themes || !props.themes.length) {
    return null;
  }

  return <div className="normalContentText normalContentText_withoutIndent">
    <Text fw={400}>Пов&apos;язані теми:</Text>
    <List className="normalContentText normalContentText_withoutIndent">
      {props.themes.map(theme => {
        return <List.Item key={theme}><Text>{theme}</Text></List.Item>
      })}
    </List>
  </div>
}