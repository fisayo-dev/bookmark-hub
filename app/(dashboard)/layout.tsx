import React, { ReactNode } from "react"
import Sidebar from '@/components/sidebar'

interface LayoutProps {
  children: ReactNode
}

const layout = ({ children }: LayoutProps ) => {
  return (
    <div>
      <Sidebar />   
      <>
      {children}
      </>
    </div>
  )
}

export default layout