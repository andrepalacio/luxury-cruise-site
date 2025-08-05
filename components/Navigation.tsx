import Image from 'next/image'
import React from 'react'

function Navigation(isNavbarSolid) {
  return (
    <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
            isNavbarSolid ? "bg-blue-900 backdrop-blur-md border-b border-sky-200/20 shadow-lg" : "bg-transparent"
        }`}
        >
        <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
                <Image
                    src="/logo.png"
                    alt="Expery Travel Logo"
                    className="rounded-full"
                    width={10}
                    height={10}
                />
                <span className="text-2xl font-bold text-white">Expery Travel</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
                <a href="#cruises" className="text-white hover:text-sky-400 transition-colors">
                Cruises
                </a>
                <a href="#services" className="text-white hover:text-sky-400 transition-colors">
                Services
                </a>
                <a href="#contact" className="text-white hover:text-sky-400 transition-colors">
                Contact
                </a>
            </div>
            </div>
        </div>
        </nav>
  )
}

export default Navigation