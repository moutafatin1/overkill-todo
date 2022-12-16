import { TabItem } from "./TabItem";

type TabsProps = {
  selectedTab: string;
  setSelectedTab: (name: string) => void;
  items: {
    name: string;
  }[];
};

export const Tabs = ({ selectedTab, items, setSelectedTab }: TabsProps) => {
  return (
    <nav className=" mt-12 flex items-center justify-around border-b border-gray-400 pb-4">
      {items.map((item) => (
        <TabItem
          key={item.name}
          name={item.name}
          active={selectedTab === item.name}
          setSelectedTab={setSelectedTab}
        />
      ))}
    </nav>
  );
};
