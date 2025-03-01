"use client"

import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import Link from "next/link"
import { Eye, EyeClosed } from "lucide-react"
import { useState } from "react"
import { signUp } from "@/lib/actions/auth"
import { useRouter } from "next/navigation"

type SignupFormData = {
  fullName: string;
  email: string;
  password: string;
}

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>()

  const router = useRouter()

  const submitForm = async (data: SignupFormData) => {
    const result = await signUp(data)
    if (result.success) {
      console.log("Success")
      router.push("/bookmarks")
    }
  }

  const [showPasswords, setShowPasswords] = useState(false)

  return (
      <>
        <div className="grid gap-1 text-center">
          <h2 className="font-bold text-4xl">Signup</h2>
          <div className="flex items-center gap-1 justify-center">
            <p>Already have an account?</p>
            <Link href="/login" className="text-pink-600 hover:underline">
              Login
            </Link>
          </div>
        </div>

        <form
            className="grid gap-3 items-start"
            onSubmit={handleSubmit(submitForm)}
        >
          <div className="grid gap-1">
            <label className="font-bold">Full Name:</label>
            <Input
                {...register("fullName", {
                  required: "Full name is required",
                })}
                className="border focus:ring-2 rounded-2xl bg-gray-100 shadow-sm"
                placeholder="Full Name"
                type="text"
            />
            {errors.fullName && (
                <p className="text-red-500 text-sm">
                  {String(errors.fullName.message)}
                </p>
            )}
          </div>
          <div className="grid gap-1">
            <label className="font-bold">Email address:</label>
            <Input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Invalid email address",
                  },
                })}
                className="border focus:ring-2 rounded-2xl bg-gray-100 shadow-sm"
                placeholder="name@mail.com"
                type="email"
            />
            {errors.email && (
                <p className="text-red-500 text-sm">
                  {String(errors.email.message)}
                </p>
            )}
          </div>

          <div className="grid gap-1">
            <div className="flex items-center justify-between">
              <label className="font-bold">Password:</label>
              <div
                  className="text-gray-900 cursor-pointer"
                  onClick={() => setShowPasswords((prev) => !prev)}
              >
                {showPasswords ? <Eye /> : <EyeClosed />}
              </div>
            </div>
            <Input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long",
                  },
                })}
                className="border focus:ring-2 rounded-2xl bg-gray-100 shadow-sm"
                placeholder="********"
                type={showPasswords ? "text" : "password"}
            />
            {errors.password && (
                <p className="text-red-500 text-sm">
                  {String(errors.password.message)}
                </p>
            )}
          </div>

          <Button type="submit" className="flex items-center gap-2">
            <p>Submit</p>
          </Button>
        </form>

        <div className="grid gap-1">
          <p className="text-center text-gray-700">OR</p>
          <div className="w-5/6 md:w-3/4 mx-auto p-3 border cursor-pointer rounded-2xl bg-gray-100 hover:bg-gray-200 shadow-sm">
            <div className="flex items-center justify-center gap-2">
              <Image
                  src="/google.svg"
                  alt="Google signing"
                  height={24}
                  width={24}
              />
              <p className="text-lg">Continue with Google</p>
            </div>
          </div>
        </div>
      </>
  )
}

export default SignupPage
