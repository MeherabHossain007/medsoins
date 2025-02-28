"use client";
import React, { useState, useEffect, useRef } from "react";
import IconInput from "@/components/ui/IconInput";
import LocationCard from "@/components/home/LocationCard";

// Search bar component with expanding functionality
const SearchBar = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState("absolute");
  const [bgColor, setBGColor] = useState("bg-[#FAFAFA]");
  const [searchValue, setSearchValue] = useState("");
  const [isSuggestion, setIsSuggestion] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const debounceRef = useRef(null);
  const searchBarRef = useRef(null);
  const staticCenters = [
    { name: "Centre de soins de santé", distance: "100 km" },
    { name: "Centre médical général", distance: "75 km" },
    { name: "Clinique de bien-être", distance: "50 km" },
    { name: "Hôpital régional", distance: "120 km" },
    { name: "Nouveau Centre médical", distance: "60 km" },
    { name: "Centre de bien-être avancé", distance: "40 km" },
  ];

  // Function to fetch suggestions (simulated with static data)
  const fetchSuggestions = (query) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      if (!query.trim()) {
        setSuggestions([]);
        setIsSuggestion(false);
        setIsFocused(true);
        return;
      }

      const filteredSuggestions = staticCenters.filter((center) =>
        center.name.toLowerCase().includes(query.toLowerCase())
      );

      setSuggestions(filteredSuggestions);
      setIsSuggestion(filteredSuggestions.length > 0);
    }, 300);
  };

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  const handleBlur = (e) => {
    if (
      searchBarRef.current &&
      !searchBarRef.current.contains(e.relatedTarget)
    ) {
      setIsFocused(false);
      setIsSuggestion(false);
      setPosition("absolute");
      setBGColor("bg-[#FAFAFA]");
    }
  };

  // Mock function to handle search
  const handleSearch = () => {
    setIsSearched(true);
  };

  return (
    <div className="relative flex fle-col w-full h-auto justify-center items-center">
      <form
        ref={searchBarRef}
        onBlur={handleBlur}
        className={`lg:${position} flex flex-col md:inline-flex items-center justify-center gap-4 ${bgColor} px-4 py-2 rounded-lg`}
      >
        <div className=" flex flex-wrap items-center justify-center gap-4">
          <IconInput
            className="w-full md:w-sm lg:w-md xl:w-lg"
            onChange={(e) => {
              const value = e.target.value;
              setSearchValue(value);
              fetchSuggestions(value);
            }}
            onFocus={() => {
              setIsFocused(true);
              setPosition("absolute inset-x-5 top-[-60]");
              setBGColor("bg-white shadow-lg pt-10");
            }}
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
          <IconInput placeholder={"Rayon"} className="w-full sm:w-40 md:w-60">
            <select defaultValue="Pick a color" className="select text-bold">
              <option>100km</option>
              <option>Crimson</option>
              <option>Amber</option>
              <option>Velvet</option>
            </select>
          </IconInput>
          <button
            onClick={handleSearch}
            className="bg-primary text-white px-8 py-5 sm:px-5 md:px-6 rounded-full border-0"
          >
            Trouver mon centre
          </button>
        </div>
        {isFocused && !isSuggestion && (
          <div className="py-36 text-center">
            <p className="text-xl text-gray-600 mb-1">
              Pas de centre disponible encore ici.
            </p>
            <p className="text-xl text-gray-600 mb-6">
              Souhaitez-vous ouvrir un centre ?
            </p>
            <a href="#" className="text-blue-500 text-xl">
              Ouvrir un centre
            </a>
          </div>
        )}
        {isSuggestion && searchValue && (
          <div className="w-full mx-auto mt-8 mb-10 bg-gray-100">
            {suggestions.map((center, index) => (
              <LocationCard
                key={index}
                name={center.name}
                distance={center.distance}
                className="suggestion-item" // Add class to suggestion items
              />
            ))}
            {suggestions.length === 0 && (
              <div className="text-center py-4">No suggestions found.</div>
            )}
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchBar;
