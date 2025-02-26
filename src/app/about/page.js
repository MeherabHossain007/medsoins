/* eslint-disable @next/next/no-img-element */
"use client";
import Banner from "@/components/layout/Banner";
import React from "react";
import TeamMember from "@/components/about/TeamMember";
import Button from "@/components/ui/Button";

export default function About() {
  return (
    <div className="pt-18 lg:pt-28 overflow-hidden">
      <Banner />
      <div className="bg-gray-50 text-gray-800 min-h-screen">
        <div className="container mx-auto px-6 sm:px-10 py-8">
          {/* Main Content Section */}
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="md:w-1/2 text-center md:text-left">
              <h1 className="text-4xl lg:text-6xl mb-4 font-montserrat">
                À Propos
              </h1>
              <p className="font-montserrat text-sm lg:text-base font-light mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Pellentesque purus enim, egestas suscipit consequat nec, blandit
                imperdiet nunc.
              </p>
              <Button className="mt-10">
                <span className="flex items-center justify-center gap-2">
                  Rejoindre une équipe
                  <img src="/images/Arrow - Right 2.png" alt="Arrow Right" />
                </span>
              </Button>
            </div>
            <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
              <img
                alt="Modern building"
                className="w-auto h-auto object-cover"
                src="/images/image3.jpeg"
              />
            </div>
          </div>

          {/* Additional Content Sections */}
          <div className="flex flex-col gap-16 items-center mt-8">
            <SectionContent />
            <SectionContent />
          </div>

          {/* Team Section */}
          <div className="mt-16 text-center">
            <h2 className="text-3xl font-bold font-montserrat mb-10">
              Notre Équipe
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-items-center">
              {[1, 2, 3].map((_, index) => (
                <TeamMember
                  key={index}
                  imgSrc="https://storage.googleapis.com/a1aa/image/WraBjjmZZTBAH5tqsg9gWqRMt6BXcDK06FZQdJFqjZk.jpg"
                  name="Dr XXXX XXX"
                  specialty="SPECIALITE"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const SectionContent = () => (
  <div className="mt-8 px-4 md:px-0 max-w-7xl text-center md:text-left">
    <p className="font-montserrat font-light mb-4">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
      purus enim, egestas suscipit consequat nec, blandit imperdiet nunc. Sed
      varius ac magna ut volutpat. Curabitur fringilla felis risus. Nunc
      vehicula ullamcorper arcu, ac sagittis est hendrerit sed. Integer in
      gravida velit. Nam nec velit egestas, eleifend diam sit amet, fringilla
      velit. Nam ante tortor, luctus non viverra non, placerat a tortor.
      Praesent quis enim quis felis pretium fringilla.
    </p>
  </div>
);
