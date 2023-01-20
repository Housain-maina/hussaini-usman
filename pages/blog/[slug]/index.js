import { graphQLInstance } from "@/lib/graphQLConfig";
import { getArticle } from "@/lib/helpers";
import { format } from "date-fns";
import { gql } from "graphql-request";
import { NextSeo } from "next-seo";
import Image from "next/image";
import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

const Blog = ({ post }) => {
  return (
    <>
      <NextSeo
        title={post?.title}
        description={post?.deescription}
        locale="en"
        canonical={`${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post?.slug}`}
        openGraph={{
          title: post?.title,
          description: post?.description,
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post?.slug}`,
          images: [
            {
              url: post?.thumbnail?.url,
              width: post?.thumbnail?.width,
              height: post?.thumbnail?.height,
              type: post?.thumbnail?.format,
              alt: `${post?.title} ${post?.description}`,
            },
          ],
          type: "article",
          article: {
            publishedTime: post?._firstPublishedAt,
            modifiedTime: post?._updatedAt,
            tags: post?.tags,
          },
        }}
        additionalMetaTags={[
          {
            property: "twitter:label1",
            content: "Written by",
          },
          {
            property: "twitter:data1",
            content: "Hussaini Usman",
          },
        ]}
      />

      <section className="py-6">
        <h1 className="my-2 font-bold text-3xl md:text-4xl lg:text-5xl">
          {post?.title}
        </h1>
        <p className="mb-3 text-gray-300 text-lg lg:text-xl font-semibold">
          {post?.description}
        </p>
        <div className="flex flex-col">
          <time className="font-semibold text-gray-400">
            Published at:{" "}
            {format(new Date(post?._firstPublishedAt), "MMM dd, yyyy")}
          </time>
          <time className="font-semibold text-gray-400 mt-1">
            Last modified at:{" "}
            {format(new Date(post?._updatedAt), "MMM dd, yyyy")}
          </time>
        </div>
        <Image
          src={post?.thumbnail?.url}
          alt={`${post?.title} ${post?.description}`}
          width="1920"
          height="1080"
          placeholder="blur"
          blurDataURL={post?.thumbnail?.url}
          className="my-4"
        />
        <div className="flex flex-row space-x-5 mb-5">
          {post?.tags?.map((tag, index) => (
            <span key={index} className="text-lg font-semibold">
              #{tag}
            </span>
          ))}
        </div>
        <ReactMarkdown
          rehypePlugins={[rehypeRaw]}
          children={post?.bodyText}
          components={{
            p: ({ node, ...props }) => <p className="lg:text-lg" {...props} />,
            h1: ({ node, ...props }) => (
              <h2
                className="font-semibold text-2xl md:text-3xl lg:text-4xl"
                {...props}
              />
            ),
            h2: ({ node, ...props }) => (
              <h2
                className="font-semibold text-2xl md:text-3xl lg:text-4xl"
                {...props}
              />
            ),
            h3: ({ node, ...props }) => (
              <h3
                className="font-semibold text-xl md:text-2xl lg:text-3xl"
                {...props}
              />
            ),
            h4: ({ node, ...props }) => (
              <h4
                className="font-semibold text-lg md:text-xl lg:text-2xl"
                {...props}
              />
            ),
            h5: ({ node, ...props }) => (
              <h5 className="font-semibold md:text-lg lg:text-xl" {...props} />
            ),
            h6: ({ node, ...props }) => (
              <h6 className="font-semibold md:text-lg" {...props} />
            ),
            code: ({ node, ...props }) => (
              <SyntaxHighlighter
                style={coldarkDark}
                showLineNumbers
                language={"python"}
                {...props}
              />
            ),
            img: ({ src }) => (
              <Image
                placeholder="blur"
                blurDataURL={src}
                src={src}
                width={1920}
                height={1080}
                className="my-3 object-contain object-center"
              />
            ),
          }}
        />
      </section>
    </>
  );
};

export default Blog;

export async function getStaticProps({ params }) {
  const article = await getArticle(params?.slug);

  return {
    props: {
      post: article?.article,
    },
  };
}

export async function getStaticPaths() {
  const projectsQuery = gql`
    query {
      allProjects {
        slug
      }
    }
  `;
  const paths = [];
  const allProjects = await graphQLInstance.request(projectsQuery);
  allProjects?.allProjects?.forEach(post =>
    paths.push({
      params: {
        slug: post?.slug,
      },
    })
  );
  return {
    paths,
    fallback: true,
  };
}
