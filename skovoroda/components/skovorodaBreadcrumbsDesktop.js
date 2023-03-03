import { Breadcrumbs, Button, createStyles } from "@mantine/core";
import { getBreadcrumbs } from "../lib/getBreadcrumbs";

const useStyles = createStyles((theme) => ({
  breadcrumbs: {
    flexWrap: "wrap",
    gap: theme.spacing.sm,

    "div": {
      margin: 0,
    }
  },
  breadcrumbLink: {
    textDecoration: "none",
  }
}));

export default function SkovorodaBreadcrumbsDesktop(pageProps) {

  const { classes } = useStyles();
  const breadcrumbs = getBreadcrumbs(pageProps);
  const breadcrumbsElements = breadcrumbs.map((item, index) => (
    <Button 
      href={item.href}
      component="a"
      key={index}
      className={classes.breadcrumbLink}
      variant="light"
    >
      {item.title}
    </Button> 
  ));

  return <Breadcrumbs separator=">" mt="xl" mb="xl" className={classes.breadcrumbs}>{breadcrumbsElements}</Breadcrumbs>
}