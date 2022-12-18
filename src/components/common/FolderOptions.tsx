import { Menu, Transition } from "@headlessui/react";
import type { Folder, List } from "@prisma/client";
import { Fragment } from "react";
import { FaEllipsisV } from "react-icons/fa";
import { HiPencil } from "react-icons/hi";
import { DeleteFolder } from "../../features/folder/DeleteFolder";
import { fn } from "../../utils/fn";

type FolderOptionsProps = {
  className?: string;
  folder: Folder & {
    List: List[];
  };
};

export const FolderOptions = ({ className, folder }: FolderOptionsProps) => {
  console.log(
    "🚀 ~ file: FolderOptions.tsx:17 ~ FolderOptions ~ folder",
    folder.id
  );
  return (
    <Menu as="div" className={fn("relative inline-block text-left", className)}>
      <div>
        <Menu.Button className="flex items-center rounded-lg p-1 text-gray-200 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-1 focus:ring-purple-400">
          <span className="sr-only">Open options</span>
          <FaEllipsisV className="h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        {
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={fn(
                      "group flex w-full items-center gap-2 px-4 py-2 text-gray-600",
                      "hover:bg-gray-200"
                    )}
                  >
                    <HiPencil className="h-5 w-6 group-hover:text-teal-500" />
                    Edit
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                <DeleteFolder folderId={folder.id} />
              </Menu.Item>
            </div>
          </Menu.Items>
        }
      </Transition>
    </Menu>
  );
};
