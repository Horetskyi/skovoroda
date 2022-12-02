import { Card, Image, Text, Group, createStyles, Container, Title, Stack, Badge  } from '@mantine/core';
import SourceV1 from './sourceV1';
import DownloadStackV1 from './downloadStackV1';
import { SkovorodaConstants } from '../lib/skovorodaConstants';

const useStyles = createStyles((theme) => ({

  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    margin: "auto",
    width: "600px",
  },

  mainCardContent: {
    alignSelf: "flex-start",
    width: "430px", // 600 - 120 - 50
    alignSelf: "stretch",
    flexDirection: "column",
    display: "flex",
  },
  
  section: {
    padding: theme.spacing.md,
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  sideContent: {
    alignSelf: "flex-start",
  },

  image: {
    img: {
      borderRadius: theme.radius.sm,
      boxShadow: theme.shadows.md,
    }
  },

  badge: {
    margin: "4px 0",
    color: "black"
  },

  downloadStack: {
    display: "flex",
    justifyContent: "flex-end",
    flexDirection: "column",
    alignSelf: "flex-end",
    flexGrow: 1,
  }

}));

export default function SkovorodaTextBlockDesktop(props) {
  
  const { classes } = useStyles();

  const badgeText = props.textType === "original" ? "Оригінал" : "Переклад";
  const color = SkovorodaConstants.getColorByType(props.textType);
  const bgColor = SkovorodaConstants.getBackgroundColorByType(props.textType);
  const elColor = SkovorodaConstants.getElementsColorByType(props.textType);
  
  return (
    <Container size="md">
      <Card withBorder radius="md" p="md" bg={bgColor} className={classes.card}>
        <Group>
          
          {props.imageSrc 
          ? <div className={classes.sideContent}>
            <Badge radius="md" fullWidth={true} className={classes.badge} variant="filled" color={elColor}>{badgeText}</Badge>
            <Image mt="md" src={props.imageSrc} alt={props.sourceName} width={120} height={180} className={classes.image}/>
          </div>
          : <></>
          }

          <div className={classes.mainCardContent}>
            <Title order={3} size="h4" mt={0} mb="xs" fw={500}>{props.textName}</Title>
            
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
              <DownloadStackV1 {...props} color={color}/>
            </div>
          </div>

        </Group>
      </Card>
    </Container>
  )
}
