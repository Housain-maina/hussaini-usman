import Image from "next/image";

const ProjectCard = ({ logo, title, url, shortDescription, projectType }) => {
  return (
    <div className="bg-primary bg-opacity-30 p-8 rounded-lg md:p-10 w-full h-full">
      <div className="h-24 w-24">
        <Image
          src={logo?.url}
          width="150"
          height="150"
          alt={title}
          className="w-full h-full object-contain"
        />
      </div>
      <h3 className="font-bold text-lg mt-3">{title}</h3>
      <p className="text-xs mt-1 italic">{projectType}</p>

      <p className="text-sm mt-3 mb-7">{shortDescription}</p>
      {projectType === "Open Source" ? (
        <a
          href={url}
          target="_blank"
          className="bg-white text-primary font-semibold  py-2 px-7 rounded-full cursor-pointer hover:underline"
        >
          Open Source Code
        </a>
      ) : (
        <a
          href={url}
          target="_blank"
          className="bg-white text-primary font-semibold  py-2 px-7 rounded-full cursor-pointer hover:underline"
        >
          Visit
        </a>
      )}
    </div>
  );
};

export default ProjectCard;
