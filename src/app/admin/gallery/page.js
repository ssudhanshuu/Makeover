"use client";
import { useState, useEffect } from "react";
import { Plus, Trash2, Loader2, Image as ImageIcon, Film, UploadCloud } from "lucide-react";
import Image from "next/image";

export default function AdminGallery() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [type, setType] = useState("photo"); // "photo" or "video"
  
  // File upload state
  const [uploadingMedia, setUploadingMedia] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  
  const [formData, setFormData] = useState({
    src: "",
    thumb: "",
    label: "",
    title: "",
    duration: "",
    youtubeId: "",
  });

  const fetchGallery = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/gallery");
      const json = await res.json();
      if (json.success) {
        setItems([...json.photos, ...json.videos]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploadingMedia(true);
    
    try {
      let finalSrc = formData.src;
      let finalThumb = formData.thumb;

      // If a file was selected, upload it first to Cloudinary
      if (selectedFile) {
        const fileData = new FormData();
        fileData.append("file", selectedFile);
        
        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: fileData,
        });
        const uploadJson = await uploadRes.json();
        
        if (uploadJson.success) {
          if (type === "photo") {
            finalSrc = uploadJson.url;
          } else {
            finalThumb = uploadJson.url;
          }
        } else {
          alert("Image upload failed: " + uploadJson.error);
          setUploadingMedia(false);
          return;
        }
      }

      // Create new gallery item with the URL
      const res = await fetch("/api/gallery/manage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          ...formData, 
          src: finalSrc, 
          thumb: finalThumb,
          type 
        }),
      });
      
      if (res.ok) {
        setIsModalOpen(false);
        fetchGallery();
      }
    } catch (error) {
      console.error(error);
      alert("Failed to process request.");
    } finally {
      setUploadingMedia(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this media item?")) return;
    try {
      const res = await fetch(`/api/gallery/manage?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchGallery();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const openAddModal = (itemType) => {
    setType(itemType);
    setSelectedFile(null);
    setFormData({ src: "", thumb: "", label: "", title: "", duration: "", youtubeId: "" });
    setIsModalOpen(true);
  };

  if (loading) return <div className="p-10 text-center"><Loader2 className="animate-spin inline text-pink-600" /></div>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight font-playfair">Gallery Management</h1>
          <p className="text-slate-500 mt-1">Manage portfolio photos and videos.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => openAddModal("photo")} className="bg-pink-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-pink-700 text-sm font-semibold">
            <ImageIcon size={16} /> Add Photo
          </button>
          <button onClick={() => openAddModal("video")} className="bg-slate-800 text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-slate-900 text-sm font-semibold">
            <Film size={16} /> Add Video
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {items.map((item) => (
          <div key={item._id} className="relative group bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm">
            <div className="aspect-square relative bg-slate-100">
              <Image 
                src={item.type === "photo" ? item.src : item.thumb} 
                alt={item.label || item.title || "Gallery Item"} 
                fill 
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 20vw"
              />
              {item.type === "video" && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <Film className="text-white drop-shadow-md" size={32} />
                </div>
              )}
            </div>
            <div className="p-3">
              <p className="text-xs font-bold text-slate-800 truncate">{item.type === "photo" ? item.label : item.title}</p>
              <p className="text-[10px] text-slate-400 uppercase mt-0.5">{item.type}</p>
            </div>
            
            <button 
              onClick={() => handleDelete(item._id)}
              className="absolute top-2 right-2 w-8 h-8 bg-white/90 backdrop-blur rounded-lg flex items-center justify-center text-rose-600 opacity-0 group-hover:opacity-100 transition shadow-sm hover:bg-rose-50"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add {type === "photo" ? "Photo" : "Video"}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {type === "photo" ? (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Upload Image</label>
                    <input type="file" accept="image/*" onChange={handleFileChange} className="w-full border border-slate-200 rounded-xl p-2 text-sm outline-none focus:border-pink-500 mb-2" />
                    <div className="text-center text-xs font-bold text-slate-400 my-1">OR</div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Image URL</label>
                    <input type="url" value={formData.src} onChange={e => {setFormData({...formData, src: e.target.value}); setSelectedFile(null);}} placeholder="https://..." className="w-full border border-slate-200 rounded-xl p-2.5 text-sm outline-none focus:border-pink-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Label (Optional)</label>
                    <input type="text" value={formData.label} onChange={e => setFormData({...formData, label: e.target.value})} placeholder="e.g. Bridal Makeup" className="w-full border border-slate-200 rounded-xl p-2.5 text-sm outline-none focus:border-pink-500" />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">YouTube Video ID</label>
                    <input required type="text" value={formData.youtubeId} onChange={e => setFormData({...formData, youtubeId: e.target.value})} placeholder="e.g. dQw4w9WgXcQ" className="w-full border border-slate-200 rounded-xl p-2.5 text-sm outline-none focus:border-pink-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Upload Thumbnail Image</label>
                    <input type="file" accept="image/*" onChange={handleFileChange} className="w-full border border-slate-200 rounded-xl p-2 text-sm outline-none focus:border-pink-500 mb-2" />
                    <div className="text-center text-xs font-bold text-slate-400 my-1">OR</div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Thumbnail URL</label>
                    <input type="url" value={formData.thumb} onChange={e => {setFormData({...formData, thumb: e.target.value}); setSelectedFile(null);}} className="w-full border border-slate-200 rounded-xl p-2.5 text-sm outline-none focus:border-pink-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Title</label>
                    <input type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full border border-slate-200 rounded-xl p-2.5 text-sm outline-none focus:border-pink-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Duration</label>
                    <input type="text" value={formData.duration} onChange={e => setFormData({...formData, duration: e.target.value})} placeholder="e.g. 5:30" className="w-full border border-slate-200 rounded-xl p-2.5 text-sm outline-none focus:border-pink-500" />
                  </div>
                </>
              )}

              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-slate-100">
                <button type="button" disabled={uploadingMedia} onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded-xl text-sm font-semibold hover:bg-slate-50 disabled:opacity-50">Cancel</button>
                <button type="submit" disabled={uploadingMedia} className="px-4 py-2 bg-pink-600 text-white rounded-xl text-sm font-semibold hover:bg-pink-700 disabled:opacity-50 flex items-center gap-2">
                  {uploadingMedia ? <Loader2 size={16} className="animate-spin" /> : (type === "photo" ? "Add Photo" : "Add Video")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
