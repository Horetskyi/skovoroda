import Link from 'next/link'
import { Card, Image, Text, Group, useMantineTheme, Button, createStyles, Divider, Container, Title, Badge  } from '@mantine/core';
import UkraineFlagSvg from "../components/ukraineFlag.svg";
import { IconBookDownload } from '@tabler/icons';

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

  flagIcon: {
    borderRadius: theme.radius.sm,
    marginLeft: theme.spacing.sm,
    alignSelf: "center",
  },

  badge: {
    alignSelf: "inherit",
    alignItems: "flex-start",
  }

}));

export default function Narcis() {
  
  const { classes } = useStyles();

  const props = {
    imageSrc: "/books-cover/Tvory u dvox tomax. Tom 1 - 1994.jpg",
    translatedName: "Вступні двері до християнської добронравності",
    translatorName: "Шевчук Валерій Олександрович",
    sourceName: "Сковорода, Григорій. Твори у двох томах. Том 1 - 1994 р.",
    sourceHref: "/sources/Tvory u dvox tomax. Tom 1 - 1994",
  };

  
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

            <Button mt="md" fullWidth variant="light" leftIcon={<IconBookDownload />}>Завантажити PDF (1.56 MB)</Button>
          </div>

          <div className={classes.sideContent}>
            <Badge color="gray" mb="md" rightSection={<UkraineFlagSvg className={classes.flagIcon} />} className={classes.badge}>
              Переклад
            </Badge>
            <Image src={props.imageSrc} alt={props.sourceName} width={120} height={180} className={classes.image}/>
          </div>

        </Group>
      </Card>
    </Container>
  )
}
