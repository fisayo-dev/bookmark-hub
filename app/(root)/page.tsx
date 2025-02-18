"use client"
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";

const Ship = dynamic(() => import("iconsax-react").then((mod) => mod.Ship), { ssr: false });
const SearchNormal = dynamic(() => import("iconsax-react").then((mod) => mod.SearchNormal), { ssr: false });

export default function Home() {
  return (
    <div className="grid md:flex md:my-0 my-10 gap-5 md:justify-between items-center">
      <div className="grid gap-4 md:text-left md:place-items-start place-items-center text-center">
        <h2 className="lg:text-5xl text-4xl capitalize font-bold">
          Bookmark Hub - Save Links Instantly
        </h2>
        <p className="text-[0.82rem] sm:text-[1rem]">
          Effortlessly save and organize your favorite links—just type in the URL and keep your bookmarks handy.
        </p>
        <div className="flex my-3 gap-2 place-items-center items-center justify-center">
          <Link href="/signup">
            <button 
              className="shadow-md text-[0.8rem] md:text-[1rem] px-4 py-3 flex items-center gap-2 border border-gray-500 rounded-full bg-yellow hover-dark-bg-yellow"
            >
              <Ship size="20" color="black"/>
              <p>Get Started</p>
            </button>
          </Link>
          <Link href="/features">
            <button className="shadow-md text-[0.8rem] md:text-[1rem] px-4 py-3 flex gap-2 items-center rounded-full border border-gray-500 hover-dark-bg-yellow">
              <SearchNormal size="20"  color="black"/>
              <p>Explore Features</p>
            </button>
          </Link>
        </div>
      </div>
      <Image
        src="bookmark.svg"
        width={500}
        height={500}
        alt="Not found page"
        className="grid md:mr-auto md:place-items-end place-items-center mx-auto justify-end items-center w-9/12 md:w-6/12"
      />
    </div>
  );
}
