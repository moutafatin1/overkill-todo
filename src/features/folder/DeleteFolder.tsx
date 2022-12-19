import Button from "../../components/common/elements/Buttons";
import { AutoConfirmationModal } from "../../components/common/elements/ConfirmationModal/AutoConfirmationModal";
import { trpc } from "../../utils/trpc";

type DeleteFolderProps = {
  folderId: string;
  isOpen: boolean;
};

export const DeleteFolder = ({ folderId, isOpen }: DeleteFolderProps) => {
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
    <AutoConfirmationModal
      isOpen={isOpen}
      isDone={deleteFolderMutation.isSuccess}
      title="Delete Folder"
      body="Do you really want to delete this folder? this will delete all your lists and tasks withing this folder"
      confirmButton={
        <Button onClick={deleteFolder} variant="danger">
          Delete Folder
        </Button>
      }
    />
  );
};
