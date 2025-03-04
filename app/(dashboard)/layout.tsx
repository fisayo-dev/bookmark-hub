import React, { ReactNode } from "react"
import Sidebar from '@/components/sidebar'
import ResponsiveHeader from "@/components/ResponsiveHeader";

interface LayoutProps {
  children: ReactNode
}

export const metadata = { 
  title: "Dashboard - Bookmark Hub ",
  description: "A bookmark store for your favorite links",
}

const layout = ({ children }: LayoutProps ) => {
  return (
    <div className="md:flex items-start justify-start">
      <Sidebar />   
      <div className=" md:w-[79vw] h-[100vh] p-6 overflow-scroll">
          <ResponsiveHeader />
          {children}
      </div>
    </div>
  )
}

export default layout