import { fn } from "../utils/fn";

type TabItemProps = {
  name: string;
  active: boolean;
  setSelectedTab: (name: string) => void;
};

export const TabItem = ({ name, active, setSelectedTab }: TabItemProps) => {
  return (
    <button
      onClick={() => setSelectedTab(name)}
      className={fn(
        "font-medium capitalize text-gray-700",
        "relative  after:absolute after:right-1/2 after:top-8 after:hidden after:w-24 after:translate-x-1/2 after:rounded-t-xl after:border-b-8 after:border-purple-500 after:content-['']",
        active && "text-purple-500 after:block"
      )}
    >
      {name}
    </button>
  );
};
