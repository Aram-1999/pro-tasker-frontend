import { useCallback, useEffect, useState } from "react";
import { apiClient } from "../clients/api";
import { useParams } from "react-router-dom";
import type { Status, Project, Task } from "../types/types";
import TaskForm from "../components/TaskForm";
import { AxiosError } from "axios";
import TaskCard from "../components/TaskCard";

function ProjectDetailsPage() {
  const { projectId } = useParams();
  const [project, setProject] = useState<Project>();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState<string | undefined>();
  const [displayLoading, setDisplayLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<Status>("To Do");

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await apiClient.get(`/api/projects/${projectId}`);
        setProject(res.data);
      } catch (error) {
        if (error instanceof AxiosError) {
          setError(error?.response?.data?.message);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [projectId]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await apiClient.get(`/api/projects/${projectId}/tasks`);
        setTasks(res.data);
      } catch (error) {
        if (error instanceof AxiosError) {
          setError(error?.response?.data?.message);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, [projectId]);

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
        const res = await apiClient.put(`/api/tasks/${isEditing}`, {
          title,
          description,
          status,
        });
        setTasks((prev) =>
          prev.map((task) => {
            if (task._id === isEditing) {
              return res.data;
            } else {
              return task;
            }
          })
        );
        setIsEditing(undefined);
      } else {
        const res = await apiClient.post(`/api/projects/${projectId}/tasks`, {
          title,
          description,
          status,
        });
        setTasks((prev) => [...prev, res.data]);
      }
      setTitle("");
      setDescription("");
      setStatus("To Do");
    } catch (error) {
      console.log(error);
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
      await apiClient.delete(`/api/tasks/${id}`);
      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error?.response?.data?.message);
      }
    }
  }, []);

  return (
    <div className="text-white">
      <div>
        <div className="text-4xl font-bold my-5 text-center">
          {project?.name}
        </div>
        <div className="text-xl my-3 text-center">{project?.description}</div>
        <TaskForm
          handleSubmit={handleSubmit}
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          status={status}
          setStatus={setStatus}
          error={error}
          isEditing={isEditing}
        />

        <h1 className="text-4xl font-bold my-5 text-center">
          Tasks
        </h1>
        {displayLoading ? (
          <div className="text-3xl text-white">Loading...</div>
        ) : (
          <div className="w-full flex gap-5 mt-10 flex-wrap justify-cente">
            {tasks.map((task) => (
              <TaskCard
                key={task._id}
                setDescription={setDescription}
                setIsEditing={setIsEditing}
                setStatus={setStatus}
                setTitle={setTitle}
                task={task}
                handleDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectDetailsPage;
