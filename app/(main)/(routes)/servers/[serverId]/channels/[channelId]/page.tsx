import ChatHeader from "@/components/chat/ChatHeader";
import ChatInput from "@/components/chat/ChatInput";
import ChatMessages from "@/components/chat/ChatMessages";
import { MediaRoom } from "@/components/mediaRoom";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { ChannelType } from "@prisma/client";
import { redirect } from "next/navigation";


interface ChannelIdPageProps {
    params: {
        serverId: string;
        channelId: string;
    }
}

const ChannelIdPage = async ({
    params: { channelId, serverId }
  }: ChannelIdPageProps) => {
    const profile = await currentProfile();
    if(!profile) return redirect('sign-in');

    const channel = await db.channel.findUnique({
        where:{
            id:channelId,
        }
    })
        
    const member = await db.member.findFirst({
        where:{
            serverId: serverId,
            profileId: profile.id
        }
    })

    if(!member || !channel) return redirect('/');



    return (
        <div className="flex flex-col h-full dark:bg-[#313338] bg-white">
            <ChatHeader
            serverId={channel.serverId}
            name={channel.name}
            type="channel"
            />
            {channel.type === ChannelType.TEXT && (
                <>
                <ChatMessages
                member={member}
                name={channel.name}
                chatId={channel.id}
                type="channel"
            apiUrl="/api/messages"
            socketUrl="/api/socket/messages"
            socketQuery={{
              channelId: channel.id,
              serverId: channel.serverId
            }}
            paramKey="channelId"
            paramValue={channel.id}
          />
            <ChatInput 
            name={channel.name}
            type="channel" 
            apiUrl="/api/socket/messages" 
            query={{ 
                channelId:channel.id,
                serverId:channel.serverId
             }}/>
                </>
            )}
            {channel.type === ChannelType.VIDEO && (
                <MediaRoom
                chatId={channel.id}
                video
                audio
            />
            )}
            {channel.type === ChannelType.AUDIO && (
                <MediaRoom
                chatId={channel.id}
                video={false}
                audio
            />
            )}
        </div>
    )
}

export default ChannelIdPage