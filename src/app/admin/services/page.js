"use client";
import { useState, useEffect } from "react";
import {
  Plus,
  Trash2,
  Edit3,
  Home,
  Search,
  Sparkles,
  IndianRupee,
  Tag,
  X,
  ArrowLeft,
  AlertCircle,
  TrendingUp,
  Percent,
} from "lucide-react";
import Link from "next/link";

const categories = ["Makeup", "Skin Care", "Hair Care", "Nail Art", "Lehenga Rental", "Jewelry Rental"];

export default function AdminDashboard() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Add / Edit Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("add"); // "add" or "edit"
  const [formData, setFormData] = useState({
    name: "",
    category: "Makeup",
    price: "",
    unit: "",
    desc: "",
  });
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Delete Confirmation State
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(null);

  // Toast Notification State
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  useEffect(() => {
    fetchServices();
  }, []);

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: "", type: "success" });
    }, 3000);
  };

  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/services");
      const json = await res.json();
      if (json.success) {
        setServices(json.data);
      } else {
        setError(json.error || "Failed to load services");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch services. Check if MongoDB is running.");
    } finally {
      setLoading(false);
    }
  };

  // Open Modal for Add
  const handleOpenAdd = () => {
    setFormData({
      name: "",
      category: "Makeup",
      price: "",
      unit: "",
      desc: "",
    });
    setFormError("");
    setModalType("add");
    setModalOpen(true);
  };

  // Open Modal for Edit
  const handleOpenEdit = (service) => {
    setFormData({
      name: service.name,
      category: service.category,
      price: service.price.toString(),
      unit: service.unit || "",
      desc: service.desc || "",
    });
    setFormError("");
    setEditingId(service._id);
    setModalType("edit");
    setModalOpen(true);
  };

  // Handle Form Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Submit (Add or Edit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!formData.name.trim()) return setFormError("Service name is required.");
    if (!formData.category) return setFormError("Category is required.");
    if (!formData.price || isNaN(formData.price) || Number(formData.price) < 0) {
      return setFormError("Price must be a valid positive number.");
    }

    try {
      setSubmitting(true);
      const payload = {
        name: formData.name.trim(),
        category: formData.category,
        price: Number(formData.price),
        unit: formData.unit.trim(),
        desc: formData.desc.trim(),
      };

      let res;
      if (modalType === "add") {
        res = await fetch("/api/services", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch(`/api/services/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      const json = await res.json();
      if (json.success) {
        showToast(
          modalType === "add"
            ? "Service added successfully!"
            : "Service updated successfully!",
          "success"
        );
        setModalOpen(false);
        fetchServices();
      } else {
        setFormError(json.error || "Something went wrong.");
      }
    } catch (err) {
      console.error(err);
      setFormError("Failed to save service. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Delete Action Trigger
  const triggerDelete = (service) => {
    setServiceToDelete(service);
    setDeleteConfirmOpen(true);
  };

  // Confirm Delete
  const confirmDelete = async () => {
    if (!serviceToDelete) return;
    try {
      const res = await fetch(`/api/services/${serviceToDelete._id}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (json.success) {
        showToast("Service deleted successfully!", "success");
        setDeleteConfirmOpen(false);
        setServiceToDelete(null);
        fetchServices();
      } else {
        showToast(json.error || "Failed to delete service", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Connection error while deleting service", "error");
    }
  };

  // Filtering services based on category and search query
  const filteredServices = services.filter((s) => {
    const matchesCategory = selectedCategory === "All" || s.category === selectedCategory;
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.desc && s.desc.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Calculate Simple Dashboard Statistics
  const totalCount = services.length;
  const avgPrice = totalCount > 0 ? Math.round(services.reduce((acc, curr) => acc + curr.price, 0) / totalCount) : 0;
  const categoryCounts = services.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + 1;
    return acc;
  }, {});
  const uniqueCategories = Object.keys(categoryCounts).length;
  const premiumCount = services.filter((s) => s.price >= 5000).length;

  return (
    <div className="p-6 max-w-7xl mx-auto flex flex-col font-sans">
      {/* Toast Alert */}
      {toast.show && (
        <div
          className={`fixed top-5 right-5 z-50 flex items-center gap-2.5 px-6 py-4 rounded-2xl shadow-xl transition-all transform translate-y-0 duration-300 ${toast.type === "success"
            ? "bg-emerald-500/90 text-white backdrop-blur"
            : "bg-rose-500/90 text-white backdrop-blur"
            }`}
        >
          <Sparkles size={18} />
          <span className="font-semibold text-sm">{toast.message}</span>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 w-full mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight font-playfair">Manage Services</h1>
            <p className="text-slate-400 mt-1">Manage Services & Pricing List</p>
          </div>
          <button
            onClick={handleOpenAdd}
            className="flex items-center gap-2 text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 px-5 py-2.5 rounded-xl transition cursor-pointer"
          >
            <Plus size={16} />
            Add Service
          </button>
        </div>
        {error && (
          <div className="mb-6 flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 p-4 rounded-2xl">
            <AlertCircle className="shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-sm">Database Error</h3>
              <p className="text-xs mt-1 opacity-90">{error}</p>
              <button
                onClick={fetchServices}
                className="mt-2.5 text-xs font-bold underline hover:opacity-80"
              >
                Try Reconnecting
              </button>
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#1a1d27] p-5 rounded-2xl border border-[#2a2e3f] shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Services</span>
              <p className="text-3xl font-black text-white mt-1">{loading ? "..." : totalCount}</p>
            </div>
            <div className="w-12 h-12 bg-pink-500/10 rounded-xl flex items-center justify-center text-pink-400">
              <Tag size={20} />
            </div>
          </div>

          <div className="bg-[#1a1d27] p-5 rounded-2xl border border-[#2a2e3f] shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Categories</span>
              <p className="text-3xl font-black text-white mt-1">{loading ? "..." : uniqueCategories}</p>
            </div>
            <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-400">
              <Sparkles size={20} />
            </div>
          </div>

          <div className="bg-[#1a1d27] p-5 rounded-2xl border border-[#2a2e3f] shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Avg Price</span>
              <p className="text-3xl font-black text-white mt-1 flex items-center gap-0.5">
                <IndianRupee size={22} className="inline mt-0.5 shrink-0" />
                {loading ? "..." : avgPrice.toLocaleString("en-IN")}
              </p>
            </div>
            <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-400">
              <TrendingUp size={20} />
            </div>
          </div>

          <div className="bg-[#1a1d27] p-5 rounded-2xl border border-[#2a2e3f] shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Premium</span>
              <p className="text-3xl font-black text-white mt-1">{loading ? "..." : premiumCount}</p>
            </div>
            <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400">
              <Percent size={20} />
            </div>
          </div>
        </section>

        {/* Controls Container */}
        <section className="bg-[#1a1d27] rounded-2xl border border-[#2a2e3f] shadow-sm p-4 sm:p-6 mb-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                <Search size={16} />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search service name or description..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#2a2e3f] bg-[#0f111a] text-white text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 outline-none transition placeholder:text-slate-500"
              />
            </div>

            {/* Category Tab Row */}
            <div className="flex flex-wrap items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-thin">
              <button
                onClick={() => setSelectedCategory("All")}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition whitespace-nowrap cursor-pointer ${selectedCategory === "All"
                  ? "bg-blue-600 text-white"
                  : "bg-[#252b3b] hover:bg-[#2a2e3f] text-slate-300"
                  }`}
              >
                All categories
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition whitespace-nowrap cursor-pointer ${selectedCategory === cat
                    ? "bg-blue-600 text-white"
                    : "bg-[#252b3b] hover:bg-[#2a2e3f] text-slate-300"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Data Table / List */}
        <section className="bg-[#1a1d27] rounded-2xl border border-[#2a2e3f] shadow-sm overflow-hidden">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 text-slate-400 gap-3">
              <div className="w-10 h-10 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
              <span className="text-sm font-semibold">Loading salon database...</span>
            </div>
          ) : filteredServices.length === 0 ? (
            <div className="text-center py-20 px-4">
              <div className="w-16 h-16 bg-[#252b3b] rounded-full flex items-center justify-center mx-auto text-slate-500 mb-4">
                <Search size={24} />
              </div>
              <h3 className="font-bold text-white text-lg">No services found</h3>
              <p className="text-sm text-slate-400 mt-1 max-w-sm mx-auto">
                No results match &quot;{searchQuery}&quot; in category &quot;{selectedCategory}&quot;.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#252b3b] border-b border-[#2a2e3f] text-xs font-bold text-slate-400 uppercase tracking-wider">
                    <th className="px-6 py-4">Service Name & Description</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Pricing</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2a2e3f]">
                  {filteredServices.map((service) => (
                    <tr key={service._id} className="hover:bg-[#252b3b]/50 transition">
                      <td className="px-6 py-4">
                        <div className="font-bold text-white text-sm">{service.name}</div>
                        {service.desc && (
                          <p className="text-xs text-slate-400 mt-0.5 max-w-lg line-clamp-2 leading-relaxed">
                            {service.desc}
                          </p>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                          {service.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-white font-black text-sm">
                          <IndianRupee size={13} className="shrink-0 text-slate-500 mr-0.5" />
                          {service.price.toLocaleString("en-IN")}
                          {service.unit && (
                            <span className="text-xs font-normal text-slate-500 ml-1">{service.unit}</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenEdit(service)}
                            className="p-2 rounded-xl text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 transition cursor-pointer"
                            title="Edit Service"
                          >
                            <Edit3 size={16} />
                          </button>
                          <button
                            onClick={() => triggerDelete(service)}
                            className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition cursor-pointer"
                            title="Delete Service"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#1a1d27] w-full max-w-lg rounded-3xl shadow-2xl border border-[#2a2e3f] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-[#2a2e3f] flex items-center justify-between">
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <Sparkles size={18} className="text-blue-400" />
                {modalType === "add" ? "Create New Service" : "Edit Service Details"}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-lg hover:bg-[#252b3b] text-slate-400 hover:text-white transition"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="p-6 flex-1 overflow-y-auto space-y-4">
              {formError && (
                <div className="flex items-center gap-2 bg-rose-500/10 border border-rose-500/20 text-rose-400 px-4 py-3 rounded-xl text-xs font-semibold">
                  <AlertCircle size={15} className="shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Service Name*
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Traditional Bridal Makeup"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-[#2a2e3f] bg-[#0f111a] text-white text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 outline-none transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Category*
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 rounded-xl border border-[#2a2e3f] bg-[#0f111a] text-white text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 outline-none transition"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Price (INR)*
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                      <IndianRupee size={14} />
                    </span>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="e.g. 5000"
                      required
                      min="0"
                      className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-[#2a2e3f] bg-[#0f111a] text-white text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 outline-none transition"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Unit (Optional)
                </label>
                <input
                  type="text"
                  name="unit"
                  value={formData.unit}
                  onChange={handleInputChange}
                  placeholder="e.g. /day (for rentals)"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#2a2e3f] bg-[#0f111a] text-white text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Description
                </label>
                <textarea
                  name="desc"
                  value={formData.desc}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="Describe service inclusions..."
                  className="w-full px-4 py-2.5 rounded-xl border border-[#2a2e3f] bg-[#0f111a] text-white text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 outline-none transition resize-none"
                ></textarea>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-[#2a2e3f]">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-[#2a2e3f] bg-[#0f111a] text-xs font-bold text-slate-300 hover:bg-[#252b3b] transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition flex items-center gap-1.5 disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer"
                >
                  {submitting && (
                    <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  )}
                  {modalType === "add" ? "Create Service" : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#1a1d27] w-full max-w-md rounded-3xl shadow-2xl border border-[#2a2e3f] p-6 animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-base font-black text-white mb-2">Delete Service?</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-6">
              Are you sure you want to delete <strong className="text-white">&quot;{serviceToDelete?.name}&quot;</strong>? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setDeleteConfirmOpen(false);
                  setServiceToDelete(null);
                }}
                className="px-4.5 py-2 rounded-xl border border-[#2a2e3f] bg-[#0f111a] text-xs font-bold text-slate-300 hover:bg-[#252b3b] transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md shadow-rose-500/20 transition cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
