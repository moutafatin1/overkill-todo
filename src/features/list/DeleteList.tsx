import Button from "../../components/common/elements/Buttons";
import { AutoConfirmationModal } from "../../components/common/elements/ConfirmationModal/AutoConfirmationModal";
import { trpc } from "../../utils/trpc";

type DeleteListProps = {
  id: string;
  isOpen: boolean;
};

export const DeleteList = ({ id, isOpen }: DeleteListProps) => {
  const utils = trpc.useContext();
  const deleteListMutation = trpc.list.delete.useMutation();
  const deleteList = () => {
    deleteListMutation.mutate(id, {
      onSuccess: () => {
        utils.folder.all.invalidate();
      },
    });
  };

  return (
    <AutoConfirmationModal
      isOpen={isOpen}
      isDone={deleteListMutation.isSuccess}
      title="Delete List"
      body="Do you really want to delete this list? this will delete all your tasks withing this folder"
      confirmButton={
        <Button onClick={deleteList} variant="danger">
          Delete Folder
        </Button>
      }
    />
  );
};
