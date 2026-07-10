"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, IndianRupee } from "lucide-react";

const tabs = ["Makeup", "Skin Care", "Lehenga Rental", "Jewelry Rental"];

const services = {
  Makeup: [
    { name: "Traditional Bridal Makeup", price: 5000 },
    { name: "Creative Bridal Makeup", price: 7000 },
    { name: "Airbrush Bridal Makeup", price: 10000 },
    { name: "Party Makeup", price: 1500 },
    { name: "Engagement Makeup", price: 3000 },
    { name: "Reception Makeup", price: 4000 },
    { name: "Mehndi Makeup", price: 2000 },
    { name: "Hair Styling", price: 800 },
  ],
  "Skin Care": [
    { name: "Facial (Basic)", price: 500 },
    { name: "Facial (Advanced)", price: 1200 },
    { name: "Cleanup", price: 300 },
    { name: "Bleach", price: 250 },
    { name: "Threading (Full Face)", price: 100 },
    { name: "Waxing (Full Arms)", price: 200 },
  ],
  "Lehenga Rental": [
    { name: "Bridal Lehenga", price: 3000, unit: "/day" },
    { name: "Party Lehenga", price: 1500, unit: "/day" },
  ],
  "Jewelry Rental": [
    { name: "Bridal Jewelry Set", price: 2000, unit: "/day" },
    { name: "Party Jewelry Set", price: 800, unit: "/day" },
  ],
};

const tabIcons = {
  Makeup: "💄",
  "Skin Care": "✨",
  "Lehenga Rental": "👗",
  "Jewelry Rental": "💎",
};

export default function Services() {
  const [activeTab, setActiveTab] = useState("Makeup");

  const handleBook = () => {
    const el = document.querySelector("#booking");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="services" className="section-pad" style={{ background: "#fff" }}>
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="section-label">Our Expertise</span>
          <h2 className="section-title">Services & Pricing</h2>
          <p className="section-desc">
            From bridal glam to everyday skincare — we have everything you need
            to look and feel beautiful.
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-2 px-5 py-3 rounded-full border text-sm font-semibold transition-all duration-300 ${
                activeTab === tab
                  ? "tab-active shadow-md"
                  : "bg-white border-pink-100 hover:border-pink-300 hover:bg-pink-50"
              }`}
              style={{
                color: activeTab === tab ? undefined : "var(--text)",
                borderColor: activeTab === tab ? undefined : "#f9a8d4",
              }}
            >
              <span>{tabIcons[tab]}</span>
              {tab}
            </button>
          ))}
        </motion.div>

        {/* Service cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          >
            {services[activeTab].map((service, i) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, delay: i * 0.07 }}
                className="card p-6 flex flex-col justify-between"
                style={{ minHeight: "160px" }}
              >
                <div>
                  <h3
                    className="font-semibold text-base mb-3 leading-snug"
                    style={{ color: "var(--text)" }}
                  >
                    {service.name}
                  </h3>
                  <div className="flex items-center gap-1 mb-5">
                    <IndianRupee
                      size={16}
                      style={{ color: "var(--primary)" }}
                    />
                    <span
                      className="text-xl font-bold"
                      style={{ color: "var(--primary)" }}
                    >
                      {service.price.toLocaleString("en-IN")}
                    </span>
                    {service.unit && (
                      <span
                        className="text-xs font-medium"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {service.unit}
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={handleBook}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border text-sm font-semibold transition-all hover:bg-pink-600 hover:text-white hover:border-pink-600 group"
                  style={{
                    borderColor: "var(--primary)",
                    color: "var(--primary)",
                  }}
                >
                  <Calendar size={14} />
                  Book Now
                </button>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-xs mt-10"
          style={{ color: "var(--text-muted)" }}
        >
          * Prices may vary based on requirements. Contact us for custom packages.
        </motion.p>
      </div>
    </section>
  );
}
