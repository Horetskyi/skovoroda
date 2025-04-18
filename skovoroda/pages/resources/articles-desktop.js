import { Box, Container } from '@mantine/core';
import SkH1Desktop from '../../components/shared/skH1Desktop';
import SkTextLink from '../../components/shared/skTextLink';
import { pathJoin, SkovorodaReadsPath } from '../../lib/skovorodaPath';
import { getArticlesStaticProps } from '../../lib/staticProps/articlesStatic';

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
  return getArticlesStaticProps(params);
}