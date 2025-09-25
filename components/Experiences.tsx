import React from "react";
import Image from "next/image";

export default function Experiences() {
  const services = [
    {
      title: "Turismo cultural",
      description: "Sumérjase en culturas milenarias, descubra sabores auténticos y paisajes que evocan historias",
      image: "/art.jpeg",
    },
    {
      title: "Destinos mágicos",
      description: "Visite destinos emblemáticos y refugios escondidos, cada viaje será una colección de momentos sublimes",
      image: "/magicland.jpeg",
    },
    {
      title: "Gastronomía premium",
      description: "Experimente la alta cocina con chefs de renombre mundial en escenarios impresionantes",
      image: "/greece gastronomy.jpg",
    },
    {
      title: "Turismo corporativo",
      description: "Organizamos servicios corporativos con clase: viajes de negocio, incentivos y reuniones de alto nivel",
      image: "/corporate.jpeg",
    },
  ];

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {services.map((service, index) => (
        <div key={index} className="group cursor-pointer">
          <div className="relative h-72 mb-6 overflow-hidden rounded-lg">
            <Image
              src={service.image || "/placeholder.svg"}
              alt={service.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-950/50 to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-xl font-bold text-white mb-2">
                {service.title}
              </h3>
              <p className="text-gray-200 text-sm">{service.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
