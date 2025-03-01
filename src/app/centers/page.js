/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Banner from "@/components/layout/Banner";
import SearchBar from "@/components/home/SearchBar";
import LocationCard from "@/components/home/LocationCard";

// Extract search params into a separate component wrapped in Suspense
const SearchParamsHandler = ({ onParamsChange }) => {
  const searchParams = useSearchParams();

  useEffect(() => {
    const location = searchParams.get("location") || "";
    const radius = searchParams.get("radius") || "100km";
    onParamsChange(location, radius);
  }, [searchParams]);

  return null;
};

export default function SearchPage() {
  const [searchResults, setSearchResults] = useState([]);
  const [searchLocation, setSearchLocation] = useState("");
  const [searchRadius, setSearchRadius] = useState("100km");
  const [isLoading, setIsLoading] = useState(true);
  const searchBarRef = useRef(null);

  // Static centers data (would be replaced with API call in production)
  const staticCenters = [
    {
      id: 1,
      name: "Centre de soins de santé",
      distance: "100 km",
      location: "Paris",
    },
    {
      id: 2,
      name: "Centre médical général",
      distance: "75 km",
      location: "Lyon",
    },
    {
      id: 3,
      name: "Clinique de bien-être",
      distance: "50 km",
      location: "Bordeaux",
    },
    {
      id: 4,
      name: "Hôpital régional",
      distance: "120 km",
      location: "Marseille",
    },
    {
      id: 5,
      name: "Nouveau Centre médical",
      distance: "60 km",
      location: "Lille",
    },
    {
      id: 6,
      name: "Centre de bien-être avancé",
      distance: "40 km",
      location: "Nice",
    },
  ];

  const handleParamsChange = (location, radius) => {
    setSearchLocation(location);
    setSearchRadius(radius);
    setIsLoading(true);

    // Filter centers based on search criteria
    const results = staticCenters.filter(
      (center) =>
        center.location.toLowerCase().includes(location.toLowerCase()) ||
        center.name.toLowerCase().includes(location.toLowerCase())
    );

    setTimeout(() => {
      setSearchResults(results);
      setIsLoading(false);
    }, 500);
  };

  const handleSearchResults = (results, location, radius) => {
    if (document.activeElement) document.activeElement.blur();
    setSearchResults(results);
    setSearchLocation(location);
    setSearchRadius(radius);

    // Update URL without reloading
    const url = new URL(window.location);
    url.searchParams.set("location", location);
    url.searchParams.set("radius", radius);
    window.history.pushState({}, "", url);
  };

  return (
    <Suspense
      fallback={
        <div className="text-center py-12 text-gray-600">Chargement...</div>
      }
    >
      <SearchParamsHandler onParamsChange={handleParamsChange} />
      <div className="pt-18 lg:pt-28">
        <Banner />
        <div ref={searchBarRef} className="search-bar-container">
          <SearchBar
            initialLocation={searchLocation}
            initialRadius={searchRadius}
            onSearchResults={handleSearchResults}
            resetAfterSearch={true}
            className="lg:top-10"
          />
        </div>

        <div className="container mx-auto px-4 mt-10 lg:mt-55">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl text-gray-700">
              {isLoading
                ? "Recherche en cours..."
                : searchResults.length > 0
                ? `${searchResults.length} résultats trouvés pour "${searchLocation}" (${searchRadius})`
                : `Aucun résultat pour "${searchLocation}" (${searchRadius})`}
            </h2>
          </div>

          {isLoading ? (
            <div className="flex justify-center my-12">
              <div className="loader">Chargement...</div>
            </div>
          ) : searchResults.length > 0 ? (
            <div className="space-y-4">
              {searchResults.map((center) => (
                <LocationCard
                  key={center.id}
                  name={center.name}
                  distance={center.distance}
                  location={center.location}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600 mb-1">
                Pas de centre disponible pour cette recherche.
              </p>
              <p className="text-xl text-gray-600 mb-6">
                Souhaitez-vous élargir votre rayon de recherche ou ouvrir un
                centre ?
              </p>
              <a href="#" className="text-blue-500 text-xl">
                Ouvrir un centre
              </a>
            </div>
          )}
        </div>
      </div>
    </Suspense>
  );
}
