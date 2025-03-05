import React from 'react'
import ProfileCard from "@/components/dashboard/ProfileCard";
import Image from "next/image";
import {BookmarkIcon, FlameIcon, StarIcon} from "lucide-react";
import {auth} from "@/auth";

const page = async () => {
    const progressItems: ProgressItems[] = [
        {
            text: "Bookmarks",
            icon: <BookmarkIcon className="h-4 2-4"/>,
            value: 26,
        },
        {
            text: "Streaks",
            icon: <FlameIcon className="h-4 2-4"/>,
            value: 10,
        },
        {
            text: "Favorites",
            icon: <StarIcon className="h-4 2-4"/>,
            value: 5,
        }
    ]
    const session = await auth()
    console.log(session)
  return (
      <div className="my-10">
        <div className="grid gap-4">
          <div className='app-container flex items-center justify-between'>
            <h2 className=" text-4xl color-pink font-bold">Profile</h2>
          </div>
          <div className="app-container profile-section-grid py-4">
              <ProfileCard className="border p-2  border-gray-200 rounded-2xl">
                  <div className="flex flex-col p-2 text-center items-center gap-2">
                      <Image
                        src="google.svg"
                        width={150}
                        height={150}
                        alt="profile"
                      />
                      <div>
                          <h2 className="text-2xl font-bold">{session?.user?.name}</h2>
                          <p>{session?.user?.email}</p>
                          <p className="text-sm text-gray-800">Joined Dec 9, 2025</p>
                      </div>
                  </div>
              </ProfileCard>
              <ProfileCard>
                  <div className="grid gap-4">
                      <div className="grid gap-2">
                          <h2 className="text-2xl font-bold">Progress</h2>
                          <div className="grid gap-2 md:gap-4 py-2 grid-cols-3">
                              {progressItems.map((item,index) => (
                                  <div key={index} className="border border-gray-200 p-4 rounded-2xl gap-4 .flex flex-col items-center text-center">
                                      <div className="text-gray-800 flex items-center justify-center">
                                          <p>{item.icon}</p>
                                          <p className="text-sm">{item.text}</p>
                                      </div>
                                      <h2 className="text-6xl md:text-8xl py-6 font-bold">{item.value}</h2>
                                  </div>
                              ))}
                          </div>
                      </div>
                  </div>
              </ProfileCard>
          </div>
        </div>
      </div>
  )
}

export default page