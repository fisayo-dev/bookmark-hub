import React from 'react';
import ProfileCard from "@/components/dashboard/ProfileCard";
import Image from "next/image";
import { BookmarkIcon, FlameIcon, StarIcon } from "lucide-react";
import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import config from '@/lib/config';

export async function generateMetadata(): Promise<Metadata> {
    const session = await auth();
    return {
        title: session?.user?.name ? `${session.user.name}'s Profile` : "User Profile",
        description: session?.user?.name ? `This is ${session.user.name}'s profile page. Her bookmark hub email is ${session.user.email}` : "User Profile description",
    };
}

const Page = async () => {
    const session = await auth();
    const userId = session?.user?.id as string;

    // Getting user bookmarks length
    const bookmarkData = await fetch(`${config.env.apiUrl}/api/bookmarks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
        next: { revalidate: 60 }, // Cache data for 1 minute
    });

    if (!bookmarkData.ok) return [];
    let userBookmarks: Bookmark[] = await bookmarkData.json();
    const userBookmarkLength = userBookmarks.length;

    // Getting user details
    const userResponse = await fetch(`${config.env.apiUrl}/api/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
        next: { revalidate: 60 }, // Cache data for 1 minute
    });
    const userData = await userResponse.json();

    // Format the join date based on userData.createdAt
    const joinedDate = userData?.createdAt
        ? new Date(userData.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        })
        : "N/A";

    const progressItems = [
        {
            text: "Bookmarks",
            icon: <BookmarkIcon className="h-4 w-4" />,
            value: userBookmarkLength,
        },
        {
            text: "Streaks",
            icon: <FlameIcon className="h-4 w-4" />,
            value: 10,
        },
        {
            text: "Favorites",
            icon: <StarIcon className="h-4 w-4" />,
            value: 5,
        },
    ];

    return (
        <div className="my-10">
            <div className="grid gap-4">
                <div className="app-container flex items-center justify-between">
                    <h2 className="text-4xl color-pink font-bold">Profile</h2>
                    <form
                        action={async () => {
                            "use server";
                            await signOut();
                        }}
                    >
                        <Button>Logout</Button>
                    </form>
                </div>
                <div className="app-container profile-section-grid py-4">
                    <ProfileCard className="border p-2 border-gray-200 rounded-2xl">
                        <div className="flex flex-col p-2 text-center items-center gap-2">
                            <Image src="google.svg" width={70} height={70} alt="profile" />
                            <div>
                                <h2 className="text-2xl font-bold">{userData?.fullName}</h2>
                                <p>{userData?.email}</p>
                                <p className="text-sm text-gray-800">Joined {joinedDate}</p>
                            </div>
                        </div>
                    </ProfileCard>
                    <ProfileCard>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <h2 className="text-2xl font-bold">Progress</h2>
                                <div className="grid gap-2 md:gap-4 py-2 grid-cols-3">
                                    {progressItems.map((item, index) => (
                                        <div
                                            key={index}
                                            className="border border-gray-200 p-4 rounded-2xl gap-4 flex flex-col items-center text-center"
                                        >
                                            <div className="text-gray-800 flex items-center justify-center gap-1">
                                                <p>{item.icon}</p>
                                                <p className="text-sm">{item.text}</p>
                                            </div>
                                            <h2 className="text-6xl md:text-8xl py-3 font-bold">
                                                {item.value}
                                            </h2>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </ProfileCard>
                </div>
            </div>
        </div>
    );
};

export default Page;
