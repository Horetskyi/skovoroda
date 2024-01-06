import { Group, Text } from "@mantine/core";
import SkImage from "./skImage";

export default function SkCommentAuthorDesktop(props) {

  const image = {
    imageUrl: "/images/DimaLittleImage.jpg",
    imageTitle: "Горецький Дмитро, розробник сайту",
    imageAlt: "Горецький Дмитро, розробник сайту",
  };

  return <Group gap="md" mb="md">
    <SkImage height={60} width={60} image={image} shadow={"sm"} key={image.imageUrl} borderRadius="60px" />
    <div className="normalContentText normalContentText_withoutIndent">
      <Text>Горецький Дмитро</Text>
      <Text c="gray.6">розробник сайту</Text>
    </div>
  </Group>
}