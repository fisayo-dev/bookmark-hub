"use client"

import Link from "next/link"

const logo = () => {
  return (
    <Link href="/" className="flex py-2 items-center justify-between">
      <h1 className="color-pink text-2xl font-extrabold">BHub</h1>
    </Link>
  )
}

export default logo