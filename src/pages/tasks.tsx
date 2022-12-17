import type { GetServerSideProps } from "next";
import type { ReactElement } from "react";
import { useState } from "react";
import { AddNewTask } from "../components/AddNewTask";
import { SidebarLayout } from "../components/layout/SidebarLayout";
import { Tabs } from "../components/Tabs";
import { TasksList } from "../components/TasksList";
import { getServerAuthSession } from "../server/common/get-server-auth-session";
import type { NextPageWithLayout } from "./_app";

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

const TasksPage: NextPageWithLayout = () => {
  const [selectedTab, setSelectedTab] = useState<Tabs>("all");
  const [tasks, setTasks] = useState<Task[]>(tasksData);
  const setTab = (name: string) => setSelectedTab(name as Tabs);

  const filteredTasks = () => {
    if (selectedTab === "active") {
      return tasks.filter((task) => task.completed !== true);
    }
    if (selectedTab === "completed") {
      return tasks.filter((task) => task.completed === true);
    }
    return tasks;
  };
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

  const deleteTaskById = (id: number) => {
    setTasks((old) => old.filter((task) => task.id !== id));
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
      <TasksList
        tasks={filteredTasks()}
        updateTaskStatus={updateTaskStatus}
        deleteTaskById={deleteTaskById}
      />
    </main>
  );
};

export default TasksPage;

TasksPage.getLayout = (page: ReactElement) => {
  return <SidebarLayout>{page}</SidebarLayout>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerAuthSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {
      session,
    },
  };
};
