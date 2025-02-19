import {Input} from '@/components/ui/input'
import { SearchIcon } from 'lucide-react'
const pages = () => {
  return (
    <div className="my-10">
      <div className="grid gap-4">
        <h2 className="text-4xl text-center color-pink font-bold">My Bookmarks</h2>
        <div className="flex-items-center gap-4 app-container">
          <div className="bg-gray-100 p-3 rounded-2xl">
            <div className="flex items-center">
              <SearchIcon className='h-6 w-6 text-gray-400'/>
              <Input placeholder='Search for you bookmark 😎'/>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default pages