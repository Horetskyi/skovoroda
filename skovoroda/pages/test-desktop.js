import { testPageKey } from '../lib/skovorodaConstants';
import { getSchemaByPageKey } from '../components/schema/skSchemaFacade';

export default function SkTestPageDesktop({ }) {
  return <>
    <iframe src='/iframes/article.html' frameborder="0" width={"100vw"} height={"100vh"}></iframe>
  </>
}

export async function getStaticProps({ params }) {
  return {
    props: {
      pageKey: testPageKey,
      schemaOrg: getSchemaByPageKey(testPageKey),
    },
  };
}