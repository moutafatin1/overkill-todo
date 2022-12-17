import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { Sidebar } from "../common/Sidebar/Sidebar";

type SidebarLayoutProps = {
  children: React.ReactNode;
};

export const SidebarLayout = ({ children }: SidebarLayoutProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeSidebar = () => {
    setIsOpen(false);
  };
  return (
    <>
      <Sidebar closeSidebar={closeSidebar} isOpen={isOpen} />
      <nav className="bg-slate-300 p-4 shadow-lg md:hidden">
        <button
          onClick={() => setIsOpen(true)}
          className="rounded-xl p-1 focus:outline-none focus:ring-1 focus:ring-purple-700"
        >
          <AiOutlineMenu className="text-2xl text-purple-700 transition-opacity hover:opacity-80" />
        </button>
      </nav>
      <main className="md:pl-72">{children}</main>
    </>
  );
};
