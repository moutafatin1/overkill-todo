import { useState } from "react";
import { Tabs } from "../components/Tabs";

type Tabs = "all" | "active" | "completed";
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

const TasksPage = () => {
  const [selectedTab, setSelectedTab] = useState<Tabs>("all");
  const setTab = (name: string) => setSelectedTab(name as Tabs);
  return (
    <main className="mx-auto max-w-5xl">
      <h1 className="mt-12 text-center text-4xl font-bold text-gray-700">
        #todos
      </h1>
      <Tabs
        selectedTab={selectedTab}
        items={tabItems}
        setSelectedTab={setTab}
      />
    </main>
  );
};

export default TasksPage;
