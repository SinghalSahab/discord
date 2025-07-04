import React from "react";
import { redirect } from "next/navigation";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { getOrCreateConversation } from "@/lib/conversation";
import ChatHeader from "@/components/chat/ChatHeader";
import ChatMessages from "@/components/chat/ChatMessages";
import ChatInput from "@/components/chat/ChatInput";
import { MediaRoom } from "@/components/mediaRoom";


interface MemberIdPageProps {
    params: {
      memberId: string;
      serverId: string;
    };
    searchParams: {
      video?: boolean;
    };
  }


const MemberIdPage = async ({
  params: { memberId, serverId },
  searchParams: { video }
}: MemberIdPageProps) => {

    const profile = await currentProfile();
    if(!profile) redirect('/sign-in')

        const currentMember = await db.member.findFirst({
            where:{
                serverId,
                profileId:profile.id
            },
            include:{
                profile:true
            }
        })

        if(!currentMember) return redirect('/');

        const conversation = await getOrCreateConversation(
            currentMember.id,
            memberId
        )

        if (!conversation) return redirect(`/servers/${serverId}`);

        const {memberOne,memberTwo} = conversation;

        const otherMember =
    memberOne.profileId === profile.id ? memberTwo : memberOne;

  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
    <ChatHeader
      imageUrl={otherMember.profile.imageUrl}
      name={otherMember.profile.name}
      serverId={serverId}
      type="conversation"
    />
       {video &&(
        <MediaRoom
          chatId={conversation.id}
          video={video}
          audio={video}
        />
       )}
       {!video && (
        <>
         <ChatMessages
            member={currentMember}
            name={otherMember.profile.name}
            chatId={conversation.id}
            type="conversation"
            apiUrl="/api/direct-messages"
            paramKey="conversationId"
            paramValue={conversation.id}
            socketUrl="/api/socket/direct-messages"
            socketQuery={{
              conversationId: conversation.id
            }}
          />
          <ChatInput
            name={otherMember.profile.name}
            type="conversation"
            apiUrl="/api/socket/direct-messages"
            query={{
              conversationId: conversation.id
            }}
          />
            </>
            )}
    </div>
  )
}

export default MemberIdPage