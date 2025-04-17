import { currentProfile } from '@/lib/current-profile'
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';
import React from 'react'
import NavigationAction from './NavigationAction';
import { Separator } from '../ui/separator';
import { ScrollArea } from "@/components/ui/scroll-area"
import NavigationItem from './NavigationItem';
import { ModeToggle } from '../mode-toggle';
import { UserButton } from '@clerk/nextjs';
import ModalProvider from "@/components/providers/modalProvider";


const NavigationSidebar = async () => {
    const profile = await currentProfile();

    if(!profile) return redirect('/');
    const servers = await db.server.findMany({
        where: {
            members:{
                some: {
                    profileId: profile.id,
                },
            }
        },
    })
    if(!servers) return redirect('/');
  return (
    <div className='navme space-y-4 flex flex-col items-center h-full w-full text-primary dark:bg-[#1E1F22] py-3 z-50'>
        
        <NavigationAction />
        <Separator className='h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto'/>

        <ScrollArea className="flex-1 w-full4">
            {servers.map((server) => (
                <div key={server.id} className='mb-4'>
                    <NavigationItem
                        id={server.id}
                        name={server.name}
                        imageUrl={server.imageUrl}
                        />
                </div>
            ))}
         </ScrollArea>

         <div className='pb-3 mt-auto flex items-center flex-col gap-y-4'>
            <ModeToggle /> 
            <UserButton 
            appearance={{
                elements: {
                    userButtonAvatarBox: {
                        width: '3rem',
                        height: '3rem',
                      },
                }
            }}/>
         </div>

    </div>
  )
}

export default NavigationSidebar