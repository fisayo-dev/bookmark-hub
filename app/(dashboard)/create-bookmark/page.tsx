import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {LinkIcon, BookmarkIcon, PlusCircle} from 'lucide-react'
import React from 'react'
import Link from "next/link";

const page = () => {
  return (
    <div className="my-10">
      <div className="grid gap-4">
        <div className='app-container flex items-center justify-between'>
          <h2 className="text-4xl color-pink font-bold ">Create</h2>
          <div className='p-3 rounded-2xl bg-gray-100 hover:bg-gray-200 cursor-pointer'>
            <Link href="/bookmarks" className='flex items-center justify-center gap-1'>
              <p className='text-sm'>Go to bookmarks</p>
            </Link>
          </div>
        </div>
        <div className="app-container">
          <div className="flex items-center py-4 gap-4">
            <div className="bg-gray-100 w-full px-4 py-3 rounded-2xl">
              <div className="flex items-center gap-2">
                <LinkIcon className='h-6 w-6 text-gray-400'/>
                <Input className='w-full px-0 py-1'
                       placeholder='Type in the link of the web page you want to bookmark'/>
              </div>
            </div>
            <Button className='flex items-center'>
              <PlusCircle className='h-8 w-8'/>
              <p>Create</p>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page