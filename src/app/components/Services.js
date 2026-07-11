"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, IndianRupee, Sparkles } from "lucide-react";

const tabs = ["Makeup", "Skin Care", "Hair Care", "Nail Art", "Lehenga Rental", "Jewelry Rental"];

const defaultServices = {
  Makeup: [
    { name: "Traditional Bridal Makeup", price: 8000, desc: "Classic Indian bridal look with premium Kryolan & MAC products" },
    { name: "Creative Bridal Makeup", price: 12000, desc: "Contemporary HD glam with contouring, cut-crease & custom palette" },
    { name: "Airbrush Bridal Makeup", price: 15000, desc: "Ultra-smooth high-definition airbrush for flawless all-day finish" },
    { name: "Party Makeup", price: 2500, desc: "Stunning smokey or glitter makeup for parties & functions" },
    { name: "Engagement Makeup", price: 5000, desc: "Soft romantic glam with dewy skin & natural lip tones" },
    { name: "Reception Makeup", price: 6000, desc: "Bold & glamorous evening look with dramatic eyes" },
    { name: "Mehndi Makeup", price: 3000, desc: "Fresh & vibrant daytime look with floral tones" },
    { name: "Cocktail / Sangeet Makeup", price: 4500, desc: "Sparkly, trendy look perfect for dance nights" },
    { name: "Pre-Wedding Shoot Makeup", price: 5000, desc: "Camera-ready makeup for outdoor & studio photoshoots" },
    { name: "Hair Styling (Bridal)", price: 2000, desc: "Elaborate bridal bun, braids, or open curls with accessories" },
    { name: "Hair Styling (Party)", price: 800, desc: "Elegant updo, beach waves, or sleek straight style" },
    { name: "Saree Draping", price: 500, desc: "Professional draping in Bengali, Gujarati, Nivi & more styles" },
  ],
  "Skin Care": [
    { name: "Gold Facial", price: 1500, desc: "24K gold-infused treatment for instant radiance & anti-aging" },
    { name: "Diamond Facial", price: 2000, desc: "Diamond dust exfoliation for deep glow & skin tightening" },
    { name: "Fruit Facial", price: 600, desc: "Natural fruit extracts for hydration & freshness" },
    { name: "De-Tan Facial", price: 800, desc: "Deep de-tanning with papaya & vitamin C serums" },
    { name: "Anti-Acne Facial", price: 1200, desc: "Salicylic acid treatment for breakout-prone skin" },
    { name: "Cleanup (Basic)", price: 400, desc: "Steam, exfoliation & blackhead extraction" },
    { name: "Cleanup (Advanced)", price: 700, desc: "Deep pore cleansing with serum & LED therapy" },
    { name: "Bleach (Face)", price: 300, desc: "Oxylife/VLCC bleach for instant skin brightening" },
    { name: "Bleach (Full Body)", price: 1000, desc: "Full body bleach with soothing aloe aftercare" },
    { name: "Threading (Full Face)", price: 150, desc: "Eyebrow shaping, upper lip, chin & forehead" },
    { name: "Waxing (Full Arms)", price: 300, desc: "Rica/chocolate wax for smooth, bump-free arms" },
    { name: "Waxing (Full Legs)", price: 400, desc: "Gentle hot wax for silky legs with moisturizer" },
    { name: "Waxing (Full Body)", price: 1500, desc: "Complete body wax including underarms & bikini line" },
    { name: "Body Polishing", price: 2500, desc: "Full body scrub, tan removal & deep moisturizing wrap" },
  ],
  "Hair Care": [
    { name: "Hair Spa (Basic)", price: 800, desc: "Deep conditioning treatment for dry & damaged hair" },
    { name: "Hair Spa (Premium)", price: 1500, desc: "Keratin-infused spa with hot oil & steam therapy" },
    { name: "Keratin Treatment", price: 5000, desc: "Brazilian keratin smoothing for frizz-free straight hair" },
    { name: "Hair Straightening", price: 4000, desc: "Professional rebonding for permanent straight hair" },
    { name: "Hair Smoothening", price: 4500, desc: "Cysteine/protein based semi-permanent smoothening" },
    { name: "Hair Color (Global)", price: 2000, desc: "Full head single-shade color with L'Oréal/Matrix products" },
    { name: "Hair Highlights", price: 3000, desc: "Chunky or babylights highlights in fashion shades" },
    { name: "Balayage / Ombre", price: 4000, desc: "Hand-painted gradient color for a natural sun-kissed effect" },
    { name: "Hair Cut (Women)", price: 300, desc: "Precision cut, layering, or U/V shape trim" },
    { name: "Hair Trim & Blow Dry", price: 500, desc: "Light trim with professional blow dry & setting" },
    { name: "Dandruff Treatment", price: 1200, desc: "Scalp detox treatment with anti-fungal serums" },
  ],
  "Nail Art": [
    { name: "Gel Nail Extensions", price: 1500, desc: "Durable gel overlay with custom shape & length" },
    { name: "Acrylic Nail Extensions", price: 2000, desc: "Strong acrylic sculpted nails in any length" },
    { name: "Nail Art (Basic)", price: 500, desc: "Glitter, French tip, or simple stamping designs" },
    { name: "Nail Art (Advanced)", price: 1000, desc: "3D flowers, chrome, marble, or ombre effects" },
    { name: "Manicure (Classic)", price: 400, desc: "Cuticle care, filing, buffing & polish application" },
    { name: "Manicure (Luxury)", price: 800, desc: "Paraffin dip, scrub, massage & gel polish finish" },
    { name: "Pedicure (Classic)", price: 500, desc: "Foot soak, scrub, nail shaping & regular polish" },
    { name: "Pedicure (Spa)", price: 1000, desc: "Crystal soak, dead skin removal, mask & gel polish" },
    { name: "Nail Repair & Removal", price: 300, desc: "Safe gel/acrylic removal or broken nail fix" },
  ],
  "Lehenga Rental": [
    { name: "Bridal Lehenga (Heavy)", price: 5000, unit: "/day", desc: "Premium heavy embroidered bridal lehengas in red, maroon & gold" },
    { name: "Bridal Lehenga (Light)", price: 3000, unit: "/day", desc: "Lightweight pastel bridal lehengas for intimate ceremonies" },
    { name: "Party Lehenga", price: 1500, unit: "/day", desc: "Trendy sequence & mirror work lehengas for sangeet & parties" },
    { name: "Mehndi / Haldi Outfit", price: 1000, unit: "/day", desc: "Floral printed or yellow-themed outfits for day ceremonies" },
    { name: "Dupatta / Chunni (Bridal)", price: 500, unit: "/day", desc: "Heavy embellished net dupatta with border work" },
  ],
  "Jewelry Rental": [
    { name: "Bridal Jewelry Full Set", price: 3500, unit: "/day", desc: "Complete set: necklace, earrings, maang tikka, nath & bangles" },
    { name: "Bridal Jewelry (Kundan)", price: 4000, unit: "/day", desc: "Premium kundan polki full bridal set with matha patti" },
    { name: "Engagement Jewelry Set", price: 2000, unit: "/day", desc: "Elegant necklace, earrings & bracelet for ring ceremonies" },
    { name: "Party Jewelry Set", price: 1000, unit: "/day", desc: "Lightweight matching necklace & statement earrings" },
    { name: "Flower Jewelry (Haldi/Mehndi)", price: 800, unit: "/day", desc: "Artificial flower jewelry set for haldi & mehndi functions" },
    { name: "Kamarband / Waist Belt", price: 500, unit: "/day", desc: "Decorative bridal waist chain in gold or kundan" },
  ],
};

const tabIcons = {
  Makeup: "💄",
  "Skin Care": "✨",
  "Hair Care": "💇",
  "Nail Art": "💅",
  "Lehenga Rental": "👗",
  "Jewelry Rental": "💎",
};

export default function Services() {
  const [activeTab, setActiveTab] = useState("Makeup");
  const [services, setServices] = useState(defaultServices);

  useEffect(() => {
    async function loadServices() {
      try {
        const res = await fetch("/api/services");
        const json = await res.json();
        if (json.success && json.data && json.data.length > 0) {
          // Initialize empty categories
          const grouped = {
            Makeup: [],
            "Skin Care": [],
            "Hair Care": [],
            "Nail Art": [],
            "Lehenga Rental": [],
            "Jewelry Rental": [],
          };
          
          json.data.forEach((service) => {
            const cat = service.category;
            if (grouped[cat]) {
              grouped[cat].push({
                name: service.name,
                price: service.price,
                desc: service.desc,
                unit: service.unit,
              });
            } else {
              // Add support for new custom categories added by admin
              if (!grouped[cat]) {
                grouped[cat] = [];
              }
              grouped[cat].push({
                name: service.name,
                price: service.price,
                desc: service.desc,
                unit: service.unit,
              });
            }
          });
          setServices(grouped);
        }
      } catch (err) {
        console.error("Failed to load services from database, using fallback defaults.", err);
      }
    }
    loadServices();
  }, []);

  const handleBook = () => {
    const el = document.querySelector("#booking");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };


  return (
    <section id="services" className="section-pad bg-gradient-to-b from-white to-[#fdf8f5]">
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
            Explore our professional services crafted specifically to enhance your natural beauty.
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3.5 mb-12"
        >
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-2.5 px-6 py-3.5 rounded-full border text-sm font-semibold transition-all duration-300 ${
                activeTab === tab
                  ? "tab-active shadow-md scale-105"
                  : "bg-white border-pink-100 hover:border-pink-300 hover:bg-pink-50"
              }`}
              style={{
                color: activeTab === tab ? undefined : "var(--text)",
                borderColor: activeTab === tab ? undefined : "#f9a8d4",
              }}
            >
              <span className="text-base">{tabIcons[tab]}</span>
              {tab}
            </button>
          ))}
        </motion.div>

        {/* Service Cards Container */}
        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {(!services[activeTab] || services[activeTab].length === 0) ? (
                <div className="col-span-full py-16 text-center text-slate-500 text-sm">
                  No services listed in this category yet.
                </div>
              ) : (
                services[activeTab].map((service, i) => (
                  <motion.div
                    key={service.name}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.35, delay: i * 0.05 }}
                    className="card p-6 flex flex-col justify-between hover:border-pink-300 hover:shadow-pink-100/50 hover:shadow-lg transition-all"
                    style={{ minHeight: "200px" }}
                  >
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3
                          className="font-bold text-base leading-snug flex-1 pr-2"
                          style={{ color: "var(--text)" }}
                        >
                          {service.name}
                        </h3>
                        <Sparkles size={14} className="text-yellow-500 shrink-0 mt-0.5" />
                      </div>
                      <p className="text-xs text-gray-500 line-clamp-2 mb-4">
                        {service.desc}
                      </p>
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-1 mb-4">
                        <IndianRupee
                          size={15}
                          style={{ color: "var(--primary)" }}
                        />
                        <span
                          className="text-2xl font-black tracking-tight"
                          style={{ color: "var(--primary)" }}
                        >
                          {service.price.toLocaleString("en-IN")}
                        </span>
                        {service.unit && (
                          <span
                            className="text-xs font-semibold"
                            style={{ color: "var(--text-muted)" }}
                          >
                            {service.unit}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={handleBook}
                        className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border text-xs font-bold transition-all hover:bg-pink-600 hover:text-white hover:border-pink-600 group"
                        style={{
                          borderColor: "var(--primary)",
                          color: "var(--primary)",
                        }}
                      >
                        <Calendar size={13} />
                        Book Service
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-xs mt-12"
          style={{ color: "var(--text-muted)" }}
        >
          * Standard rental charges require refundable security deposit. Call us for details.
        </motion.p>
      </div>
    </section>
  );
}
