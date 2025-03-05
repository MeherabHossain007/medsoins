import Image from "next/image";

export default function HomeCard() {
  return (
    <div className="w-full md:w-auto h-auto shrink-0 rounded-lg bg-[#FFF9F1] p-6 md:p-9 font-sans leading-relaxed">
      <div className="h-full flex flex-col justify-between items-start gap-3">
        <Image src="/images/svg/icon1.svg" alt="Home" width={59} height={59} />
        <div>
          <p className="text-lg xl:text-xl font-semibold font-montserrat text-gray-800">
            Lorem ipsum dolor sit amet
          </p>
          <div className="text-gray-600 font-montserrat font-light text-sm xl:text-base">
            <p>
              onsectetur adipiscing elit. Praesent ullamcorper ac quam at
              aliquam. Pellentesque non sodales lacus
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
