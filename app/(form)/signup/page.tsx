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
      <form className="grid gap-3">
          <div className="grid gap-3 grid-cols-2">
              <div className="grid gap-1">
                <label>First Name:</label>
                <Input className="border-1 rounded-2xl bg-gray-100 shadow-sm" placeholder="First Name" type="text"/>
              </div>
              <div className="grid gap-1">
                <label>Last Name:</label>
                <Input className="border-1 rounded-2xl bg-gray-100 shadow-sm" placeholder="Last Name" type="text"/>
              </div>
            </div>
            <div className="grid gap-1">
              <label>Email address:</label>
              <Input className="border-1 rounded-2xl bg-gray-100 shadow-sm" placeholder="name@mail.com" type="email"/>
            </div>
            <div className="grid gap-1">
              <label>Password:</label>
              <Input className="border-1 rounded-2xl bg-gray-100 shadow-sm" placeholder="Your password" type="password" />
            </div>
          <div className="grid gap-1">
            <label>Repeat password:</label>
            <Input className="border-1 rounded-2xl bg-gray-100 shadow-sm" placeholder="Repeat password" type="password"/>
          </div>
          <Button className="flex items-center gap-2">
            <p>Submit</p>
        </Button>
        </form>
      <div className="grid gap-1">
        <p className="text-center text-gray-700">OR</p>
        <div className="w-5/6 md:w-3/4 mx-auto p-3 border-1 cursor-pointer rounded-2xl bg-gray-100 hover:bg-gray-200 shadow-sm">
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