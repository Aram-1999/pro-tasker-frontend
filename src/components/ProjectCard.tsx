import React from "react";
import { Link } from "react-router-dom";
import type { Project } from "../types/types";

interface ProjectCardProps {
  project: Project;
  setIsEditing: React.Dispatch<React.SetStateAction<string | undefined>>;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  handleDelete: (id: string | undefined) => void;
}

const ProjectCard = React.memo(function ProjectCard({
  project,
  setIsEditing,
  setName,
  setDescription,
  handleDelete,
}: ProjectCardProps) {
  return (
    <div className="text-white w-50 h-50 flex flex-col border border-orang-700 bg-zinc-700 p-2 text-center rounded">
      <div className="flex justify-end gap-2 mb-3">
        <button
          className="hover:bg-slate-700 p-1 px-2"
          onClick={() => {
            if (project._id) {
              setIsEditing(project._id);
              setName(project.name);
              setDescription(project.description);
            }
          }}
        >
          ✎
        </button>

        <button
          className="hover:bg-red-800 p-1"
          onClick={() => handleDelete(project._id)}
        >
          ✖
        </button>
      </div>

      <div className="font-semibold text-lg">{project.name}</div>
      <div>{project.description.split(" ").slice(0, 5).join(" ")}...</div>

      <Link
        to={`/projects/${project._id}`}
        className="mt-auto bg-sky-500 rounded hover:bg-sky-600"
      >
        See Project
      </Link>
    </div>
  );
});

export default ProjectCard;
