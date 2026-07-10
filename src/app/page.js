"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

/* ─── Data ─── */
const categories = [
  { name: "Skincare", image: "/images/categories/skincare.png", count: 120, gradient: "from-rose-100 to-pink-200" },
  { name: "Makeup", image: "/images/categories/makeup.png", count: 95, gradient: "from-purple-100 to-fuchsia-200" },
  { name: "Haircare", image: "/images/categories/haircare.png", count: 78, gradient: "from-amber-100 to-orange-200" },
  { name: "Fragrances", image: "/images/categories/fragrance.png", count: 64, gradient: "from-blue-100 to-cyan-200" },
  { name: "Tools & Brushes", image: "/images/categories/tools.png", count: 45, gradient: "from-emerald-100 to-teal-200" },
  { name: "Nail Care", image: "/images/categories/skincare.png", count: 52, gradient: "from-pink-100 to-rose-200" },
];

const products = [
  { id: 1, name: "Radiance Glow Serum", category: "Skincare", price: 1299, originalPrice: 1999, rating: 4.8, reviews: 234, badge: "Bestseller", gradient: "from-pink-50 to-rose-100" },
  { id: 2, name: "Velvet Matte Lipstick", category: "Makeup", price: 899, originalPrice: 1299, rating: 4.7, reviews: 189, badge: "New", gradient: "from-purple-50 to-fuchsia-100" },
  { id: 3, name: "Silk Repair Hair Mask", category: "Haircare", price: 749, originalPrice: null, rating: 4.6, reviews: 156, badge: null, gradient: "from-amber-50 to-orange-100" },
  { id: 4, name: "Rose Water Toner", category: "Skincare", price: 599, originalPrice: 899, rating: 4.9, reviews: 312, badge: "Sale", gradient: "from-rose-50 to-pink-100" },
  { id: 5, name: "24K Gold Face Cream", category: "Skincare", price: 2499, originalPrice: 3499, rating: 4.8, reviews: 97, badge: "Premium", gradient: "from-yellow-50 to-amber-100" },
  { id: 6, name: "Nude Eyeshadow Palette", category: "Makeup", price: 1599, originalPrice: null, rating: 4.5, reviews: 201, badge: "Trending", gradient: "from-stone-50 to-zinc-100" },
  { id: 7, name: "Argan Oil Hair Serum", category: "Haircare", price: 999, originalPrice: 1499, rating: 4.7, reviews: 178, badge: "Sale", gradient: "from-emerald-50 to-teal-100" },
  { id: 8, name: "Midnight Bloom Perfume", category: "Fragrance", price: 3299, originalPrice: null, rating: 4.9, reviews: 89, badge: "Luxury", gradient: "from-indigo-50 to-violet-100" },
];

const testimonials = [
  { name: "Priya Sharma", role: "Skincare Enthusiast", text: "Makeovers has completely transformed my skincare routine! The quality of products is exceptional and the delivery is always on time.", rating: 5, avatar: "PS" },
  { name: "Ananya Patel", role: "Beauty Blogger", text: "I've tried countless beauty stores online, but Makeovers stands out for their curated selection and authentic products. Absolutely love it!", rating: 5, avatar: "AP" },
  { name: "Riya Kapoor", role: "Makeup Artist", text: "As a professional makeup artist, I trust Makeovers for all my product needs. Premium quality at great prices with amazing customer service.", rating: 5, avatar: "RK" },
];

const features = [
  { icon: "🚚", title: "Free Shipping", desc: "Free delivery on orders above ₹999" },
  { icon: "✨", title: "100% Authentic", desc: "All products are genuine & certified" },
  { icon: "↩️", title: "Easy Returns", desc: "Hassle-free 30-day return policy" },
  { icon: "💬", title: "Expert Support", desc: "24/7 beauty consultation available" },
];

/* ─── Star Component ─── */
function Stars({ rating }) {
  return (
    <div className="stars">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className={`star ${star <= Math.round(rating) ? "" : "empty"}`}>
          ★
        </span>
      ))}
    </div>
  );
}

/* ─── Intersection Observer Hook ─── */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.unobserve(el);
  }, [threshold]);
  return [ref, isInView];
}

/* ─── Main Page ─── */
export default function Home() {
  const [heroRef, heroInView] = useInView(0.1);
  const [catRef, catInView] = useInView();
  const [prodRef, prodInView] = useInView();
  const [featRef, featInView] = useInView();
  const [testRef, testInView] = useInView();
  const [bannerRef, bannerInView] = useInView();

  return (
    <>
      {/* ═══════════ HERO SECTION ═══════════ */}
      <section ref={heroRef} id="hero" className="relative min-h-[92vh] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src="/images/backgraound.png"
            alt="Beauty products background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-white/40" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/80" />
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-pink-200/30 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-10 w-48 h-48 bg-rose-200/20 rounded-full blur-2xl" style={{ animation: 'float 4s ease-in-out infinite 1s' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Text */}
            <div className={`space-y-8 ${heroInView ? 'animate-fadeInUp' : 'opacity-0'}`}>
              <div>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-50 border border-pink-200 text-pink-600 text-sm font-semibold mb-6">
                  <span className="w-2 h-2 bg-pink-500 rounded-full animate-pulse" />
                  New Collection 2026
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight" style={{ color: 'var(--secondary)' }}>
                Discover Your
                <br />
                <span className="gradient-text">Perfect Look</span>
              </h1>
              <p className="text-lg max-w-lg" style={{ color: 'var(--text-light)' }}>
                Explore our curated collection of premium beauty products. From luxurious 
                skincare to stunning makeup — everything you need to glow.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href="/shop" className="btn-primary text-base py-3.5 px-8 animate-pulse-glow">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                  Shop Now
                </Link>
                <Link href="/about" className="btn-outline text-base py-3.5 px-8">
                  Learn More
                </Link>
              </div>

              {/* Stats */}
              <div className="flex gap-8 pt-4">
                {[
                  { value: "10K+", label: "Products" },
                  { value: "50K+", label: "Happy Customers" },
                  { value: "200+", label: "Brands" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-2xl font-extrabold" style={{ color: 'var(--primary)' }}>{stat.value}</div>
                    <div className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Image */}
            <div className={`relative hidden lg:block ${heroInView ? 'animate-slideInRight' : 'opacity-0'}`}>
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-200 to-rose-300 rounded-[2rem] rotate-6 opacity-40" />
                <div className="absolute inset-0 bg-gradient-to-br from-pink-100 to-rose-200 rounded-[2rem] -rotate-3 opacity-60" />
                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl">
                  <Image
                    src="/images/hero-products.png"
                    alt="Premium beauty products"
                    width={600}
                    height={600}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Floating badges */}
                <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl p-4 animate-float">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">⭐</span>
                    <div>
                      <div className="text-sm font-bold" style={{ color: 'var(--secondary)' }}>4.9/5</div>
                      <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Rating</div>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4" style={{ animation: 'float 3s ease-in-out infinite 0.5s' }}>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🎁</span>
                    <div>
                      <div className="text-sm font-bold" style={{ color: 'var(--secondary)' }}>50% OFF</div>
                      <div className="text-xs" style={{ color: 'var(--text-muted)' }}>First Order</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce-gentle">
          <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>Scroll Down</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--primary)' }}>
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </div>
      </section>

      {/* ═══════════ FEATURES BAR ═══════════ */}
      <section ref={featRef} className="relative -mt-8 z-10 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`grid grid-cols-2 lg:grid-cols-4 gap-4 ${featInView ? 'animate-fadeInUp' : 'opacity-0'}`}>
            {features.map((f, i) => (
              <div
                key={f.title}
                className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100 flex items-center gap-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <span className="text-3xl">{f.icon}</span>
                <div>
                  <h3 className="text-sm font-bold" style={{ color: 'var(--secondary)' }}>{f.title}</h3>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ CATEGORIES ═══════════ */}
      <section ref={catRef} id="categories" className="section-padding bg-gradient-to-b from-white to-gray-50/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`section-header ${catInView ? 'animate-fadeInUp' : 'opacity-0'}`}>
            <span className="section-subtitle">Browse Collection</span>
            <h2 className="section-title">Shop by Category</h2>
            <p className="section-desc">Find exactly what you need from our wide range of beauty categories</p>
          </div>

          <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 ${catInView ? 'animate-fadeInUp' : 'opacity-0'}`}>
            {categories.map((cat, i) => (
              <Link
                key={cat.name}
                href="/shop"
                className="group relative rounded-2xl overflow-hidden bg-white border border-gray-100 hover:border-pink-200 hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className={`aspect-square bg-gradient-to-br ${cat.gradient} p-4 flex items-center justify-center overflow-hidden`}>
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    width={200}
                    height={200}
                    className="w-full h-full object-cover rounded-xl group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-sm font-bold" style={{ color: 'var(--secondary)' }}>{cat.name}</h3>
                  <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{cat.count} Products</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ FEATURED PRODUCTS ═══════════ */}
      <section ref={prodRef} id="products" className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`section-header ${prodInView ? 'animate-fadeInUp' : 'opacity-0'}`}>
            <span className="section-subtitle">Handpicked for You</span>
            <h2 className="section-title">Featured Products</h2>
            <p className="section-desc">Our most loved products, curated by beauty experts</p>
          </div>

          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ${prodInView ? 'animate-fadeInUp' : 'opacity-0'}`}>
            {products.map((product, i) => (
              <div
                key={product.id}
                className="product-card group"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="product-image">
                  <div className={`w-full h-full bg-gradient-to-br ${product.gradient} flex items-center justify-center`}>
                    <div className="w-32 h-32 rounded-2xl bg-white/60 backdrop-blur-sm shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <span className="text-5xl">
                        {product.category === "Skincare" ? "🧴" :
                         product.category === "Makeup" ? "💄" :
                         product.category === "Haircare" ? "💆" : "🌸"}
                      </span>
                    </div>
                  </div>
                  {product.badge && (
                    <span className={`badge ${product.badge === 'New' ? 'new' : product.badge === 'Sale' ? 'sale' : ''}`}>
                      {product.badge}
                    </span>
                  )}
                  <div className="product-actions">
                    <button className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-pink-500 hover:text-white transition-all shadow-md" title="Add to Wishlist">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                    </button>
                    <button className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-pink-500 hover:text-white transition-all shadow-md" title="Quick View">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    </button>
                    <button className="w-10 h-10 rounded-full bg-pink-500 text-white flex items-center justify-center hover:bg-pink-600 transition-all shadow-md" title="Add to Cart">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                    </button>
                  </div>
                </div>
                <div className="product-info">
                  <span className="product-category">{product.category}</span>
                  <h3 className="product-name">{product.name}</h3>
                  <Stars rating={product.rating} />
                  <div className="flex items-center justify-between mt-2">
                    <div className="product-price">
                      ₹{product.price.toLocaleString()}
                      {product.originalPrice && (
                        <span className="original-price">₹{product.originalPrice.toLocaleString()}</span>
                      )}
                    </div>
                    <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                      ({product.reviews})
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/shop" className="btn-outline">
              View All Products
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════ SPECIAL OFFER BANNER ═══════════ */}
      <section ref={bannerRef} className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`relative overflow-hidden rounded-3xl ${bannerInView ? 'animate-scaleIn' : 'opacity-0'}`}>
            <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-rose-500 to-fuchsia-600" style={{ backgroundSize: '200% 200%', animation: 'gradient-shift 5s ease infinite' }} />
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full translate-x-1/3 translate-y-1/3" />
              <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
            </div>

            <div className="relative px-8 py-16 md:px-16 md:py-20 text-center text-white">
              <span className="inline-block px-5 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-sm font-semibold mb-6 border border-white/30">
                ✨ Limited Time Offer
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">
                Summer Glow Sale
              </h2>
              <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                Up to <span className="font-extrabold text-yellow-300">50% OFF</span> on premium skincare & makeup.
                Use code <span className="font-mono bg-white/20 px-3 py-1 rounded-lg">GLOW50</span> at checkout.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/shop" className="btn-white">
                  Shop the Sale
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ TESTIMONIALS ═══════════ */}
      <section ref={testRef} id="testimonials" className="section-padding bg-gradient-to-b from-gray-50/80 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`section-header ${testInView ? 'animate-fadeInUp' : 'opacity-0'}`}>
            <span className="section-subtitle">Testimonials</span>
            <h2 className="section-title">What Our Customers Say</h2>
            <p className="section-desc">Real reviews from real beauty lovers</p>
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${testInView ? 'animate-fadeInUp' : 'opacity-0'}`}>
            {testimonials.map((t, i) => (
              <div
                key={t.name}
                className="bg-white rounded-2xl p-8 border border-gray-100 hover:border-pink-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                {/* Quote icon */}
                <div className="w-10 h-10 rounded-xl bg-pink-50 flex items-center justify-center mb-5">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="var(--primary)" opacity="0.7">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                  </svg>
                </div>
                <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-light)' }}>
                  &ldquo;{t.text}&rdquo;
                </p>
                <Stars rating={t.rating} />
                <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-100">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center text-white text-sm font-bold">
                    {t.avatar}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold" style={{ color: 'var(--secondary)' }}>{t.name}</h4>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ NEWSLETTER ═══════════ */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-12 md:p-20">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-10 right-10 w-32 h-32 border border-pink-500 rounded-full" />
              <div className="absolute bottom-10 left-10 w-20 h-20 border border-pink-500/50 rounded-full" />
              <div className="absolute top-1/2 right-1/4 w-16 h-16 border border-pink-500/30 rounded-full" />
            </div>

            <div className="relative text-center max-w-2xl mx-auto">
              <span className="text-4xl mb-4 block">💌</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
                Stay Beautiful, Stay Updated
              </h2>
              <p className="text-gray-400 mb-8">
                Subscribe to get exclusive offers, beauty tips, and early access to new launches.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 transition-colors text-sm"
                />
                <button className="btn-primary py-4 px-8 whitespace-nowrap">
                  Subscribe
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-4">No spam, unsubscribe at any time.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}