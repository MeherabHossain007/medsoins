import Banner from "@/components/layout/Banner";
import Image from "next/image";
import Button from "@/components/ui/Button";
import HomeCard from "@/components/home/HomeCard";
import BulletCard from "@/components/home/BulletCard";

export default function Home() {
  return (
    <main className="pt-18 lg:pt-28">
      <Banner />

      <section className=" flex items-center justify-center gap-10 px-24">
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

      <section className="mt-30 px-24 pt-10 pb-3 bg-[#FFD3B6] flex flex-col justify-center items-center gap-20">
        <div className="container mx-auto">
          <div className="text-left">
            <h1 className="text-6xl font-jakarta">
              Notre Équipe De
              <span class="text-black font-bold p-2 font-jakarta">
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
              <div className="grid grid-cols-2 grid-rows-3 gap-3 my-8">
                <BulletCard
                  title={"ipsum dolor sit "}
                  className={" bg-black"}
                  description={
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ullamcorper ac quam at aliquam"
                  }
                />
                <BulletCard
                  title={"orem ipsum dolor"}
                  className={" bg-gray-400"}
                  titleClass={"text-gray-400"}
                />
                <BulletCard
                  title={"Lorem ipsum dolor"}
                  className={" bg-gray-400"}
                  titleClass={"text-gray-400"}
                />
                <BulletCard
                  title={"24 orem ipsum dolor sit"}
                  className={" bg-gray-400"}
                  titleClass={"text-gray-400"}
                />
                <BulletCard
                  title={"Lorem ipsum dolor sit "}
                  className={" bg-gray-400"}
                  titleClass={"text-gray-400"}
                />
                <BulletCard
                  title={"Lorem ipsum dolor sit "}
                  className={" bg-gray-400"}
                  titleClass={"text-gray-400"}
                />
              </div>
            </div>

            <img
              alt="A doctor sitting at a desk with medical equipment in the background"
              className="h-[559px] w-[40%] object-cover"
              src="/images/women.jpeg"
            />
            {/* <div className="absolute top-4 left-4 bg-blue-500 text-white p-4 rounded-lg shadow-lg">
                <i className="fas fa-user-md"></i>
                <span className="ml-2">
                  Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit.
                </span>
              </div> */}
            {/* <div className="absolute bottom-4 right-4 bg-blue-500 text-white p-4 rounded-lg shadow-lg">
                <i className="fas fa-star"></i>
                <span className="ml-2">Lorem Ipsum Dolor Sit Amet,</span>
              </div> */}
          </div>
        </div>
      </section>
    </main>
  );
}
