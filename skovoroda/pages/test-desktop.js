import { createStyles } from '@mantine/core';
import { testPageKey } from '../lib/skovorodaConstants';

const useStyles = createStyles((theme) => ({
 
}));

export default function SkTestPageDesktop({ }) {
  
  const { classes } = useStyles();
  return <>
    <iframe src='/iframes/article.html' frameborder="0" width={"100vw"} height={"100vh"}></iframe>
  </>
}

export async function getStaticProps({ params }) {

  return {
    props: {
      pageKey: testPageKey,
    },
  };
}