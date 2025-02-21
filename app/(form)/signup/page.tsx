import { Input } from "@/components/ui/input"
import { Lock } from "iconsax-react"
import { Eye, Key, LockIcon, Mail, User } from "lucide-react"
import Link from "next/link"

const page = () => {
  return (
    <div className="grid gap-6">
      <div className="grid gap-1 text-center">
        <h2 className="font-bold text-3xl">Signup</h2>
        <div className="flex items-center gap-1 justify-center">
          <p>Already have an account</p>
          <Link href="/login" className="color-pink hover:underline ">Login</Link>
          </div>
      </div>
      <div className="grid gap-2">
        <div className="grid gap-2 grid-cols-2">
          <div className="p-3 border-1 rounded-md bg-white shadow-sm">
            <div className="flex items-center">
              <User className="text-gray-700"/>
              <Input placeholder="First Name" type="text"/>
            </div>
          </div>
          <div className="p-3 border-1 rounded-md bg-white shadow-sm">
            <div className="flex items-center">
              <User className="text-gray-700"/>
              <Input placeholder="Last Name" type="text"/>
            </div>
          </div>
        </div>
        <div className="p-3 border-1 rounded-md bg-white shadow-sm">
            <div className="flex items-center">
              <Mail className="text-gray-700"/>
              <Input placeholder="Email Address" type="email"/>
            </div>
        </div>
        <div className="p-3 border-1 rounded-md bg-white shadow-sm">
            <div className="flex items-center">
              <Key className="text-gray-700"/>
              <Input placeholder="Your password" type="password" />
              <Eye />
            </div>
        </div>
        <div className="p-3 border-1 rounded-md bg-white shadow-sm">
            <div className="flex items-center">
              <Key className="text-gray-700"/>
              <Input placeholder="Repeat password" type="password"/>
                <Eye />
            </div>
          </div>
      </div>
    </div>
  )
}

export default page