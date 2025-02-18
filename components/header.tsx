import { Menu } from "iconsax-react"
import Link from "next/link"
import BookmarkHub from '@/components/logo'

const header = () => {
  return (
    <div className="app-container py-6">
          <div className="flex items-center justify-between">
              <BookmarkHub />
              <div className="hidden md:flex items-center gap-6">
                  <Link href='/contact' className="border-b-transparent border-b-[0.15rem] hover:border-b-gray-900">Contact</Link>
                  <Link href="/developer" className="border-b-transparent border-b-[0.15rem] hover:border-b-gray-900">Developer</Link>
              </div>
              <div className="flex md:hidden">
                  <Menu className="h-6 w-6" />
              </div>
          </div>
      </div>
  )
}

export default header