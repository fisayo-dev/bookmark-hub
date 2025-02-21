import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, Key, Mail, User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const page = () => {
  return (
    <div className="grid gap-6">
      <div className="grid gap-1 text-center">
        <h2 className="font-bold text-4xl">Signup</h2>
        <div className="flex items-center gap-1 justify-center">
          <p>Already have an account</p>
          <Link href="/login" className="color-pink hover:underline ">Login</Link>
        </div>
      </div>
      <div className="grid gap-3">
        <div className="grid gap-3 grid-cols-2">
          <div className="p-3 border-1 rounded-2xl bg-gray-100 shadow-sm">
            <div className="flex items-center">
              <User className="text-gray-700"/>
              <Input placeholder="First Name" type="text"/>
            </div>
          </div>
          <div className="p-3 border-1 rounded-2xl bg-gray-100 shadow-sm">
            <div className="flex items-center">
              <User className="text-gray-700"/>
              <Input placeholder="Last Name" type="text"/>
            </div>
          </div>
        </div>
        <div className="p-3 border-1 rounded-2xl bg-gray-100 shadow-sm">
            <div className="flex items-center">
              <Mail className="text-gray-700"/>
              <Input placeholder="Email Address" type="email"/>
            </div>
        </div>
        <div className="p-3 border-1 rounded-2xl bg-gray-100 shadow-sm">
            <div className="flex items-center">
              <Key className="text-gray-700"/>
              <Input placeholder="Your password" type="password" />
              <Eye />
            </div>
        </div>
        <div className="p-3 border-1 rounded-2xl bg-gray-100 shadow-sm">
            <div className="flex items-center">
              <Key className="text-gray-700"/>
              <Input placeholder="Repeat password" type="password"/>
                <Eye />
            </div>
        </div>
      </div>
        <Button className="flex items-center gap-2">
          <p>Submit</p>
      </Button>
      <div className="grid gap-2">

      <p className="text-center text-gray-700">OR</p>
      <div className="md:w-2/4 md:mx-auto p-3 border-1 cursor-pointer rounded-2xl bg-gray-100 hover:bg-gray-200 shadow-sm">
        <div className="flex items-center justify-center gap-2">
          <Image
            src="/google.svg"
            alt="Google signing"
            height={24}
            width={24} />
          <p className="text-lg">Continue with Google</p>  
        </div>       
      </div>
    </div>
  </div>
  )
}

export default page