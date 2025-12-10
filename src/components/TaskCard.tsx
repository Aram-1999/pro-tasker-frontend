import React, { useState } from "react";
import type { Task, Status } from "../types/types";
import { apiClient } from "../clients/api";
import { AxiosError } from "axios";

interface TaskCardProps {
  task: Task;
  setIsEditing: React.Dispatch<React.SetStateAction<string | undefined>>;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  setStatus: React.Dispatch<React.SetStateAction<Status>>;
  handleDelete: (id: string | undefined) => void;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TaskCard = React.memo(function TaskCard({
  task,
  setIsEditing,
  setTitle,
  setDescription,
  setStatus,
  handleDelete,
  setTasks
}: TaskCardProps) {
  const [error, setError] = useState("");
  const statusStyle = {
    "To Do": "text-red-500",
    "In Progress": "text-orange-500",
    Done: "text-green-500",
  };

  const handleStatus = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    try {
      const res = await apiClient.put(`/api/tasks/${task._id}`, {
        ...task,
        status: e.target.value
      });
      setTasks((prev) => prev.map(p => {
        if (p._id === task._id) {
          return res.data
        } else {
          return p
        }
    }));
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error?.response?.data?.message);
      }
    }
  };

  return (
    <div className="text-white border border-orang-700 bg-zinc-700 p-2 text-center rounded w-[80%] mx-auto">
      <div className="flex justify-between">
        <div className="font-semibold text-xl">{task.title}</div>
        <div className="flex gap-3 mb-1">
          <button className="hover:bg-slate-700 p-1 px-2"
            onClick={() => {
              if (task._id) {
                setIsEditing(task._id);
                setTitle(task.title);
                setDescription(task.description);
                setStatus(task.status);
              }
            }}
          >
            ✎
          </button>
          <button className="hover:bg-red-800 p-1" onClick={() => handleDelete(task._id)}>✖</button>
        </div>
      </div>
      <div className="flex justify-between">
        <div>{task.description}</div>
        <select
          className={`bg-zinc-800 w-fit pr-2 ${statusStyle[task.status]}`}
          name={`status-${task._id}`}
          id={`status-${task._id}`}
          value={task.status}
          onChange={handleStatus}
        >
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
        {error && <p>{error}</p>}
      </div>
    </div>
  );
});

export default TaskCard;
