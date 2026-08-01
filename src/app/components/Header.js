"use client";

import { useEffect, useState } from "react";
import { Menu, X, Sparkles } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "Courses", href: "#courses" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigation = (href) => {
    setMobileOpen(false);

    const section = document.querySelector(href);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/90 backdrop-blur-lg shadow-lg py-3" : "bg-transparent py-5"}`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Logo */}
        <button
          onClick={() => handleNavigation("#home")}
          className="flex items-center gap-3"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl from-pink-600 to-rose-700 shadow-lg">
            <Sparkles size={20} className="text-white" />
          </div>

          <div className="text-left">
            <h2 className="font-serif text-2xl font-bold text-pink-700">
              Ruchi Makeover
            </h2>

            <p className="text-xs text-gray-500">
              Find your beauty
            </p>
          </div>
        </button>

        {/* Desktop Menu */}
        <nav className="hidden items-center gap-10 lg:flex">
          {navLinks.map((item) => (
            <button
              key={item.href}
              onClick={() => handleNavigation(item.href)}
              className="group relative text-[15px] font-medium text-gray-700 transition-all duration-300 hover:text-pink-600"
            >
              {item.label}

              <span className="absolute -bottom-1 left-0  w-0 bg-pink-600 transition-all duration-300 group-hover:w-full"></span>
            </button>
          ))}

          <button
            onClick={() => handleNavigation("#booking")}
            className="rounded-full bg-pink-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:bg-pink-700 hover:shadow-xl"
          >
            Book Now
          </button>
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-lg p-2 text-pink-700 transition hover:bg-pink-100 lg:hidden"
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden transition-all duration-300 lg:hidden ${mobileOpen ? "max-h-[500px]" : "max-h-0"
          }`}
      >
        <div className="mx-5 mt-4 rounded-2xl bg-white p-5 shadow-2xl">
          <div className="flex flex-col gap-2">
            {navLinks.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavigation(item.href)}
                className="rounded-xl px-4 py-3 text-left text-gray-700 transition-all duration-300 hover:bg-pink-50 hover:text-pink-600"
              >
                {item.label}
              </button>
            ))}

            <button
              onClick={() => handleNavigation("#booking")}
              className="mt-3 rounded-xl bg-pink-600 py-3 font-semibold text-white transition-all duration-300 hover:bg-pink-700"
            >
              Book Appointment
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}