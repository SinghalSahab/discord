
import { currentProfile } from '@/lib/current-profile';
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';
import React from 'react'
import { ChannelType, MemberRole } from '@prisma/client';
import ServerHeader from './ServerHeader';
import { ScrollArea } from '../ui/scroll-area';
import ServerSearch from './ServerSearch';
import { Hash, Mic, ShieldAlert, ShieldCheck, Video } from 'lucide-react';
import { Separator } from '../ui/separator';
import ServerSection from './ServerSection';
import ServerChannel from './ServerChannel';
import { ServerMember } from './ServerMember';


interface ServerSidebarProps {
    serverId: string;
}

const iconMap = {
  [ChannelType.TEXT]: <Hash className="h-4 w-4 mr-2"/>,
  [ChannelType.AUDIO]: <Mic className="h-4 w-4 mr-2"/>,
  [ChannelType.VIDEO]: <Video className="h-4 w-4 mr-2"/>,
}

const roleIconMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: <ShieldCheck className="h-4 w-4 mr-2 text-indigo-500"/>,
  [MemberRole.ADMIN]: <ShieldAlert className="h-4 w-4 mr-2 text-rose-500"/>
}
const ServerSidebar = async ({serverId}: ServerSidebarProps) => {

    const profile = await currentProfile();

    if(!profile)
    {
        return redirect('/');
    }

    const server = await db.server.findUnique({
        where: {
            id: serverId
        },
        include: {
            channels: {
                orderBy: {
                    createdAt: "asc"
                  }
                },
            members: {
                include: {
                    profile: true
                  },
                orderBy: {
                    role: "asc"
                  }
                }
            }
        });

        const textChannels = server?.channels.filter(
            (channel) => channel.type === ChannelType.TEXT
          );
          const audioChannels = server?.channels.filter(
            (channel) => channel.type === ChannelType.AUDIO
          );
          const videoChannels = server?.channels.filter(
            (channel) => channel.type === ChannelType.VIDEO
          );
        
          const members = server?.members.filter(
            (member) => member.profileId !== profile.id
          );
        

    if(!server)
    {
        return redirect('/');
    }

    const role = server.members.find(
        (member) => member.profileId === profile.id
      )?.role;

  return (
    <div className=' flex flex-col h-full w-full text-primary dark:bg-[#2B2D31] bg-[#f2f3f5]'>
        <ServerHeader server={server} role={role} />
        <ScrollArea className="px-3 flex-1">
            <div className='mt-2'>
              <ServerSearch 
              data={[
                {
                  label: "Text Channels",
                  type: "channel",
                  data: textChannels?.map((channel) => ({
                    id: channel.id,
                    name: channel.name,
                    icon: iconMap[channel.type]
                  }))
                },
                {
                  label: "Voice Channels",
                  type: "channel",
                  data: audioChannels?.map((channel) => ({
                    id: channel.id,
                    name: channel.name,
                    icon: iconMap[channel.type]
                  }))
                },
                {
                  label: "Video Channels",
                  type: "channel",
                  data: videoChannels?.map((channel) => ({
                    id: channel.id,
                    name: channel.name,
                    icon: iconMap[channel.type]
                  }))
                },
                {
                  label: "Members",
                  type: "member",
                  data: members?.map((member) => ({
                    id: member.id,
                    name: member.profile.name,
                    icon: roleIconMap[member.role]
                  }))
                }
              ]}
              />
            </div>
            <Separator className="bg-zinc-200 dark:bg-zinc-700 rounded-md my-2" />
            {!!textChannels?.length && (
              <div className='mb-2'>
                   <ServerSection
                   sectionType = "channels"
                   label="Text Channels"
                   channelType={ChannelType.TEXT}
                   role={role} />
                   <div className="space-y-[2px]">
                   {textChannels.map((channel) => (
                        <ServerChannel
                        key={channel.id}
                        channel={channel}
                        server={server}
                        role={role}
                        />
                   ))}
                   </div>
              </div>
            )}
            {!!audioChannels?.length && (
          <div className="mb-2">
            <ServerSection
              sectionType="channels"
              channelType={ChannelType.AUDIO}
              role={role}
              label="Voice Channels"
            />
            <div className="space-y-[2px]">
              {audioChannels.map((channel) => (
                <ServerChannel
                  key={channel.id}
                  channel={channel}
                  role={role}
                  server={server}
                />
              ))}
            </div>
          </div>
        )}
        {!!videoChannels?.length && (
          <div className="mb-2">
            <ServerSection
              sectionType="channels"
              channelType={ChannelType.VIDEO}
              role={role}
              label="Video Channels"
            />
            <div className="space-y-[2px]">
              {videoChannels.map((channel) => (
                <ServerChannel
                  key={channel.id}
                  channel={channel}
                  role={role}
                  server={server}
                />
              ))}
            </div>
          </div>
        )}
        {!!members?.length && (
          <div className="mb-2">
            <ServerSection
              sectionType="members"
              role={role}
              label="Members"
              server={server}
            />
            <div className="space-y-[2px]">
              {members.map((member) => (
                <ServerMember key={member.id} member={member}  />
              ))}
            </div>
          </div>
        )}
        </ScrollArea>
    </div>
  )
}

export default ServerSidebar