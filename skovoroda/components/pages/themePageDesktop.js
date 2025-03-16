import { Text } from "@mantine/core";

export default function ThemePageDesktop({ selectedTheme }) {
  return (
    <>
      <Text>Text: {selectedTheme.title}</Text>
    </>
  );
}
