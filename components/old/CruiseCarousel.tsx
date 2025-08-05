"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

const cruises = [
  {
    id: 1,
    name: "Mediterranean Majesty",
    destination: "French Riviera & Italian Coast",
    duration: "7 Days",
    guests: "2,500",
    price: "$3,299",
    image: "/placeholder.svg?height=400&width=600",
    rating: 4.9,
    highlights: ["Michelin Star Dining", "Private Balconies", "Spa & Wellness"],
  },
  {
    id: 2,
    name: "Caribbean Elegance",
    destination: "Bahamas & Barbados",
    duration: "10 Days",
    guests: "1,800",
    price: "$4,599",
    image: "/placeholder.svg?height=400&width=600",
    rating: 4.8,
    highlights: ["Butler Service", "Private Beach Access", "Wine Tastings"],
  },
  {
    id: 3,
    name: "Northern Lights Expedition",
    destination: "Norway & Iceland",
    duration: "12 Days",
    guests: "1,200",
    price: "$6,899",
    image: "/placeholder.svg?height=400&width=600",
    rating: 5.0,
    highlights: ["Aurora Viewing", "Expert Naturalists", "Luxury Suites"],
  },
];

function CruiseCarousel({ cruises }: { cruises: typeof cruises }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % cruises.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [cruises.length, isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % cruises.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + cruises.length) % cruises.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  return (
    <div className="relative">
      {/* Main Carousel */}
      <div className="relative h-[600px] rounded-2xl overflow-hidden group">
        {cruises.map((cruise, index) => (
          <div
            key={cruise.id}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              index === currentSlide
                ? "opacity-100 transform translate-x-0"
                : index < currentSlide
                ? "opacity-0 transform -translate-x-full"
                : "opacity-0 transform translate-x-full"
            }`}
          >
            <Image
              src={cruise.image || "/placeholder.svg"}
              alt={cruise.name}
              fill
              className="object-cover"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-950/80 via-blue-900/40 to-transparent"></div>

            {/* Cruise Information Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-blue-950/90 to-transparent">
              <div className="max-w-2xl">
                <div className="flex items-center gap-4 mb-4">
                  <Badge className="bg-sky-400 text-blue-900 font-semibold px-3 py-1">
                    <Star className="w-3 h-3 mr-1" />
                    {cruise.rating}
                  </Badge>
                  <span className="text-sky-400 text-sm font-medium">
                    {cruise.duration}
                  </span>
                  <span className="text-gray-300 text-sm">•</span>
                  <span className="text-gray-300 text-sm">
                    {cruise.guests} guests
                  </span>
                </div>

                <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {cruise.name}
                </h3>
                <p className="text-xl text-sky-300 mb-4">
                  {cruise.destination}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {cruise.highlights.map((highlight, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-blue-800/60 text-gray-200 text-sm rounded-full border border-blue-700"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-3xl font-bold text-white">
                      {cruise.price}
                    </span>
                    <span className="text-gray-300 text-sm ml-2">
                      per person
                    </span>
                  </div>
                  <Button className="bg-sky-400 hover:bg-sky-500 text-blue-900 font-semibold px-6 py-3">
                    Explore Voyage
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-blue-900/80 hover:bg-blue-800 text-white rounded-full flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100"
        >
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-blue-900/80 hover:bg-blue-800 text-white rounded-full flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100"
        >
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
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Carousel Indicators */}
      <div className="flex justify-center mt-8 space-x-3">
        {cruises.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-sky-400 w-8"
                : "bg-blue-700 hover:bg-blue-600"
            }`}
          />
        ))}
      </div>

      {/* Thumbnail Navigation */}
      <div className="grid grid-cols-3 gap-4 mt-8">
        {cruises.map((cruise, index) => (
          <button
            key={cruise.id}
            onClick={() => goToSlide(index)}
            className={`relative h-24 rounded-lg overflow-hidden transition-all duration-300 ${
              index === currentSlide
                ? "ring-2 ring-sky-400 opacity-100"
                : "opacity-60 hover:opacity-80"
            }`}
          >
            <Image
              src={cruise.image || "/placeholder.svg"}
              alt={cruise.name}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-blue-950/40"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white text-sm font-medium text-center px-2">
                {cruise.name}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default CruiseCarousel;
