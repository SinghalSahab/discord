
import { currentUser} from "@clerk/nextjs/server";
import { auth } from '@clerk/nextjs/server';

import { db } from "./db";


export const initialProfile = async () => {
   
    const { redirectToSignIn } = await auth();

    const user = await currentUser();
    if (!user) {
        return redirectToSignIn();
    }
    const profile = await db.profile.findUnique({
        where: {
            userId: user.id,
        },
    });
    if(profile)
        return profile;
    
    const newProfile = await db.profile.create({
        data: {
            userId: user.id,
            name: `${user.firstName} ${user.lastName}`,
            email: user.emailAddresses[0].emailAddress,
            imageUrl: user.imageUrl,
        },
    });
    return newProfile;
};