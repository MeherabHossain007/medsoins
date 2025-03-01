"use client";
import Banner from "@/components/layout/Banner";
import Image from "next/image";
import ServiceCard from "@/components/doctor/ServiceCard";

export default function Doctor() {
  return (
    <div className="font-montserrat pt-16 lg:pt-24 h-full">
      <Banner />
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
        {/* Main content section */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-20 xl:gap-30">
          {/* Left column - Info and Services (wider) */}
          <div className="flex flex-col h-full justify-between gap-8 lg:col-span-3">
            {/* Brand and contact info */}
            <div className="flex flex-col items-start justify-start">
              <Image
                src="/images/doctl.png"
                alt="Doctolib"
                width={318}
                height={100}
                className="w-48 md:w-64 lg:w-80 h-auto"
              />
              <div className="text-left mt-6 md:mt-8 font-bold font-montserrat text-neutral-500">
                <p className="text-base md:text-lg">6am 12 Am</p>
                <p className="text-base md:text-lg">123-456-789</p>
                <p className="text-base md:text-lg">Healthcare@abc.com</p>
              </div>
            </div>

            {/* Services section */}
            <div className="w-full">
              <h2 className="text-xl md:text-2xl font-bold mb-6">Services</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                {[...Array(4)].map((_, index) => (
                  <ServiceCard
                    key={index}
                    title="Lorem ipsum dolor sit amet"
                    description="Consectetur adipiscing elit. Praesent ullamcorper ac quam at aliquam. Pellentesque non sodales lacus"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right column - Images (narrower) */}
          <div className="flex flex-col gap-4 lg:col-span-2">
            {/* Main image */}
            <div className="w-full flex justify-center lg:justify-start">
              <Image
                src="/images/rectangle-6200.png"
                alt="Map"
                width={1000}
                height={1000}
                className="w-full h-auto rounded-lg"
              />
            </div>

            {/* Image grid */}
            <div className="grid grid-cols-2 gap-3 mt-3">
              {[6695, 6696, 6697, 6698].map((num) => (
                <div key={num} className="w-full aspect-video">
                  <Image
                    src={`/images/rectangle-${num}.png`}
                    alt={`Image`}
                    width={300}
                    height={200}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Text sections at bottom */}
        <div className="w-full mx-auto mt-10 md:mt-20">
          <div className="w-full mt-8">
            <p className="mt-4 font-montserrat font-light">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Pellentesque purus enim, egestas suscipit consequat nec, blandit
              imperdiet nunc. Sed varius ac magna ut volutpat. Curabitur
              fringilla felis risus. Nunc vehicula ullamcorper arcu, ac sagittis
              est hendrerit sed. Integer in gravida velit. Nam nec velit
              egestas, eleifend diam sit amet, fringilla velit. Nam ante tortor,
              luctus non viverra non, placerat a tortor. Praesent quis enim quis
              felis pretium fringilla.
            </p>
          </div>
          <div className="w-full mt-10">
            <h2 className="text-xl md:text-2xl font-montserrat font-bold">
              Informations urgentes
            </h2>
            <p className="mt-4 font-montserrat font-light">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Pellentesque purus enim, egestas suscipit consequat nec, blandit
              imperdiet nunc. Sed varius ac magna ut volutpat. Curabitur
              fringilla felis risus. Nunc vehicula ullamcorper arcu, ac sagittis
              est hendrerit sed. Integer in gravida velit. Nam nec velit
              egestas, eleifend diam sit amet, fringilla velit. Nam ante tortor,
              luctus non viverra non, placerat a tortor. Praesent quis enim quis
              felis pretium fringilla.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
