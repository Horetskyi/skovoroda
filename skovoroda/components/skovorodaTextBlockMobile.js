import { Image, Text, createStyles, Title, Stack, Badge  } from '@mantine/core';
import SourceV1 from './sourceV1';
import DownloadStackV1 from './downloadStackV1';
import { SkovorodaConstants } from '../lib/skovorodaConstants';

const useStyles = createStyles((theme) => ({

  image: {
    img: {
      borderRadius: theme.radius.sm,
      boxShadow: theme.shadows.md,
    }
  },

  downloadStack: {
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "column",
    alignSelf: "flex-start",
    flexGrow: 1,
  }

}));

export default function SkovorodaTextBlockMobile(props) {
  
  const { classes } = useStyles();
  const badgeText = props.textType === "original" ? "Оригінал" : "Переклад";
  const color = SkovorodaConstants.getColorByType(props.textType);

  return <>
  
    <Title order={3} size="h4" mt={0} mb="xs" fw={500}>{props.textName}</Title>

    <Badge radius="md" width={300} variant="outline" color="dark">{badgeText}</Badge>

    {props.imageSrc 
    ? <Image mt="md" mb="md" src={props.imageSrc} alt={props.sourceName} width={120} height={180} className={classes.image}/>
    : <></>
    }

    { (props.textType === "translation") ? 
      <Stack spacing="0" mb="md">
        <Text size="sm" color="gray.9">
          Перекладач
        </Text>
        <Text fw={500}>{props.translatorName}</Text>
      </Stack>
    : <></>}

    <SourceV1 {...props}/>
    <div className={classes.downloadStack}>
      <DownloadStackV1  {...props} color={color}/>
    </div>

  </>;
}
