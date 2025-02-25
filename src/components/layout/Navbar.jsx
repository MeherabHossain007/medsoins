"use client";

import { useState } from "react";
import Button from "../ui/Button";
import Link from "next/link";
// import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [serviceOpen, setServiceOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  return (
    <nav className="bg-white fixed w-full z-50">
      <div className="bg-white relative z-50 container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="#">
          <img className="h-10 lg:h-auto" src="/images/logo/logo.png" alt="" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8 bg-[#F5F5F5] ms-16 px-5 py-2.5 rounded-full">
          <Link href="#">Accueil</Link>
          <div className="relative">
            <button
              className="flex items-center gap-1 focus:outline-none"
              onClick={() => setServiceOpen(!serviceOpen)}
            >
              Services
            </button>

            {/* Submenu */}
            <div
              className={`absolute right-0 mt-1 bg-white shadow-lg rounded-2xl transition-all duration-300 ease-in-out transform ${
                serviceOpen
                  ? "opacity-100 scale-100 translate-y-0"
                  : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
              }`}
            >
              <Link
                href="#"
                className="block rounded-t-2xl px-6 py-4 hover:bg-gray-100 text-nowrap text-center text-[#757575] font-semibold"
              >
                Je suis patient
              </Link>
              <Link
                href="#"
                className="block rounded-b-2xl px-6 py-4 hover:bg-gray-100 text-nowrap text-center text-[#757575] font-semibold"
              >
                Je suis professionnel de santé
              </Link>
            </div>
          </div>
          <Link href="#">Nos centres</Link>
          <div className="relative">
            <button
              className="flex items-center gap-1 focus:outline-none"
              onClick={() => setAboutOpen(!aboutOpen)}
            >
              À propos
            </button>

            {/* Submenu */}
            <div
              className={`absolute left-full mt-1 bg-white shadow-lg rounded-2xl transition-all duration-300 ease-in-out transform ${
                aboutOpen
                  ? "opacity-100 scale-100 translate-y-0"
                  : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
              }`}
            >
              <Link
                href="#"
                className="block rounded-t-2xl px-6 py-4 hover:bg-gray-100 text-nowrap text-center text-[#757575] font-semibold"
              >
                Qui sommes-nous
              </Link>
              <Link
                href="#"
                className="block rounded-b-2xl px-6 py-4 hover:bg-gray-100 text-nowrap text-center text-[#757575] font-semibold"
              >
                FAQ
              </Link>
            </div>
          </div>
        </div>

        {/* Button */}
        <div className="hidden md:block">
          <Button className="!py-3">Prendre rendez-vous</Button>
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
        <div className="px-6 py-4 flex flex-col space-y-4">
          <Link href="#">Accueil</Link>
          <div
            className={`w-full duration-300 ${serviceOpen ? "mb-0" : "mb-4"}`}
          >
            <button
              className="flex items-center  gap-1 w-full focus:outline-none"
              onClick={() => setServiceOpen(!serviceOpen)}
            >
              Services
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                serviceOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <Link href="#" className="block px-4 py-2 hover:bg-gray-200">
                Doctor
              </Link>
              <Link href="#" className="block px-4 py-2 hover:bg-gray-200">
                Patient
              </Link>
            </div>
          </div>
          <Link href="#">Nos centres</Link>
          <Link href="#">À propos</Link>
          <Button className="!py-3">Prendre rendez-vous</Button>
        </div>
      </div>
    </nav>
  );
}
