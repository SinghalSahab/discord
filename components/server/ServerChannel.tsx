"use client";

import React from "react";
import { Channel, ChannelType, MemberRole, Server } from "@prisma/client";
import { Edit, Hash, Lock, Mic, Trash, Video } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";


interface ServerChannelProps {
    channel: Channel;
    server: Server;
    role?: MemberRole;
  }
const ServerChannel = ({channel, server, role}: ServerChannelProps) => {
  return (
    <div>ServerChannel</div>
  )
}

export default ServerChannel