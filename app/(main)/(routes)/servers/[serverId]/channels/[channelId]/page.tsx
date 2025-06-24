import ChatHeader from "@/components/chat/ChatHeader";
import ChatInput from "@/components/chat/ChatInput";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
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
            <div className="flex-1">
                Future medc
            </div>
            <ChatInput 
            name={channel.name}
            type="channel" 
            apiUrl="/api/socket/messages" 
            query={{ 
                channelId:channel.id,
                serverId:channel.serverId
             }}/>
        </div>
    )
}

export default ChannelIdPage