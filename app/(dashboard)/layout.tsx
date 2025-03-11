import React, { ReactNode } from "react"
import Sidebar from '@/components/sidebar'
import ResponsiveHeader from "@/components/ResponsiveHeader";
import {auth} from "@/auth";
import {redirect} from "next/navigation";

interface LayoutProps {
  children: ReactNode
}

export const metadata = { 
  title: "Dashboard - Bookmark Hub ",
  description: "A bookmark store for your favorite links",
}

const layout = async ({ children }: LayoutProps ) => {
    const session = await auth()
    if(!session) redirect('/login')
  return (
    <div className="lg:flex items-start justify-start">
      <Sidebar />   
      <div className="relative lg:w-[79vw] h-[100vh] overflow-x-hidden overflow-y-scroll">
          <ResponsiveHeader />
          <div className="py-10">
            {children}
          </div>
      </div>
    </div>
  )
}

export default layout