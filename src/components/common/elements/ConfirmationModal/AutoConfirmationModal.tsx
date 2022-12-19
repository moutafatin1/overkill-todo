import { useAutoActionModal } from "../../../../features/hooks";
import type { ConfirmationModalProps } from "./ConfirmationModal";
import { ConfirmationModal } from "./ConfirmationModal";

type AutoConfirmationModalProps = {
  isOpen: boolean;
} & Omit<ConfirmationModalProps, "triggerButton">;

export const AutoConfirmationModal = ({
  isOpen,
  ...props
}: AutoConfirmationModalProps) => {
  const btnRef = useAutoActionModal(isOpen);
  return (
    <ConfirmationModal
      triggerButton={(open) => (
        <button onClick={open} ref={btnRef} className="hidden">
          open confirmation modal
        </button>
      )}
      {...props}
    />
  );
};
