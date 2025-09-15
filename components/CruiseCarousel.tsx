"use client";

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { useHoverSupport } from "@/hooks/use-hover-support";

import "swiper/css";

type ICruiseDetails = {
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
      destination: "Caribbean",
      highlights: ["Luxury Dining", "Spa", "Indoor Pool"],
    },
    primaryImage: "/cruises/norwegian/cruise.jpeg",
    hoverImages: [
      "/cruises/norwegian/room.webp",
      "/cruises/norwegian/pool.webp",
    ],
  },
  {
    name: "Oceania Cruises",
    cruiseDetails: {
      destination: "America",
      highlights: ["Exclusive Dining", "Suites", "Luxury Resturants"],
    },
    primaryImage: "/cruises/oceania/cruise.jpeg",
    hoverImages: [
      "/cruises/oceania/room.avif",
      "/cruises/oceania/restaurant.avif",
      "/cruises/oceania/pool.avif",
    ],
  },
  {
    name: "Regent Seven Seas Cruises",
    cruiseDetails: {
      destination: "Mediterranean",
      highlights: ["Luxury service", "Spa", "Cultural Plays"],
    },
    primaryImage: "/cruises/regent/cruise.jpeg",
    hoverImages: [
      "/cruises/regent/lobby.jpg",
      "/cruises/regent/restaurant.avif",
      "/cruises/regent/spa.jpg",
    ],
  },
];

export default function CruiseCarousel() {
  return (
    <div className="relative w-[90%] h-[80vh] mx-auto">
      <Swiper
        modules={[Autoplay]}
        slidesPerView={1}
        loop
        autoplay={{
          delay: 8000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        // Configure touch behavior to prevent conflicts
        touchStartPreventDefault={false}
        passiveListeners={false}
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

function CruiseCard({
  name,
  primaryImage,
  hoverImages,
  cruiseDetails,
}: ICruiseCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(0);
  const [currentImage, setCurrentImage] = useState(primaryImage);
  const supportsHover = useHoverSupport();

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;

    if (isHovered && hoverImages?.length > 0) {
      setCurrentImage(hoverImages[0]);
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

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isHovered, hoverImages, primaryImage]);

  // Mobile tap handler
  const handleMobileInteraction = (e: React.MouseEvent | React.TouchEvent) => {
    if (!supportsHover) {
      e.stopPropagation();
      setIsHovered((prev) => {
        return !prev;
      });
    }
  };

  // Auto-hide on mobile after 7.5 seconds (with delay to prevent immediate hiding)
  useEffect(() => {
    if (!supportsHover && isHovered) {
      // Add a longer delay to ensure gallery has time to show
      const timeout = setTimeout(() => {
        setIsHovered(false);
      }, 7500);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [isHovered, supportsHover]);

  return (
    <div
      className="relative w-full h-full overflow-hidden rounded-2xl shadow-lg group"
      // Desktop hover events (only if device supports hover)
      {...(supportsHover && {
        onMouseEnter: () => {
          console.log("Desktop mouse enter");
          setIsHovered(true);
        },
        onMouseLeave: () => {
          console.log("Desktop mouse leave");
          setIsHovered(false);
        },
      })}
      // Mobile touch/click events (only if device doesn't support hover)
      {...(!supportsHover && {
        onClick: handleMobileInteraction,
        // Remove onTouchStart to prevent double triggering
        style: { cursor: "pointer" },
      })}
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

      {/* Gallery active indicator */}
      {isHovered && (
        <div className="absolute top-4 right-4 bg-green-500 text-white px-2 py-1 rounded text-xs z-20">
          Galería Activa
        </div>
      )}

      {/* Cruise Information Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-10 bg-gradient-to-t from-blue-950/90 to-transparent">
        <div className="max-w-2xl">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {name}
          </h3>

          <div className="flex flex-wrap gap-2">
            {cruiseDetails.highlights.map((highlight, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-slate-200 text-expery-head text-sm rounded-full border border-expery-blue/80"
              >
                {highlight}
              </span>
            ))}
          </div>

          {/* Mobile instruction
          {!supportsHover && (
            <div className="flex items-center gap-2 text-white/80 text-sm mb-2">
              <span>👆</span>
              <span>Oprime para ver la galería</span>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
}
