import { Menu } from "iconsax-react"
import Link from "next/link"
import BookmarkHub from '@/components/logo'

interface Links  {
    name: string,
    url: string,
}

const header = () => {
    const links: Links[] = [
        {
            name: 'Contact',
            url: '/contact',
        },
        {
            name: 'Signup',
            url: '/signup',
        },            
        {
            name: 'Login',
            url: '/login',
        }            
    ]
  return (
    <div className="app-container py-6">
          <div className="flex items-center justify-between">
              <BookmarkHub />
              <div className="hidden md:flex items-center gap-6">
                  {links.map((link, index) => (
                        <Link key={index} href={link.url} className="border-b-transparent border-b-[0.15rem] hover:border-b-gray-900">{link.name}</Link>
               ))}
              </div>
              <div className="flex md:hidden">
                  <Menu className="h-6 w-6" />
              </div>
          </div>
      </div>
  )
}

export default header