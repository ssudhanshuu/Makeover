"use client";
import { motion } from "framer-motion";
import { Star, ArrowRight, ChevronDown } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  const handleScroll = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-32 pb-16"
      style={{ background: "var(--bg)" }}
    >
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Hero Left Column */}
          <div className="lg:col-span-6 space-y-8 text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="inline-flex items-center gap-3 px-4 py-1.5 border"
              style={{ borderColor: "var(--border)" }}
            >
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} size={10} fill="var(--primary)" color="var(--primary)" />
                ))}
              </div>
              <span className="text-[10px] tracking-[0.2em] uppercase" style={{ color: "var(--text-light)" }}>
                Trusted by 500+ Brides
              </span>
            </motion.div>

            {/* Main Title */}
            <h1
              className="font-playfair font-normal leading-tight"
              style={{ fontSize: "clamp(3rem, 7vw, 5.5rem)", color: "var(--text)" }}
            >
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="block"
              >
                Timeless
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                className="italic block"
                style={{ color: "var(--primary)" }}
              >
                Luxury
              </motion.span>
            </h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="text-sm md:text-base max-w-md leading-relaxed tracking-wide font-light"
              style={{ color: "var(--text-light)" }}
            >
              Experience ultimate luxury with premium bridal makeup, skin care treatments, and exquisite transformations in Moradabad. Unveil your truest beauty with our master artists.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="flex flex-wrap gap-6 pt-4"
            >
              <button
                onClick={() => handleScroll("#booking")}
                className="btn-primary"
              >
                Book Consultation
              </button>
              <button
                onClick={() => handleScroll("#services")}
                className="btn-outline"
              >
                Our Services
              </button>
            </motion.div>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="grid grid-cols-3 gap-8 pt-12 mt-8 border-t"
              style={{ borderColor: "var(--border)" }}
            >
              {[
                { value: "500+", label: "Brides" },
                { value: "8+", label: "Years Exp." },
                { value: "4.9", label: "Rating" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="font-playfair text-3xl md:text-4xl" style={{ color: "var(--primary)" }}>
                    {s.value}
                  </div>
                  <div className="text-[9px] uppercase tracking-widest mt-2" style={{ color: "var(--text-muted)" }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Hero Right Column: High-Fashion Staggered Images */}
          <div className="lg:col-span-6 relative w-full h-[500px] sm:h-[700px] hidden lg:block">
            {/* Main Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute w-[70%] h-[80%] right-0 top-0 z-10 overflow-hidden"
              style={{ border: "1px solid var(--border)" }}
            >
              <Image
                src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80"
                alt="Bridal Makeup Look"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 40vw"
                priority
              />
              <div className="absolute inset-0 bg-black/10" />
            </motion.div>

            {/* Overlapping Image */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
              className="absolute w-[50%] h-[55%] left-0 bottom-[5%] z-20 overflow-hidden shadow-2xl"
              style={{ border: "4px solid var(--bg)" }}
            >
              <Image
                src="https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&q=80"
                alt="Makeup Artist Detail"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 30vw, 20vw"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Down Cue */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer opacity-50 hover:opacity-100 transition-opacity"
        onClick={() => handleScroll("#services")}
      >
        <span className="text-[10px] tracking-[0.2em] uppercase" style={{ color: "var(--text-light)" }}>
          Discover
        </span>
        <ChevronDown size={16} style={{ color: "var(--primary)" }} />
      </motion.div>
    </section>
  );
}
