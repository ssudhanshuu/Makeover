"use client";
import { useState } from "react";
import Link from "next/link";

const allProducts = [
  { id: 1, name: "Radiance Glow Serum", category: "Skincare", price: 1299, originalPrice: 1999, rating: 4.8, reviews: 234, badge: "Bestseller", gradient: "from-pink-50 to-rose-100" },
  { id: 2, name: "Velvet Matte Lipstick", category: "Makeup", price: 899, originalPrice: 1299, rating: 4.7, reviews: 189, badge: "New", gradient: "from-purple-50 to-fuchsia-100" },
  { id: 3, name: "Silk Repair Hair Mask", category: "Haircare", price: 749, originalPrice: null, rating: 4.6, reviews: 156, badge: null, gradient: "from-amber-50 to-orange-100" },
  { id: 4, name: "Rose Water Toner", category: "Skincare", price: 599, originalPrice: 899, rating: 4.9, reviews: 312, badge: "Sale", gradient: "from-rose-50 to-pink-100" },
  { id: 5, name: "24K Gold Face Cream", category: "Skincare", price: 2499, originalPrice: 3499, rating: 4.8, reviews: 97, badge: "Premium", gradient: "from-yellow-50 to-amber-100" },
  { id: 6, name: "Nude Eyeshadow Palette", category: "Makeup", price: 1599, originalPrice: null, rating: 4.5, reviews: 201, badge: "Trending", gradient: "from-stone-50 to-zinc-100" },
  { id: 7, name: "Argan Oil Hair Serum", category: "Haircare", price: 999, originalPrice: 1499, rating: 4.7, reviews: 178, badge: "Sale", gradient: "from-emerald-50 to-teal-100" },
  { id: 8, name: "Midnight Bloom Perfume", category: "Fragrance", price: 3299, originalPrice: null, rating: 4.9, reviews: 89, badge: "Luxury", gradient: "from-indigo-50 to-violet-100" },
  { id: 9, name: "Vitamin C Brightening Cream", category: "Skincare", price: 1099, originalPrice: 1599, rating: 4.6, reviews: 167, badge: "Sale", gradient: "from-orange-50 to-yellow-100" },
  { id: 10, name: "Long-Wear Foundation", category: "Makeup", price: 1899, originalPrice: null, rating: 4.4, reviews: 243, badge: null, gradient: "from-pink-50 to-rose-100" },
  { id: 11, name: "Keratin Shampoo", category: "Haircare", price: 649, originalPrice: 999, rating: 4.5, reviews: 198, badge: "Bestseller", gradient: "from-blue-50 to-indigo-100" },
  { id: 12, name: "Rose Oud Perfume", category: "Fragrance", price: 4999, originalPrice: 5999, rating: 4.9, reviews: 56, badge: "Premium", gradient: "from-rose-50 to-fuchsia-100" },
  { id: 13, name: "Hyaluronic Acid Serum", category: "Skincare", price: 899, originalPrice: null, rating: 4.8, reviews: 289, badge: "Trending", gradient: "from-cyan-50 to-blue-100" },
  { id: 14, name: "Contour & Highlight Kit", category: "Makeup", price: 1299, originalPrice: 1799, rating: 4.3, reviews: 134, badge: "Sale", gradient: "from-amber-50 to-yellow-100" },
  { id: 15, name: "Coconut Hair Oil", category: "Haircare", price: 499, originalPrice: null, rating: 4.7, reviews: 345, badge: "Bestseller", gradient: "from-green-50 to-emerald-100" },
  { id: 16, name: "Nail Art Kit Premium", category: "Nail Care", price: 799, originalPrice: 1199, rating: 4.2, reviews: 87, badge: "New", gradient: "from-pink-50 to-purple-100" },
];

const categoryFilters = ["All", "Skincare", "Makeup", "Haircare", "Fragrance", "Nail Care"];
const sortOptions = ["Featured", "Price: Low to High", "Price: High to Low", "Newest", "Best Rating"];

function Stars({ rating }) {
  return (
    <div className="stars">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className={`star ${star <= Math.round(rating) ? "" : "empty"}`}>★</span>
      ))}
    </div>
  );
}

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Featured");
  const [priceRange, setPriceRange] = useState([0, 6000]);
  const [showFilters, setShowFilters] = useState(false);

  let filtered = activeCategory === "All"
    ? allProducts
    : allProducts.filter((p) => p.category === activeCategory);

  filtered = filtered.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

  if (sortBy === "Price: Low to High") filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sortBy === "Price: High to Low") filtered = [...filtered].sort((a, b) => b.price - a.price);
  if (sortBy === "Best Rating") filtered = [...filtered].sort((a, b) => b.rating - a.rating);

  return (
    <>
      {/* Page Header */}
      <section className="relative bg-gradient-to-br from-pink-50 via-rose-50 to-fuchsia-50 py-16">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 right-20 w-32 h-32 bg-pink-200 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-20 w-24 h-24 bg-rose-200 rounded-full blur-2xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="section-subtitle">Our Collection</span>
          <h1 className="text-4xl md:text-5xl font-extrabold mt-2" style={{ color: 'var(--secondary)' }}>
            Shop All Products
          </h1>
          <p className="mt-4 max-w-xl mx-auto" style={{ color: 'var(--text-light)' }}>
            Browse our curated selection of premium beauty products
          </p>
          <div className="flex items-center justify-center gap-2 mt-4 text-sm" style={{ color: 'var(--text-muted)' }}>
            <Link href="/" className="hover:text-pink-600 transition-colors">Home</Link>
            <span>/</span>
            <span style={{ color: 'var(--primary)' }}>Shop</span>
          </div>
        </div>
      </section>

      {/* Shop Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters - Desktop */}
            <aside className="hidden lg:block w-72 shrink-0">
              <div className="sticky top-24 space-y-8">
                {/* Categories */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <h3 className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: 'var(--secondary)' }}>Categories</h3>
                  <div className="space-y-2">
                    {categoryFilters.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                          activeCategory === cat
                            ? "bg-pink-50 text-pink-600 border border-pink-200"
                            : "hover:bg-gray-50 border border-transparent"
                        }`}
                        style={{ color: activeCategory === cat ? undefined : 'var(--text)' }}
                      >
                        {cat}
                        <span className="float-right text-xs opacity-60">
                          {cat === "All" ? allProducts.length : allProducts.filter(p => p.category === cat).length}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <h3 className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: 'var(--secondary)' }}>Price Range</h3>
                  <input
                    type="range"
                    min="0"
                    max="6000"
                    step="100"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="w-full accent-pink-500"
                  />
                  <div className="flex justify-between mt-2 text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
                    <span>₹0</span>
                    <span>₹{priceRange[1].toLocaleString()}</span>
                  </div>
                </div>

                {/* Rating */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <h3 className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: 'var(--secondary)' }}>Customer Rating</h3>
                  <div className="space-y-2">
                    {[4, 3, 2].map((r) => (
                      <label key={r} className="flex items-center gap-2 cursor-pointer text-sm py-1">
                        <input type="checkbox" className="accent-pink-500 w-4 h-4 rounded" />
                        <Stars rating={r} />
                        <span style={{ color: 'var(--text-muted)' }}>& up</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-8 bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3">
                  {/* Mobile filter toggle */}
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium hover:border-pink-300 transition-colors"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/></svg>
                    Filters
                  </button>
                  <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
                    Showing <strong style={{ color: 'var(--secondary)' }}>{filtered.length}</strong> products
                  </span>
                </div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium focus:outline-none focus:border-pink-300 transition-colors bg-white"
                  style={{ color: 'var(--text)' }}
                >
                  {sortOptions.map((opt) => (
                    <option key={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              {/* Mobile Filters Dropdown */}
              {showFilters && (
                <div className="lg:hidden mb-6 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <div className="flex flex-wrap gap-2">
                    {categoryFilters.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                          activeCategory === cat
                            ? "bg-pink-500 text-white"
                            : "bg-gray-100 hover:bg-pink-50"
                        }`}
                        style={{ color: activeCategory === cat ? undefined : 'var(--text)' }}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Product Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.map((product) => (
                  <div key={product.id} className="product-card group">
                    <div className="product-image">
                      <div className={`w-full h-full bg-gradient-to-br ${product.gradient} flex items-center justify-center`}>
                        <div className="w-28 h-28 rounded-2xl bg-white/60 backdrop-blur-sm shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                          <span className="text-5xl">
                            {product.category === "Skincare" ? "🧴" :
                             product.category === "Makeup" ? "💄" :
                             product.category === "Haircare" ? "💆" :
                             product.category === "Nail Care" ? "💅" : "🌸"}
                          </span>
                        </div>
                      </div>
                      {product.badge && (
                        <span className={`badge ${product.badge === 'New' ? 'new' : product.badge === 'Sale' ? 'sale' : ''}`}>
                          {product.badge}
                        </span>
                      )}
                      <div className="product-actions">
                        <button className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-pink-500 hover:text-white transition-all shadow-md">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                        </button>
                        <button className="w-10 h-10 rounded-full bg-pink-500 text-white flex items-center justify-center hover:bg-pink-600 transition-all shadow-md">
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
                        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>({product.reviews})</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filtered.length === 0 && (
                <div className="text-center py-20">
                  <span className="text-6xl block mb-4">🔍</span>
                  <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--secondary)' }}>No products found</h3>
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Try adjusting your filters</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
