import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PlusCircle, SearchIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface Bookmark {
  link: string,
  title: string,
  description: string,
  tags: string[],
  image: string,
}
const BookmarkLists = () => { 
  const bookmarks: Bookmark[] = [
    {
      link: 'https://google.com',
      title: 'Google',
      description: 'Search engine',
      tags: ['search', 'engine'],
      image: 'https://google.com/favicon.ico'
    },
    {
      link: 'https://google.com',
      title: 'Google',
      description: 'Search engine',
      tags: ['search', 'engine'],
      image: 'https://google.com/favicon.ico'
    },
    {
      link: 'https://google.com',
      title: 'Google',
      description: 'Search engine',
      tags: ['search', 'engine'],
      image: 'https://google.com/favicon.ico'
    },
    {
      link: 'https://google.com',
      title: 'Google',
      description: 'Search engine',
      tags: ['search', 'engine'],
      image: 'https://google.com/favicon.ico'
    },
    {
      link: 'https://google.com',
      title: 'Google',
      description: 'Search engine',
      tags: ['search', 'engine'],
      image: 'https://google.com/favicon.ico'
    },
    {
      link: 'https://google.com',
      title: 'Google',
      description: 'Search engine',
      tags: ['search', 'engine'],
      image: 'https://google.com/favicon.ico'
    },
  ]
  return (  
    <div className='app-container'>
      <div className="py-4">
        <div className="grid grid-cols-4 gap-4">
          {bookmarks.map((bookmark, index) => ( 
              <div key={index} className="border overflow-hidden border-gray-200 rounded-2xl h-[35vh]">
                <div className="grid">
                  <Image
                    height={100}
                    width={100}
                    className='w-full'
                    src='not-found.svg'
                    alt={bookmark.title}
                  />
                  <div className="grid px-4">
                    <h2 className="text-2xl font-bold">{bookmark.title}</h2>
                    <p>{bookmark.description}</p>
                    <Link href={bookmark.link} className="text-sm hover:underline">Visit</Link>
                  </div>
                </div>
              </div>
          ))}
        </div>
      </div>
    </div>
  )

}


const pages = () => {
  return (
    <div className="my-10">
      <div className="grid gap-4">
        <h2 className="text-4xl text-center color-pink font-bold">My Bookmarks</h2>
        <div className="app-container">
          <div className="flex items-center gap-4">
            <div className="bg-gray-100 w-full p-3 rounded-2xl">
              <div className="flex items-center">
                <SearchIcon className='h-6 w-6 text-gray-400'/>
                <Input className='w-full' placeholder='Search for you bookmarks 😎'/>
              </div>
            </div>

            <Button className='flex items-center'>
              <PlusCircle className='h-8 w-8'/>
              <p>Create</p>
            </Button>
          </div>
        </div>
        <BookmarkLists/>
      </div>
    </div>
  )
}

export default pages