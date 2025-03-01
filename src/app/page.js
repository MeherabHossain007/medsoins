 /* eslint-disable @next/next/no-img-element */
"use client";
import Banner from "@/components/layout/Banner";
import Image from "next/image";
import Button from "@/components/ui/Button";
import HomeCard from "@/components/home/HomeCard";
import BulletCard from "@/components/home/BulletCard";
import SearchBar from "@/components/home/SearchBar";
import { FiUsers } from "react-icons/fi";
import { FiStar } from "react-icons/fi";

export default function Home() {
  return (
    <main className="pt-10 lg:pt-28 overflow-hidden">
      <Banner />
      <SearchBar />

      {/* Hero Section */}
      <section className="flex flex-col w-full container mx-auto md:flex-row items-center justify-center gap-6 px-4 lg:px-24 mt-10 lg:mt-30">
        <div className="w-full md:w-1/2">
          <Image
            src="/images/Group11.png"
            alt="Home"
            width={588}
            height={503}
            className="w-full h-auto"
          />
        </div>
        <div className="w-full md:w-1/2">
          <div>
            <p className="text-4xl lg:text-6xl font-montserrat">Lorem ipsum</p>
            <p className="text-4xl lg:text-6xl font-montserrat font-bold">
              Dolor sit amet
            </p>
            <p className="text-4xl lg:text-6xl font-montserrat">
              adipiscing elit
            </p>
          </div>
          <p className="text-sm lg:text-base font-montserrat font-light mt-4 md:mt-7 mb-6">
            Lorem ipsum dolor sit amet, consectetur <br /> adipiscing elit.
          </p>
          <Button>
            <span className="flex items-center justify-center gap-2">
              Rejoindre une équipe
              <img src="/images/Arrow - Right 2.png" alt="Arrow Right" />
            </span>
          </Button>
        </div>
      </section>

      {/* Home Cards Section */}
      <section className="mt-10 md:mt-30 px-4 md:px-8 lg:px-10 xl:px-24 flex flex-col justify-center items-center gap-10">
        <div className="flex justify-center items-center">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-montserrat tracking-tight text-center font-medium">
            Lorem Ipsum Dolor Sit
          </h1>
        </div>
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center">
          <HomeCard />
          <HomeCard />
          <div className="md:col-span-2 lg:col-span-1 w-full">
            <HomeCard className="w-full" />
          </div>
          <div className="w-full lg:w-3xl col-span-1 md:col-span-2 lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6 place-items-center">
            <HomeCard />
            <HomeCard />
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="mt-10 md:mt-30 px-4 md:px-8 lg:px-10 xl:px-24 pt-10 md:pt-20 pb-3 bg-[#FFD3B6] flex flex-col justify-center items-center gap-10">
        <div className="container mx-auto">
          <div className="text-left">
            <h1 className="text-3xl md:text-6xl font-jakarta">
              Notre Équipe De
              <span className="text-black font-bold p-1 md:p-2 font-jakarta">
                Docteurs
              </span>
            </h1>
          </div>
          <div className="flex flex-col lg:flex-row mt-8 justify-between">
            <div className="w-full lg:w-1/2">
              <p className="text-base text-gray-700 font-poppins font-light">
                Lorem Ipsum Dolor Sit Amet, Consectetur Adipisicing Elit. Donec
                Orci Velit, Varius Sollicitudin Pharetra Eu, Consequat Ac
                Mauris.
              </p>
              <div className="grid grid-cols-2 grid-rows-3 gap-4 my-8">
                <BulletCard
                  title={"ipsum dolor sit "}
                  className={"bg-black w-6"}
                  description={
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ullamcorper ac quam at aliquam"
                  }
                />
                <BulletCard
                  title={"orem ipsum dolor"}
                  className={"bg-black opacity-25 w-2"}
                  titleClass={"text-black opacity-25"}
                />
                <BulletCard
                  title={"Lorem ipsum dolor"}
                  className={"bg-black opacity-25 w-2"}
                  titleClass={"text-black opacity-25"}
                />
                <BulletCard
                  title={"24 orem ipsum dolor sit"}
                  className={"bg-black opacity-25 w-2"}
                  titleClass={"text-black opacity-25"}
                />
                <BulletCard
                  title={"Lorem ipsum dolor sit "}
                  className={"bg-black opacity-25 w-2"}
                  titleClass={"text-black opacity-25"}
                />
                <BulletCard
                  title={"Lorem ipsum dolor sit "}
                  className={"bg-black opacity-25 w-2"}
                  titleClass={"text-black opacity-25"}
                />
              </div>
            </div>

            <div className="w-full lg:w-1/2 flex justify-center items-center p-2">
              <div className="relative px-4 md:px-20 lg:px-auto xl:px-20">
                <div className="static">
                  <img
                    alt="A doctor sitting at a desk with medical equipment in the background"
                    className="w-full lg:w-[90%] xl:w-full h-auto mx-auto"
                    src="/images/Mask Group3.png"
                  />

                  {/* Top Left Bubble */}
                  <div className="absolute top-4 md:top-10 md:right-80 lg:top-7 lg:right-44 xl:top-10 right-33 xl:right-80 bg-secondary text-white p-3 md:p-4 w-60 md:w-[280px] flex items-center space-x-2 md:space-x-4 shadow-lg">
                    <div className="bg-blue-300 p-2 flex items-center justify-center rounded-full">
                      <FiUsers className="text-white" />
                    </div>
                    <p className="text-sm md:text-base font-light font-montserrat">
                      Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit.
                    </p>
                  </div>

                  {/* Bottom Right Bubble */}
                  <div className="absolute bottom-4 md:bottom-10 md:left-70 lg:bottom-7 lg:left-44 xl:bottom-10 left-40 xl:left-70 bg-secondary text-white p-3 md:p-4 flex items-center space-x-2 md:space-x-4 shadow-lg">
                    <div className="bg-blue-300 p-2 flex items-center justify-center rounded-full">
                      <FiStar className="text-white" />
                    </div>
                    <p className="text-sm md:text-base font-light font-montserrat">
                      Lorem Ipsum Dolor Sit Amet,
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Section */}
      <section className="container mx-auto mt-10 md:mt-30 px-4 md:px-24">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-3xl md:text-6xl text-center font-jakarta tracking-tight font-medium">
            Lorem Ipsum Dolor <br />
            <span className="font-bold pt-1">SitAmet</span>
          </h1>
          <Image
            src={"/images/Group 34.png"}
            alt="Group 34"
            width={1920}
            height={1080}
            className="object-cover w-full h-auto mt-10 md:mt-20"
          />
        </div>
      </section>
    </main>
  );
}
