import { Box, Flex, Text } from "@mantine/core";
import SkH2Desktop from "../../shared/skH2Desktop";
import SkImage from "../../shared/skImage";
import { adjustImageHeight } from "../../functions/imageFunctions";

export default function SkAuthorDesktop({ author }) {
  if (!author) {
    return null;
  }
  adjustImageHeight(author.image, 180);
  return <Box>
    <SkH2Desktop mt="xl" text="Автор" />
    <Flex mt="xl" mb="md" gap={"xl"}> 
      {author.image ? <>
        <SkImage 
          image={author.image}
          priority={false} 
          optimize={false} 
          shadow={true} />
      </> : null}
      <Box>
        <Text component="b">{author.fullName}</Text>
        <Text mt="md">{author.description}</Text>
      </Box>
    </Flex>
  </Box>;
}