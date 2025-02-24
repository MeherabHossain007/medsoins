"use client";

import { useState } from "react";
import Button from "../ui/Button";
import Link from "next/link";
// import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white fixed w-full z-50">
      <div className="bg-white relative z-50 container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="#">
          <img className="h-10 lg:h-auto" src="/images/logo/logo.png" alt="" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-6">
          <Link href="#" className="text-gray-600 hover:text-gray-800">
            Home
          </Link>
          <Link href="#" className="text-gray-600 hover:text-gray-800">
            About
          </Link>
          <Link href="#" className="text-gray-600 hover:text-gray-800">
            Services
          </Link>
          <Link href="#" className="text-gray-600 hover:text-gray-800">
            Contact
          </Link>
        </div>

        {/* Button */}
        <div className="hidden md:block">
          <Button className="!py-3">Get Started</Button>
        </div>

        {/* Hamburger Icon */}
        <button
          className="md:hidden text-gray-800 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {/* {isOpen ? <X size={28} /> : <Menu size={28} />} */}
          {isOpen ? "x" : "="}
        </button>
      </div>

      {/* Mobile Nav */}
      <div
        className={`absolute z-40 top-14 left-0 w-full bg-white shadow-md transform transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="px-6 py-4 flex flex-col space-y-4 items-center">
          <Link href="#" className="text-gray-600 hover:text-gray-800">
            Home
          </Link>
          <Link href="#" className="text-gray-600 hover:text-gray-800">
            About
          </Link>
          <Link href="#" className="text-gray-600 hover:text-gray-800">
            Services
          </Link>
          <Link href="#" className="text-gray-600 hover:text-gray-800">
            Contact
          </Link>
          <Button className="!py-3">Get Started</Button>
        </div>
      </div>
    </nav>
  );
}
