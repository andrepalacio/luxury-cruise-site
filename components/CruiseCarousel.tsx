"use client";

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

import "swiper/css";

type ICruiseDetails = {
  rating: number;
  duration: string;
  destination: string;
  highlights: string[];
};

type ICruiseCardProps = {
  name: string;
  primaryImage: string;
  hoverImages: Array<string>;
  cruiseDetails: ICruiseDetails;
};

const cruises = [
  {
    name: "Norwegian Cruise Line",
    cruiseDetails: {
      rating: 4.8,
      duration: "10 days",
      destination: "Caribbean",
      highlights: ["Luxury Dining", "Spa", "Indoor Pool"],
    },
    primaryImage: "/cruises/norwegian/encore.jpg",
    hoverImages: ["/cruises/norwegian/room.webp", "/cruises/norwegian/pool.webp"],
  },
  {
    name: "Oceania Cruises",
    cruiseDetails: {
      rating: 4.8,
      duration: "7 days",
      destination: "America",
      highlights: ["Exclusive Dining", "Suites", "Luxury Resturants"],
    },
    primaryImage: "/cruises/oceania/riviera.jpg",
    hoverImages: ["/cruises/oceania/room.avif", "/cruises/oceania/restaurant.avif", "/cruises/oceania/pool.avif"],
  },
  {
    name: "Regent Seven Seas Cruises",
    cruiseDetails: {
      rating: 4.9,
      duration: "10 days",
      destination: "Mediterranean",
      highlights: ["Luxury service", "Spa", "Cultural Plays"],
    },
    primaryImage: "/cruises/regent/cruise.jpg",
    hoverImages: ["/cruises/regent/lobby.jpg", "/cruises/regent/restaurant.avif", "/cruises/regent/spa.jpg"],
  },
];

export default function CruiseCarousel() {
  return (
    <div className="relative w-full h-[80vh]">
      <Swiper
        modules={[Autoplay]}
        slidesPerView={1}
        loop
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        className="w-full h-full"
      >
        {cruises.map((cruise, index) => (
          <SwiperSlide key={index} className="w-full h-auto">
            <CruiseCard {...cruise} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

function CruiseCard({ name, primaryImage, hoverImages, cruiseDetails }: ICruiseCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(0);
  const [currentImage, setCurrentImage] = useState(primaryImage);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;

    if (isHovered && hoverImages?.length > 0) {
      setCurrentImage(hoverImages[0]); // Start with the first hover image
      interval = setInterval(() => {
        setHoverIndex((prev) => {
          const next = (prev + 1) % hoverImages.length;
          setCurrentImage(hoverImages[next]);
          return next;
        });
      }, 2500);
    } else {
      setCurrentImage(primaryImage);
      setHoverIndex(0);
    }

    return () => clearInterval(interval);
  }, [isHovered, hoverImages, primaryImage]);

  return (
    <div
      className="relative w-full h-full overflow-hidden rounded-2xl shadow-lg group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence>
        <motion.div
          key={currentImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 w-full h-full"
        >
          <Image
            src={currentImage}
            alt={name}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </motion.div>
      </AnimatePresence>

      {/* Cruise Information Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-blue-950/90 to-transparent">
        <div className="max-w-2xl">
          <div className="flex items-center gap-4 mb-4">
            <Badge className="bg-slate-100 hover:bg-slate-300 text-expery-head font-semibold px-3 py-1">
              {cruiseDetails.duration}
            </Badge>
            <span className="text-expery-head text-md font-bold">
              {cruiseDetails.destination}
            </span>
          </div>

          <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {name}
          </h3>

          <div className="flex flex-wrap gap-2 mb-6">
            {cruiseDetails.highlights.map((highlight, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-slate-200 text-expery-head text-sm rounded-full border border-expery-blue/80"
              >
                {highlight}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
