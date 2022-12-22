import { NextSeo } from "next-seo";
import Head from "next/head";
import Image from "next/image";

export default function Home() {
  const Technology = ({ source, alt }) => {
    return (
      <div className="p-4 bg-teal-100 bg-opacity-20 rounded-md w-50 h-50">
        <Image
          src={source}
          alt={alt}
          width="50"
          height="50"
          className="w-full h-full object-contain"
        />
      </div>
    );
  };

  const technologies = [
    { source: "/technologies/reactjs.png", alt: "reactjs" },
    { source: "/technologies/django.png", alt: "django" },
    { source: "/technologies/python.png", alt: "python" },
    { source: "/technologies/tailwindcss.png", alt: "tailwindcss" },
    { source: "/technologies/javascript.png", alt: "javascript" },
    { source: "/technologies/nextjs.png", alt: "nextjs" },
  ];

  return (
    <>
      <NextSeo title="Home - Hussaini Usman" />
      {/* HERO SECTION START */}
      <section className="flex flex-col items-center py-12 lg:py-20">
        <h1 className="font-bold text-3xl md:text-3xl xl:text-4xl">
          Hussaini Usman
        </h1>
        <p className="text-center md:text-xl xl:text-2xl px-6 md:px-28 my-2">
          Full-Stack Web Developer with a Backgroud in React.js, Django,
          TailwindCSS and Next.js
        </p>
        <div className="grid grid-cols-2 py-5 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {technologies.map(technology => (
            <Technology source={technology.source} alt={technology.alt} />
          ))}
        </div>
      </section>
      {/* HERO SECTION END */}
    </>
  );
}
