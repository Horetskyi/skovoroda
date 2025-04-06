import { Box, Space, Text } from "@mantine/core";
import SkImage from "../../shared/skImage";
import SkH2Mobile from "../../shared/skH2Mobile";

export default function SkAuthorMobile({ author }) {
  if (!author) {
    return null;
  }
  return <Box>
    <SkH2Mobile mt="xl" mb="xl" text="Автор" />
    {author.image ? <>
      <SkImage 
        image={author.image}
        priority={false} 
        optimize={false} 
        shadow={true}
        fullWidth={true} />
    </> : null}
    <Space h="md" />
    <Text ta={"center"} component="b">{author.fullName}</Text>
    <Text mt="md">{author.description}</Text>
  </Box>;
}