"use client";

import Link from "next/link";
import React, { useState } from "react";
import {
  ShoppingCartIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-zinc-950 p-4 relative min-h-[65px]">
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
        <div className="flex flex-grow items-center space-x-12 text-2xl text-textLight">
          <li className="nav-link list-none">
            <Link href="/">Home</Link>
          </li>
          <li className="nav-link hidden lg:block">
            <Link href="/about">About</Link>
          </li>
          <li className="nav-link hidden lg:block">
            <Link href="/calendar">Calendar</Link>
          </li>
          <li className="flex nav-link list-none flex-grow justify-end justify-items-end">
            <Link href="/login" className="justify-self-right">
              Login
            </Link>
          </li>
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
          <Link href="/about">About</Link>
        </li>
        <li className="py-4 border-b border-gray-700">
          <Link href="/calendar">Calendar</Link>
        </li>
        <li className="nav-link hidden lg:block">
          <Link href="/login">Login</Link>
        </li>
      </ul>
    </nav>
  );
}
