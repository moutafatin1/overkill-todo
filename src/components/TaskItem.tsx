import type { Task } from "@prisma/client";
import { HiOutlineTrash } from "react-icons/hi";

type TaskItemProps = {
  task: Task;
};

export const TaskItem = ({ task }: TaskItemProps) => {
  return (
    <li className="flex items-center gap-4">
      <input
        type="checkbox"
        checked={task.completed}
        className="h-6 w-6 cursor-pointer rounded-lg text-purple-500 transition-colors hover:bg-purple-100 hover:text-purple-600 focus:ring-purple-500"
        // onChange={() => updateTaskStatus(task)}
      />
      <span className="text-lg font-medium text-gray-800">{task.text}</span>
      <button
        // onClick={() => deleteTaskById(task.id)}
        className="ml-auto rounded-xl p-1 transition-all hover:opacity-80 focus:ring-1 focus:ring-red-500 active:scale-90"
      >
        <HiOutlineTrash className="text-3xl text-red-500" />
      </button>
    </li>
  );
};
