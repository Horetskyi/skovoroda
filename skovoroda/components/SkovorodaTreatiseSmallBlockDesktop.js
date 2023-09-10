import { Card, Image, Text, Group, createStyles, Container, Title, Stack, Badge, Space  } from '@mantine/core';
import SourceV1 from './sourceV1';
import DownloadStackV1 from './downloadStackV1';
import { SkovorodaConstants } from '../lib/skovorodaConstants';

const useStyles = createStyles((theme) => ({

  group: {
    flexWrap: "nowrap",
  },

  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    margin: "auto",
  },

  mainCardContent: {
    alignSelf: "flex-start",
    flexGrow: "1 !important",
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
      borderRadius: theme.radius.md,
      boxShadow: theme.shadows.md,
    }
  },

  badge: {
    margin: "4px 0",
    color: "black",
  },

  downloadStack: {
    display: "flex",
    justifyContent: "flex-end",
    flexDirection: "column",
    alignSelf: "flex-end",
    flexGrow: 1,
    marginTop: theme.spacing.md,
  }

}));

export default function SkovorodaTreatiseSmallBlockDesktop(props) {
  
  const { classes } = useStyles();

  const badgeText = SkovorodaConstants.getTypeText(props.textType);
  const bgColor = SkovorodaConstants.getTextBackgroundColorByType(props.textType);
  const elColor = SkovorodaConstants.getBlockElementsColorByType(props.textType);
  const color = SkovorodaConstants.getColorByType(props.textType);
  
  return <Card radius="md" p="md" m="0" bg="gray.0" mb="xl" withBorder={true} className={classes.card}>
    <Group className={classes.group}>
      
      {props.imageSrc 
      ? <div className={classes.sideContent}>
        <Badge 
          radius="md" 
          fullWidth={true} 
          className={classes.badge} 
          py="sm"
          variant="light"
          bg={elColor}
        >
          {badgeText}
        </Badge>
        <Image 
          radius="md"
          mt="md"
          src={props.imageSrc}
          alt={props.sourceName}
          width={180}
          height={270}
          className={classes.image}
        />
      </div>
      : <></>
      }

      <div className={classes.mainCardContent}>
        <Title 
          order={2}
          mt={0}
          mb="xs"
          fw={500}
          >
          {props.textName}
        </Title>
        
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
          <DownloadStackV1 {...props}/>
        </div>
      </div>

    </Group>
  </Card>
}
