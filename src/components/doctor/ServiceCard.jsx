"use client";
import Image from "next/image";

const ServiceCard = ({ title, description }) => {
  return (
    <div className="w-full h-auto shrink-0 rounded-lg bg-[#FFF9F1] p-4 lg:p-5 font-sans leading-relaxed">
      <div className="h-full flex flex-col justify-between items-start gap-3">
        <div className="flex space-x-4">
          <Image
            src="/images/svg/icon1.svg"
            alt="Home"
            width={59}
            height={59}
          />
          <p className="text-lg md:text-xl font-semibold font-montserrat text-gray-800">
            {title}
          </p>
        </div>

        <div>
          <div className="text-gray-600 font-montserrat font-light text-sm md:text-base">
            <p>{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
