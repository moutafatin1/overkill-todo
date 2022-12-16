import type { Task } from "../pages/tasks";
import { TaskItem } from "./TaskItem";

type TasksListProps = {
  tasks: Task[];
  updateTaskStatus : (task:Task) => void
};

export const TasksList = ({ tasks,updateTaskStatus }: TasksListProps) => {
  return (
    <ul className="space-y-4">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} updateTaskStatus={updateTaskStatus} />
      ))}
    </ul>
  );
};
