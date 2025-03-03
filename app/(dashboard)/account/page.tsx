import React from 'react'
import ProfileCard from "@/components/dashboard/ProfileCard";
import Image from "next/image";

const page = () => {
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
                          <h2 className="text-2xl font-bold">Fisayo Obadina</h2>
                          <p>olufisayobadina@gmail.com</p>
                          <p className="text-sm text-gray-800">Joined Dec 9, 2025</p>
                      </div>
                  </div>
              </ProfileCard>
              <ProfileCard>
                  <div className="grid gap-4">
                      <div className="grid gap-2">
                          <h2 className="text-xl font-bold">Activity</h2>
                          <div></div>
                      </div>
                  </div>
              </ProfileCard>
          </div>
        </div>
      </div>
  )
}

export default page