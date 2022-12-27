import React, { useState } from "react";
import { Fira_Code } from "@next/font/google";
import Link from "next/link";
import Image from "next/image";
import { Github } from "react-bootstrap-icons";

const fira = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira",
  weight: ["300", "400", "500", "600", "700"],
});

const Layout = ({ children }) => {
  const [navBarState, setNavBarState] = useState(false);
  return (
    <>
      <nav
        className={`${fira.variable} font-fira fixed top-0 w-full bg-gray-800`}
      >
        <div className="container">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
                onClick={() => {
                  setNavBarState(!navBarState);
                }}
              >
                <span className="sr-only">Open main menu</span>

                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>

                <svg
                  className="hidden h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                <Link href={"/"}>
                  <div className="w-70 h-50">
                    <Image
                      src="/hussaini-usman.svg"
                      width="120"
                      height="80"
                      alt="Hussaini Usman logo"
                    />
                  </div>
                </Link>
              </div>
            </div>
            <div className="flex flex-row items-center">
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  <Link
                    href={"/blog"}
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Blog
                  </Link>
                  <Link
                    href={"/contact"}
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Contact
                  </Link>

                  <Link
                    href={"/projects"}
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Projects
                  </Link>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <a
                  href="https://github.com/Housain-maina"
                  target="_blank"
                  className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <Github color="white" size="24" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`${!navBarState ? "hidden" : "block"} container`}
          id="mobile-menu"
        >
          <div className="space-y-1 px-2 pt-2 pb-3">
            <Link
              href={"/blog"}
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setNavBarState(!navBarState)}
            >
              Blog
            </Link>
            <Link
              href={"/contact"}
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setNavBarState(!navBarState)}
            >
              Contact
            </Link>

            <Link
              href={"/projects"}
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setNavBarState(!navBarState)}
            >
              Projects
            </Link>
          </div>
        </div>
      </nav>
      <main className={`${fira.variable} font-fira container pt-20`}>
        {children}
      </main>
      <footer></footer>
    </>
  );
};

export default Layout;
