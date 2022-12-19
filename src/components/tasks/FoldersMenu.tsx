import { Disclosure } from "@headlessui/react";
import { useState } from "react";
import { fn } from "../../utils/fn";
import { trpc } from "../../utils/trpc";
import { Spinner } from "../common";
import { FolderOptions } from "../common/FolderOptions";
import { CreateNewFolder } from "./CreateNewFolder";

export const FoldersMenu = () => {
  const [showOption, setShowOption] = useState("");
  console.log(
    "🚀 ~ file: FoldersMenu.tsx:11 ~ FoldersMenu ~ showOption",
    showOption
  );
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
                  <Disclosure.Button
                    key={list.id}
                    as="a"
                    href={"#"}
                    className="group flex w-full items-center rounded-md py-2 pl-10 pr-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-gray-100"
                  >
                    {list.name}
                  </Disclosure.Button>
                ))}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}
    </>
  );
};
