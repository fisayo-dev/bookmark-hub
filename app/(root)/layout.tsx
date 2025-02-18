import { Menu } from "iconsax-react"
import Link from "next/link"
import BookmarkHub from '@/components/logo'
import { ReactNode } from "react"

interface LayoutProps {
    children: ReactNode
}
const layout = ({children}: LayoutProps) => {
    return (
      <div>
      <div className="app-container py-6">
          <div className="flex items-center justify-between">
              <BookmarkHub />
              <div className="hidden md:flex items-center gap-6">
                  <Link href='/signup' className="border-b-transparent border-b-[0.15rem] hover:border-b-gray-900">Signup</Link>
                  <Link href="/login" className="border-b-transparent border-b-[0.15rem] hover:border-b-gray-900">Login</Link>
              </div>
              <div className="flex md:hidden">
                  <Menu className="h-6 w-6" />
              </div>
          </div>
      </div>
      { children }
    </div>
  )
}

export default layout