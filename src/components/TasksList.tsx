import type { Task } from "../pages/tasks";
import { TaskItem } from "./TaskItem";

type TasksListProps = {
  tasks: Task[];
  updateTaskStatus: (task: Task) => void;
  deleteTaskById: (id: number) => void;
};

export const TasksList = ({
  tasks,
  updateTaskStatus,
  deleteTaskById,
}: TasksListProps) => {
  return (
    <ul className="space-y-4">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          updateTaskStatus={updateTaskStatus}
          deleteTaskById={deleteTaskById}
        />
      ))}
    </ul>
  );
};
