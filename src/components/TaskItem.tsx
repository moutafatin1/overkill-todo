import type { Task } from "../pages/tasks";

type TaskItemProps = {
  task: Task;
  updateTaskStatus: (task: Task) => void;
};

export const TaskItem = ({ task, updateTaskStatus }: TaskItemProps) => {
  return (
    <li className="flex items-center gap-4">
      <input
        type="checkbox"
        checked={task.completed}
        className="h-6 w-6 cursor-pointer rounded-lg text-purple-500 transition-colors hover:bg-purple-100 hover:text-purple-600 focus:ring-purple-500"
        onChange={() => updateTaskStatus(task)}
      />
      <span className="text-lg font-medium text-gray-800">{task.text}</span>
    </li>
  );
};
