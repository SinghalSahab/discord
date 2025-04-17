// hooks/useModalStore.ts
import { create } from "zustand";

type ModalType = "createServer" | null;

interface ModalState {
  isOpen: boolean;
  type: ModalType;
  onOpen: (type: ModalType) => void;
  onClose: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  type: null,
  onOpen: (type) => {
    console.log("Opened modal:", type);
    set({ isOpen: true, type });
  },
  onClose: () => {
    console.log("Closed modal");
    set({ isOpen: false, type: null });
  },
}));
