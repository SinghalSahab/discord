
import { CreateServerModal } from "@/components/modals/createServerModal";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

interface ServerIdPageProps {
  params: {
    serverId: string;
  };
}

export default async function ServerIdPage({ params }: ServerIdPageProps) {

    
    return (
        <div className="h-full">
        <div className="flex flex-col h-full">
            <div className="flex-1">
            
            </div>
        </div>
        </div>
    );
}