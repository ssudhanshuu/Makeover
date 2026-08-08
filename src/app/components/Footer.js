"use client";
import Link from "next/link";
import { Sparkles, Phone, MapPin, Clock, ExternalLink } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "Courses", href: "#courses" },
  { label: "Contact", href: "#contact" },
  { label: "Book Appointment", href: "#booking" },
];

export default function Footer() {
  return (
    <footer style={{ background: "var(--bg-white)" }} className="text-[var(--text)] mt-10">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #be185d, #9d174d)" }}
              >
                <Sparkles size={18} color="white" />
              </div>
              <div>
                <div
                  className="font-playfair font-bold text-lg leading-tight"
                  style={{ color: "#f9a8d4" }}
                >
                  Ruchi Makeover
                </div>
                <div className="text-xs" style={{ color: "var(--text-light)" }}>
                  Find your beauty
                </div>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--text-light)" }}>
              Premium bridal makeup, skincare, lehenga &amp; jewelry rentals in
              Moradabad. Crafting beautiful memories since 2016.
            </p>
            <div className="space-y-2 text-sm" style={{ color: "var(--text-light)" }}>
              <div className="flex items-center gap-2">
                <Phone size={14} style={{ color: "#f9a8d4" }} />
                <a href="tel:+917300685744" className="hover:text-[var(--text)] transition-colors">
                  +91 7300685744
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin size={14} className="shrink-0 mt-0.5" style={{ color: "#f9a8d4" }} />
                <span>Vikas Nagar Linepar, Moradabad, UP</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={14} style={{ color: "#f9a8d4" }} />
                <span>Mon–Sat: 9:00 AM – 8:00 PM</span>
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4
              className="text-sm font-bold uppercase tracking-widest mb-5"
              style={{ color: "#f9a8d4" }}
            >
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-sm transition-colors hover:text-[var(--text)]"
                    style={{ color: "var(--text-light)" }}
                    onClick={(e) => {
                      e.preventDefault();
                      const el = document.querySelector(l.href);
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4
              className="text-sm font-bold uppercase tracking-widest mb-5"
              style={{ color: "#f9a8d4" }}
            >
              Connect With Us
            </h4>
            <div className="flex gap-3 mb-6">
              {/* Instagram */}
              <a
                href="https://instagram.com/Ruchi_model.12"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-11 h-11 rounded-xl flex items-center justify-center transition-all hover:-translate-y-1"
                style={{ background: "rgba(255,255,255,0.08)" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background =
                    "linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "rgba(255,255,255,0.08)")
                }
              >
                <ExternalLink size={18} color="white" />
              </a>
              {/* WhatsApp */}
              <a
                href="https://wa.me/917300685744"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-11 h-11 rounded-xl flex items-center justify-center transition-all hover:-translate-y-1"
                style={{ background: "rgba(255,255,255,0.08)" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#25D366")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "rgba(255,255,255,0.08)")
                }
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                </svg>
              </a>
              {/* Facebook */}
              <a
                href="#"
                aria-label="Facebook"
                className="w-11 h-11 rounded-xl flex items-center justify-center transition-all hover:-translate-y-1"
                style={{ background: "rgba(255,255,255,0.08)" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#1877f2")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "rgba(255,255,255,0.08)")
                }
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>

            {/* Book CTA */}
            <div
              className="rounded-2xl p-5 border"
              style={{
                background: "rgba(190,24,93,0.1)",
                borderColor: "rgba(190,24,93,0.2)",
              }}
            >
              <p className="text-sm font-semibold mb-3 text-[var(--text)]">
                Ready for your transformation? ✨
              </p>
              <a
                href="#booking"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="btn-primary text-sm py-2.5 px-5 w-full justify-center"
              >
                Book Appointment
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="container py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs" style={{ color: "var(--text-muted)" }}>
          <p>&copy; {new Date().getFullYear()} Ruchi Makeover. All rights reserved.</p>
          <p>Made with ❤️ in Moradabad, UP</p>
        </div>
      </div>
    </footer>
  );
}
