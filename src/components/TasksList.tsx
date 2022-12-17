import type { Task } from "@prisma/client";
import { TaskItem } from "./TaskItem";

type TasksListProps = {
  tasks: Task[];
};

export const TasksList = ({ tasks }: TasksListProps) => {
  return (
    <ul className="space-y-4">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
};
