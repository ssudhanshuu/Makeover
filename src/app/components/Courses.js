"use client";
import { motion } from "framer-motion";
import { Clock, IndianRupee, MessageCircle, Star } from "lucide-react";

const courses = [
  {
    icon: "💄",
    name: "Pro Makeup Course",
    description:
      "Master bridal, party & editorial makeup techniques with hands-on practice, live model demos, and kit guide.",
    duration: "6 Weeks",
    fee: 15000,
    color: "from-pink-50/60 to-rose-50/60 hover:from-pink-50 hover:to-rose-100/50",
    border: "#fecdd3",
    tag: "Bestseller",
  },
  {
    icon: "💅",
    name: "Nail Art Course",
    description:
      "Creative nail designs, gel extensions, acrylic builds, chromes, 3D art & professional manicure systems.",
    duration: "3 Weeks",
    fee: 8000,
    color: "from-fuchsia-50/60 to-purple-50/60 hover:from-fuchsia-50 hover:to-purple-100/50",
    border: "#e9d5ff",
    tag: "Trending",
  },
  {
    icon: "🌿",
    name: "Mehndi / Henna Course",
    description:
      "Traditional bridal patterns, modern Arabic layouts, shading techniques & chemical-free mehndi preparation.",
    duration: "4 Weeks",
    fee: 6000,
    color: "from-orange-50/60 to-amber-50/60 hover:from-orange-50 hover:to-amber-100/50",
    border: "#fed7aa",
    tag: "Popular",
  },
  {
    icon: "🎭",
    name: "Modeling Course",
    description:
      "Ramp walk mechanics, photogenic posing guidelines, camera confidence & portfolio creation tutorials.",
    duration: "4 Weeks",
    fee: 12000,
    color: "from-sky-50/60 to-blue-50/60 hover:from-sky-50 hover:to-blue-100/50",
    border: "#bae6fd",
    tag: "New",
  },
];

export default function Courses() {
  const handleWhatsApp = (course) => {
    const msg = encodeURIComponent(
      `Hi Ruchi! I am interested in the "${course}" course at Ruchi Makeover. Please share more details regarding batch timings and seat availability. 😊`
    );
    window.open(`https://wa.me/917300685744?text=${msg}`, "_blank");
  };

  return (
    <section id="courses" className="section-pad bg-white">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-label">Academy & Training</span>
          <h2 className="section-title">Professional Courses</h2>
          <p className="section-desc">
            Kickstart your career in the beauty industry. Learn direct industry secrets and earn your certificate.
          </p>
        </motion.div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course, i) => (
            <motion.div
              key={course.name}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className={`card flex flex-col justify-between p-6 bg-gradient-to-br ${course.color} transition-all duration-300 relative`}
              style={{ borderColor: course.border }}
            >
              {/* Badge/Tag */}
              <span className="absolute top-4 right-4 text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-white/80 border border-pink-100 text-pink-700">
                {course.tag}
              </span>

              <div>
                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-5 shadow-sm border border-white/50"
                  style={{ background: "rgba(255,255,255,0.95)" }}
                >
                  {course.icon}
                </div>

                {/* Duration */}
                <div className="flex items-center gap-1.5 mb-3 text-pink-700">
                  <Clock size={13} />
                  <span className="text-xs font-bold tracking-wide uppercase">
                    {course.duration}
                  </span>
                </div>

                {/* Title */}
                <h3
                  className="font-playfair font-black text-lg mb-3 leading-snug"
                  style={{ color: "var(--text)" }}
                >
                  {course.name}
                </h3>

                {/* Desc */}
                <p
                  className="text-xs leading-relaxed mb-6"
                  style={{ color: "var(--text-light)" }}
                >
                  {course.description}
                </p>
              </div>

              {/* Price & Action */}
              <div>
                <div className="flex items-center gap-1 mb-5 border-t border-dashed border-pink-100 pt-4">
                  <IndianRupee size={15} style={{ color: "var(--accent)" }} />
                  <span
                    className="text-2xl font-black tracking-tight"
                    style={{ color: "var(--accent)" }}
                  >
                    {course.fee.toLocaleString("en-IN")}
                  </span>
                  <span className="text-xs font-semibold" style={{ color: "var(--text-muted)" }}>
                    /Total Fee
                  </span>
                </div>

                <button
                  onClick={() => handleWhatsApp(course.name)}
                  className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-xl text-sm font-bold shadow-sm transition-all duration-300 hover:shadow-lg hover:brightness-105"
                  style={{
                    background: "linear-gradient(135deg, #25D366, #1ebe5d)",
                    color: "#fff",
                  }}
                >
                  <MessageCircle size={16} fill="white" />
                  Enquire via WhatsApp
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
