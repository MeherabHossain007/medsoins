"use client";
import React from "react";
import Image from "next/image";
import Button from "../ui/Button";

const Banner = () => {
  return (
    <>
      <div className="w-full bg-[url('/images/image%2016.jpg')] bg-cover bg-center bg-no-repeat relative">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#AEE8E4_0%,rgba(174,232,228,0.27)_115.29%)]" />

        {/* Main Content Container */}
        <div className="flex flex-col items-center justify-start p-4 sm:py-16 relative z-10 min-h-screen">
          {/* Top Banner */}
          <div
            className="flex items-center justify-center w-full max-w-[90%] md:max-w-[524px] min-h-[34px] rounded-[50px] border border-[#E0B869] bg-white bg-opacity-50 backdrop-blur-[5px] mb-4 sm:mb-8 px-2 opacity-0 animate-fadeIn"
            style={{ animationDelay: "0.3s" }}
          >
            <span className="text-primary text-xs sm:text-sm font-medium text-center">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </span>
          </div>

          {/* Main Heading */}
          <h1
            className="text-center w-full text-white font-jakarta text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight tracking-[-1px] sm:tracking-[-1.329px] capitalize opacity-0 animate-fadeIn"
            style={{ animationDelay: "0.5s" }}
          >
            Lorem ipsum
            <span className="relative ml-2 sm:ml-6 inline-block">
              <div className="w-16 h-8 sm:w-24 sm:h-12 md:w-40 lg:w-60 md:h-16 rounded-[40px] overflow-hidden">
                <Image
                  src="/images/Capsul.png"
                  alt="Small House"
                  width={234}
                  height={70}
                  className="object-cover w-full h-full"
                  priority
                />
              </div>
            </span>
            <br />
            {/* Bottom Section */}
            <span className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-3 mt-2 sm:mt-4">
              <div className="relative w-[150px] sm:w-[27%] max-w-[267px]">
                <Image
                  src="/images/Group 2468.png"
                  alt="Bubble Image"
                  width={267}
                  height={72}
                  className="w-full h-auto"
                  priority
                />
                <p className="absolute inset-0 pb-2 flex items-center justify-center text-gray-800 font-light text-xs md:text-base text-center">
                  Lorem ipsum <br /> dolor sit amet.
                </p>
              </div>
              <span className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl">
                adipiscing elit.
              </span>
            </span>
          </h1>

          {/* Subheading */}
          <p
            className="text-h4 my-5 w-full max-w-2xl text-center font-light font-montserrat text-lg opacity-0 animate-fadeIn"
            style={{ animationDelay: "0.7s" }}
          >
            Donec ultricies pulvinar orci ut mollis. Vestibulum aliquam neque et
            nisl interdum elementum.
          </p>

          {/* Call-to-action Button */}
          <Button
            className="opacity-0 animate-fadeIn"
            style={{ animationDelay: "0.9s" }}
          >
            <span className="flex items-center justify-center gap-2">
              Rejoindre une équipe
              <img src="/images/Arrow - Right 2.png" alt="Arrow Right" />
            </span>
          </Button>
        </div>

        {/* Global Keyframes for Animation */}
        <style jsx global>{`
          @keyframes fadeIn {
            0% {
              opacity: 0;
              transform: translateY(20px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fadeIn {
            animation: fadeIn 1s ease-out forwards;
          }
        `}</style>
      </div>
    </>
  );
};

export default Banner;
