import { HiTrash } from "react-icons/hi";
import Button from "../../components/common/elements/Buttons";
import { ConfirmationModal } from "../../components/common/elements/ConfirmationModal";
import { trpc } from "../../utils/trpc";
import { useAutoModal } from "../hooks";

type DeleteFolderProps = {
  folderId: string;
  isOpen:boolean
};

export const DeleteFolder = ({ folderId ,isOpen}: DeleteFolderProps) => {
  const utils = trpc.useContext();
  const deleteFolderMutation = trpc.folder.deleteById.useMutation();
  const btnRef = useAutoModal(isOpen);

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
        ref={btnRef}
          onClick={open}
          className="hidden"
        >
          hidden delete trigger
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
