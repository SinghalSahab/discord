"use client"

import { CreateServerModal } from "@/components/modals/createServerModal";
import { useModalStore } from "@/hooks/useModalStore";
import { InviteModal } from "../modals/inviteModal";
import { useEffect, useState } from "react";

const ModalProvider = () => {
  const [isMounted,setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  },[]);

  if(!isMounted) return null;

  return (
    <>
      <CreateServerModal />;
      <InviteModal />
    </>
  );
};

export default ModalProvider;
