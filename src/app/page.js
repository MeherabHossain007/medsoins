/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Banner from "@/components/layout/Banner";
import Image from "next/image";
import Button from "@/components/ui/Button";
import HomeCard from "@/components/home/HomeCard";
import BulletCard from "@/components/home/BulletCard";
import IconInput from "@/components/ui/IconInput";

export default function Home() {
  return (
    <main className="pt-18 lg:pt-28">
      <Banner />

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

      <section className=" flex items-center justify-center gap-10 px-24 mt-20">
        <Image
          src="/images/Group11.png"
          alt="Home"
          width={588}
          height={503}
          className=" h-[45%] w-[45%]"
        />
        <div>
          <div>
            <p className="text-6xl font-montserrat">Lorem ipsum</p>
            <p className="text-6xl font-montserrat font-bold">Dolor sit amet</p>
            <p className="text-6xl font-montserrat">adipiscing elit </p>
          </div>
          <p className=" text-base font-montserrat font-light mt-7 mb-10">
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

      <section className="mt-30 px-24 flex flex-col justify-center items-center gap-20">
        <div className="flex justify-center items-center">
          <h1 className="text-6xl font-montserrat tracking-tight font-medium">
            Lorem Ipsum Dolor Sit{" "}
          </h1>
        </div>
        <div className="grid grid-cols-3 gap-6 justify-items-center">
          <HomeCard />
          <HomeCard />
          <HomeCard />
          <div className="col-span-3 flex justify-center gap-6">
            <HomeCard />
            <HomeCard />
          </div>
        </div>
      </section>

      <section className="mt-30 px-24 pt-20 pb-3 bg-[#FFD3B6] flex flex-col justify-center items-center gap-20">
        <div className="container mx-auto">
          <div className="text-left">
            <h1 className="text-6xl font-jakarta">
              Notre Équipe De
              <span className="text-black font-bold p-2 font-jakarta">
                Docteurs
              </span>
            </h1>
          </div>
          <div className="flex mt-8 justify-between">
            <div className="w-1/2">
              <p className="text-base text-gray-700 font-poppins font-light">
                Lorem Ipsum Dolor Sit Amet, Consectetur Adipisicing Elit. Donec
                Orci Velit, Varius Sollicitudin Pharetra Eu, Consequat Ac
                Mauris.
              </p>
              <div className="grid grid-cols-2 grid-rows-3 gap-6 my-8">
                <BulletCard
                  title={"ipsum dolor sit "}
                  className={" bg-black w-6"}
                  description={
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ullamcorper ac quam at aliquam"
                  }
                />
                <BulletCard
                  title={"orem ipsum dolor"}
                  className={" bg-black opacity-25 w-2"}
                  titleClass={"text-black opacity-25"}
                />
                <BulletCard
                  title={"Lorem ipsum dolor"}
                  className={" bg-black opacity-25 w-2"}
                  titleClass={"text-black opacity-25"}
                />
                <BulletCard
                  title={"24 orem ipsum dolor sit"}
                  className={" bg-black opacity-25 w-2"}
                  titleClass={"text-black opacity-25"}
                />
                <BulletCard
                  title={"Lorem ipsum dolor sit "}
                  className={" bg-black opacity-25 w-2"}
                  titleClass={"text-black opacity-25"}
                />
                <BulletCard
                  title={"Lorem ipsum dolor sit "}
                  className={" bg-black opacity-25 w-2"}
                  titleClass={"text-black opacity-25"}
                />
              </div>
            </div>

            <div className="flex justify-center items-center p-4">
              <div className="relative px-20">
                <div className="static">
                  <img
                    alt="A doctor sitting at a desk with medical equipment in the background"
                    className="w-auto h-auto mx-auto"
                    src="/images/Mask Group3.png"
                  />

                  {/* Top Left Bubble */}
                  <div className="absolute top-10 right-90 bg-secondary text-white p-4 w-[280px] flex items-center space-x-4 shadow-lg">
                    <div className="bg-blue-300 p-2 flex items-center justify-center">
                      <img src="/images/icon1.png" className=" h-full w-full" />
                    </div>
                    <p className="font-light font-montserrat">
                      Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit.
                    </p>
                  </div>

                  {/* Bottom Right Bubble */}
                  <div className="absolute bottom-10 left-80 bg-secondary text-white p-4 flex items-center space-x-4 shadow-lg">
                    <div className="bg-blue-300 p-2 flex items-center justify-center">
                      <img src="/images/icon2.png" />
                    </div>
                    <p className="font-light font-montserrat">
                      Lorem Ipsum Dolor Sit Amet,
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-30 px-24">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-6xl text-center font-jakarta tracking-tight font-medium">
            Lorem Ipsum Dolor <br />
            <p className="font-bold pt-1">SitAmet</p>
          </h1>
          <Image
            src={"/images/Group 34.png"}
            alt="Group 34"
            width={1920}
            height={1080}
            className="object-cover w-full h-full mt-20"
          />
        </div>
      </section>
    </main>
  );
}
