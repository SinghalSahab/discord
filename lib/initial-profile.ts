
'use client'
import { currentUser} from "@clerk/nextjs/server";
import {RedirectToSignIn} from '@clerk/nextjs'
import { db } from "./db";

export const initialProfile = async () => {
    const user = await currentUser();
    if (!user) {
        return <RedirectToSignIn />;
    }
    const profile = await db.profile.findUnique({
        where: {
            id: user.id,
        },
    });
    if(profile)
        return profile;
    
    const newProfile = await db.profile.create({
        data: {
            userId: user.id,
            name: `${user.firstName} ${user.lastName}`,
            email: user.emailAddresses[0].emailAddress,
            imageUrk: user.imageUrl,
        },
    });
    return newProfile;
};