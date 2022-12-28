import { NextSeo } from "next-seo";
import Image from "next/image";
import reactjs from "../public/technologies/reactjs.png";
import django from "../public/technologies/django.png";
import python from "../public/technologies/python.png";
import tailwindcss from "../public/technologies/tailwindcss.png";
import javascript from "../public/technologies/javascript.png";
import nextjs from "../public/technologies/nextjs.png";
import dynamic from "next/dynamic";
import { gql } from "graphql-request";
import { graphQLInstance } from "@/lib/graphQLConfig";
import Link from "next/link";

const ProjectCard = dynamic(() => import("@/components/ProjectCard"), {
  ssr: true,
});

export default function Home({ allProjects }) {
  return (
    <>
      <NextSeo title="Home" />
      {/* HERO SECTION START */}
      <section className="flex flex-col items-center py-12">
        <h1 className="font-bold text-3xl xl:text-4xl">Hussaini Usman</h1>
        <p className="text-center md:text-xl xl:text-2xl px-6 md:px-28 my-2">
          Full-Stack Web Developer with a Background in React.js, Django,
          TailwindCSS and Next.js
        </p>
        <div className="grid grid-cols-2 py-5 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="p-4 bg-primary bg-opacity-20 rounded-lg w-50 h-50">
            <Image
              src={reactjs}
              alt={"reactjs"}
              width="50"
              height="50"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="p-4 bg-primary bg-opacity-20 rounded-lg w-50 h-50">
            <Image
              src={django}
              alt={"django"}
              width="50"
              height="50"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="p-4 bg-primary bg-opacity-20 rounded-lg w-50 h-50">
            <Image
              src={python}
              alt={"python"}
              width="50"
              height="50"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="p-4 bg-primary bg-opacity-20 rounded-lg w-50 h-50">
            <Image
              src={tailwindcss}
              alt={"tailwindcss"}
              width="50"
              height="50"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="p-4 bg-primary bg-opacity-20 rounded-lg w-50 h-50">
            <Image
              src={javascript}
              alt={"javascript"}
              width="50"
              height="50"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="p-4 bg-primary bg-opacity-20 rounded-lg w-50 h-50">
            <Image
              src={nextjs}
              alt={"nextjs"}
              width="50"
              height="50"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </section>
      {/* HERO SECTION END */}

      {/* PROJECTS SECTION START */}
      <section className="py-6">
        <div className="my-3">
          <h2 className=" font-bold text-2xl xl:text-3xl">Projects</h2>
          <p className=" text-sm md:text-base xl:text-lg">
            Interesting things I've built
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-2">
          {allProjects?.allProjects.slice(0, 2)?.map(project => (
            <ProjectCard {...project} key={project?.id} />
          ))}
        </div>

        {allProjects?.allProjects.length > 2 && (
          <div className="mt-6 text-center">
            <Link
              href={"/projects"}
              className="bg-primary  text-white font-semibold py-3 px-5 rounded-full cursor-pointer hover:underline"
            >
              View More Projects
            </Link>
          </div>
        )}
      </section>
      {/* PROJECTS SECTION END */}
    </>
  );
}

const projectsQuery = gql`
  query {
    allProjects {
      url
      title
      slug
      shortDescription
      id
      logo {
        url
      }
    }
  }
`;

export async function getStaticProps() {
  const allProjects = await graphQLInstance.request(projectsQuery);
  return {
    props: {
      allProjects: allProjects,
    },
  };
}
