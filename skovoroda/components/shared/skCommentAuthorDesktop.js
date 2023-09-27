import { Group, Text, createStyles } from "@mantine/core";
import SkImage from "./skImage";

const useStyles = createStyles((theme) => ({

  group: {
    gap: theme.spacing.md,
  },

}));

export default function SkCommentAuthorDesktop(props) {

  const { classes } = useStyles();

  const image = {
    imageUrl: "/images/DimaLittleImage.jpg",
    imageTitle: "Горецький Дмитро, розробник сайту",
    imageAlt: "Горецький Дмитро, розробник сайту",
  };

  return <Group className={classes.group} mb={"md"}>
    <SkImage height={60} width={60} image={image} shadow={"sm"} key={image.imageUrl} styleAction={style => {
      style.borderRadius = "60px";
    }} />
    <Text className="normalContentText normalContentText_withoutIndent">
      <Text>Горецький Дмитро</Text>
      <Text color="gray.6">розробник сайту</Text>
    </Text>
  </Group>
}