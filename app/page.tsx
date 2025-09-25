"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import CruiseCarousel from "@/components/CruiseCarousel";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import Experiences from "@/components/Experiences";

export default function LuxuryCruiseSite() {
  const [scrollY, setScrollY] = useState(0);
  const [isNavbarSolid, setIsNavbarSolid] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      setIsNavbarSolid(currentScrollY > window.innerHeight * 0.8);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const desktopImages = [
    '/fiodors.jpeg',
    '/abu dhabi.jpg',
    '/food.jpeg',
    '/pagoda.jpeg',
  ];

  const mobileImages = [
    '/fiodors.jpeg',
    '/abu dhabi.jpg',
    '/food-mobile.jpeg',
    '/pagoda-mobile.jpeg',
  ];

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const images = isMobile ? mobileImages : desktopImages;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-40 transition-all duration-500 ${
          isNavbarSolid
            ? "bg-stone-50 backdrop-blur-md border-b border-sky-200/20 shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Image
                src="/logos/expery_original.png"
                alt="Expery Travel Logo"
                className="rounded mx-2"
                width={180}
                height={100}
              />
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#cruises"
                className="text-expery-blue hover:text-expery-iron transition-colors"
              >
                Cruseros
              </a>
              <a
                href="#services"
                className="text-expery-blue hover:text-expery-iron transition-colors"
              >
                Servicios
              </a>
              <a
                href="#contact"
                className="text-expery-blue hover:text-expery-iron transition-colors"
              >
                Contacto
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-r from-blue-950/60 to-blue-900/30"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        >
          {images.map((src, index) => (
            <Image
              key={src}
              src={src}
              alt={`Slide ${index + 1}`}
              fill
              className={`absolute inset-0 object-cover transition-opacity duration-1000 ${
                index === currentImageIndex ? 'opacity-80' : 'opacity-0'
              }`}
              priority={index === 0}
            />
          ))}
        </div>

        <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
          <div className="max-w-4xl mx-auto">
            <div className="animate-fade-in-up">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
                Expertos en experiencias
              </h1>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-expery-blue hover:bg-classic-gold text-white font-semibold px-8 py-4 text-lg transition-all duration-300 ease-in-out"
                  onClick={() =>
                    window.scrollTo({
                      top: document.getElementById("cruises")?.offsetTop,
                      behavior: "smooth",
                    })
                  }
                >
                  Descubre
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-white border-white hover:border-none hover:bg-white/90 hover:text-expery-blue px-8 py-4 text-lg bg-transparent transition-all duration-300 ease-in-out"
                  onClick={() => window.open("/brochure.pdf", "_blank")}
                >
                  Ver Brochure
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Cruises Section */}
      <section
        id="cruises"
        className="py-20 bg-white/80 relative overflow-hidden"
      >
        <div className="max-w-full mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-expery-blue mb-6">
              Cruceros
            </h2>
            <p className="text-xl text-gray-800 max-w-3xl mx-auto">
              Cada itinerario se concibe con exactitud y pasión para entregar lo extraordinario: lujo, servicio impecable y momentos que trascienden la rutina.
            </p>
          </div>

          <CruiseCarousel />
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-expery-blue">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Experiencias
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Creamos vivencias pensadas para quienes consideran el viaje no solo como destino, sino como legado. Elegancia, exclusividad y detalle en cada paso.
            </p>
          </div>

          <Experiences />          
        </div>
      </section>

      <Contact />

      <Footer />
    </>
  );
}
