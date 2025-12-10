import React from "react";
import type { Task, Status } from "../types/types";

interface TaskCardProps {
  task: Task;
  setIsEditing: React.Dispatch<React.SetStateAction<string | undefined>>;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  setStatus: React.Dispatch<React.SetStateAction<Status>>;
  handleDelete: (id: string | undefined) => void;
}

const TaskCard = React.memo(function TaskCard({
  task,
  setIsEditing,
  setTitle,
  setDescription,
  setStatus,
  handleDelete,
}: TaskCardProps) {
  return (
    <div className="text-white w-50 h-50 flex flex-col border border-orang-700 bg-zinc-700 p-2 text-center rounded">
      <div className="flex justify-end gap-2 mb-3">
        <button
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

        <button onClick={() => handleDelete(task._id)}>✖</button>
      </div>

      <div className="font-semibold text-lg">{task.title}</div>
      <div>{task.description}</div>
      <div>{task.status}</div>
    </div>
  );
});

export default TaskCard;
