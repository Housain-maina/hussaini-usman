import { NextSeo } from "next-seo";
import Image from "next/image";
import reactjs from "../public/technologies/reactjs.png";
import django from "../public/technologies/django.png";
import python from "../public/technologies/python.png";
import tailwindcss from "../public/technologies/tailwindcss.png";
import javascript from "../public/technologies/javascript.png";
import nextjs from "../public/technologies/nextjs.png";

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
          <Technology source={reactjs} alt="reactjs" />
          <Technology source={django} alt="django" />
          <Technology source={python} alt="python" />
          <Technology source={tailwindcss} alt="tailwindcss" />
          <Technology source={javascript} alt="javascript" />
          <Technology source={nextjs} alt="nextjs" />
        </div>
      </section>
      {/* HERO SECTION END */}
    </>
  );
}
