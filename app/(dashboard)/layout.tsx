import React, { ReactNode } from "react"

interface LayoutProps {
  children: ReactNode
}

const layout = ({ children }: LayoutProps ) => {
  return (
      <div>
          <h2 className="text-2xl">Dashboard</h2>
          {children}
    </div>
  )
}

export default layout