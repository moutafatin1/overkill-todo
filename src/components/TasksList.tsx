import type { Task } from "../pages/tasks";
import { TaskItem } from "./TaskItem";

type TasksListProps = {
  tasks: Task[];
};

export const TasksList = ({ tasks }: TasksListProps) => {
  return (
    <ul className="mt-12 space-y-4">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
};
