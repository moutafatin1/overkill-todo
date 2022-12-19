import type { Folder, List } from "@prisma/client";
import { forwardRef, useEffect, useRef } from "react";
import { z } from "zod";
import { InputField } from "../../components/common";
import { ActionModal } from "../../components/common/elements/ActionModal/ActionModal";
import Button from "../../components/common/elements/Buttons";
import { Form } from "../../components/common/forms/Form";
import { trpc } from "../../utils/trpc";
import { useAutoModal } from "../hooks";

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


export const EditFolder = forwardRef(
  ({ folder, isOpen = false }: EditFolderProps, ref) => {
    const utils = trpc.useContext();
    const editFolderMutation = trpc.folder.edit.useMutation();
    const btnRef = useAutoModal(isOpen);
    return (
      <ActionModal
        isDone={editFolderMutation.isSuccess}
        title="Edit folder"
        triggerButton={(open) => (
          <button ref={btnRef} onClick={open} className="hidden">
            hidden trigger button
          </button>
        )}
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
      </ActionModal>
    );
  }
);

EditFolder.displayName = "EditFolder";
