import type { Folder, List } from "@prisma/client";
import { z } from "zod";
import { InputField } from "../../components/common";
import { AutoActionModal } from "../../components/common/elements/ActionModal/AutoActionModal";
import Button from "../../components/common/elements/Buttons";
import { Form } from "../../components/common/forms/Form";
import { trpc } from "../../utils/trpc";

const editFolderSchema = z.object({
  name: z.string().min(1, "Folder name must not be empty"),
});

type EditFolderFormData = z.infer<typeof editFolderSchema>;

type EditFolderProps = {
  folder: Folder & {
    List: List[];
  };
  isOpen: boolean;
};

export const EditFolder = ({ folder, isOpen = false }: EditFolderProps) => {
  const utils = trpc.useContext();
  const editFolderMutation = trpc.folder.edit.useMutation();
  return (
    <AutoActionModal
      isOpen={isOpen}
      isDone={editFolderMutation.isSuccess}
      title="Edit folder"
      confirmButton={<Button form="edit-folder">Update</Button>}
    >
      <Form<EditFolderFormData, typeof editFolderSchema>
        id="edit-folder"
        schema={editFolderSchema}
        onSubmit={(data) => {
          editFolderMutation.mutate(
            {
              id: folder.id,
              name: data.name,
            },
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
            defaultValue={folder.name}
          />
        )}
      </Form>
    </AutoActionModal>
  );
};

EditFolder.displayName = "EditFolder";
