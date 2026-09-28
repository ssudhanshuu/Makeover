"use client";
import { useState, useEffect } from "react";
import { Loader2, Trash2, Mail, Phone, Calendar, Clock, Sparkles } from "lucide-react";

export default function AdminLeads() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/leads");
      const json = await res.json();
      if (json.success) {
        setLeads(json.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setLeads(leads.map(lead => lead._id === id ? { ...lead, status: newStatus } : lead));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this lead?")) return;
    try {
      const res = await fetch(`/api/leads/${id}`, { method: "DELETE" });
      if (res.ok) {
        setLeads(leads.filter(lead => lead._id !== id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "New": return "bg-blue-50 text-blue-700 border-blue-200";
      case "Contacted": return "bg-amber-50 text-amber-700 border-amber-200";
      case "In Progress": return "bg-purple-50 text-purple-700 border-purple-200";
      case "Converted": return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Closed": return "bg-slate-100 text-slate-600 border-slate-200";
      default: return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  if (loading) {
    return <div className="p-10 text-center"><Loader2 className="animate-spin inline text-pink-600" /></div>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight font-playfair">Leads & Contacts</h1>
        <p className="text-slate-500 mt-1">Manage inquiries from website forms.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {leads.length === 0 ? (
          <div className="col-span-full py-20 text-center text-slate-500">No leads found.</div>
        ) : (
          leads.map((lead) => (
            <div key={lead._id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
              <div className="p-5 border-b border-slate-100 flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-slate-900">{lead.name}</h3>
                  <div className="text-xs text-slate-400 mt-0.5">{new Date(lead.createdAt).toLocaleString()}</div>
                </div>
                <span className={`px-2 py-1 text-[10px] uppercase font-bold tracking-wider rounded border ${lead.type === "Booking" ? "bg-rose-50 text-rose-700 border-rose-100" : "bg-indigo-50 text-indigo-700 border-indigo-100"}`}>
                  {lead.type}
                </span>
              </div>
              
              <div className="p-5 flex-1 space-y-3 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <Phone size={14} className="text-slate-400" /> 
                  <a href={`tel:${lead.phone}`} className="hover:text-pink-600 transition">{lead.phone}</a>
                </div>
                {lead.email && (
                  <div className="flex items-center gap-2">
                    <Mail size={14} className="text-slate-400" /> 
                    <a href={`mailto:${lead.email}`} className="hover:text-pink-600 transition truncate">{lead.email}</a>
                  </div>
                )}
                
                {lead.type === "Booking" && (
                  <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
                    <div className="flex items-start gap-2">
                      <Sparkles size={14} className="text-pink-500 shrink-0 mt-0.5" /> 
                      <span className="font-medium text-slate-800">{lead.service}</span>
                    </div>
                    {(lead.date || lead.time) && (
                      <div className="flex items-center gap-3 text-xs">
                        {lead.date && <span className="flex items-center gap-1"><Calendar size={12} className="text-slate-400"/> {lead.date}</span>}
                        {lead.time && <span className="flex items-center gap-1"><Clock size={12} className="text-slate-400"/> {lead.time}</span>}
                      </div>
                    )}
                  </div>
                )}

                {(lead.message || lead.requests) && (
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <div className="text-xs font-bold text-slate-400 uppercase mb-1">Message / Request</div>
                    <p className="text-sm italic bg-slate-50 p-3 rounded-xl border border-slate-100 line-clamp-3">
                      &quot;{lead.message || lead.requests}&quot;
                    </p>
                  </div>
                )}
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <select 
                  value={lead.status}
                  onChange={(e) => handleStatusChange(lead._id, e.target.value)}
                  className={`text-xs font-bold rounded-lg px-2.5 py-1.5 border outline-none cursor-pointer ${getStatusColor(lead.status)}`}
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Converted">Converted</option>
                  <option value="Closed">Closed</option>
                </select>

                <button 
                  onClick={() => handleDelete(lead._id)}
                  className="p-1.5 text-slate-400 hover:bg-white hover:text-rose-600 rounded-lg shadow-sm transition"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
