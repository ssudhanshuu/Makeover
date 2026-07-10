"use client";
import { motion } from "framer-motion";
import { Clock, IndianRupee, MessageCircle } from "lucide-react";

const courses = [
  {
    icon: "💄",
    name: "Pro Makeup Course",
    description:
      "Master bridal, party & editorial makeup techniques with hands-on practice and professional tools.",
    duration: "6 Weeks",
    fee: 15000,
    color: "from-pink-50 to-rose-50",
    border: "#fecdd3",
  },
  {
    icon: "💅",
    name: "Nail Art Course",
    description:
      "Creative nail designs, gel nails & nail extensions — from basics to advanced nail artistry.",
    duration: "3 Weeks",
    fee: 8000,
    color: "from-fuchsia-50 to-purple-50",
    border: "#e9d5ff",
  },
  {
    icon: "🌿",
    name: "Mehndi / Henna Course",
    description:
      "Traditional & modern mehndi patterns for all occasions. Learn bridal, Arabic & floral designs.",
    duration: "4 Weeks",
    fee: 6000,
    color: "from-orange-50 to-amber-50",
    border: "#fed7aa",
  },
  {
    icon: "🎭",
    name: "Modeling Course",
    description:
      "Ramp walk, posing techniques & photoshoot preparation. Build confidence and a stunning portfolio.",
    duration: "4 Weeks",
    fee: 12000,
    color: "from-sky-50 to-blue-50",
    border: "#bae6fd",
  },
];

export default function Courses() {
  const handleWhatsApp = (course) => {
    const msg = encodeURIComponent(
      `Hi Ruchi! I'm interested in the ${course} course. Please share more details. 😊`
    );
    window.open(`https://wa.me/917300685744?text=${msg}`, "_blank");
  };

  return (
    <section
      id="courses"
      className="section-pad"
      style={{ background: "#fff" }}
    >
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="section-label">Learn & Grow</span>
          <h2 className="section-title">Professional Courses</h2>
          <p className="section-desc">
            Build a career in beauty with our expert-led courses. Limited seats
            available — enquire now!
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course, i) => (
            <motion.div
              key={course.name}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className={`card flex flex-col p-6 bg-gradient-to-br ${course.color}`}
              style={{ borderColor: course.border }}
            >
              {/* Icon */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-5 shadow-sm"
                style={{ background: "rgba(255,255,255,0.8)" }}
              >
                {course.icon}
              </div>

              {/* Duration badge */}
              <div className="flex items-center gap-1.5 mb-3">
                <Clock size={12} style={{ color: "var(--primary)" }} />
                <span
                  className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
                  style={{
                    background: "rgba(190,24,93,0.08)",
                    color: "var(--primary)",
                  }}
                >
                  {course.duration}
                </span>
              </div>

              <h3
                className="font-playfair font-bold text-lg mb-3 leading-snug"
                style={{ color: "var(--text)" }}
              >
                {course.name}
              </h3>
              <p
                className="text-sm leading-relaxed mb-5 flex-1"
                style={{ color: "var(--text-light)" }}
              >
                {course.description}
              </p>

              {/* Fee */}
              <div className="flex items-center gap-1 mb-5">
                <IndianRupee size={16} style={{ color: "var(--accent)" }} />
                <span
                  className="text-xl font-bold"
                  style={{ color: "var(--accent)" }}
                >
                  {course.fee.toLocaleString("en-IN")}
                </span>
                <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                  /course
                </span>
              </div>

              {/* CTA */}
              <button
                onClick={() => handleWhatsApp(course.name)}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold transition-all hover:shadow-md"
                style={{
                  background: "#25D366",
                  color: "#fff",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#1ebe5d")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "#25D366")
                }
              >
                <MessageCircle size={15} />
                Enquire on WhatsApp
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
