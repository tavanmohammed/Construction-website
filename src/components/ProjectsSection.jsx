import { Link } from "react-router-dom";
import { projects } from "../data/siteData";

export default function ProjectsSection() {
  return (
    <section id="projects" className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 lg:py-20">
        <h2 className="text-4xl font-extrabold tracking-tight text-black">
          Recent Projects
        </h2>

        <p className="mt-6 text-[15px] leading-7 text-neutral-700">
          A few examples of what we’ve built and renovated.
        </p>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }) {
  return (
    <Link
      to="/projects"
      className="group block overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition hover:shadow-md"
    >
      {/* IMAGE */}
      <div className="h-40 w-full overflow-hidden bg-neutral-100">
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* CONTENT */}
      <div className="p-6">
        <div className="text-sm font-semibold text-neutral-600">
          {project.tag}
        </div>

        <h3 className="mt-3 text-xl font-extrabold text-black">
          {project.title}
        </h3>

        {project.description ? (
          <p className="mt-3 text-sm leading-6 text-neutral-700 line-clamp-2">
            {project.description}
          </p>
        ) : null}

        <div className="mt-5 text-sm font-semibold text-black">
          View Projects →
        </div>
      </div>
    </Link>
  );
}
