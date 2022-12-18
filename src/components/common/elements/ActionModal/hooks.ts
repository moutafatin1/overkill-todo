import { useCallback, useEffect, useState } from "react";

export const useActionModal = (isDone: boolean) => {
  const [isOpen, setIsOpen] = useState(false);
  const close = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);
  const open = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);
  useEffect(() => {
    if (isDone) {
      close();
    }
  }, [isDone, close]);
  return {
    isOpen,
    close,
    open,
  };
};