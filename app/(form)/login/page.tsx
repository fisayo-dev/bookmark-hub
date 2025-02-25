"use client"

import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import Link from "next/link"

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onSubmit = (data: any) => {
    console.log("Form Data:", data)
    // Send form data to backend API
  }

  return (
    <div className="grid gap-6 mx-auto px-4 w-full md:w-4/6">
      <div className="grid gap-1 text-center">
        <h2 className="font-bold text-4xl">Login</h2>
        <div className="flex items-center gap-1 justify-center">
          <p>You are new here?</p>
          <Link href="/signup" className="text-pink-600 hover:underline">Signup</Link>
        </div>
      </div>

      <form className="grid gap-3  items-start" onSubmit={handleSubmit(onSubmit)}>

        <div className="grid gap-1">
          <label className="font-bold">Email address:</label>
          <Input 
            {...register("email", { 
              required: "Email is required", 
              pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email address" } 
            })} 
            className="border rounded-2xl bg-gray-100 shadow-sm" 
            placeholder="name@mail.com" 
            type="email"
          />
          {errors.email && <p className="text-red-500 text-sm">{String(errors.email.message)}</p>}
        </div>

        <div className="grid gap-1">
          <label className="font-bold">Password:</label>
          <Input 
            {...register("password", { 
              required: "Password is required", 
              minLength: { value: 8, message: "Password must be at least 8 characters long" }
            })} 
            className="border rounded-2xl bg-gray-100 shadow-sm" 
            placeholder="Your password" 
            type="password"
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
    </div>
  )
}

export default LoginPage
