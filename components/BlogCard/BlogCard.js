import { format, parseISO } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Clock } from "react-bootstrap-icons";

const BlogCard = ({ title, slug, thumbnail, _firstPublishedAt, bodyText }) => {
  return (
    <Link href={`/blog/${slug}`}>
      <article className="h-full w-full flex flex-col group">
        <div className="w-full h-full">
          <Image
            src={thumbnail?.url}
            width="1920"
            height="1080"
            className="w-full h-full object-cover object-center rounded-lg"
            placeholder="blur"
            blurDataURL={thumbnail?.url}
            alt={title}
          />
        </div>
        <div className="p-2">
          <h3 className="font-semibold mt-2 text-lg lg:text-xl">{title}</h3>
          <time className="flex flex-row items-center font-semibold text-gray-400">
            <span className="mr-2">
              <Clock />
            </span>
            {format(new Date(_firstPublishedAt), "MMM dd, yyyy")}
          </time>
        </div>
      </article>
    </Link>
  );
};

export default BlogCard;
