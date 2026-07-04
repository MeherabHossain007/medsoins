"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Footer = () => {
  const path = usePathname();
  console.log(path);
  return (
    <div
      className={`${
        (path === "/registration" || path === "/doctor") ? "bg-[#073A50]" : "bg-primary"
      }  text-white`}
    >
      <div className="container mx-auto px-5 py-10 lg:py-20">
        <div className="flex flex-wrap justify-between gap-4 lg:grid grid-cols-5">
          <div className="col-span-2 max-lg:mb-8">
            <img
              className="h-16 lg:h-auto mb-4 lg:mb-8"
              src="/images/logo/logo-white.png"
              alt=""
            />
            <p className="lg:max-w-[32ch]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
              ullamcorper ac quam at aliquam
            </p>
          </div>
          <div>
            <h3 className="text-sm lg:text-xl font-extrabold mb-4.5">
              Main Categories
            </h3>
            <div className="space-y-1 lg:space-y-3 *:block">
              <Link href="/about">Qui sommes-nous</Link>
              <Link href="/centers">Nos centres</Link>
              <Link href="/doctor">Contacts</Link>
            </div>
          </div>
          <div className="lg:mx-auto">
            <h3 className="text-sm lg:text-xl font-extrabold mb-4.5">
              Additional Links
            </h3>
            <div className="space-y-1 lg:space-y-3 *:block">
              <Link href="/centers">Trouver mon centre</Link>
              <Link href="/about">Mieux nous connaître</Link>
              <Link href="/faq">FAQ</Link>
              <Link href="#">Preadmission</Link>
              <Link href="/doctor">Rejoindre une équipe</Link>
            </div>
          </div>
          <div className="lg:ms-auto">
            <h3 className="text-sm lg:text-xl font-extrabold mb-4.5">
              Social Media
            </h3>
            <div className="space-y-1 lg:space-y-3 *:block">
              <Link href="#">Instagram</Link>
              <Link href="#">LinkedIn</Link>
              <Link href="#">Facebook</Link>
            </div>
          </div>
        </div>
        {(path === "/registration" || path === "/doctor") && <hr className="border-px border-[#D3D3D326] my-2"/>}
        <p className="mt-4 lg:mt-8 text-center lg:text-left">
          @2024. All rights reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
