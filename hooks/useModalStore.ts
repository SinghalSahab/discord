
import { Channel, ChannelType, Server } from "@prisma/client";
import { create } from "zustand";

export type ModalType = "createServer" | "invite" | "members" | "createChannel" | "deleteServer" | "leaveServer" | "editServer" | "deleteChannel" | "editChannel" | "messageFile" | "deleteMessage" | null;

interface ModalData {
  server ?: Server
  channel?:Channel
  channelType?: ChannelType
  apiUrl?: string
  query?: Record<string, any>
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
