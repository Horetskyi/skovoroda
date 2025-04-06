import { Box, Container } from '@mantine/core';
import { articlesPageKey } from '../../lib/skovorodaConstants';
import SkH1Desktop from '../../components/shared/skH1Desktop';
import { readAllReads } from '../../lib/dataReaders/readsReader';
import SkTextLink from '../../components/shared/skTextLink';
import { pathJoin, SkovorodaReadsPath } from '../../lib/skovorodaPath';

export default function ArticlesDesktop({ articles }) {

  return <>
    <SkH1Desktop text="Статті про Григорія Сковороду" />
    <Container>
      {articles.map(article => {
        return <Box key={article.urlId}>
          <SkTextLink text={article.title} href={pathJoin(SkovorodaReadsPath, article.urlId)} />
        </Box>
      })}
    </Container>
  </>
}

export async function getStaticProps(params) {

  const allReads = readAllReads({excludeContent: true});
  const articles = allReads.filter(read => read.type === "article");
  return {
    props: {
      pageKey: articlesPageKey,
      metadataTitle: "Статті про Григорія Сковороду",
      metadataDescription: "Статті в яких досліджується життя і творчість Григорія Сковороди",
      articles: articles,
    },
  };
}