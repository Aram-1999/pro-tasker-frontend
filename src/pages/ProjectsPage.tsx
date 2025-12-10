import React, { useCallback, useEffect, useState } from "react";
import { apiClient } from "../clients/api";
import type { Project } from "../types/types";
import { AxiosError } from "axios";
import ProjectForm from "../components/ProjectForm";
import ProjectCard from "../components/ProjectCard";

function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState<string | undefined>();
  const [displayLoading, setDisplayLoading] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await apiClient.get("/api/projects");
        setProjects(res.data);
      } catch (error) {
        if (error instanceof AxiosError) {
          setError(error?.response?.data?.message);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    let timeoutId: number | undefined;
    if (loading) {
      timeoutId = setTimeout(() => setDisplayLoading(true), 1000);
    } else {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      setDisplayLoading(false);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [loading]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");
      if (isEditing) {
        const res = await apiClient.put(`api/projects/${isEditing}`, {
          name,
          description,
        });
        setProjects((prev) =>
          prev.map((project) => {
            if (project._id === isEditing) {
              return res.data;
            } else {
              return project;
            }
          })
        );
        setIsEditing(undefined);
      } else {
        const res = await apiClient.post("/api/projects", {
          name,
          description,
        });
        setProjects((prev) => [...prev, res.data]);
      }
      setName("");
      setDescription("");
    } catch (error) {
      if (error instanceof AxiosError) {
        setError("The fields can not be empty!");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = useCallback(async (id: string | undefined) => {
    try {
      if (!id) {
        return;
      }
      await apiClient.delete(`/api/projects/${id}`);
      setProjects((prev) => prev.filter((project) => project._id !== id));
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error?.response?.data?.message);
      }
    }
  }, []);

  return (
    <div className="text-white">
      <ProjectForm
        description={description}
        handleSubmit={handleSubmit}
        name={name}
        setDescription={setDescription}
        setName={setName}
        isEditing={isEditing}
        error={error}
      />

      <h1 className="text-4xl font-bold my-5 text-center">Projects</h1>
      {displayLoading ? (
        <div className="text-3xl text-white">Loading...</div>
      ) : (
        <div className="w-full flex gap-5 mt-10 flex-wrap justify-center">
          {projects.map((project) => (
            <ProjectCard
              handleDelete={handleDelete}
              project={project}
              setDescription={setDescription}
              setIsEditing={setIsEditing}
              setName={setName}
              key={project._id}
            />
          ))}
        </div>
      )}
    </div>
  );
}
export default ProjectsPage;
