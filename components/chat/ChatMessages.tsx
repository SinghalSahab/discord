"use client"

import React, { Fragment, useRef } from "react";
import { Member, Message, Profile } from "@prisma/client";
import { Loader2, ServerCrash } from "lucide-react";
import { format } from "date-fns";

import  ChatWelcome  from "@/components/chat/ChatWelcome";
import  ChatItem  from "@/components/chat/ChatItem";
import { useChatQuery } from "@/hooks/useChatQuery";

import { useChatScroll } from "@/hooks/useChatScroll";
import { useChatSocket } from "@/hooks/useChatSocket";

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
    const queryKey = `chat:${chatId}`;
  const addKey = `chat:${chatId}:messages`;
  const updateKey = `chat:${chatId}:messages:update`;

  const chatRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useChatQuery({
      queryKey,
      apiUrl,
      paramKey,
      paramValue
    });

    useChatSocket({addKey,updateKey,queryKey});
    useChatScroll({
        chatRef,
        bottomRef,  
        shouldLoadMore: !isFetchingNextPage && !!hasNextPage,
        loadMore: fetchNextPage,
        count: data?.pages?.[0]?.items?.length ?? 0
    })
   if(status === "loading"){
    return (
        <div className="flex flex-col flex-1 justify-center items-center">
            <Loader2 className="h-7 w-7 my-4 text-zinc-500 animate-spin"/>
            <p className="text-zinc-500 text-xs dark:text-zinc-400">Loading messages...</p>
        </div>
    )
   }
   if(status === "error"){
    return (
        <div className="flex flex-col flex-1 justify-center items-center">
            <ServerCrash className="h-7 w-7 my-4 text-zinc-500"/>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Something went wrong!
        </p>
        </div>
    )
   }
  return (
    <div ref={chatRef} className="flex flex-col py-4 flex-1 overflow-y-auto">
        {!hasNextPage && <div className="flex-1"/>}
        {!hasNextPage && (<ChatWelcome name={name} type={type}/>)}
        {hasNextPage && (
            <div className="flex justify-center">
                {isFetchingNextPage ? (
                    <Loader2 className="h-6 w-6 text-zinc-500 animate-spin my-4"/>
                ):(
                    <button 
                      onClick={() => fetchNextPage()}
                     className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 text-xs my-4 dark:hover:text-zinc-300 transition" >
                        Load previous messages
                    </button>
                )}
            </div>
        )}
        <div className="flex flex-col-reverse mt-auto">
            {data?.pages?.map((group,i)=>(
                <Fragment key={i}>
                    {group?.items?.map((message:MessagesWithMemberWithProfile)=>(
                        <ChatItem
                        currentMember={member}
                        key={message.id}
                        id={message.id}
                        content={message.content}
                        fileUrl={message.fileUrl}
                        deleted={message.deleted}
                        isUpdated={message.updatedAt !== message.createdAt}
                        timestamp={format(new Date(message.createdAt),DATE_FORMAT)}
                        member={message.member}
                        socketUrl={socketUrl}
                        socketQuery={socketQuery}
                        />
                    ))}
                </Fragment>
            ))}
        </div>
        <div ref={bottomRef} />
    </div>
  )
}

export default ChatMessages