"use client"

import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Eye, EyeClosed } from "lucide-react"
import {signInWithCredentials} from "@/lib/actions/auth";
import {useRouter} from "next/navigation";


const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>()

  const router = useRouter()

  const submitForm = async (data: Pick<SignupFormData, 'email'| 'password'>) => {
    const result = await signInWithCredentials(data)
    if (result.success) {
      console.log("Success")
      router.push("/bookmarks")
    }
  }

  const [showPassword,setShowPassword] = useState(false)
  return (
    <>
      <div className="grid gap-1 text-center">
        <h2 className="font-bold text-4xl">Login</h2>
        <div className="flex items-center gap-1 justify-center">
          <p>You are new here?</p>
          <Link href="/signup" className="text-pink-600 hover:underline">Signup</Link>
        </div>
      </div>

      <form className="grid gap-3  items-start" onSubmit={handleSubmit(submitForm)}>

        <div className="grid gap-1">
          <label className="font-bold">Email address:</label>
          <Input 
            {...register("email", { 
              required: "Email is required", 
              pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email address" } 
            })} 
            className="border focus:ring-2 rounded-2xl bg-gray-100 shadow-sm"
            placeholder="name@mail.com" 
            type="email"
          />
          {errors.email && <p className="text-red-500 text-sm">{String(errors.email.message)}</p>}
        </div>

        <div className="grid gap-1">
        <div className="flex items-center justify-between">
            <label className="font-bold">Password:</label>
            <div className="text-gray-900 cursor-pointer" onClick={() => setShowPassword((prev) => !prev)}>
              {showPassword ? <Eye/> : <EyeClosed />  }
            </div>
          </div>
          <Input 
            {...register("password", { 
              required: "Password is required", 
              minLength: { value: 8, message: "Password must be at least 8 characters long" }
            })} 
            className="border focus:ring-2 rounded-2xl bg-gray-100 shadow-sm"
            placeholder="********" 
            type={showPassword ? 'text' : 
              'password'
            }
          />
          {errors.password && <p className="text-red-500 text-sm">{String(errors.password.message)}</p>}
        </div>


        <Button type="submit" className="flex items-center gap-2">
          <p>Submit</p>
        </Button>
      </form>

      <div className="grid gap-1">
        <p className="text-center text-gray-700">OR</p>
        <div className="w-5/6 md:w-3/4 mx-auto p-3 border cursor-pointer rounded-2xl bg-gray-100 hover:bg-gray-200 shadow-sm">
          <div className="flex items-center justify-center gap-2">
            <Image src="/google.svg" alt="Google signing" height={24} width={24} />
            <p className="text-lg">Continue with Google</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginPage
