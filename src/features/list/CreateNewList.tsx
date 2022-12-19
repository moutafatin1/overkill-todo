import { z } from "zod";
import { InputField } from "../../components/common";
import { ActionModal } from "../../components/common/elements/ActionModal/ActionModal";
import Button from "../../components/common/elements/Buttons";
import { Form } from "../../components/common/forms/Form";
import { trpc } from "../../utils/trpc";
import { useAutoModal } from "../hooks";

const newListSchema = z.object({
  name: z.string().min(1, "list name is required"),
});
type newListFormData = z.infer<typeof newListSchema>;

type CreateNewListProps = {
  folderId: string;
  isOpen: boolean;
};

export const CreateNewList = ({ folderId, isOpen }: CreateNewListProps) => {
  const utils = trpc.useContext();
  const newFolderMutation = trpc.list.new.useMutation();
  const btnRef = useAutoModal(isOpen);

  return (
    <ActionModal
      isDone={newFolderMutation.isSuccess}
      title="Create new list"
      triggerButton={(open) => (
        <button ref={btnRef} onClick={open} className="hidden">
          hidden button to create new list
        </button>
      )}
      confirmButton={<Button form="new-folder">Create</Button>}
    >
      <Form<newListFormData, typeof newListSchema>
        id="new-folder"
        schema={newListSchema}
        onSubmit={(data) => {
          newFolderMutation.mutate(
            { name: data.name, folderId },
            {
              onSuccess: () => {
                utils.folder.all.invalidate();
              },
            }
          );
        }}
      >
        {({ register, formState: { errors } }) => (
          <InputField
            placeholder="List Name"
            {...register("name")}
            errorMessage={errors.name?.message}
          />
        )}
      </Form>
    </ActionModal>
  );
};
