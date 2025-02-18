import React, { ReactNode } from "react"
import Sidebar from '@/components/sidebar'

interface LayoutProps {
  children: ReactNode
}

const layout = ({ children }: LayoutProps ) => {
  return (
    <div className="flex items-start justify-start">
      <Sidebar />   
      <div className="w-[75vw] h-[100vh]">
      {children}
      </div>
    </div>
  )
}

export default layout