import type { Task } from "../pages/tasks";

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
        onChange={() => ""}
      />
      <span className="text-lg font-medium text-gray-800">{task.text}</span>
    </li>
  );
};
