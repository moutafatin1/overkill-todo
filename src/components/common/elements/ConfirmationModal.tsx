import { HiExclamationCircle, HiInformationCircle } from "react-icons/hi";
import { fn } from "../../../utils/fn";
import { useActionModal } from "./ActionModal/hooks";
import Button from "./Buttons";
import { Modal, ModalPanel, ModalTitle } from "./Modal";

export type ConfirmationDialogProps = {
  triggerButton: (open: () => void) => React.ReactElement;
  confirmButton: React.ReactElement;
  title: string;
  body?: string;
  cancelButtonText?: string;
  icon?: "danger" | "info";
  isDone?: boolean;
};

export const ConfirmationModal = ({
  triggerButton,
  confirmButton,
  title,
  body = "",
  cancelButtonText = "Cancel",
  icon = "danger",
  isDone = false,
}: ConfirmationDialogProps) => {
  const { close, isOpen, open } = useActionModal(isDone);
  return (
    <>
      {triggerButton(open)}
      <Modal isOpen={isOpen} onClose={close}>
        <ModalPanel className="w-full max-w-sm space-y-4 rounded-xl bg-white p-6 text-center">
          {icon === "danger" ? (
            <HiExclamationCircle className="mx-auto text-7xl text-red-400" />
          ) : (
            <HiInformationCircle className="mx-auto text-7xl text-blue-400" />
          )}

          <div>
            <ModalTitle className="pb-2 text-2xl font-bold text-gray-700">
              {title}
            </ModalTitle>
            <p className="text-gray-600">{body}</p>
          </div>
          <div className="flex items-center justify-center gap-4">
            {confirmButton}
            <Button
              onClick={close}
              className={fn(
                icon === "danger"
                  ? "border-red-400 text-red-400"
                  : "border-blue-400 text-blue-400"
              )}
              variant="outline"
            >
              {cancelButtonText}
            </Button>
          </div>
        </ModalPanel>
      </Modal>
    </>
  );
};
