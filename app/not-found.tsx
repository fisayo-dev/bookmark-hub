import Header from "@/components/header"
import Image from "next/image"
const notFound = () => {
  return (
    <div>
      <Header />
      <div className="app-container">
        <div className="flex text-center flex-col justify-center">
        <Image
          src="not-found.svg"
            width={500}
            height={300}
            className="mx-auto"
            alt="Not Found"
          />
          <h2 className="text-4xl font-bold">Oops</h2>
          <p className="text-sm">The page you are looking for doesn&apos;t seem to exist</p>
          </div>
      </div>
    </div>
  )
}

export default notFound