interface InviteCodePageProps {
    params: Promise<{
        inviteCode: string;
    }>;
}


import { currentProfile } from '@/lib/current-profile';
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';


const InviteCodePage = async ({params}: InviteCodePageProps) => {
    const profile = await currentProfile();
    if(!profile) return redirect('/');

    const inviteCodeParams = await params;
    if(!inviteCodeParams.inviteCode) return redirect('/');

    const existionServer = await db.server.findFirst({
        where:{
            inviteCode: inviteCodeParams.inviteCode,
            members:{
                some:{
                    profileId: profile.id
                }
            }
        }
    })

    if(existionServer) return redirect(`/servers/${existionServer.id}`);

    const server = await db.server.update({
        where:{
            inviteCode: inviteCodeParams.inviteCode
        },
        data:{
            members:{
                create:[
                    {
                        profileId: profile.id,
                    }
                ]
            }
        }
    })

    if(server) return redirect(`/servers/${server.id}`);

    return null;
}

export default InviteCodePage