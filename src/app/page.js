"use client";
import { Menu, Phone, Sparkles, X } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

const menuItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
  { name: "Services", path: "/services" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      if (window.innerWidth < 768) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return (
    <div className="bg-[url('/images/backgraound.png')] bg-cover bg-center h-screen">
      <nav className="fixed top-0 left-0 w-full h-16 bg-white shadow-md z-50">
        <div className="flex justify-between items-center h-full px-4 md:px-10 lg:px-20">

          <div className="flex items-center text-pink-600">
            <Sparkles />
            <h1 className="ml-3 text-2xl md:text-3xl font-semibold">hii</h1>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className="text-gray-700 hover:text-pink-600 transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <button className="flex items-center bg-pink-600 hover:bg-pink-700 py-2 px-4 gap-2 rounded-md transition-colors">
              <Phone size={18} className="text-white" />
              <span className="text-white">Book Now</span>
            </button>
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {isOpen && (
          <div className="absolute top-16 left-0 w-full bg-white shadow-md md:hidden flex flex-col">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className="px-6 py-3 text-gray-700 hover:bg-gray-50 border-b"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <button className="flex items-center justify-center bg-pink-600 py-3 px-4 gap-2 m-4 rounded-md">
              <Phone size={18} className="text-white" />
              <span className="text-white">Book Now</span>
            </button>
          </div>
        )}
      </nav>
    </div>
  );
}