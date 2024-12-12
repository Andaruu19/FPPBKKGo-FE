"use client";

import Link from "next/link";
import Image from "next/image";
import { FormEvent } from "react";

const Navbar = () => {
  return (
    <header className="antialiased">
      <div className="bg-neutral-800">
        <div className="container relative w-screen">
          <div
            id="navbar"
            className="navbar fixed z-50 flex w-screen items-center justify-between bg-zinc-900/[0.5] p-8 py-1 transition-opacity duration-300"
          >
            <section className="flex items-center">
              <Image
                className="w-32"
                src="/images/logo-main.png"
                alt="Logo"
                width={128}
                height={32}
              />
              <section className="flex gap-4 ps-3 text-white">
                <Link href="/" legacyBehavior>
                  <a className="text-s cursor-pointer ps-3">Home</a>
                </Link>
                <Link href="/movies" legacyBehavior>
                  <a className="text-s cursor-pointer ps-3">Films</a>
                </Link>
                <Link href="/albums" legacyBehavior>
                  <a className="text-s cursor-pointer ps-3">Albums</a>
                </Link>
                <Link href="/generatedalbums" legacyBehavior>
                  <a className="text-s cursor-pointer ps-3">Generated Albums</a>
                </Link>
              </section>
            </section>
            <section className="justify-right">
              <form
                className="mx-auto w-screen max-w-sm justify-end"
                onSubmit={(e: FormEvent<HTMLFormElement>) => {
                  e.preventDefault();
                  const form = e.currentTarget;
                  const searchTerm = (
                    form.querySelector("#default-search") as HTMLInputElement
                  ).value;
                  window.location.href = `/movies/search/${searchTerm}`;
                }}
              >
                <label
                  htmlFor="default-search"
                  className="sr-only mb-2 text-sm font-medium text-white"
                >
                  Search
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
                    <svg
                      className="h-4 w-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    name="search"
                    id="default-search"
                    className="block w-full rounded-lg border border-gray-300 bg-black p-4 ps-10 text-sm text-white focus:border-red-800 focus:ring-red-800"
                    placeholder="Search"
                    required
                  />
                  <button
                    type="submit"
                    className="absolute bottom-2.5 end-2.5 rounded-lg bg-neutral-700 px-4 py-2 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
                  >
                    Search
                  </button>
                </div>
              </form>
            </section>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
