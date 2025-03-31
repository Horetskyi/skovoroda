import { Group, Text } from "@mantine/core";
import SkImage from "./skImage";

export default function SkCommentAuthorMobile(props) {

  const image = {
    imageUrl: "/images/DimaLittleImage.jpg",
    imageTitle: "Горецький Дмитро, розробник сайту",
    imageAlt: "Горецький Дмитро, розробник сайту",
  };

  return <Group gap="sm" mb="sm">
    <SkImage height={48} width={48} image={image} shadow="sm" key={image.imageUrl} styleAction={style => {
      style.borderRadius = "48px";
    }} optimize={true} />
    <Text className="normalContentText normalContentText_withoutIndent">
      <Text >Горецький Дмитро</Text>
      <Text c="gray.6">розробник сайту</Text>
    </Text>
  </Group>
}