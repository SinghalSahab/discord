
import { Channel, ChannelType, Server } from "@prisma/client";
import { create } from "zustand";

type ModalType = "createServer" | "invite" | "members" | "createChannel" | "deleteServer" | "leaveServer" | "editServer" | "deleteChannel" | "editChannel" |null;

interface ModalData {
  server ?: Server
  channel?:Channel
  channelType?: ChannelType
}

interface ModalState {
  isOpen: boolean;
  data: ModalData;
  type: ModalType;
  onOpen: (type: ModalType,data?: ModalData) => void;
  onClose: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  type: null,
  data: {},
  onOpen: (type,data={}) => {
    console.log("Opened modal:", type,data);
    set({ isOpen: true, type,data });
  },
  onClose: () => {
    console.log("Closed modal");
    set({ isOpen: false, type: null });
  },
}));
