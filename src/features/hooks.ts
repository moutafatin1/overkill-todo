import { useEffect, useRef } from "react";

export const useAutoModal = (isOpen: boolean) => {
  console.log("🚀 ~ file: hooks.ts:4 ~ useAutoModal ~ isOpen", isOpen);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      btnRef.current?.click();
    }
  }, [isOpen]);

  return btnRef;
};
