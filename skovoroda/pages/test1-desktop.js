import Link from 'next/link'
import { Card, Image, Text, Group, Button, createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    width: "600px"
  },

  section: {
    borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]}`,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },

}));

export function BadgeCard({ image, title, description }) {
  const { classes } = useStyles();

  return (
    <Card withBorder radius="md" p="md" className={classes.card}>
      <Card.Section>
        <Image src={image} alt={title} height={180} />
      </Card.Section>

      <Card.Section className={classes.section} mt="md">
        <Group position="apart">
          <Text size="lg" weight={500}>
            {title}
          </Text>
        </Group>
        <Text size="sm" mt="xs">
          {description}
        </Text>
      </Card.Section>

      <Group mt="xs">
        <Button radius="md" style={{ flex: 1 }}>
          Download
        </Button>
      </Group>
    </Card>
  );
}

export default function Test1() {
  
  const props = {
    image: "/[9] Твори у двох томах. Том 1 - 1994.jpg",
    title: "Shos",
    description: "Description fdsalkfjlk dsajkf jdsaklf j;lkdsa fjdsa;lk fj;kdsal fj;lkdsa fj;dsa fj;dsa fj;ldsa"
  };
  
  return (
    <div>
      <Link href="/test2">Link to page 2</Link>
      <p>
        Desktop test 1 content
      </p>
      <BadgeCard {...props}/>
    </div>
  )
}
