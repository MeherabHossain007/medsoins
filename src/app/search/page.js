/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Banner from "@/components/layout/Banner";
import SearchBar from "@/components/home/SearchBar";
import LocationCard from "@/components/home/LocationCard";

export default function SearchPage() {
  const searchParams = useSearchParams();
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

  useEffect(() => {
    // Get search parameters from URL
    const location = searchParams.get("location") || "";
    const radius = searchParams.get("radius") || "100km";

    setSearchLocation(location);
    setSearchRadius(radius);

    // Simulate fetching search results
    setIsLoading(true);

    // Filter centers based on search criteria
    const results = staticCenters.filter(
      (center) =>
        center.location.toLowerCase().includes(location.toLowerCase()) ||
        center.name.toLowerCase().includes(location.toLowerCase())
    );

    // Simulate API delay
    setTimeout(() => {
      setSearchResults(results);
      setIsLoading(false);
    }, 500);
  }, [searchParams]);

  // Handle search from the search bar on this page
  const handleSearchResults = (results, location, radius) => {
    // Blur any active element to reset focus states
    if (document.activeElement) {
      document.activeElement.blur();
    }

    setSearchResults(results);
    setSearchLocation(location);
    setSearchRadius(radius);

    // Update URL without full page reload
    const url = new URL(window.location);
    url.searchParams.set("location", location);
    url.searchParams.set("radius", radius);
    window.history.pushState({}, "", url);
  };

  return (
    <Suspense>
      <div className="pt-18 lg:pt-28">
        <Banner />

        <div ref={searchBarRef} className="search-bar-container">
          {/* Pass the current search parameters to SearchBar */}
          <SearchBar
            initialLocation={searchLocation}
            initialRadius={searchRadius}
            onSearchResults={handleSearchResults}
            resetAfterSearch={true}
          />
        </div>

        <div className="container mx-auto px-4 mt-30">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl text-gray-700">
              {isLoading
                ? "Recherche en cours..."
                : searchResults.length > 0
                ? `${searchResults.length} résultats trouvés pour "${searchLocation}" (${searchRadius})`
                : `Aucun résultat pour "${searchLocation}" (${searchRadius})`}
            </h2>
            <button className="text-gray-500">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                />
              </svg>
            </button>
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
