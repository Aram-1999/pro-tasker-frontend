import React from "react";

interface ProjectFormProps {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isEditing: string | undefined;
  error: string | undefined;
}

const ProjectForm = React.memo(function ProjectForm({
  name,
  description,
  setName,
  setDescription,
  handleSubmit,
  isEditing,
  error
}: ProjectFormProps) {
  const button = isEditing ? "Update Project" : "Create Project";
  return (
    <div className="text-white shadow shadow-orange-300 mt-5 w-[80%] min-w-[250px] mx-auto">
      <h2 className="font-semibold text-2xl text-center mt-2">Create a Project</h2>
      <form
        className=" border p-2 mt-2 flex flex-col gap-2 rounded border-none"
        onSubmit={handleSubmit}
      >
        <label htmlFor="project-name">Project Name: </label>
        <input
          type="text"
          name="project-name"
          id="project-name"
          className="border px-2 py-1 hover:bg-zinc-700"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="project-description">Project Description</label>
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          type="text"
          name="project-description"
          id="project-description"
          className="border px-2 py-1 hover:bg-zinc-700"
        />
        <button type="submit" className="mt-5 mb-2 bg-sky-500 rounded py-1 hover:bg-sky-600">
          {button}
        </button>
        {error && <div className='text-sm text-red-500'>{error}</div>}
      </form>
    </div>
  );
});

export default ProjectForm;
