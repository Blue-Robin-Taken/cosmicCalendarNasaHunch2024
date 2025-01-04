"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

//https://blog.hubspot.com/website/screen-reader-accessibility add AVIA tags and alt text to imgs
//also need to add aminations
//theres more todo comments hanging around everywhere gl finding them

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-lm-back dark:bg-dm-back p-3 py-5 relative min-h-[65px] text-navbar-text">
      <div className="flex items-center justify-between mx-10">
        {/* Hamburger Menu, Code from the Mr. Ben Merch Store */}
        <button
          onClick={toggleMenu}
          className="lg:hidden absolute left-0 top-1/2 transform -translate-y-1/2 p-2 z-30"
        >
          {isOpen ? (
            <XMarkIcon className="w-10 h-10 text-textLight" />
          ) : (
            <Bars3Icon className="w-10 h-10 text-textLight" />
          )}
        </button>

        {/* Desktop Links */}
        <div className="flex flex-grow items-center space-x-12 text-3xl text-lm-navbar-txt dark:text-dm-navbar-text">
          <li className="nav-link list-none"> {/* bg-gradient-to-l from-white to-theme-yellowlight p-3 rounded-3xl */}
            <Link href="/" className="font-Chocolate text-lm-navbar-tctext dark:text-dm-navbar-tctext 
              text-nb-tc mr-8">T<span className="text-nb-tc-sm">ERRA</span>C<span className="text-nb-tc-sm">RONOS</span></Link>
          </li>
          
          {[
            ['Clock', '/clock' , '1'],
            ['Calendar', '/calendar', '2'],
            ['Conversion', '/conversion', '3'],
            ['Settings', '/settings', '4'],
            ].map(([title, url, id]) => (
              <Link href={url} key={id} className="nav-link lg:block font-Lato text-nb-val">{title}</Link>
            ))}
          
          {/* someone figure out how to center these i give up (these are too low, making the navbar look uneven) */}
          <div className="flex flex-grow space-x-12 justify-end items-center">
            <li className="nav-link list-none">
              <Link href="/login" className="justify-self-right self-center self-stretch font-Lato text-nb-val 
                rounded-3xl py-2 px-8 border">
                Login
              </Link>
            </li>
            <li className="list-none">
              <Link href="/signup" className="justify-self-right self-center font-Lato text-nb-val 
                text-black rounded-3xl py-2 px-8 border border-lm-yellow bg-lm-yellow">
                Sign-up
              </Link>
            </li>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <ul
        className={`absolute top-16 left-0 bg-zinc-950 ${
          isOpen ? "animate-slide-in-left" : "hidden"
        } text-textLight transition-all duration-300 ease-in-out z-20 w-auto max-w-xs p-4`}
      >
        <li className="py-4 border-b border-gray-700">
          <Link href="/">Home</Link>
        </li>
        <li className="py-4 border-b border-gray-700">
          <Link href="/clock">Clock</Link>
        </li>
        <li className="nav-link hidden lg:block">
          <Link href="/login">Login</Link>
        </li>
        <li className="nav-link hidden lg:block">
          <Link href="/signup">Signup</Link>
        </li>
      </ul>
    </nav>
  );
}
