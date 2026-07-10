"use client";
import { motion } from "framer-motion";
import { Sparkles, ChevronDown, Star, ArrowRight } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  const handleScroll = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-12"
      style={{
        background:
          "linear-gradient(135deg, #fdf8f5 0%, #fce7f3 40%, #fdf4ff 70%, #fff1f5 100%)",
      }}
    >
      {/* Decorative blobs */}
      <div
        className="blob"
        style={{
          width: 500,
          height: 500,
          background: "#be185d",
          top: -100,
          right: -100,
        }}
      />
      <div
        className="blob"
        style={{
          width: 350,
          height: 350,
          background: "#d4af37",
          bottom: -80,
          left: -80,
        }}
      />

      {/* Floating sparkle icons */}
      {[
        { top: "15%", left: "8%", size: 24, delay: 0 },
        { top: "25%", right: "12%", size: 18, delay: 0.4 },
        { bottom: "25%", left: "15%", size: 20, delay: 0.8 },
        { bottom: "30%", right: "18%", size: 16, delay: 0.2 },
      ].map((s, i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -12, 0], rotate: [0, 15, -15, 0] }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            delay: s.delay,
          }}
          style={{
            position: "absolute",
            top: s.top,
            left: s.left,
            right: s.right,
            bottom: s.bottom,
            color: i % 2 === 0 ? "var(--primary)" : "var(--accent)",
            opacity: 0.4,
          }}
        >
          <Sparkles size={s.size} />
        </motion.div>
      ))}

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Left Column */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2.5 px-4.5 py-2 rounded-full border shadow-sm"
              style={{
                background: "rgba(255,255,255,0.75)",
                borderColor: "var(--primary-light)",
                backdropFilter: "blur(8px)",
              }}
            >
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} size={12} fill="#d4af37" color="#d4af37" />
                ))}
              </div>
              <span className="text-xs font-semibold" style={{ color: "var(--primary)" }}>
                Trusted by 500+ Brides in Moradabad
              </span>
            </motion.div>

            {/* Main Title */}
            <h1
              className="font-playfair font-extrabold leading-[1.1] tracking-tight"
              style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", color: "var(--text)" }}
            >
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="block"
              >
                Ruchi
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="gradient-text italic font-bold block"
              >
                Makeover
              </motion.span>
            </h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="font-playfair italic text-xl md:text-2xl"
              style={{ color: "var(--primary)" }}
            >
              &ldquo;Find your beauty with a makeover&rdquo;
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-base md:text-lg max-w-xl leading-relaxed"
              style={{ color: "var(--text-light)" }}
            >
              Premium bridal makeup, skin care treatments, lehenga rentals, and exquisite jewelry sets in Vikas Nagar Linepar, Moradabad. Let us create your dream transformation.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <button
                onClick={() => handleScroll("#booking")}
                className="btn-primary text-base py-3.5 px-9 group shadow-lg hover:shadow-pink-600/30"
              >
                Book Appointment
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => handleScroll("#services")}
                className="btn-outline text-base py-3.5 px-9"
              >
                View Services
              </button>
            </motion.div>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-pink-100"
            >
              {[
                { value: "500+", label: "Happy Brides" },
                { value: "8+", label: "Years Exp" },
                { value: "18+", label: "Pro Services" },
                { value: "4.9★", label: "Client Rating" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="font-playfair font-bold text-2xl md:text-3xl gradient-text">
                    {s.value}
                  </div>
                  <div className="text-xs font-semibold uppercase tracking-wider mt-1" style={{ color: "var(--text-muted)" }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Hero Right Column: Animated Collaged Images */}
          <div className="lg:col-span-5 relative w-full h-[450px] sm:h-[500px] hidden sm:block">
            {/* Main/Center Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute w-[65%] h-[75%] right-[5%] top-[10%] rounded-3xl overflow-hidden shadow-2xl border-4 border-white z-10"
            >
              <Image
                src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80"
                alt="Bridal Makeup Look"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 30vw"
                priority
              />
            </motion.div>

            {/* Second/Floating Left Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="absolute w-[45%] h-[55%] left-0 bottom-[5%] rounded-3xl overflow-hidden shadow-2xl border-4 border-white z-20"
              style={{ animation: "float 4s ease-in-out infinite" }}
            >
              <Image
                src="https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&q=80"
                alt="Makeup Artist Close Up"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 30vw, 20vw"
              />
            </motion.div>

            {/* Third/Floating Small Top Left Image */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="absolute w-[35%] h-[40%] left-[10%] top-0 rounded-3xl overflow-hidden shadow-xl border-4 border-white z-0"
              style={{ animation: "float 4s ease-in-out infinite 2s" }}
            >
              <Image
                src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80"
                alt="Wedding Jewelry"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 25vw, 15vw"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Down Cue */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 cursor-pointer opacity-60 hover:opacity-100 transition-opacity"
        onClick={() => handleScroll("#services")}
      >
        <span className="text-xs font-semibold tracking-wider uppercase" style={{ color: "var(--text-muted)" }}>
          Scroll
        </span>
        <ChevronDown size={20} style={{ color: "var(--primary)" }} />
      </motion.div>
    </section>
  );
}
