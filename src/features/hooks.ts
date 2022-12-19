import { useEffect, useRef } from "react";

export const useAutoActionModal = (isOpen: boolean) => {
  console.log("🚀 ~ file: hooks.ts:4 ~ useAutoActionModal ~ isOpen", isOpen);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      btnRef.current?.click();
      console.log("SHOULD OPEN MODAL");
    }
  }, [isOpen]);

  return btnRef;
};
