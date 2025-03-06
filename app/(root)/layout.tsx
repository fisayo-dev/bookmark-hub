import Header from "@/components/header"
import { ReactNode } from "react"
import {auth} from "@/auth";
import {redirect} from "next/navigation";
import {SessionProvider} from "next-auth/react";

interface LayoutProps {
    children: ReactNode
}
const layout = async ({children}: LayoutProps) => {
    const session = await auth()
    if (session) redirect('/bookmarks')

    return (
      <div>
          <SessionProvider  session={session}>
                <Header />
                <div className="app-container py-6">
                    {children}
                </div>
          </SessionProvider>
    </div>
  )
}

export default layout