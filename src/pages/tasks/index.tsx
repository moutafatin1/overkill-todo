import type { GetServerSideProps } from "next";
import type { ReactElement } from "react";
import { AddNewTask } from "../../components/AddNewTask";
import { Spinner } from "../../components/common";
import { SidebarLayout } from "../../components/layout/SidebarLayout";
import { TasksList } from "../../components/TasksList";
import { getServerAuthSession } from "../../server/common/get-server-auth-session";
import { trpc } from "../../utils/trpc";
import type { NextPageWithLayout } from "../_app";

const TasksHomePage: NextPageWithLayout = () => {
  const { data, isLoading, error } = trpc.task.all.useQuery();
  if (isLoading) {
    return <Spinner show={isLoading} delay={400} />;
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  return (
    <main className="mx-auto mt-16 max-w-3xl space-y-8">
      <h1 className="text-center text-4xl font-bold text-gray-700">
        #todos - Home
      </h1>
      <AddNewTask />
      <TasksList tasks={data} />
    </main>
  );
};

export default TasksHomePage;

TasksHomePage.getLayout = (page: ReactElement) => {
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
