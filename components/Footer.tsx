import React from "react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-white py-10 border-t border-expery-iron border-2">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <Image
            src="/logos/expery_original.png"
            alt="Expery Travel Logo"
            className="rounded mx-2"
            width={120}
            height={80}
          />
          <div className="text-gray-800 text-center mt-6 md:mt-0 w-5/6 md:w-9/12 md:flex md:justify-between">
            <p>Impactando positivamente el turismo y la sociedad</p>
            <p className="text-sm mt-4 md:mt-0">&copy; 2025 Expery Travel. Todos los derechos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
