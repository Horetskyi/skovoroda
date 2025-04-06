import { Box, Container } from '@mantine/core';
import SkTextLink from '../../components/shared/skTextLink';
import { pathJoin, SkovorodaReadsPath } from '../../lib/skovorodaPath';
import { getArticlesStaticProps } from '../../lib/staticProps/articlesStatic';
import SkH1Mobile from '../../components/shared/skH1Mobile';

export default function ArticlesMobile({ articles }) {

  return <>
    <SkH1Mobile text="Статті про Григорія Сковороду" />
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
  return getArticlesStaticProps(params);
}