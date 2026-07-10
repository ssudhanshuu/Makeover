"use client";
import { useState, useEffect } from "react";
import { Menu, X, Sparkles } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "Courses", href: "#courses" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const handleNav = (href) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-400 ${
        scrolled
          ? "bg-white/90 backdrop-blur-lg shadow-sm py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNav("#home")}
            className="flex items-center gap-2 text-left"
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #be185d, #9d174d)",
              }}
            >
              <Sparkles size={18} color="white" />
            </div>
            <div>
              <div
                className="font-playfair font-bold leading-tight text-lg"
                style={{ color: "var(--primary)" }}
              >
                Ruchi Makeover
              </div>
              <div
                className="text-xs leading-tight"
                style={{ color: "var(--text-muted)" }}
              >
                Find your beauty
              </div>
            </div>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((l) => (
              <button
                key={l.href}
                onClick={() => handleNav(l.href)}
                className="px-4 py-2 rounded-full text-sm font-medium transition-colors hover:bg-pink-50"
                style={{ color: "var(--text)" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--primary)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--text)")
                }
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={() => handleNav("#booking")}
              className="btn-primary ml-3 text-sm py-2.5 px-6"
            >
              Book Now
            </button>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-xl"
            style={{ color: "var(--primary)" }}
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile drawer */}
        {open && (
          <div
            className="md:hidden mt-3 rounded-2xl border p-4 shadow-xl bg-white"
            style={{ borderColor: "var(--border)" }}
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((l) => (
                <button
                  key={l.href}
                  onClick={() => handleNav(l.href)}
                  className="text-left px-4 py-3 rounded-xl text-sm font-medium hover:bg-pink-50 transition-colors"
                  style={{ color: "var(--text)" }}
                >
                  {l.label}
                </button>
              ))}
              <button
                onClick={() => handleNav("#booking")}
                className="btn-primary mt-2 justify-center text-sm py-3"
              >
                Book Appointment
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
