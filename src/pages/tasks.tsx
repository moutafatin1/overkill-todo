import type { GetServerSideProps } from "next";
import type { ReactElement } from "react";
import { useState } from "react";
import { AddNewTask } from "../components/AddNewTask";
import { Spinner } from "../components/common";
import { SidebarLayout } from "../components/layout/SidebarLayout";
import { Tabs } from "../components/Tabs";
import { TasksList } from "../components/TasksList";
import { getServerAuthSession } from "../server/common/get-server-auth-session";
import { trpc } from "../utils/trpc";
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
  const setTab = (name: string) => setSelectedTab(name as Tabs);

  
 

  const { data, isLoading, error } = trpc.task.all.useQuery();
  if (isLoading) {
    return <Spinner show={isLoading} delay={400} />;
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  return (
    <main className="mx-auto mt-16 max-w-3xl space-y-8">
      <h1 className="text-center text-4xl font-bold text-gray-700">#todos</h1>
      <Tabs
        selectedTab={selectedTab}
        items={tabItems}
        setSelectedTab={setTab}
      />
      <AddNewTask  />
      <TasksList
        tasks={data}
        
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
