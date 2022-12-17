import { useState } from "react";
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
      <main className="md:pl-72">{children}</main>
    </>
  );
};
