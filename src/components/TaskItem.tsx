import { HiOutlineTrash } from "react-icons/hi";
import type { Task } from "../pages/tasks";

type TaskItemProps = {
  task: Task;
  updateTaskStatus: (task: Task) => void;
  deleteTaskById: (id: number) => void;
};

export const TaskItem = ({
  task,
  updateTaskStatus,
  deleteTaskById,
}: TaskItemProps) => {
  return (
    <li className="flex items-center gap-4">
      <input
        type="checkbox"
        checked={task.completed}
        className="h-6 w-6 cursor-pointer rounded-lg text-purple-500 transition-colors hover:bg-purple-100 hover:text-purple-600 focus:ring-purple-500"
        onChange={() => updateTaskStatus(task)}
      />
      <span className="text-lg font-medium text-gray-800">{task.text}</span>
      <button
        onClick={() => deleteTaskById(task.id)}
        className="ml-auto rounded-xl p-1 transition-all hover:opacity-80 focus:ring-1 focus:ring-red-500 active:scale-90"
      >
        <HiOutlineTrash className="text-3xl text-red-500" />
      </button>
    </li>
  );
};
