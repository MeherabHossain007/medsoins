/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Banner from "@/components/layout/Banner";
import SearchBar from "@/components/home/SearchBar";
import LocationCard from "@/components/home/LocationCard";

// Calculate distance between two coordinates (haversine formula)
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the earth in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return Math.round(distance);
};

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
  const [staticCenters, setStaticCenters] = useState([]);

  const handleParamsChange = async (location, radius) => {
    setSearchLocation(location);
    setSearchRadius(radius);
    setIsLoading(true);

    try {
      const response = await fetch("/data/health-centers.json");
      const centersData = await response.json();
      setStaticCenters(centersData);

      // Only perform search if location is not empty
      if (location.trim()) {
        // Filter centers based on address or name
        const filteredResults = centersData.filter(
          (center) =>
            center.address.toLowerCase().includes(location.toLowerCase()) ||
            center.name.toLowerCase().includes(location.toLowerCase())
        );

        // Add distance calculation
        // For demonstration, we'll use a fixed user location (Paris)
        const userLat = 48.856614;
        const userLon = 2.3522219;

        const resultsWithDistance = filteredResults.map((center) => ({
          ...center,
          distance: calculateDistance(
            userLat,
            userLon,
            center.latitude,
            center.longitude
          ),
        }));

        // Filter by radius if needed
        const radiusValue = parseInt(radius);
        const resultsInRadius = radiusValue
          ? resultsWithDistance.filter(
              (center) => center.distance <= radiusValue
            )
          : resultsWithDistance;

        setTimeout(() => {
          setSearchResults(resultsInRadius);
          setIsLoading(false);
        }, 500);
      } else {
        // If no location, show all centers with distance
        const userLat = 48.856614;
        const userLon = 2.3522219;

        const allWithDistance = centersData.map((center) => ({
          ...center,
          distance: calculateDistance(
            userLat,
            userLon,
            center.latitude,
            center.longitude
          ),
        }));

        setTimeout(() => {
          setSearchResults(allWithDistance);
          setIsLoading(false);
        }, 500);
      }
    } catch (error) {
      console.error("Error fetching or processing data:", error);
      setIsLoading(false);
      setSearchResults([]);
    }
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

        <div className="container mx-auto px-10 mt-10 lg:mt-55">
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
                  id={center.id}
                  name={center.name}
                  distance={center.distance}
                  location={center.address}
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
              <a
                href="/doctor"
                className="text-blue-500 text-xl hover:underline"
              >
                Ouvrir un centre
              </a>
            </div>
          )}
        </div>
      </div>
    </Suspense>
  );
}
