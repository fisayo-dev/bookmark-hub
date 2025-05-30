"use client"
import Image from "next/image";
import Link from "next/link";
import {RocketIcon, SearchIcon} from "lucide-react";

export default function Home() {
  return (
    <div className="grid md:flex md:my-0 my-10 gap-5 md:justify-between items-center">
      <div className="md:py-20 grid gap-4 md:text-left md:place-items-start place-items-center text-center">
        <h2 className="lg:text-6xl text-5xl capitalize font-extrabold">
          Bookmark Hub - Save Links Instantly
        </h2>
        <p className="text-[0.82rem] sm:text-[1rem]">
          Effortlessly save and organize your favorite links—just type in the URL and keep your bookmarks handy.
        </p>
        <div className="flex my-3 gap-2 place-items-center items-center justify-center">
          <Link href="/signup">
            <button 
              className="bg-pink hover-dark-bg-pink text-white shadow-md text-[0.8rem] md:text-[1rem] px-4 py-3 flex items-center gap-2 border border-gray-500 rounded-full bg-yellow hover-dark-bg-yellow"
            >
              <RocketIcon size="20" color="white"/>
              <p>Get Started</p>
            </button>
          </Link>
          <Link href="/bookmarks">
            <button className="bg-gray-200 hover:bg-gray-300 shadow-md text-[0.8rem] md:text-[1rem] px-4 py-3 flex gap-2 items-center rounded-full border border-gray-500 hover-dark-bg-yellow">
              <SearchIcon size="20"  color="black"/>
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
        draggable={false}
        className="grid md:mr-auto md:place-items-end place-items-center mx-auto justify-end items-center w-9/12 md:w-6/12"
      />
    </div>
  );
}
