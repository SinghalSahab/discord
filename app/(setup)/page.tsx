import React from 'react'
import { initialProfile } from '@/lib/initial-profile'
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';
import {InitialModal} from '@/components/modals/InitialModal';

const SetupPage =  async() => {
    const profile = await initialProfile();

     const server = await db.server.findFirst({
        where: {
            members:{
                some: {
                    profileId: profile.id,
                },
            }
           
        },
     })

     if(server) return redirect(`/servers${server.id}`);
  return (
    <div className='flex justify-center items-center h-200vh w-full bg-red-700'>
        <InitialModal />
    </div>
       
    
  )
}

export default SetupPage