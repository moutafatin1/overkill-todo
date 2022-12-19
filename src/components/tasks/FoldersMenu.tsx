import { Disclosure } from "@headlessui/react";
import type { Dispatch, MouseEvent, SetStateAction } from "react";
import { useEffect, useState } from "react";
import { HiPencil, HiTrash } from "react-icons/hi";
import { CreateNewFolder } from "../../features/folder/CreateNewFolder";
import { DeleteList } from "../../features/list/DeleteList";
import { fn } from "../../utils/fn";
import { trpc } from "../../utils/trpc";
import { Spinner } from "../common";
import { FolderOptions } from "../common/FolderOptions";

export const FoldersMenu = () => {
  const [showOption, setShowOption] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [showListOptionModal, setShowListOptionModal] = useState({
    edit: "",
    delete: "",
  });
  const [points, setPoints] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleClick = () => setShowMenu(false);
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);
  const { data: folders, isLoading, error } = trpc.folder.all.useQuery();
  if (isLoading) return <Spinner show={isLoading} delay={400} />;
  if (error) return <p> {error.message}</p>;
  return (
    <>
      <div className="mt-6 flex items-center justify-between px-4">
        <h3 className=" text-sm font-medium uppercase tracking-wider text-gray-500">
          folders
        </h3>
        <CreateNewFolder />
      </div>
      {folders.map((folder) => (
        <Disclosure key={folder.id} as="div" className="space-y-1 p-2">
          {({ open }) => (
            <>
              <div
                className="flex items-center gap-2"
                onMouseEnter={() => setShowOption(folder.id)}
              >
                <Disclosure.Button
                  className={fn(
                    false
                      ? "bg-gray-900 text-white"
                      : " text-gray-300 hover:bg-gray-700 hover:text-gray-100",
                    "group flex w-full items-center rounded-md py-2 pr-2 text-left text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500"
                  )}
                >
                  <svg
                    className={fn(
                      open ? "rotate-90 text-gray-400" : "text-gray-300",
                      "mr-2 h-5 w-5 flex-shrink-0 transform transition-colors duration-150 ease-in-out group-hover:text-gray-400"
                    )}
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
                  </svg>
                  {folder.name}
                </Disclosure.Button>

                {showOption === folder.id && <FolderOptions folder={folder} />}
              </div>
              <Disclosure.Panel className="space-y-1">
                {folder.List.map((list) => (
                  <div key={list.id}>
                    <button
                      onContextMenu={(e: MouseEvent) => {
                        console.log("Context menu opened");
                        e.preventDefault();
                        setShowMenu(true);
                        setPoints((old) => ({
                          ...old,
                          x: e.pageX,
                          y: e.pageY,
                        }));
                      }}
                      className="flex w-full items-center rounded-md py-2 pl-10 pr-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-gray-100"
                    >
                      {list.name}
                    </button>
                    <DeleteList
                      isOpen={showListOptionModal.delete === list.id}
                      id={list.id}
                    />

                    {showMenu && (
                      <ContextMenu
                        setShowOption={setShowListOptionModal}
                        id={list.id}
                        top={points.y}
                        left={points.x}
                      />
                    )}
                  </div>
                ))}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}
    </>
  );
};

type ListContextMenuProps = {
  top: number;
  left: number;
  id: string;
  setShowOption: Dispatch<
    SetStateAction<{
      edit: string;
      delete: string;
    }>
  >;
};

const ContextMenu = ({
  id,
  left,
  top,
  setShowOption,
}: ListContextMenuProps) => {
  return (
    <div
      className="absolute w-48 rounded-xl bg-gray-100 py-2"
      style={{ top, left }}
    >
      <button
        onClick={() => setShowOption((old) => ({ ...old, delete: id }))}
        className="group flex w-full items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-300 group-hover:text-gray-800"
      >
        <HiTrash className="h-5 w-5 group-hover:text-red-500" />
        <span>Delete</span>
      </button>
      <li className="group flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-300 hover:text-gray-800">
        <HiPencil className="h-5 w-5 group-hover:text-teal-500" />
        <span>Edit</span>
      </li>
    </div>
  );
};
