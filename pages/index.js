import { NextSeo } from "next-seo";
import Image from "next/image";
import dynamic from "next/dynamic";
import { gql } from "graphql-request";
import { graphQLInstance } from "@/lib/graphQLConfig";
import Link from "next/link";
import { getAllArticles } from "@/lib/helpers";
import { useRouter } from "next/router";

const ProjectCard = dynamic(() => import("@/components/ProjectCard"), {
  ssr: true,
});

const BlogCard = dynamic(() => import("@/components/BlogCard"), {
  ssr: true,
});

export default function Home({ allProjects, allArticles }) {
  const Technology = ({ source, alt }) => {
    return (
      <div className="p-4 bg-primary bg-opacity-20 rounded-lg w-50 h-50">
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

  const router = useRouter();

  return (
    <>
      <NextSeo title="Home" />
      {/* HERO SECTION START */}
      <section className="py-8">
        <p className="md:text-lg">Hi, my name is</p>
        <h1 className="font-bold text-2xl md:text-3xl xl:text-4xl">
          Hussaini Usman
          <br />
          I'm a Full Stack Web Developer
        </h1>
        <p className="md:text-lg mt-2 md:mr-40">
          with professional experience in building highly performant web
          applications using modern technologies.
        </p>
        <button
          className="bg-primary py-3 font-semibold px-6 mt-5 rounded-sm"
          onClick={() => router.push(process.env.NEXT_PUBLIC_RESUME_URL)}
        >
          Download my resume
        </button>
      </section>
      {/* HERO SECTION END */}

      {/* PROJECTS SECTION START */}
      <section className="py-6">
        <div className="my-3">
          <h2 className=" font-bold text-2xl xl:text-3xl">
            Professional Experience
          </h2>
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

      {/* BLOGS SECTION START */}
      {allArticles.length > 0 && (
        <section className="py-6 lg:py-12">
          <div className="my-3">
            <h2 className=" font-bold text-2xl xl:text-3xl">Blog</h2>
            <p className=" text-sm md:text-base xl:text-lg">
              Unlock the Potential of Web Development <br />
              Get the Edge You Need!
            </p>
          </div>
          <div className="grid grid-cols-1 gap-2 space-y-3 md:grid-cols-2 md:space-y-0 lg:grid-cols-3 lg:gap-4">
            {allArticles?.slice(0, 3)?.map(post => (
              <BlogCard {...post} key={post?.id} />
            ))}
          </div>

          {allArticles?.length > 3 && (
            <div className="mt-6 text-center">
              <Link
                href={"/blog"}
                className="bg-primary  text-white font-semibold py-3 px-5 rounded-full cursor-pointer hover:underline"
              >
                Read more posts
              </Link>
            </div>
          )}
        </section>
      )}
      {/* BLOGS SECTION END */}
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
  const allArticles = await getAllArticles();
  return {
    props: {
      allProjects: allProjects,
      allArticles: allArticles?.allArticles,
    },
  };
}
