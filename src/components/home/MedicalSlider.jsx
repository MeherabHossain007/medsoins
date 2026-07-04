import React, { useState, useRef } from "react";
import Button from "@/components/ui/Button";

const MedicalFacilityShowcase = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const slides = [
    {
      id: 1,
      image: "/images/s1.jpeg",
      caption: "Lorem ipsum dolor sit amet",
    },
    {
      id: 2,
      image: "/images/s2.jpeg",
      caption: "Cabinet médical moderne",
    },
    {
      id: 3,
      image: "/images/s3.jpeg",
      caption: "Équipement de haute qualité",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  // Touch event handlers
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  // Simple React components for icons
const ChevronLeft = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="21"
      viewBox="0 0 22 21"
      fill="none"
    >
      <g clipPath="url(#clip0_1_1845)">
        <g opacity="0.9">
          <g opacity="0.9">
            <path
              d="M10.3129 17.1024L3.51713 10.3066L10.3129 3.51091"
              stroke="white"
              strokeWidth="2.64318"
              strokeMiterlimit="20"
              strokeLinecap="square"
            />
          </g>
          <g opacity="0.9">
            <path
              d="M17.1086 10.3066H4.8759"
              stroke="white"
              strokeWidth="2.64318"
              strokeMiterlimit="20"
              strokeLinecap="square"
            />
          </g>
        </g>
      </g>
      <defs>
        <clipPath id="clip0_1_1845">
          <rect
            width="14.5375"
            height="14.5375"
            fill="white"
            transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 21.5271 10.3071)"
          />
        </clipPath>
      </defs>
    </svg>
  );

  const ChevronRight = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="21"
      height="21"
      viewBox="0 0 21 21"
      fill="none"
    >
      <g clipPath="url(#clip0_1_1838)">
        <g opacity="0.9">
          <g opacity="0.9">
            <path
              d="M11.6173 17.1021L18.413 10.3064L11.6173 3.51067"
              stroke="white"
              strokeWidth="2.64318"
              strokeMiterlimit="20"
              strokeLinecap="square"
            />
          </g>
          <g opacity="0.9">
            <path
              d="M4.82159 10.3064H17.0543"
              stroke="white"
              strokeWidth="2.64318"
              strokeMiterlimit="20"
              strokeLinecap="square"
            />
          </g>
        </g>
      </g>
      <defs>
        <clipPath id="clip0_1_1838">
          <rect
            width="14.5375"
            height="14.5375"
            fill="white"
            transform="translate(0.403076 10.3069) rotate(-45)"
          />
        </clipPath>
      </defs>
    </svg>
  );

  const captionStyle = {
    borderRadius: "12.72px",
    background:
      "linear-gradient(180deg, rgba(0, 0, 0, 0.00) 59.08%, rgba(0, 0, 0, 0.80) 97.23%, rgba(0, 0, 0, 0.00) 100%)",
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    display: "flex",
    alignItems: "flex-end",
    padding: "0 0 20px 20px",
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      {/* Main Image Carousel with touch support */}
      <div
        className="relative rounded-lg overflow-hidden mb-4"
        style={{ borderRadius: "12.72px" }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="relative h-80 w-full">
          <img
            src={slides[currentSlide].image}
            alt={slides[currentSlide].caption}
            className="w-full h-full object-cover"
            draggable="false"
          />
          <div style={captionStyle}>
            <h3 className="text-xl font-bold text-white">
              {slides[currentSlide].caption}
            </h3>
          </div>

          {/* Navigation arrows - hidden on mobile */}
          <div className="absolute bottom-0 right-0 left-0 mx-auto justify-center p-4 hidden md:flex gap-2 z-10">
            <button
              onClick={prevSlide}
              className="bg-opacity-70 p-2 rounded-full hover:bg-opacity-100 transition-all"
              aria-label="Previous slide"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={nextSlide}
              className="bg-opacity-70 p-2 rounded-full hover:bg-opacity-100 transition-all"
              aria-label="Next slide"
            >
              <ChevronRight />
            </button>
          </div>

          {/* Slide indicators for mobile */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10 md:hidden">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full ${
                  currentSlide === index ? "bg-white" : "bg-white bg-opacity-50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Smaller Images Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div
          className="rounded-lg overflow-hidden h-64 bg-gray-100"
          style={{ borderRadius: "12.72px" }}
        >
          <img
            src="/images/s2.jpeg"
            alt="Hospital ward with multiple beds"
            className="w-full h-full object-cover"
          />
        </div>
        <div
          className="rounded-lg overflow-hidden h-64 bg-gray-100"
          style={{ borderRadius: "12.72px" }}
        >
          <img
            src="/images/s3.jpeg"
            alt="Reception desk at medical facility"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Call to Action Button */}
      <div className="flex justify-center">
        <Button href={"/doctor"}>
          <span className="flex items-center justify-center gap-2">
            Rejoindre une équipe
            <img src="/images/Arrow - Right 2.png" alt="Arrow Right" />
          </span>
        </Button>
      </div>
    </div>
  );
};

export default MedicalFacilityShowcase;
