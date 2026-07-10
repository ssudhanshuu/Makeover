"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Send, Calendar, Clock, User, Phone, Mail, MessageSquare, ChevronDown } from "lucide-react";

const serviceGroups = [
  {
    label: "── Makeup ──",
    options: [
      "Traditional Bridal Makeup — ₹8,000",
      "Creative Bridal Makeup — ₹12,000",
      "Airbrush Bridal Makeup — ₹15,000",
      "Party Makeup — ₹2,500",
      "Engagement Makeup — ₹5,000",
      "Reception Makeup — ₹6,000",
      "Mehndi Makeup — ₹3,000",
      "Cocktail / Sangeet Makeup — ₹4,500",
      "Pre-Wedding Shoot Makeup — ₹5,000",
      "Hair Styling (Bridal) — ₹2,000",
      "Hair Styling (Party) — ₹800",
      "Saree Draping — ₹500",
    ],
  },
  {
    label: "── Skin Care ──",
    options: [
      "Gold Facial — ₹1,500",
      "Diamond Facial — ₹2,000",
      "Fruit Facial — ₹600",
      "De-Tan Facial — ₹800",
      "Anti-Acne Facial — ₹1,200",
      "Cleanup (Basic) — ₹400",
      "Cleanup (Advanced) — ₹700",
      "Bleach (Face) — ₹300",
      "Bleach (Full Body) — ₹1,000",
      "Threading (Full Face) — ₹150",
      "Waxing (Full Arms) — ₹300",
      "Waxing (Full Legs) — ₹400",
      "Waxing (Full Body) — ₹1,500",
      "Body Polishing — ₹2,500",
    ],
  },
  {
    label: "── Hair Care ──",
    options: [
      "Hair Spa (Basic) — ₹800",
      "Hair Spa (Premium) — ₹1,500",
      "Keratin Treatment — ₹5,000",
      "Hair Straightening — ₹4,000",
      "Hair Smoothening — ₹4,500",
      "Hair Color (Global) — ₹2,000",
      "Hair Highlights — ₹3,000",
      "Balayage / Ombre — ₹4,000",
      "Hair Cut (Women) — ₹300",
      "Hair Trim & Blow Dry — ₹500",
      "Dandruff Treatment — ₹1,200",
    ],
  },
  {
    label: "── Nail Art ──",
    options: [
      "Gel Nail Extensions — ₹1,500",
      "Acrylic Nail Extensions — ₹2,000",
      "Nail Art (Basic) — ₹500",
      "Nail Art (Advanced) — ₹1,000",
      "Manicure (Classic) — ₹400",
      "Manicure (Luxury) — ₹800",
      "Pedicure (Classic) — ₹500",
      "Pedicure (Spa) — ₹1,000",
      "Nail Repair & Removal — ₹300",
    ],
  },
  {
    label: "── Lehenga Rental ──",
    options: [
      "Bridal Lehenga (Heavy) — ₹5,000/day",
      "Bridal Lehenga (Light) — ₹3,000/day",
      "Party Lehenga — ₹1,500/day",
      "Mehndi / Haldi Outfit — ₹1,000/day",
      "Dupatta / Chunni (Bridal) — ₹500/day",
    ],
  },
  {
    label: "── Jewelry Rental ──",
    options: [
      "Bridal Jewelry Full Set — ₹3,500/day",
      "Bridal Jewelry (Kundan) — ₹4,000/day",
      "Engagement Jewelry Set — ₹2,000/day",
      "Party Jewelry Set — ₹1,000/day",
      "Flower Jewelry (Haldi/Mehndi) — ₹800/day",
      "Kamarband / Waist Belt — ₹500/day",
    ],
  },
];

const today = new Date().toISOString().split("T")[0];

const INITIAL = {
  name: "",
  phone: "",
  email: "",
  service: "",
  date: "",
  time: "",
  requests: "",
};

export default function Booking() {
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.phone.trim()) e.phone = "Phone number is required";
    else if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\s/g, "")))
      e.phone = "Enter a valid 10-digit mobile number";
    if (!form.service) e.service = "Please select a service";
    if (!form.date) e.date = "Please choose a date";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length) return setErrors(e2);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setForm(INITIAL);
    }, 1200);
  };

  return (
    <section
      id="booking"
      className="section-pad"
      style={{
        background:
          "linear-gradient(135deg, #fdf8f5 0%, #fce7f3 50%, #fdf4ff 100%)",
      }}
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
          <span className="section-label">Schedule a Visit</span>
          <h2 className="section-title">Book an Appointment</h2>
          <p className="section-desc">
            Fill the form below and we&apos;ll confirm your booking via call or
            WhatsApp within 2 hours.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl p-12 text-center shadow-xl border"
              style={{ borderColor: "var(--border)" }}
            >
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ background: "linear-gradient(135deg, #be185d, #9d174d)" }}
              >
                <CheckCircle size={38} color="white" />
              </div>
              <h3 className="font-playfair text-2xl font-bold mb-3" style={{ color: "var(--text)" }}>
                Appointment Requested! 🎉
              </h3>
              <p className="text-base leading-relaxed mb-6" style={{ color: "var(--text-light)" }}>
                Thank you! Your appointment has been booked. We will contact
                you at{" "}
                <a
                  href="tel:+917300685744"
                  className="font-semibold"
                  style={{ color: "var(--primary)" }}
                >
                  +91 7300685744
                </a>{" "}
                shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="btn-outline text-sm py-2.5 px-8"
              >
                Book Another
              </button>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              onSubmit={handleSubmit}
              className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border"
              style={{ borderColor: "var(--border)" }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="form-label">
                    <User size={13} className="inline mr-1.5" />
                    Full Name <span style={{ color: "var(--primary)" }}>*</span>
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className="form-input"
                  />
                  {errors.name && (
                    <p className="text-xs mt-1.5" style={{ color: "#e11d48" }}>
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="form-label">
                    <Phone size={13} className="inline mr-1.5" />
                    Phone Number <span style={{ color: "var(--primary)" }}>*</span>
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="10-digit mobile number"
                    className="form-input"
                  />
                  {errors.phone && (
                    <p className="text-xs mt-1.5" style={{ color: "#e11d48" }}>
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="form-label">
                    <Mail size={13} className="inline mr-1.5" />
                    Email{" "}
                    <span className="text-xs font-normal" style={{ color: "var(--text-muted)" }}>
                      (optional)
                    </span>
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="yourname@email.com"
                    className="form-input"
                  />
                </div>

                {/* Service */}
                <div>
                  <label className="form-label">
                    <ChevronDown size={13} className="inline mr-1.5" />
                    Select Service <span style={{ color: "var(--primary)" }}>*</span>
                  </label>
                  <select
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    className="form-input"
                  >
                    <option value="">Choose a service...</option>
                    {serviceGroups.map((g) => (
                      <optgroup key={g.label} label={g.label}>
                        {g.options.map((o) => (
                          <option key={o} value={o}>
                            {o}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                  {errors.service && (
                    <p className="text-xs mt-1.5" style={{ color: "#e11d48" }}>
                      {errors.service}
                    </p>
                  )}
                </div>

                {/* Date */}
                <div>
                  <label className="form-label">
                    <Calendar size={13} className="inline mr-1.5" />
                    Preferred Date <span style={{ color: "var(--primary)" }}>*</span>
                  </label>
                  <input
                    name="date"
                    type="date"
                    min={today}
                    value={form.date}
                    onChange={handleChange}
                    className="form-input"
                  />
                  {errors.date && (
                    <p className="text-xs mt-1.5" style={{ color: "#e11d48" }}>
                      {errors.date}
                    </p>
                  )}
                </div>

                {/* Time */}
                <div>
                  <label className="form-label">
                    <Clock size={13} className="inline mr-1.5" />
                    Preferred Time{" "}
                    <span className="text-xs font-normal" style={{ color: "var(--text-muted)" }}>
                      (optional)
                    </span>
                  </label>
                  <input
                    name="time"
                    type="time"
                    value={form.time}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>

                {/* Special requests */}
                <div className="md:col-span-2">
                  <label className="form-label">
                    <MessageSquare size={13} className="inline mr-1.5" />
                    Special Requests
                  </label>
                  <textarea
                    name="requests"
                    rows={4}
                    value={form.requests}
                    onChange={handleChange}
                    placeholder="Any special requirements, theme preferences, or notes..."
                    className="form-input resize-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full justify-center mt-8 text-base py-4"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="animate-spin"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                    >
                      <path d="M21 12a9 9 0 1 1-6.22-8.56" />
                    </svg>
                    Booking...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send size={16} />
                    Book Appointment
                  </span>
                )}
              </button>

              <p className="text-center text-xs mt-5" style={{ color: "var(--text-muted)" }}>
                We&apos;ll confirm via call or WhatsApp at{" "}
                <a href="tel:+917300685744" style={{ color: "var(--primary)", fontWeight: 600 }}>
                  +91 7300685744
                </a>
              </p>
            </motion.form>
          )}
        </div>
      </div>
    </section>
  );
}
