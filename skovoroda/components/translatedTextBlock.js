import Link from 'next/link'
import { Card, Image, Text, Group, Button, createStyles, Divider, Container, Title  } from '@mantine/core';
import { IconBookDownload } from '@tabler/icons';
import { saveAs } from "file-saver";

const useStyles = createStyles((theme) => ({

  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    margin: "auto",
    width: "600px",
  },

  mainCardContent: {
    width: "430px", // 600 - 120 - 50
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

  link: {
    color: theme.colors.gray[8],
  },

}));

export default function TranslatedTextBlock(props) {
  
  const { classes } = useStyles();
  
  return (
    <Container size="md">
      <Card withBorder radius="md" p="md" className={classes.card}>
        <Group>
          
          <div className={classes.mainCardContent}>
            
            <Title order={2} size="xl" mt={0} mb="xs" fw={600}>
              {props.translatedName}
            </Title>
            
            <Divider mt="md"/>
            
            <Text size="sm" mt="md" color="dimmed">
              Перекладач
            </Text>
            <Text fw={500}>{props.translatorName}</Text>
            
            <Text size="sm" mt="md" color="dimmed">
              Джерело
            </Text>
            <Link href={props.sourceHref}><a color="dimmed" className={classes.link}>{props.sourceName}</a></Link>

            <Link href={"https://skovoroda.s3.eu-west-3.amazonaws.com/sources/"+props.downloadFileName}>
              <Button mt="md" fullWidth variant="light" leftIcon={<IconBookDownload />}>Завантажити PDF ({props.fileSize})</Button>
            </Link>
          </div>

          <div className={classes.sideContent}>
            <Image src={props.imageSrc} alt={props.sourceName} width={120} height={180} className={classes.image}/>
          </div>

        </Group>
      </Card>
    </Container>
  )
}
