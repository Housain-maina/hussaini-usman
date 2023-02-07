import { graphQLInstance } from "@/lib/graphQLConfig";
import { gql } from "graphql-request";
import { NextSeo } from "next-seo";
import dynamic from "next/dynamic";
import React from "react";

const ProjectCard = dynamic(() => import("@/components/ProjectCard"), {
  ssr: true,
});

const Projects = ({ allProjects }) => {
  return (
    <>
      <NextSeo
        title="Projects"
        description="Powerful Projects. Proven Results. Web Development Solutions for Every Need."
      />
      <section className="rounded-lg flex flex-col items-center justify-center py-14 my-4 bg-primary bg-opacity-30 lg:px-28 px-8">
        <h1 className="font-bold text-3xl md:text-5xl">Projects</h1>
        <p className="font-semibold text-lg md:text-xl mt-2 text-center">
          Powerful Projects. Proven Results. Web Development Solutions for Every
          Need.
        </p>
      </section>
      <section className="py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-2">
          {allProjects?.allProjects?.map(project => (
            <ProjectCard {...project} key={project?.id} />
          ))}
        </div>
      </section>
    </>
  );
};

export default Projects;

const projectsQuery = gql`
  query {
    allProjects {
      url
      title
      projectType
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
