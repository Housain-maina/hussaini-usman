import { graphQLInstance } from "@/lib/graphQLConfig";
import { gql } from "graphql-request";

export const getArticle = async slug => {
  const articleQuery = gql`
    query {
      article(filter: {slug: {eq: "${slug}"}}) {
        description
        id
        slug
        title
        thumbnail {
          url
          width
          height
          format
        }
        _firstPublishedAt
        _updatedAt
        bodyText(markdown: true)
        tags
      }
    }
  `;
  const article = await graphQLInstance.request(articleQuery);
  return article;
};
export const getAllArticles = async () => {
  const articlesQuery = gql`
    query {
      allArticles(orderBy: _firstPublishedAt_ASC) {
        id
        slug
        title
        _firstPublishedAt
        bodyText
        thumbnail {
          url
          width
          height
          format
        }
      }
    }
  `;
  const articles = await graphQLInstance.request(articlesQuery);
  return articles;
};
