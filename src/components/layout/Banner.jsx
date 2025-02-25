"use client";
import React from "react";
import Image from "next/image";
import Button from "../ui/Button";
import IconInput from "../ui/IconInput";

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

      <div className="flex items-center justify-center gap-4 bg-[#FAFAFA] p-2 ">
        <IconInput
          className="w-xs"
          svg={
            <svg
              width={20}
              height={24}
              viewBox="0 0 20 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="Descriptive icon name"
            >
              <rect width="19.19" height="24" fill="url(#pattern0_1_2090)" />
              <defs>
                <pattern
                  id="pattern0_1_2090"
                  patternContentUnits="objectBoundingBox"
                  width="1"
                  height="1"
                >
                  <use href="#image0_1_2090" transform="scale(0.03125 0.025)" />
                </pattern>
                <image
                  id="image0_1_2090"
                  width="32"
                  height="40"
                  preserveAspectRatio="none"
                  href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAoCAMAAACo9wirAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAzUExURUdwTFRjiVRkiVRjilNiiVNiiFRiiVdnjVlqjlRjiVRjiVVljFVkilRiiVRiiVVkilNiiGumQuwAAAAQdFJOUwDEU1ya5fcVDHTSKUCtimbvmHdwAAABTElEQVQ4y4VU3RqFIAjL1BR/qvd/2gOCaWkdb0o3xoZ9LUu3XNIAOrlluhyoU5aCkeNhO7u1gb/j0XJp3vfMQjb2+ErlQYuw04FE1g6nCt1XaFK8GBHrQ3z0RJFNzjyygx9cI8PyKTRHfgVYffMNxRI24P7OlKibYbMaXx0LhD5qixhYQomAIzwYQxGtEwmF57gvW4OKhamxkSklBUqFhv4uK6V5cYriiXZZhhVqxCBDylSDHncJayrBSMCdnn8Jf1skAWYmA5kk4D0mETHLMR/UwRMAGcQ4asVe6bLS7LKSXBY1z8t43ZSBg8ezStwWCpzxmosdvyjbJkf+9ydhr1lkMs8m1KD7zlVPr6LqYz9WkKJpWzP2xHk2o2iQ77tfVHTw63GXW9rgmEF4nvxAvGIG4cpPfzHEAHjFReMDr4x3HBnoNH/g9HGvj4MfadEYaJxoDLcAAAAASUVORK5CYII="
                />
              </defs>
            </svg>
          }
          placeholder={"Votre ville"}
        />
        <IconInput placeholder={"Rayon"} className="w-60">
          <select defaultValue="Pick a color" className="select text-bold">
            <option>100km</option>
            <option>Crimson</option>
            <option>Amber</option>
            <option>Velvet</option>
          </select>
        </IconInput>
        <button className=" bg-primary text-white p-5 w-72 rounded-full border-0">
          Trouver mon centre
        </button>
      </div>
    </>
  );
};

export default Banner;
