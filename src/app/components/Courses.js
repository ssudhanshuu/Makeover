"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, IndianRupee, MessageCircle, Loader2 } from "lucide-react";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch("/api/courses");
        const json = await res.json();
        if (json.success) {
          setCourses(json.data.filter(c => c.status === "Published"));
        }
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const handleWhatsApp = (course) => {
    const msg = encodeURIComponent(
      `Hi Ruchi! I am interested in the "${course}" course at Ruchi Makeover. Please share more details regarding batch timings and seat availability. 😊`
    );
    window.open(`https://wa.me/917300685744?text=${msg}`, "_blank");
  };

  return (
    <section id="courses" className="section-pad">
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
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 size={32} className="animate-spin" style={{ color: "var(--primary)" }} />
          </div>
        ) : (
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
                {course.tag && (
                  <span className="absolute top-4 right-4 text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5  bg-[var(--bg-white)]/80 border border-[var(--border)] text-[var(--primary)]">
                    {course.tag}
                  </span>
                )}

                <div>
                  {/* Icon */}
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-5 shadow-sm border border-white/50"
                    style={{ background: "rgba(255,255,255,0.95)" }}
                  >
                    {course.icon}
                  </div>

                  {/* Duration */}
                  <div className="flex items-center gap-1.5 mb-3 text-[var(--primary)]">
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
                  <div className="flex items-center gap-1 mb-5 border-t border-dashed border-[var(--border)] pt-4">
                    <IndianRupee size={15} style={{ color: "var(--accent)" }} />
                    <span
                      className="text-2xl font-black tracking-tight"
                      style={{ color: "var(--accent)" }}
                    >
                      {course.price.toLocaleString("en-IN")}
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
        )}
      </div>
    </section>
  );
}
