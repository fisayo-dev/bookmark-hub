import Header from "@/components/header"
import { ReactNode } from "react"

interface LayoutProps {
    children: ReactNode
}
const layout = ({children}: LayoutProps) => {
    return (
      <div>
       <Header />
      { children }
    </div>
  )
}

export default layout