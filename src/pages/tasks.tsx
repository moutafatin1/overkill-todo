import { useState } from "react";
import { AddNewTask } from "../components/AddNewTask";
import { Tabs } from "../components/Tabs";
import { TasksList } from "../components/TasksList";

type Tabs = "all" | "active" | "completed";
export type Task = {
  id: number;
  text: string;
  completed: boolean;
};
const tabItems = [
  {
    name: "all",
  },
  {
    name: "active",
  },
  {
    name: "completed",
  },
];
const tasksData: Task[] = [
  {
    id: 1,
    text: "Do coding challenges",
    completed: false,
  },
  {
    id: 2,
    text: "Improve my ReactJs Skills",
    completed: true,
  },
];

const TasksPage = () => {
  const [selectedTab, setSelectedTab] = useState<Tabs>("all");
  const [tasks, setTasks] = useState<Task[]>(tasksData);
  console.log("🚀 ~ file: tasks.tsx:39 ~ TasksPage ~ tasks", tasks);
  const setTab = (name: string) => setSelectedTab(name as Tabs);
  const addNewTask = (task: string) => {
    const newTask: Task = {
      id: tasks.length + 1,
      text: task,
      completed: false,
    };
    setTasks((old) => [...old, newTask]);
  };
  const updateTaskStatus = (taskToUpdate: Task) => {
    const newTasks = tasks.map((task) => {
      if (task.id === taskToUpdate.id) {
        return { ...task, completed: !taskToUpdate.completed };
      }
      return task;
    });
    setTasks(newTasks);
  };
  return (
    <main className="mx-auto mt-16 max-w-3xl space-y-8">
      <h1 className="text-center text-4xl font-bold text-gray-700">#todos</h1>
      <Tabs
        selectedTab={selectedTab}
        items={tabItems}
        setSelectedTab={setTab}
      />
      <AddNewTask addNewTask={addNewTask} />
      <TasksList tasks={tasks} updateTaskStatus={updateTaskStatus} />
    </main>
  );
};

export default TasksPage;
