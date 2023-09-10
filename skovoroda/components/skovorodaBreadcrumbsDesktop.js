import { Anchor, Breadcrumbs, Text, createStyles } from "@mantine/core";
import { getBreadcrumbs } from "../lib/getBreadcrumbs";

const useStyles = createStyles((theme) => ({
  breadcrumbs: {
    flexWrap: "wrap",
    gap: theme.spacing.sm,

    "div": {
      margin: 0,
    },
    
  },
  breadcrumbLink: {
    textDecoration: "none",
  },
  breadcrumbLinkInactive: {
    
  },
}));

export default function SkovorodaBreadcrumbsDesktop(pageProps) {

  const { classes } = useStyles();
  const breadcrumbs = getBreadcrumbs(pageProps);
  const breadcrumbsElements = breadcrumbs.map(item => {
    
    if (item.isInactive) {
      return <Text
        key={item.href}
        color="gray.6"
      >
        {item.title}
      </Text>
    }

    return <Anchor 
      key={item.href}
      href={item.href}
      title={item.title}
      className={classes.breadcrumbLink} 
    >
      {item.title}
    </Anchor> 
  });

  return <Breadcrumbs separator=">" ml="md" mt="md" mb="md" className={classes.breadcrumbs}>{breadcrumbsElements}</Breadcrumbs>
}