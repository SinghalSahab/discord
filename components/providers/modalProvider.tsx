"use client"

import { CreateServerModal } from "@/components/modals/createServerModal";
import { InviteModal } from "../modals/inviteModal";
import { useEffect, useState } from "react";
import { EditServerModal } from "../modals/editServerModal";
import { MembersModal } from "../modals/membersModal";
import { CreateChannelModal } from "../modals/createChannelModel";
import { LeaveServerModal } from "../modals/leaveServerModal";

const ModalProvider = () => {
  const [isMounted,setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  },[]);

  if(!isMounted) return null;

  return (
    <>
      <CreateServerModal />
      <InviteModal />
      <EditServerModal />
      <MembersModal />
      <CreateChannelModal />
      <LeaveServerModal />
    </>
  );
};

export default ModalProvider;
