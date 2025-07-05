import { readAllReads } from "../dataReaders/readsReader";
import { articlesPageKey } from "../skovorodaConstants";

export async function getArticlesStaticProps(params) {

  const allReads = readAllReads({excludeContent: true}).filter(read => !read.hidden);
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