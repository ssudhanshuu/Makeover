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
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "py-3 shadow-lg" : "bg-transparent py-6"}`}
      style={{
        background: scrolled ? "rgba(13, 13, 13, 0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(212, 175, 55, 0.15)" : "1px solid transparent"
      }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Logo */}
        <button
          onClick={() => handleNavigation("#home")}
          className="flex items-center gap-3 group"
        >
          <div className="flex h-10 w-10 items-center justify-center border border-[#d4af37] transition-all duration-500 group-hover:rotate-180" style={{ borderRadius: "2px" }}>
            <Sparkles size={18} color="#d4af37" />
          </div>

          <div className="text-left">
            <h2 className="font-playfair text-2xl tracking-wide" style={{ color: "var(--text)" }}>
              RUCHI
            </h2>
            <p className="text-[10px] tracking-[0.2em] uppercase" style={{ color: "var(--primary)" }}>
              Luxury Makeovers
            </p>
          </div>
        </button>

        {/* Desktop Menu */}
        <nav className="hidden items-center gap-10 lg:flex">
          {navLinks.map((item) => (
            <button
              key={item.href}
              onClick={() => handleNavigation(item.href)}
              className="group relative text-sm tracking-widest uppercase transition-all duration-300 hover:text-[#d4af37]"
              style={{ color: "var(--text-light)" }}
            >
              {item.label}
              <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-[#d4af37] transition-all duration-500 group-hover:w-full"></span>
            </button>
          ))}

          <button
            onClick={() => handleNavigation("#booking")}
            className="btn-outline ml-4"
            style={{ padding: "10px 24px", fontSize: "0.8rem" }}
          >
            Book Now
          </button>
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 transition lg:hidden"
          style={{ color: "var(--primary)" }}
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden transition-all duration-500 lg:hidden ${mobileOpen ? "max-h-[500px] border-b" : "max-h-0"}`}
        style={{ 
          background: "var(--bg-white)",
          borderColor: "var(--border)"
        }}
      >
        <div className="px-6 py-6 flex flex-col gap-4">
          {navLinks.map((item) => (
            <button
              key={item.href}
              onClick={() => handleNavigation(item.href)}
              className="text-left text-sm tracking-widest uppercase py-2 border-b transition-colors"
              style={{ color: "var(--text)", borderColor: "var(--border)" }}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => handleNavigation("#booking")}
            className="btn-primary mt-4 w-full justify-center"
          >
            Book Appointment
          </button>
        </div>
      </div>
    </header>
  );
}