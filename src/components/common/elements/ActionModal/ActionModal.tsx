import React from "react";
import Button from "../Buttons";
import { Modal, ModalPanel, ModalTitle } from "../Modal";
import { useActionModal } from "./hooks";

export type ActionModalProps = {
  triggerButton: (open: () => void) => React.ReactElement;
  confirmButton: React.ReactNode;
  title: string;
  children: React.ReactNode;
  isDone: boolean;
  cancelButtonText?: string;
};

export const ActionModal = ({
  children,
  isDone,
  title,
  cancelButtonText = "cancel",
  confirmButton,
  triggerButton,
}: ActionModalProps) => {
  const { close, isOpen, open } = useActionModal(isDone);
  return (
    <>
      {triggerButton(open)}
      <Modal isOpen={isOpen} onClose={close}>
        <ModalPanel className="w-full max-w-sm space-y-4 rounded-xl bg-white p-6 text-center">
          <ModalTitle className="text-lg font-medium text-gray-800">
            {title}
          </ModalTitle>
          <div>{children}</div>
          <div className="flex items-center justify-end gap-2 pt-4">
            {confirmButton}
            <Button onClick={close} variant="danger" className="capitalize">
              {cancelButtonText}
            </Button>
          </div>
        </ModalPanel>
      </Modal>
    </>
  );
};
