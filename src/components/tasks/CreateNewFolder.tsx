import { AiOutlinePlusCircle } from "react-icons/ai";
import { z } from "zod";
import { trpc } from "../../utils/trpc";
import { InputField } from "../common";
import { ActionModal } from "../common/elements/ActionModal/ActionModal";
import Button from "../common/elements/Buttons";
import { Form } from "../common/forms/Form";

const newFolderSchema = z.object({
  name: z.string().min(1, "folder name is required"),
});
type newFolderFormData = z.infer<typeof newFolderSchema>;
export const CreateNewFolder = () => {
  const utils = trpc.useContext();
  const newFolderMutation = trpc.folder.new.useMutation();

  return (
    <ActionModal
      isDone={newFolderMutation.isSuccess}
      title="Create new folder"
      triggerButton={(open) => (
        <button
          onClick={open}
          className="rounded-xl p-1 focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          <AiOutlinePlusCircle className="text-2xl text-teal-500 transition-opacity hover:opacity-70" />
        </button>
      )}
      confirmButton={<Button form="new-folder">Create</Button>}
    >
      <Form<newFolderFormData, typeof newFolderSchema>
        id="new-folder"
        schema={newFolderSchema}
        onSubmit={(data) => {
          newFolderMutation.mutate(
            { name: data.name },
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
            placeholder="Folder Name"
            {...register("name")}
            errorMessage={errors.name?.message}
          />
        )}
      </Form>
    </ActionModal>
  );
};
