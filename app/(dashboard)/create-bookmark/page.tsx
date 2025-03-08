"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {LinkIcon, PlusCircle, Loader2} from 'lucide-react'
import React, {useState} from 'react'
import Link from "next/link";
import { addBookmark } from '@/lib/actions/bookmark'
import { getUserId } from '@/lib/actions/general'
import { useRouter} from "next/navigation";




const page =  () => {
  const [url, setUrl]  = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const createBookmark  = async (event: React.FormEvent) => {
    event.preventDefault()
    const userId = await getUserId()
    if(!url) return;

    setLoading(true)
    try {
      const metaDataResponse = await fetch(`/api/getMeta?url=${encodeURIComponent(url)}`, {
        next: { revalidate: 300 }, // Backend caches data for 5 minutes
      });
      const data = await metaDataResponse.json();

      await addBookmark({
        url,
        name: data?.title,
        owner: userId,
        image: data?.favicon,
        createdAt: new Date(),
      })
      router.push('/bookmarks')
    } catch(err) {
      alert(err)
    } finally {
      setLoading(false)
    }

  }
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
          <form onSubmit={createBookmark} className="flex items-center py-4 gap-4">
            <div className="bg-gray-100 w-full px-4 py-3 rounded-2xl">
              <div className="flex items-center gap-2">
                <LinkIcon className='h-6 w-6 text-gray-400'/>
                <Input className='w-full px-0 py-1'
                       placeholder='Type in the link of the web page you want to bookmark'
                       value={url}
                       onChange={(event) => setUrl(event.target.value)}
                />

              </div>
            </div>
            <Button className='flex items-center'>
              {loading ? <Loader2 className="h-6 w-6 animate-spin"/> : <PlusCircle className='h-8 w-8'/>}
              <p>{loading ? 'Creating..': 'Create'}</p>
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default page