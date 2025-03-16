import { Text } from "@mantine/core";

export default function ThemePageMobile({ selectedTheme }) {
  return (
    <>
      <Text>Text: {selectedTheme.title}</Text>
    </>
  );
}
