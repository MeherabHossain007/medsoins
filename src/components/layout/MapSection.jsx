"use client";
import React from "react";
import CentersMap from "@/components/layout/Map";

const MapSection = () => {
  // Sample data for the map markers
  const healthCenters = [
    {
      id: 1,
      name: "Centre Médical Rennes",
      type: "healthcare",
      latitude: 48.117266,
      longitude: -1.677793,
      address: "45 Rue de Rennes, 35000 Rennes",
      phone: "+33 2 99 45 67 89",
    },
    {
      id: 2,
      name: "Hôpital Universitaire Strasbourg",
      type: "hospital",
      latitude: 48.584614,
      longitude: 7.7507,
      address: "1 Place de l'Hôpital, 67000 Strasbourg",
      phone: "+33 3 88 11 67 68",
    },
    {
      id: 3,
      name: "Clinique Bordeaux",
      type: "clinic",
      latitude: 44.837789,
      longitude: -0.57918,
      address: "112 Cours d'Albret, 33000 Bordeaux",
      phone: "+33 5 56 79 56 79",
    },
    {
      id: 4,
      name: "Centre Wellness Alpes",
      type: "wellness",
      latitude: 45.899247,
      longitude: 6.129384,
      address: "24 Rue des Alpes, 74000 Annecy",
      phone: "+33 4 50 45 67 89",
    },
    {
      id: 5,
      name: "Centre de Santé Paris",
      type: "healthcare",
      latitude: 48.856614,
      longitude: 2.3522219,
      address: "75 Avenue des Champs-Élysées, 75008 Paris",
      phone: "+33 1 45 67 89 10",
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row items-center w-full mx-auto p-8 lg:px-24 bg-gray-50">
      {/* Left section with text */}
      <div className="w-full lg:w-1/2 pr-0 lg:pr-12 mb-8 lg:mb-0">
        <h1 className="text-5xl font-bold font-space leading-tight text-gray-900 mb-6">
          Map Ipsum
          <br />
          Dolor Sit Amet,
          <br />
          Consectetur
        </h1>
        <div className="flex space-x-4 mt-6">
          <button className="bg-gray-200 hover:bg-gray-300 rounded-full p-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button className="bg-teal-100 hover:bg-teal-200 rounded-full p-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Right section with map */}
      <div className="w-full lg:w-2/3 h-96 lg:h-auto rounded-3xl overflow-hidden shadow-xl">
        <CentersMap
          centers={healthCenters}
          height="250px"
          initialView={[46.603354, 2.888334]}
          zoom={6}
        />
      </div>
    </div>
  );
};

export default MapSection;
