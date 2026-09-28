"use client";
import { useState, useEffect } from "react";
import { Plus, Trash2, Edit3, Loader2, IndianRupee } from "lucide-react";

export default function AdminCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    duration: "",
    price: "",
    icon: "🎓",
    tag: "",
    status: "Published",
  });

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/courses");
      const json = await res.json();
      if (json.success) {
        setCourses(json.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleOpenAdd = () => {
    setEditingCourse(null);
    setFormData({ name: "", description: "", duration: "", price: "", icon: "🎓", tag: "", status: "Published" });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (course) => {
    setEditingCourse(course);
    setFormData({
      name: course.name,
      description: course.description,
      duration: course.duration,
      price: course.price.toString(),
      icon: course.icon || "🎓",
      tag: course.tag || "",
      status: course.status || "Published",
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...formData, price: Number(formData.price) };
    
    try {
      const url = editingCourse ? `/api/courses/${editingCourse._id}` : "/api/courses";
      const method = editingCourse ? "PUT" : "POST";
      
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      
      if (res.ok) {
        setIsModalOpen(false);
        fetchCourses();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this course?")) return;
    try {
      const res = await fetch(`/api/courses/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchCourses();
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <div className="p-10 text-center"><Loader2 className="animate-spin inline text-blue-500" /></div>;
  }

    <div className="p-6 max-w-7xl mx-auto flex flex-col font-sans">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight font-playfair">Manage Courses</h1>
          <p className="text-slate-400 mt-1">Add, edit, or remove training courses.</p>
        </div>
        <button onClick={handleOpenAdd} className="bg-blue-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-blue-700 shadow-md shadow-blue-500/20">
          <Plus size={18} /> Add Course
        </button>
      </div>

      <div className="bg-[#1a1d27] rounded-2xl border border-[#2a2e3f] shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-[#252b3b] border-b border-[#2a2e3f] text-xs text-slate-400 uppercase font-bold">
            <tr>
              <th className="p-4">Course Details</th>
              <th className="p-4">Duration & Price</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2a2e3f]">
            {courses.map(course => (
              <tr key={course._id} className="hover:bg-[#252b3b]/50 transition">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{course.icon}</div>
                    <div>
                      <div className="font-bold text-white">{course.name}</div>
                      <div className="text-xs text-slate-400 mt-1 line-clamp-1 max-w-sm">{course.description}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4 whitespace-nowrap">
                  <div className="text-sm font-semibold text-white">{course.duration}</div>
                  <div className="text-sm text-slate-400 flex items-center mt-1">
                    <IndianRupee size={12} /> {course.price}
                  </div>
                </td>
                <td className="p-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full font-bold ${course.status === "Published" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-[#252b3b] text-slate-400 border border-[#2a2e3f]"}`}>
                    {course.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button onClick={() => handleOpenEdit(course)} className="text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 p-2 rounded-xl transition"><Edit3 size={18} /></button>
                  <button onClick={() => handleDelete(course._id)} className="text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 p-2 rounded-xl transition"><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#1a1d27] border border-[#2a2e3f] rounded-3xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
            <h2 className="text-xl font-bold mb-4 text-white">{editingCourse ? "Edit Course" : "Add Course"}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Name</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-[#0f111a] border border-[#2a2e3f] text-white rounded-xl p-2.5 text-sm outline-none focus:border-blue-500" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Price (INR)</label>
                  <input required type="number" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full bg-[#0f111a] border border-[#2a2e3f] text-white rounded-xl p-2.5 text-sm outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Duration</label>
                  <input required type="text" value={formData.duration} onChange={e => setFormData({...formData, duration: e.target.value})} placeholder="e.g. 4 Weeks" className="w-full bg-[#0f111a] border border-[#2a2e3f] text-white rounded-xl p-2.5 text-sm outline-none focus:border-blue-500" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Description</label>
                <textarea rows="3" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-[#0f111a] border border-[#2a2e3f] text-white rounded-xl p-2.5 text-sm outline-none focus:border-blue-500 resize-none"></textarea>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Icon</label>
                  <input type="text" value={formData.icon} onChange={e => setFormData({...formData, icon: e.target.value})} className="w-full bg-[#0f111a] border border-[#2a2e3f] text-white rounded-xl p-2.5 text-sm outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Tag</label>
                  <input type="text" value={formData.tag} onChange={e => setFormData({...formData, tag: e.target.value})} className="w-full bg-[#0f111a] border border-[#2a2e3f] text-white rounded-xl p-2.5 text-sm outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Status</label>
                  <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full bg-[#0f111a] border border-[#2a2e3f] text-white rounded-xl p-2.5 text-sm outline-none focus:border-blue-500">
                    <option>Published</option>
                    <option>Unpublished</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-[#2a2e3f]">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border border-[#2a2e3f] bg-[#0f111a] text-slate-300 rounded-xl text-sm font-semibold hover:bg-[#252b3b] transition">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 shadow-md shadow-blue-500/20 transition">Save Course</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
