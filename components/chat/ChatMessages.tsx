"use client"

import React, { Fragment, useRef, ElementRef } from "react";
import { Member, Message, Profile } from "@prisma/client";
import { Loader2, ServerCrash } from "lucide-react";
import { format } from "date-fns";

import  ChatWelcome  from "@/components/chat/ChatWelcome";
import  ChatItem  from "@/components/chat/ChatItem";
import { useChatQuery } from "@/hooks/use-chat-query";
import { useChatSocket } from "@/hooks/use-chat-socket";
import { useChatScroll } from "@/hooks/use-chat-scroll";

interface ChatMessagesProps {
  name: string;
  member: Member;
  chatId: string;
  apiUrl: string;
  socketUrl: string;
  socketQuery: Record<string, string>;
  paramKey: "channelId" | "conversationId";
  paramValue: string;
  type: "channel" | "conversation";
}

type MessagesWithMemberWithProfile = Message & {
  member: Member & {
    profile: Profile;
  };
};

const DATE_FORMAT = "d MMM yyyy, HH:mm";

const ChatMessages = ({  name,
    member,
    chatId,
    apiUrl,
    socketUrl,
    socketQuery,
    paramKey,
    paramValue,
    type
  }: ChatMessagesProps) => {
  return (
    <div className="flex flex-col py-4 flex-1 overflow-y-auto">
        <div className="flex-1"/>
        <ChatWelcome name={name} type={type}/>
    </div>
  )
}

export default ChatMessages