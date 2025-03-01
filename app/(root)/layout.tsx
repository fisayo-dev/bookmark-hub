import Header from "@/components/header"
import { ReactNode } from "react"
import {auth} from "@/auth";
import {redirect} from "next/navigation";

interface LayoutProps {
    children: ReactNode
}
const layout = async ({children}: LayoutProps) => {
    const session = await auth()
    if (session) redirect('/bookmarks')
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