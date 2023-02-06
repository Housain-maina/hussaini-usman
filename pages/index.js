import { NextSeo } from "next-seo";
import dynamic from "next/dynamic";
import { gql } from "graphql-request";
import { graphQLInstance } from "@/lib/graphQLConfig";
import Link from "next/link";
import { getAllArticles } from "@/lib/helpers";
import { useRouter } from "next/router";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { BriefcaseFill } from "react-bootstrap-icons";
import { format } from "date-fns";
import { StructuredText } from "react-datocms";

const ProjectCard = dynamic(() => import("@/components/ProjectCard"), {
  ssr: true,
});

const BlogCard = dynamic(() => import("@/components/BlogCard"), {
  ssr: true,
});

export default function Home({ allProjects, allArticles, allExperiences }) {
  const router = useRouter();

  return (
    <>
      <NextSeo title="Home" />
      {/* HERO SECTION START */}
      <section className="py-16 flex flex-col items-center px-2 md:px-28">
        <p className="md:text-lg text-center">Hi, my name is</p>
        <h1 className="font-bold text-2xl md:text-3xl xl:text-4xl text-center">
          Hussaini Usman
          <br />
          I'm a Full Stack Web Developer
        </h1>
        <p className="md:text-lg mt-2 text-center">
          with professional experience in building highly performant web
          applications using modern technologies
        </p>
        <button
          className="bg-primary py-3 text-lg font-semibold px-6 mt-5 rounded-sm hover:bg-opacity-90"
          onClick={() => router.push(process.env.NEXT_PUBLIC_RESUME_URL)}
        >
          Download Resume
        </button>
      </section>
      {/* HERO SECTION END */}

      {/* EXPERIENCE SECTION START */}
      <section className="py-8 md:py-12 lg:py-16 flex flex-col items-center">
        <h2 className=" font-bold text-2xl xl:text-3xl">
          Professional Experience
        </h2>
        <p className=" text-sm md:text-base xl:text-lg mb-7">
          My experience over the years
        </p>
        <VerticalTimeline>
          {allExperiences?.map(experience => (
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              contentStyle={{ background: "#0096C7", color: "#fff" }}
              contentArrowStyle={{ borderRight: "7px solid  #0096C7" }}
              date={`${format(new Date(experience?.from), "MMMM yyyy")} - ${
                experience?.to
                  ? format(new Date(experience?.to), "MMMM yyyy")
                  : "Present"
              }`}
              iconStyle={{ background: "#0096C7", color: "#fff" }}
              icon={<BriefcaseFill />}
            >
              <h3 className="font-bold text-lg lg:text-xl">
                {experience?.jobTitle}
              </h3>
              <h4>{experience?.companyName}</h4>
              <StructuredText data={experience?.description} />
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      </section>
      {/* EXPERIENCE SECTION END */}

      {/* PROJECTS SECTION START */}
      <section className="py-8 md:py-12 lg:py-16 flex flex-col items-center">
        <div className="my-3">
          <h2 className=" font-bold text-2xl xl:text-3xl text-center">
            Projects
          </h2>
          <p className=" text-sm md:text-base xl:text-lg text-center">
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
        <section className="py-8 md:py-12 lg:py-16 flex flex-col items-center">
          <div className="my-3">
            <h2 className=" font-bold text-2xl xl:text-3xl text-center">
              Blog
            </h2>
            <p className=" text-sm md:text-base xl:text-lg text-center">
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

const experiencesQuery = gql`
  query {
    allExperiences {
      description {
        blocks
        value
      }
      from
      id
      jobTitle
      to
      companyName
    }
  }
`;

export async function getStaticProps() {
  const allProjects = await graphQLInstance.request(projectsQuery);
  const allExperiences = await graphQLInstance.request(experiencesQuery);
  const allArticles = await getAllArticles();
  return {
    props: {
      allProjects: allProjects,
      allArticles: allArticles?.allArticles,
      allExperiences: allExperiences?.allExperiences,
    },
  };
}
