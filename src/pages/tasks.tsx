import { useState } from "react";
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
  const setTab = (name: string) => setSelectedTab(name as Tabs);
  const addNewTask = (task: string) => {
    const newTask: Task = {
      id: tasks.length + 1,
      text: task,
      completed: false,
    };
    setTasks((old) => [...old, newTask]);
  };
  return (
    <main className="mx-auto max-w-3xl">
      <h1 className="mt-12 text-center text-4xl font-bold text-gray-700">
        #todos
      </h1>
      <Tabs
        selectedTab={selectedTab}
        items={tabItems}
        setSelectedTab={setTab}
      />
      <TasksList tasks={tasks} />
    </main>
  );
};

export default TasksPage;
