import React, { ReactNode } from "react"
import Sidebar from '@/components/sidebar'

interface LayoutProps {
  children: ReactNode
}

export const metadata = { 
  title: "Dashboard - Bookmark Hub ",
  description: "A bookmark store for your favorite links",
}

const layout = ({ children }: LayoutProps ) => {
  return (
    <div className="flex items-start justify-start">
      <Sidebar />   
      <div className="w-[79vw] h-[100vh] p-6 overflow-scroll">
      {children}
      </div>
    </div>
  )
}

export default layout