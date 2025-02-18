import Header from "@/components/header"
import { ReactNode } from "react"

interface LayoutProps {
    children: ReactNode
}
const layout = ({children}: LayoutProps) => {
    return (
      <div>
            <Header />
            <div className="app-container py-6">
                {children}
            </div>
    </div>
  )
}

export default layout