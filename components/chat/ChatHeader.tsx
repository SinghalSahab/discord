import React from "react";
import { Hash } from "lucide-react";

import MobileToggle from "../mobileToggle";

interface ChatHeaderProps {
  serverId: string;
  name: string;
  type: "channel" | "conversation";
  imageUrl?: string;
}

const ChatHeader = ({
  serverId,
  name,
  type,
  imageUrl
}: ChatHeaderProps) => {
  return (
    <div className="text-md font-semibold flex items-center px-3 h-12 border-neutral-200 dark:border-neutral-800 border-b-2">
        <MobileToggle serverId={serverId} />
        {type === "channel" && <Hash className="w-5 h-5 text-zinc-500 dark:text-zinc-400 mr-2"/> }
        <p className="text-md font-semibold text-black dark:text-white">
          {name}
        </p>
    </div>
  )
}

export default ChatHeader