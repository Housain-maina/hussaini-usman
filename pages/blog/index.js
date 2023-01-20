import { getAllArticles } from "@/lib/helpers";
import { NextSeo } from "next-seo";
import dynamic from "next/dynamic";
import Image from "next/image";
import React from "react";

const BlogCard = dynamic(() => import("@/components/BlogCard"), {
  ssr: true,
});

const Blog = ({ allArticles }) => {
  return (
    <>
      <NextSeo
        title="Blog"
        description="Unlock the Potential of Web Development - Get the Edge You Need!"
        locale="en"
        canonical={`${process.env.NEXT_PUBLIC_SITE_URL}/blog`}
        openGraph={{
          title: "Blog",
          description:
            "Unlock the Potential of Web Development - Get the Edge You Need!",
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog`,
          images: allArticles?.map(post => {
            return {
              url: post?.thumbnail?.url,
              width: post?.thumbnail?.width,
              height: post?.thumbnail?.height,
              type: post?.thumbnail?.format,
              alt: `${post?.title}`,
            };
          }),
          type: "website",
        }}
      />
      <section className="rounded-lg flex flex-col items-center justify-center my-4 py-14 bg-primary bg-opacity-30 lg:px-24 px-8">
        <h1 className="font-bold text-3xl md:text-5xl">Blog</h1>
        <p className="font-semibold text-lg md:text-xl mt-2 text-center">
          Unlock the Potential of Web Development - Get the Edge You Need!
        </p>
      </section>
      <section className="my-4">
        <div className="grid grid-cols-1 gap-2 space-y-3 md:grid-cols-2 md:space-y-0 lg:grid-cols-3 lg:gap-4">
          {allArticles?.slice(0, 3)?.map(post => (
            <BlogCard {...post} key={post?.id} />
          ))}
        </div>
      </section>
    </>
  );
};

export default Blog;

export async function getStaticProps() {
  const allArticles = await getAllArticles();
  return {
    props: {
      allArticles: allArticles?.allArticles,
    },
  };
}
