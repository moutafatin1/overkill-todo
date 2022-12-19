import { useAutoActionModal } from "../../../../features/hooks";
import type { ActionModalProps } from "./ActionModal";
import { ActionModal } from "./ActionModal";

type AutoActionModalProps = {
  isOpen: boolean;
} & Omit<ActionModalProps, "triggerButton">;

export const AutoActionModal = ({
  children,
  isOpen,
  ...props
}: AutoActionModalProps) => {
  const btnRef = useAutoActionModal(isOpen);

  return (
    <ActionModal
      {...props}
      triggerButton={(open) => (
        <button onClick={open} ref={btnRef} className="hidden">
          open modal
        </button>
      )}
    >
      {children}
    </ActionModal>
  );
};
