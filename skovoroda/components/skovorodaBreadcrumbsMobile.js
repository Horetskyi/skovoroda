import { Button, createStyles} from "@mantine/core";
import { getBreadcrumbs } from "../lib/getBreadcrumbs";

const useStyles = createStyles((theme) => ({
  breadcrumbLink: {
    textDecoration: "none",
  }
}));

export default function SkovorodaBreadcrumbsMobile(pageProps) {

  const { classes } = useStyles();
  const breadcrumbs = getBreadcrumbs(pageProps);
  if (breadcrumbs.length <= 1) {
    return <></>
  }

  const lastBreadcrumb = breadcrumbs[breadcrumbs.length - 2];

  return <Button
    mt="md"
    mb="md"
    px="md"
    href={lastBreadcrumb.href}
    component="a"
    className={classes.breadcrumbLink}
    variant="light"
  >
    {"< " + lastBreadcrumb.title}
  </Button> 
}