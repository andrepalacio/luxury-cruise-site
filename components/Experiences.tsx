import React from "react";
import Image from "next/image";

export default function Experiences() {
  const services = [
    {
      title: "Turismo cultural",
      description: "Descubre nuevos sabores, paisajes y culturas del mundo",
      image: "/cultural.jpg",
    },
    {
      title: "Destinos mágicos",
      description: "Disfruta de experiencias únicas en destinos inigualables",
      image: "/thailand.jpg",
    },
    {
      title: "Turismo corporativo",
      description: "Permítenos diseñar tus experiencias corporativas con lujo de detalles",
      image: "/corporate.jpg",
    },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-8">
      {services.map((service, index) => (
        <div key={index} className="group cursor-pointer">
          <div className="relative h-64 mb-6 overflow-hidden rounded-lg">
            <Image
              src={service.image || "/placeholder.svg"}
              alt={service.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-xl font-bold text-white mb-2">
                {service.title}
              </h3>
              <p className="text-gray-200 text-sm">{service.description}</p>
            </div>
          </div>
          {/* <div className="flex items-center justify-between">
            <span className="text-sky-400 font-semibold">
            {service.price}
            </span>
            <Button
            variant="outline"
            className="border-sky-400 text-sky-400 hover:bg-sky-400 hover:text-blue-900 bg-transparent"
            >
            Learn More
            </Button>
        </div> */}
        </div>
      ))}
    </div>
  );
}
