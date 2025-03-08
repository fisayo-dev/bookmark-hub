"use server"

import {auth} from "@/auth";

export const getUserId = async (): Promise<string> => {
    const session = await auth();
    return session?.user?.id as string ?? null;
};
