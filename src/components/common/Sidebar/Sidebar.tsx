import { Dialog, Transition } from "@headlessui/react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import type { ReactNode } from "react";
import React, { Fragment } from "react";
import { AiFillHome, AiOutlineLogout } from "react-icons/ai";
import { fn } from "../../../utils/fn";
import { TransitionOpacity } from "../TransitionOpacity";
const sidebarNavigation = [
  {
    name: "Home",
    href: "/tasks",
    icon: <AiFillHome />,
  },
];

type SidebarProps = {
  isOpen: boolean;
  closeSidebar: () => void;
};
export function Sidebar({ isOpen, closeSidebar }: SidebarProps) {
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 flex md:hidden"
          onClose={closeSidebar}
        >
          <TransitionOpacity>
            <div className="fixed inset-0  bg-gray-600 bg-opacity-70"></div>
          </TransitionOpacity>
          <TransitionOpacity>
            <Dialog.Panel
              as="aside"
              className="relative flex w-full max-w-xs flex-1 flex-col  bg-gray-800 pt-5"
            >
              <Sidebar.Header />
              <Sidebar.Nav />
              <Sidebar.Footer />
            </Dialog.Panel>
          </TransitionOpacity>
        </Dialog>
      </Transition>

      {/* Static sidebar */}
      <div className="inset-y-0 hidden  flex-1  flex-col bg-gray-800 pt-5 md:fixed  md:flex md:w-72">
        <Sidebar.Header />
        <Sidebar.Nav />
        <Sidebar.Footer />
      </div>
    </>
  );
}

Sidebar.Header = function Header() {
  return (
    <div className="px-4">
      <h1 className="text-3xl font-bold text-white">Expense App</h1>
    </div>
  );
};

Sidebar.Nav = function Nav() {
  return (
    <div className="mt-5 h-0 flex-1 overflow-y-auto">
      <nav className="mt-5 space-y-2 px-2">
        {sidebarNavigation.map((item) => (
          <Sidebar.NavItem key={item.name} icon={item.icon} href={item.href}>
            {item.name}
          </Sidebar.NavItem>
        ))}
      </nav>
    </div>
  );
};

type NavItemProps = {
  children: React.ReactNode;
  icon?: ReactNode;
  href: string;
};

Sidebar.NavItem = function NavItem({ children, href, icon }: NavItemProps) {
  const router = useRouter();
  const isActive = router.pathname === href;

  return (
    <Link
      href={href}
      className={fn(
        "flex items-center rounded-md p-2 font-medium text-gray-300",
        isActive && "bg-gray-900 text-white",
        !isActive &&
          "transition-colors duration-200 hover:bg-gray-700 hover:text-gray-100"
      )}
    >
      <span className="mr-4 text-2xl">{icon}</span>
      {children}
    </Link>
  );
};

Sidebar.Footer = function Footer() {
  const { data } = useSession();
  return (
    <div className="flex items-center gap-2 bg-gray-700 p-4">
      <Image
        src={data?.user?.image ?? ""}
        className="rounded-full"
        width={60}
        height={60}
        alt={data?.user?.name ?? ""}
      />
      <div className="flex flex-col">
        <span className="truncate font-medium text-white">
          {data?.user?.name}
        </span>
        <span className="text-gray-300">View Profile</span>
      </div>
      <button
        onClick={() => signOut()}
        className="ml-auto rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
      >
        <AiOutlineLogout className="text-4xl text-red-400 transition-colors hover:text-red-500" />
      </button>
    </div>
  );
};
