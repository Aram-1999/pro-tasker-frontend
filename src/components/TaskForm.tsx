import type { Status } from "../types/types";

interface TaskFormProps {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  status: Status;
  setStatus: React.Dispatch<React.SetStateAction<Status>>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isEditing: string | undefined;
  error: string | undefined;
}

function TaskForm({
  handleSubmit,
  title,
  setTitle,
  description,
  setDescription,
  status,
  setStatus,
  isEditing,
  error,
}: TaskFormProps) {
  const button = isEditing ? "Update Task" : "Create Task";

  return (
    <div className="text-white shadow shadow-orange-300 mt-5 w-[80%] min-w-[500px] mx-auto">
      <h2 className="font-semibold text-2xl text-center mt-2">Create a Task</h2>
      <form
        className=" border p-2 mt-2 flex flex-col gap-2 rounded border-none"
        onSubmit={handleSubmit}
      >
        <label htmlFor="task-name">Task Title: </label>
        <input
          type="text"
          name="task-name"
          id="task-name"
          className="border px-2 py-1 hover:bg-zinc-700"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="task-description">Task Description</label>
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          type="text"
          name="task-description"
          id="task-description"
          className="border px-2 py-1 hover:bg-zinc-700"
        />
        <div className="flex gap-5">
          <label htmlFor="status">Status:</label>
          <select
            className="bg-zinc-800 w-fit pr-2 hover:cursor-pointer hover:bg-zinc-700"
            name="status"
            id="status"
            value={status}
            onChange={(e) => {
              setStatus(e.target.value as Status);
            }}
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>

        <button
          type="submit"
          className="mt-auto bg-sky-500 hover:bg-sky-600 py-1 rounded"
        >
          {button}
        </button>
        {error && <div className="text-sm text-red-500">{error}</div>}
      </form>
    </div>
  );
}

export default TaskForm;
