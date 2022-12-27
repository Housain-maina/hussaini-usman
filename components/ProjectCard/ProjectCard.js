import Image from "next/image";
import Link from "next/link";
import { BoxArrowInUpRight } from "react-bootstrap-icons";

const ProjectCard = ({ logo, slug, title, url, shortDescription }) => {
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
      <a href={url} className="italic text-xs  flex flex-row items-center">
        {url}{" "}
        <span className="ml-2">
          <BoxArrowInUpRight />
        </span>
      </a>

      <p className="text-sm mt-3 mb-7">{shortDescription}</p>
      <div className="flex flex-row space-x-6 items-center">
        <Link
          href={`/projects/${slug}`}
          className="bg-white text-primary font-semibold py-3 px-5 rounded-full cursor-pointer hover:underline"
        >
          Read More
        </Link>
        <a
          href={url}
          target="_blank"
          className="text-white  font-semibold cursor-pointer underline flex flex-row items-center"
        >
          Visit{" "}
          <span className="ml-2">
            <BoxArrowInUpRight />
          </span>
        </a>
      </div>
    </div>
  );
};

export default ProjectCard;
