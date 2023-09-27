import { Group, Text, createStyles } from "@mantine/core";
import SkImage from "./skImage";

const useStyles = createStyles((theme) => ({

  group: {
    gap: theme.spacing.sm,
  },

}));

export default function SkCommentAuthorMobile(props) {

  const { classes } = useStyles();

  const image = {
    imageUrl: "/images/DimaLittleImage.jpg",
    imageTitle: "Горецький Дмитро, розробник сайту",
    imageAlt: "Горецький Дмитро, розробник сайту",
  };

  return <Group className={classes.group} mb={"sm"}>
    <SkImage height={48} width={48} image={image} shadow={"sm"} key={image.imageUrl} styleAction={style => {
      style.borderRadius = "48px";
    }} />
    <Text className="normalContentText normalContentText_withoutIndent">
      <Text>Горецький Дмитро</Text>
      <Text color="gray.6">розробник сайту</Text>
    </Text>
  </Group>
}