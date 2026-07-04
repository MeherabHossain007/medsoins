"use client";
import React, { useState, useEffect, useRef } from "react";
import IconInput from "@/components/ui/IconInput";
import LocationCard from "@/components/home/LocationCard";
import { useRouter } from "next/navigation";

// Search bar component with expanding functionality and animations
const SearchBar = ({
  initialLocation = "",
  initialRadius = "100km",
  onSearchResults = null,
  resetAfterSearch = false,
  className,
}) => {
  const router = useRouter();
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState("absolute");
  const [bgColor, setBGColor] = useState("bg-[#FAFAFA]");
  const [searchValue, setSearchValue] = useState(initialLocation);
  const [radius, setRadius] = useState(initialRadius);
  const [isSuggestion, setIsSuggestion] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const debounceRef = useRef(null);
  const searchBarRef = useRef(null);
  const [staticCenters, setStaticCenters] = useState([]);

  // Function to reset the search bar state with animation
  const resetSearchBarState = () => {
    setIsAnimating(true);

    // First animate the background change
    setBGColor("bg-[#FAFAFA] transition-colors duration-300");

    // After a slight delay, change position and other states
    setTimeout(() => {
      setIsFocused(false);
      setIsSuggestion(false);
      setPosition("absolute");
      setIsAnimating(false);
    }, 300);
  };

  // Function to calculate distance between two coordinates (haversine formula)
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

  // Function to fetch suggestions based on search query
  const fetchSuggestions = (query) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      if (!query.trim()) {
        setSuggestions([]);
        setIsSuggestion(false);
        return;
      }

      // Filter centers based on address or name containing the query
      const filteredSuggestions = staticCenters.filter(
        (center) =>
          center.address.toLowerCase().includes(query.toLowerCase()) ||
          center.name.toLowerCase().includes(query.toLowerCase())
      );

      // Add calculated distance to each suggestion
      // For demonstration, we'll use a fixed user location (Paris)
      // In a real app, you would use the user's current location
      const userLat = 48.856614;
      const userLon = 2.3522219;

      const suggestionsWithDistance = filteredSuggestions.map((center) => ({
        ...center,
        distance: calculateDistance(
          userLat,
          userLon,
          center.latitude,
          center.longitude
        ),
      }));

      setSuggestions(suggestionsWithDistance);
      setIsSuggestion(suggestionsWithDistance.length > 0);
    }, 300);
  };

  useEffect(() => {
    const fetchCenters = async () => {
      try {
        const response = await fetch("/data/health-centers.json");
        const centersData = await response.json();
        setStaticCenters(centersData);
      } catch (error) {
        console.error("Error fetching health centers data:", error);
      }
    };
    fetchCenters();

    // Initialize search value from props if available
    if (initialLocation) {
      setSearchValue(initialLocation);
    }

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [initialLocation]);

  const handleBlur = (e) => {
    if (
      searchBarRef.current &&
      !searchBarRef.current.contains(e.relatedTarget)
    ) {
      resetSearchBarState();
    }
  };

  // Select suggestion handler with animation
  const handleSelectSuggestion = (center) => {
    setSearchValue(center.address);

    // Animate the suggestion disappearing
    const fadeOutSuggestions = () => {
      setIsSuggestion(false);
    };

    setTimeout(fadeOutSuggestions, 150);
  };

  // Function to handle search
  const handleSearch = (e) => {
    e.preventDefault();

    if (!searchValue.trim()) {
      return;
    }

    // Filter centers based on search criteria (address or name)
    const filteredCenters = staticCenters.filter(
      (center) =>
        center.address.toLowerCase().includes(searchValue.toLowerCase()) ||
        center.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    // Add calculated distance to each result
    // For demonstration, we'll use a fixed user location (Paris)
    // In a real app, you would use the user's current location
    const userLat = 48.856614;
    const userLon = 2.3522219;

    const results = filteredCenters.map((center) => ({
      ...center,
      distance: calculateDistance(
        userLat,
        userLon,
        center.latitude,
        center.longitude
      ),
    }));

    // Reset the search bar state if resetAfterSearch is true
    if (resetAfterSearch) {
      resetSearchBarState();

      // Remove focus from input elements
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    }

    // If we have a callback for in-page results, use it
    if (onSearchResults) {
      onSearchResults(results, searchValue, radius);
      return;
    }

    // Otherwise, navigate to search page with query params
    const queryParams = new URLSearchParams({
      location: searchValue,
      radius: radius,
    }).toString();

    router.push(`/centers?${queryParams}`);
  };

  // Handle focus with animation
  const handleFocus = () => {
    setIsAnimating(true);
    setIsFocused(true);

    // First update the position
    setPosition("absolute top-[-60]");

    // Then animate the background color change
    setBGColor(
      "bg-white shadow-lg pt-10 transition-all duration-300 ease-in-out"
    );

    // Mark animation as complete after transition
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <div className="relative flex flex-col w-full h-auto justify-center items-center">
      <form
        ref={searchBarRef}
        onSubmit={handleSearch}
        onBlur={handleBlur}
        className={`container mx-auto lg:${position} lg:absolute ${className} flex flex-col md:inline-flex items-center justify-center gap-4 ${bgColor} p-5 lg:p-10 rounded-lg transition-all duration-300 ease-in-out`}
      >
        <div className="w-full flex flex-wrap lg:flex-nowrap items-center justify-center gap-4">
          <IconInput
            className="flex-1 transition-all duration-300"
            value={searchValue}
            onChange={(e) => {
              const value = e.target.value;
              setSearchValue(value);
              fetchSuggestions(value);
            }}
            onFocus={handleFocus}
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
                    <use
                      href="#image0_1_2090"
                      transform="scale(0.03125 0.025)"
                    />
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
          <IconInput
            className="w-full sm:w-40 md:w-60 transition-all duration-300"
            placeholder={"Rayon"}
            onChange={(e) => setRadius(e.target.value)}
          >
            <select
              className="select text-bold"
              value={radius}
              onChange={(e) => setRadius(e.target.value)}
            >
              <option value="25km">25km</option>
              <option value="50km">50km</option>
              <option value="75km">75km</option>
              <option value="100km">100km</option>
              <option value="150km">150km</option>
            </select>
          </IconInput>
          <button
            type="submit"
            className="bg-primary text-white px-8 py-5 sm:px-5 md:px-6 rounded-full border-0 hover:bg-primary/90 transition-all duration-200 transform hover:scale-105 active:scale-95"
          >
            Trouver mon centre
          </button>
        </div>
        {isFocused && !isSuggestion && searchValue.trim() === "" && (
          <div className="py-36 text-center opacity-0 animate-fadeIn">
            <p className="text-xl text-gray-600 mb-1">
              Pas de centre disponible encore ici.
            </p>
            <p className="text-xl text-gray-600 mb-6">
              Souhaitez-vous ouvrir un centre ?
            </p>
            <a
              href="/doctor"
              className="text-blue-500 text-xl hover:underline transition-all duration-200"
            >
              Ouvrir un centre
            </a>
          </div>
        )}
        {isSuggestion && searchValue && (
          <div className="w-full mx-auto mt-8 mb-10 bg-gray-100 rounded-md overflow-hidden animate-slideDown">
            {suggestions.map((center, index) => (
              <div
                key={index}
                onClick={() => handleSelectSuggestion(center)}
                className={`transform transition-transform duration-200 ease-in-out hover:scale-[1.01] ${
                  index % 2 === 0
                    ? "animate-slideInLeft"
                    : "animate-slideInRight"
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <LocationCard
                  name={center.name}
                  id={center.id}
                  distance={center.distance}
                  className="suggestion-item cursor-pointer hover:bg-gray-200 transition-colors duration-200"
                />
              </div>
            ))}
            {suggestions.length === 0 && (
              <div className="text-center py-4 animate-fadeIn">
                No suggestions found.
              </div>
            )}
          </div>
        )}
      </form>

      {/* Add animation styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideDown {
          from {
            max-height: 0;
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            max-height: 1000px;
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out forwards;
        }

        .animate-slideDown {
          animation: slideDown 0.3s ease-out forwards;
        }

        .animate-slideInLeft {
          animation: slideInLeft 0.3s ease-out forwards;
        }

        .animate-slideInRight {
          animation: slideInRight 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default SearchBar;
