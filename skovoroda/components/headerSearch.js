import { createStyles, Header, Autocomplete, Group, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons';
import Link from 'next/link';

const useStyles = createStyles((theme) => ({
  header: {
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
  },

  inner: {
    height: 56,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  links: {
    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
  },

  search: {
    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: "black",
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },
}));

export function HeaderSearch({ links, searchAutocompleteArray }) {
  
  const { classes } = useStyles();

  const linkItems = links.map(link => 
    <Link key={link.label} href={link.link} className={classes.link}>
      {link.label}
    </Link>
  );

  return (
    <Header height={56} className={classes.header}>
      <div className={classes.inner}>
        <Group position='right'>
          <Group ml={50} spacing={5} className={classes.links}>
            {linkItems}
          </Group>
          <Autocomplete
            className={classes.search}
            placeholder="Search"
            icon={<IconSearch size={16} stroke={1.5} />}
            data={searchAutocompleteArray}
          />
        </Group>
      </div>
    </Header>
  );
}