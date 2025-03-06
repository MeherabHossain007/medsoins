"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Banner from "@/components/layout/Banner";
import Image from "next/image";
import ServiceCard from "@/components/doctor/ServiceCard";
import CentersMapDisplay from "@/components/layout/Map";

export default function HealthCenter() {
  const params = useParams();
  const slug = params.slug;
  const [centerData, setCenterData] = useState(null);
  const [allCenters, setAllCenters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCentersData = async () => {
      try {
        // Add debug log to see what slug we're looking for
        console.log("Looking for center with slug:", slug);

        // Use the correct path to your JSON file (should be in public folder)
        const response = await fetch("/data/health-centers.json");
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status}`);
        }

        const centersData = await response.json();
        console.log("All centers data:", centersData);

        setAllCenters(centersData);

        // Make sure we're finding the center correctly
        const center = centersData.find((center) => center.slug === parseInt(slug));
        console.log("Found center:", center);

        if (center) {
          setCenterData(center);
        } else {
          console.warn(`No center found with slug: ${slug}`);
          // Provide fallback data
          setCenterData({
            name: "Health Center",
            hours: "6am - 12am",
            phone: "123-456-789",
            email: "healthcare@center.com",
            address: "123 Health Street",
            image: "/images/doctl.png",
            type: "healthcare",
            services: Array(4).fill({
              title: "Lorem ipsum dolor sit amet",
              description:
                "Consectetur adipiscing elit. Praesent ullamcorper ac quam at aliquam. Pellentesque non sodales lacus",
            }),
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque purus enim, egestas suscipit consequat nec, blandit imperdiet nunc. Sed varius ac magna ut volutpat.",
            urgentInfo:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque purus enim, egestas suscipit consequat nec, blandit imperdiet nunc.",
          });
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
        setCenterData({
          name: "Health Center",
          hours: "6am - 12am",
          phone: "123-456-789",
          email: "healthcare@center.com",
          address: "123 Health Street",
          image: "/images/doctl.png",
          type: "healthcare",
          services: Array(4).fill({
            title: "Service",
            description: "Service description",
          }),
          description: "Center information unavailable.",
          urgentInfo: "Contact reception for urgent information.",
        });
        setAllCenters([]);
        setLoading(false);
      }
    };

    fetchCentersData();
  }, [slug]);

  if (loading) {
    return (
      <div className="font-montserrat pt-16 lg:pt-24 h-full">
        <Banner />
        <div className="container mx-auto px-10 md:px-16 lg:px-18 py-8 md:py-12 lg:py-16 text-center">
          <p className="text-xl">Loading health center information...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="font-montserrat pt-16 lg:pt-24 h-full">
        <Banner />
        <div className="container mx-auto px-10 md:px-16 lg:px-18 py-8 md:py-12 lg:py-16 text-center">
          <p className="text-xl text-red-500">Error loading data: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="font-montserrat pt-16 lg:pt-24 h-full">
      <Banner />
      <div className="container mx-auto px-10 md:px-16 lg:px-18 py-8 md:py-12 lg:py-16">
        {/* Main content section */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-20 xl:gap-30">
          {/* Left column - Info and Services (wider) */}
          <div className="flex flex-col h-full justify-between gap-8 lg:col-span-3">
            {/* Brand and contact info */}
            <div className="flex flex-col items-start justify-start">
              <div className="flex items-center mb-4">
                <div className="bg-secondary font-montserrat text-white text-center rounded-lg p-4 border-4 border-black">
                  <p className="text-sm font-semibold">
                    PRENEZ RENDEZ VOUS EN LIGNE
                  </p>
                  <h1 className="text-2xl md:text-3xl font-bold ml-4">
                    {centerData.name}
                  </h1>
                </div>
              </div>
              <div className="text-left mt-2 md:mt-4 font-bold font-montserrat text-neutral-500">
                <p className="text-base md:text-lg">{centerData.hours}</p>
                <p className="text-base md:text-lg">{centerData.phone}</p>
                <p className="text-base md:text-lg">{centerData.email}</p>
                <p className="text-base md:text-lg">{centerData.address}</p>
                <p className="text-base md:text-lg text-capitalize">
                  Type: {centerData.type}
                </p>
              </div>
            </div>

            {/* Services section */}
            <div className="w-full">
              <h2 className="text-xl md:text-2xl font-bold mb-6">Services</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                {centerData.services &&
                  centerData.services.map((service, index) => (
                    <ServiceCard
                      key={index}
                      title={service.title}
                      description={service.description}
                    />
                  ))}
              </div>
            </div>
          </div>

          {/* Right column - Map and Images (narrower) */}
          <div className="flex flex-col gap-4 lg:col-span-2">
            {/* Map display */}
            <div className="w-full flex justify-center lg:justify-start">
              <CentersMapDisplay
                centers={allCenters}
                height="250px"
                // If center has coordinates, center map on it, otherwise use France's center
                initialView={
                  centerData.latitude && centerData.longitude
                    ? [centerData.latitude, centerData.longitude]
                    : [46.603354, 2.888334]
                }
                zoom={centerData.latitude ? 12 : 6} // Zoom in if we have specific coordinates
              />
            </div>

            {/* Image grid */}
            <div className="grid grid-cols-2 gap-3 mt-3">
              {/* Handle both array of strings and array of numbers for images */}
              {(centerData.images || []).length > 0
                ? (centerData.images || []).map((imgSrc, index) => (
                    <div key={index} className="w-full aspect-video">
                      <Image
                        src={
                          typeof imgSrc === "number"
                            ? `/images/rectangle-${imgSrc}.png`
                            : imgSrc
                        }
                        alt={`${centerData.name} image ${index + 1}`}
                        width={300}
                        height={200}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  ))
                : // Fallback images if none provided
                  [6695, 6696, 6697, 6698].map((num, index) => (
                    <div key={index} className="w-full aspect-video">
                      <Image
                        src={`/images/rectangle-${num}.png`}
                        alt={`${centerData.name} image ${index + 1}`}
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
            <h2 className="text-xl md:text-2xl font-montserrat font-bold">
              About {centerData.name}
            </h2>
            <p className="mt-4 font-montserrat font-light">
              {centerData.description}
            </p>
          </div>
          <div className="w-full mt-10">
            <h2 className="text-xl md:text-2xl font-montserrat font-bold">
              Informations urgentes
            </h2>
            <p className="mt-4 font-montserrat font-light">
              {centerData.urgentInfo}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
