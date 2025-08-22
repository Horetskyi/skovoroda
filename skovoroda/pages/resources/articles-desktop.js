import { Box, Container, Group, Text } from '@mantine/core';
import SkH1Desktop from '../../components/shared/skH1Desktop';
import SkTextLink from '../../components/shared/skTextLink';
import { pathJoin, SkovorodaReadsPath } from '../../lib/skovorodaPath';
import { getArticlesStaticProps } from '../../lib/staticProps/articlesStatic';

export default function ArticlesDesktop({ articles }) {

  return <>
    <SkH1Desktop text="Статті про Григорія Сковороду" withBlueImage={true} />
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