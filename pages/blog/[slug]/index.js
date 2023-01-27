import { getAllArticles, getArticle } from "@/lib/helpers";
import { format } from "date-fns";
import { NextSeo } from "next-seo";
import Image from "next/image";
import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import {
  StructuredText,
  Image as DatoImage,
  renderNodeRule,
} from "react-datocms";
import { isHeading, isCode, isParagraph } from "datocms-structured-text-utils";
import { ClockFill } from "react-bootstrap-icons";

const Blog = ({ post }) => {
  return (
    <>
      <NextSeo
        title={post?.title}
        description={post?.description}
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

      <section className="py-6 max-w-3xl mx-auto">
        <h1 className="mb-2 font-bold text-2xl md:text-3xl lg:text-4xl leading-8">
          {post?.title}
        </h1>
        <p className="mb-3 text-gray-300 text-lg lg:text-xl font-semibold">
          {post?.description}
        </p>

        {post?._firstPublishedAt && (
          <time className="font-semibold text-gray-400 text-lg lg:text-xl flex flex-row items-center">
            <ClockFill className="inline-block mr-2" />
            {format(new Date(post?._firstPublishedAt), "MMM dd, yyyy")}
          </time>
        )}

        <Image
          src={post?.thumbnail?.url}
          alt={`${post?.title} ${post?.description}`}
          width="1920"
          height="1080"
          placeholder="blur"
          blurDataURL={post?.thumbnail?.url}
          className="my-4"
        />
        <div className="flex flex-row space-x-2 lg:space-x-5 mb-5 flex-wrap">
          {post?.tags?.map((tag, index) => (
            <span
              key={index}
              className="lg:text-lg font-semibold bg-primary rounded-full px-3 py-1 m-1"
            >
              {tag}
            </span>
          ))}
        </div>

        <StructuredText
          data={post?.content}
          customNodeRules={[
            // Add HTML anchors to heading levels for in-page navigation
            renderNodeRule(isHeading, ({ node, children, key }) => {
              switch (node.level) {
                case 1:
                  return (
                    <h2 className="font-bold text-2xl md:text-3xl lg:text-4xl mb-2 md:mb-3 lg:mb-4">
                      {children}
                    </h2>
                  );
                case 2:
                  return (
                    <h2 className="font-bold text-2xl md:text-3xl lg:text-4xl mb-2 md:mb-3 lg:mb-4">
                      {children}
                    </h2>
                  );
                case 3:
                  return (
                    <h3 className="font-bold text-xl md:text-2xl lg:text-3xl mb-2 md:mb-3 lg:mb-4">
                      {children}
                    </h3>
                  );
                case 4:
                  return (
                    <h4 className="font-bold text-lg md:text-xl lg:text-2xl mb-2 md:mb-3 lg:mb-4">
                      {children}
                    </h4>
                  );
                case 5:
                  return (
                    <h4 className="font-bold text-base md:text-lg lg:text-xl mb-2 md:mb-3 lg:mb-4">
                      {children}
                    </h4>
                  );
              }
            }),

            // Use a custom syntax highlighter component for code blocks
            renderNodeRule(isCode, ({ node, key }) => {
              return (
                <SyntaxHighlighter
                  key={key}
                  code={node.code}
                  language={node.language}
                  linesToBeHighlighted={node.highlight}
                  style={coldarkDark}
                  showLineNumbers
                />
              );
            }),

            // Apply different formatting to top-level paragraphs
            renderNodeRule(
              isParagraph,
              ({ adapter: { renderNode }, node, children, key, ancestors }) => {
                return renderNode(
                  "p",
                  {
                    key,
                    className: "mb-8 md:text-lg lg:text-xl [&>a]:text-primary",
                  },
                  children
                );
              }
            ),
          ]}
          renderBlock={({ record }) => {
            if (record.__typename === "ImageRecord") {
              return (
                <DatoImage
                  data={record.image.responsiveImage}
                  className="mx-auto my-5"
                />
              );
            }

            return (
              <>
                <p>Don't know how to render a block!</p>
                <pre>{JSON.stringify(record, null, 2)}</pre>
              </>
            );
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
  const paths = [];
  const allArticles = await getAllArticles();
  allArticles?.allArticles?.forEach(post =>
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
