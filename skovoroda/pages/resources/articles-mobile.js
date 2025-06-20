import { Box, Container, Group, Text } from '@mantine/core';
import SkTextLink from '../../components/shared/skTextLink';
import { pathJoin, SkovorodaReadsPath } from '../../lib/skovorodaPath';
import { getArticlesStaticProps } from '../../lib/staticProps/articlesStatic';
import SkH1Mobile from '../../components/shared/skH1Mobile';

export default function ArticlesMobile({ articles }) {

  return <>
    <SkH1Mobile text="Статті про Григорія Сковороду" />
    <Container>
      {articles.map(article => {
        const isAuthorShortNameExists = article.author && article.author.shortName;
        const isPagesCountExists = article.pagesCount;
        const linkTitle = `Стаття ${article.title} - читати, завантажити`
        return <Box key={article.urlId}>
          <Group gap={'xs'}>
            <SkTextLink 
              text={article.title} 
              href={pathJoin(SkovorodaReadsPath, article.urlId)}
              title={linkTitle} />
            {isAuthorShortNameExists ? <Text> - {article.author.shortName}</Text> : null}
            {isPagesCountExists ? <Text> - {article.pagesCount} с.</Text> : null}
          </Group>
        </Box>
      })}
    </Container>
  </>
}

export async function getStaticProps(params) {
  return getArticlesStaticProps(params);
}