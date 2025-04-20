import ServerSidebar from "@/components/server/serverSidebar";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

import { redirect } from "next/navigation";




export default async function ServerIdLayout({
    children,
    params
  }: {
    children: React.ReactNode;
    params: { serverId: string };
  }) {

    const profile = await currentProfile();
    if(!profile)
    {
        return redirect('/sign-in');
    }

    const server = await db.server.findUnique({
        where: {
            id: params.serverId,
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    })
    if(!server)
    {
        return redirect('/');
    }

    return (
        <div className="h-full">
      <div className="md:flex block bg-gray-800 text-white h-screen w-60 fixed">
       <ServerSidebar serverId={params.serverId} />
      </div>
      <main className="h-full md:pl-60">{children}</main>
    </div>
    )
  }