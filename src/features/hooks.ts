import { useEffect, useRef } from "react";

export const useAutoActionModal = (isOpen: boolean) => {
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      btnRef.current?.click();
    }
  }, [isOpen]);

  return btnRef;
};
