"use client";
import { motion } from "framer-motion";
import { Sparkles, ChevronDown, Star } from "lucide-react";

export default function Hero() {
  const handleScroll = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
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
      <div
        className="blob"
        style={{
          width: 250,
          height: 250,
          background: "#f9a8d4",
          top: "40%",
          left: "60%",
        }}
      />

      {/* Floating sparkle icons */}
      {[
        { top: "15%", left: "8%", size: 24, delay: 0 },
        { top: "25%", right: "12%", size: 18, delay: 0.4 },
        { bottom: "25%", left: "15%", size: 20, delay: 0.8 },
        { bottom: "30%", right: "18%", size: 16, delay: 0.2 },
        { top: "55%", left: "5%", size: 14, delay: 0.6 },
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
            opacity: 0.5,
          }}
        >
          <Sparkles size={s.size} />
        </motion.div>
      ))}

      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-8 border"
            style={{
              background: "rgba(255,255,255,0.7)",
              borderColor: "var(--primary-light)",
              backdropFilter: "blur(8px)",
            }}
          >
            <div className="flex gap-0.5">
              {[1,2,3,4,5].map(i => (
                <Star key={i} size={12} fill="#d4af37" color="#d4af37" />
              ))}
            </div>
            <span className="text-xs font-semibold" style={{ color: "var(--primary)" }}>
              Trusted by 500+ brides in Moradabad
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="font-playfair font-bold leading-tight mb-4"
            style={{ fontSize: "clamp(2.8rem, 7vw, 5rem)", color: "var(--text)" }}
          >
            Ruchi{" "}
            <span className="gradient-text italic">Makeover</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-playfair italic text-xl md:text-2xl mb-4"
            style={{ color: "var(--primary)" }}
          >
            &ldquo;Find your beauty with a makeover&rdquo;
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed"
            style={{ color: "var(--text-light)" }}
          >
            Premium bridal makeup, skincare, lehenga & jewelry rentals in
            Vikas Nagar Linepar, Moradabad. Your dream look — crafted with love.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <button
              onClick={() => handleScroll("#booking")}
              className="btn-primary text-base py-4 px-10"
            >
              Book Appointment
            </button>
            <button
              onClick={() => handleScroll("#services")}
              className="btn-outline text-base py-4 px-10"
            >
              View Services
            </button>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-wrap justify-center gap-10 mt-16 pt-10 border-t"
            style={{ borderColor: "rgba(190,24,93,0.15)" }}
          >
            {[
              { value: "500+", label: "Happy Brides" },
              { value: "8+", label: "Years Experience" },
              { value: "15+", label: "Services Offered" },
              { value: "4.9★", label: "Average Rating" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div
                  className="font-playfair font-bold text-2xl md:text-3xl gradient-text"
                >
                  {s.value}
                </div>
                <div className="text-xs font-medium mt-1" style={{ color: "var(--text-muted)" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 cursor-pointer opacity-60"
        onClick={() => handleScroll("#services")}
      >
        <span className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>Scroll</span>
        <ChevronDown size={20} style={{ color: "var(--primary)" }} />
      </motion.div>
    </section>
  );
}
