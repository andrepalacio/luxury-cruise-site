import React from 'react'
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-expery-blue py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Image
                src="/logo.png"
                alt="Expery Travel Logo"
                className="rounded-full mx-2"
                width={40}
                height={40}
              />
              <span className="text-2xl font-bold text-white">
                Expery Travel
              </span>
            </div>
            <div className="text-gray-300 text-center md:text-right">
              <p>&copy; 2025 Expery Travel. Todos los derechos reservados.</p>
              <p className="text-sm mt-1">Impactando positivamente el turismo y la sociedad</p>
            </div>
          </div>
        </div>
      </footer>
  )
}
