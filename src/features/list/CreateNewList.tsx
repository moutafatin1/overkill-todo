import { z } from "zod";
import { InputField } from "../../components/common";
import { AutoActionModal } from "../../components/common/elements/ActionModal/AutoActionModal";
import Button from "../../components/common/elements/Buttons";
import { Form } from "../../components/common/forms/Form";
import { trpc } from "../../utils/trpc";

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

  return (
    <AutoActionModal
      isDone={newFolderMutation.isSuccess}
      isOpen={isOpen}
      title="Create new list"
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
    </AutoActionModal>
  );
};
