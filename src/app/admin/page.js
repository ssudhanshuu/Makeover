"use client";
import { useState, useEffect } from "react";
import { Users, Scissors, Image as ImageIcon, GraduationCap, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    services: 0,
    gallery: 0,
    courses: 0,
    leads: 0,
    recentLeads: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [servicesRes, galleryRes, coursesRes, leadsRes] = await Promise.all([
          fetch("/api/services").then(res => res.json()),
          fetch("/api/gallery").then(res => res.json()),
          fetch("/api/courses").then(res => res.json()),
          fetch("/api/leads").then(res => res.json()),
        ]);

        const galleryCount = (galleryRes.photos?.length || 0) + (galleryRes.videos?.length || 0);
        
        setStats({
          services: servicesRes.data?.length || 0,
          gallery: galleryCount,
          courses: coursesRes.data?.length || 0,
          leads: leadsRes.data?.length || 0,
          recentLeads: leadsRes.data?.slice(0, 5) || []
        });
      } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    { title: "Total Services", value: stats.services, icon: <Scissors size={24} />, color: "bg-pink-500/10 text-pink-400", link: "/admin/services" },
    { title: "Gallery Items", value: stats.gallery, icon: <ImageIcon size={24} />, color: "bg-purple-500/10 text-purple-400", link: "/admin/gallery" },
    { title: "Total Courses", value: stats.courses, icon: <GraduationCap size={24} />, color: "bg-blue-500/10 text-blue-400", link: "/admin/courses" },
    { title: "Total Leads", value: stats.leads, icon: <Users size={24} />, color: "bg-emerald-500/10 text-emerald-400", link: "/admin/leads" },
  ];

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center p-20">
        <Loader2 size={32} className="animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] lg:h-screen">
      {/* ── Fixed Top Section ── */}
      <div className="shrink-0 bg-[#0f111a] px-4 pt-4 pb-0">
        <div className="max-w-7xl mx-auto">
          <div className="mb-3">
            <h1 className="text-xl font-black text-white tracking-tight font-playfair">Dashboard Overview</h1>
            <p className="text-slate-400 text-sm mt-0.5">Welcome back to the Ruchi Makeover admin panel.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
            {statCards.map((stat, i) => (
              <Link key={i} href={stat.link} className="bg-[#1a1d27] p-3.5 rounded-xl border border-[#2a2e3f] shadow-sm flex items-start justify-between hover:border-slate-600 hover:bg-[#252b3b] transition group">
                <div>
                  <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-0.5">{stat.title}</p>
                  <h3 className="text-2xl font-black text-white">{stat.value}</h3>
                </div>
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform`}>
                  {stat.icon}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── Scrollable Content ── */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Leads */}
            <div className="bg-[#1a1d27] rounded-2xl border border-[#2a2e3f] shadow-sm overflow-hidden">
              <div className="px-6 py-5 border-b border-[#2a2e3f] flex items-center justify-between">
                <h3 className="font-bold text-white">Recent Leads</h3>
                <Link href="/admin/leads" className="text-sm text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1">
                  View All <ArrowRight size={16} />
                </Link>
              </div>
              <div className="divide-y divide-[#2a2e3f]">
                {stats.recentLeads.length === 0 ? (
                  <div className="p-6 text-center text-slate-500 text-sm">No recent leads.</div>
                ) : (
                  stats.recentLeads.map((lead) => (
                    <div key={lead._id} className="p-6 flex items-start justify-between hover:bg-[#252b3b] transition">
                      <div>
                        <h4 className="font-bold text-white">{lead.name}</h4>
                        <p className="text-sm text-slate-400">{lead.phone}</p>
                        <p className="text-xs text-slate-500 mt-1">{new Date(lead.createdAt).toLocaleDateString()}</p>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                        lead.type === "Booking" ? "bg-purple-500/10 text-purple-400 border border-purple-500/20" : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                      }`}>
                        {lead.type}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
