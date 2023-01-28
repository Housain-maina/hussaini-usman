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
        content {
          value
          blocks {
            __typename
            ...on ImageRecord {
              id
              image {
                responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 300, h: 300, auto: format }) {
                  alt
                  aspectRatio
                  base64
                  bgColor
                  height
                  sizes
                  src
                  srcSet
                  title
                  webpSrcSet
                  width
                  __typename
                }
              }
            }
          }
        }
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
