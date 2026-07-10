"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  ExternalLink,
  MapPin,
  Clock,
  Send,
  CheckCircle,
} from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) return;
    setTimeout(() => setSubmitted(true), 800);
  };

  return (
    <section
      id="contact"
      className="section-pad"
      style={{
        background:
          "linear-gradient(135deg, #fdf8f5 0%, #fce7f3 60%, #fdf4ff 100%)",
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
          <span className="section-label">Get in Touch</span>
          <h2 className="section-title">Contact Us</h2>
          <p className="section-desc">
            Have a question or want to discuss your dream look? We&apos;d love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* ── Left: Info ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-6"
          >
            {/* Info cards */}
            {[
              {
                icon: <Phone size={20} />,
                title: "Call / WhatsApp",
                content: (
                  <a
                    href="tel:+917300685744"
                    className="font-semibold text-base hover:underline"
                    style={{ color: "var(--primary)" }}
                  >
                    +91 7300685744
                  </a>
                ),
              },
              {
                icon: <ExternalLink size={20} />,
                title: "Instagram",
                content: (
                  <a
                    href="https://instagram.com/Ruchi_model.12"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-base hover:underline"
                    style={{ color: "var(--primary)" }}
                  >
                    @Ruchi_model.12
                  </a>
                ),
              },
              {
                icon: <MapPin size={20} />,
                title: "Location",
                content: (
                  <span style={{ color: "var(--text)" }}>
                    Vikas Nagar Linepar, Moradabad, Uttar Pradesh
                  </span>
                ),
              },
              {
                icon: <Clock size={20} />,
                title: "Working Hours",
                content: (
                  <span style={{ color: "var(--text)" }}>
                    Mon – Sat: 9:00 AM – 8:00 PM
                  </span>
                ),
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-4 p-5 bg-white rounded-2xl border shadow-sm"
                style={{ borderColor: "var(--border)" }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    background: "linear-gradient(135deg, #be185d22, #be185d11)",
                    color: "var(--primary)",
                  }}
                >
                  {item.icon}
                </div>
                <div>
                  <div
                    className="text-xs font-bold uppercase tracking-wider mb-1"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {item.title}
                  </div>
                  <div className="text-sm">{item.content}</div>
                </div>
              </div>
            ))}

            {/* Google Maps embed */}
            <div className="rounded-2xl overflow-hidden shadow-md border" style={{ borderColor: "var(--border)" }}>
              <iframe
                title="Moradabad Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56214.10752483!2d78.7331!3d28.8386!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390afef8e3c77fb1%3A0x5d4b5c33e7f4a79c!2sMoradabad%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin"
                width="100%"
                height="220"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>

          {/* ── Right: Form ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            {submitted ? (
              <div
                className="bg-white rounded-3xl p-10 text-center shadow-xl border h-full flex flex-col items-center justify-center"
                style={{ borderColor: "var(--border)" }}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                  style={{ background: "linear-gradient(135deg, #be185d, #9d174d)" }}
                >
                  <CheckCircle size={30} color="white" />
                </div>
                <h3 className="font-playfair text-xl font-bold mb-2" style={{ color: "var(--text)" }}>
                  Message Sent! 🌸
                </h3>
                <p className="text-sm" style={{ color: "var(--text-light)" }}>
                  We&apos;ll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn-outline text-sm py-2 px-7 mt-6"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-3xl p-8 shadow-xl border"
                style={{ borderColor: "var(--border)" }}
              >
                <h3
                  className="font-playfair text-xl font-bold mb-6"
                  style={{ color: "var(--text)" }}
                >
                  Send an Enquiry
                </h3>
                <div className="space-y-5">
                  <div>
                    <label className="form-label">Your Name *</label>
                    <input
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Full name"
                      className="form-input"
                    />
                  </div>
                  <div>
                    <label className="form-label">Phone Number *</label>
                    <input
                      name="phone"
                      type="tel"
                      required
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="Your mobile number"
                      className="form-input"
                    />
                  </div>
                  <div>
                    <label className="form-label">Message</label>
                    <textarea
                      name="message"
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us about your requirements..."
                      className="form-input resize-none"
                    />
                  </div>
                  <button type="submit" className="btn-primary w-full justify-center py-4 text-base">
                    <Send size={16} />
                    Send Message
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
