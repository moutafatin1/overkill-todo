import { HiTrash } from "react-icons/hi";
import Button from "../../components/common/elements/Buttons";
import { ConfirmationModal } from "../../components/common/elements/ConfirmationModal";
import { fn } from "../../utils/fn";
import { trpc } from "../../utils/trpc";

type DeleteFolderProps = {
  folderId: string;
};

export const DeleteFolder = ({ folderId }: DeleteFolderProps) => {
  const utils = trpc.useContext();
  const deleteFolderMutation = trpc.folder.deleteById.useMutation();
  const deleteFolder = () => {
    deleteFolderMutation.mutate(folderId, {
      onSuccess: () => {
        utils.folder.all.invalidate();
      },
    });
  };
  return (
    <ConfirmationModal
      isDone={deleteFolderMutation.isSuccess}
      title="Delete Folder"
      body="Do you really want to delete this folder? this will delete all your lists and tasks withing this folder"
      triggerButton={(open) => (
        <button
          onClick={open}
          className={fn(
            "group flex w-full items-center gap-2 px-4 py-2 text-gray-600 transition-colors hover:bg-gray-200"
          )}
        >
          <HiTrash className="h-5 w-6 transition-colors group-hover:text-red-500" />
          Delete
        </button>
      )}
      confirmButton={
        <Button onClick={deleteFolder} variant="danger">
          Delete Folder
        </Button>
      }
    />
  );
};
