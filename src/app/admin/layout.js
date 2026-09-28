"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  Scissors, 
  Image as ImageIcon, 
  GraduationCap, 
  Users, 
  LogOut, 
  Sparkles,
  Menu,
  X
} from "lucide-react";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Don't show sidebar on login page
  if (pathname === "/admin/login") {
    return children;
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (err) {
      console.error(err);
    }
  };

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: <LayoutDashboard size={20} /> },
    { name: "Services", href: "/admin/services", icon: <Scissors size={20} /> },
    { name: "Gallery", href: "/admin/gallery", icon: <ImageIcon size={20} /> },
    { name: "Courses", href: "/admin/courses", icon: <GraduationCap size={20} /> },
    { name: "Leads & Contacts", href: "/admin/leads", icon: <Users size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-[#0f111a] text-slate-300 font-sans">
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-[#000000]/70 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar — fixed on all screens */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#1a1d27] border-r border-[#2a2e3f] transform transition-transform duration-300 lg:translate-x-0 ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="h-20 flex items-center justify-between px-6 border-b border-[#2a2e3f]">
          <Link href="/admin" className="flex items-center gap-2 text-xl font-black text-white font-playfair tracking-tight">
            <Sparkles size={22} className="text-blue-400" />
            Admin Panel
          </Link>
          <button className="lg:hidden text-slate-400 hover:text-white" onClick={() => setMobileMenuOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <div className="p-4 flex flex-col h-[calc(100vh-80px)] overflow-y-auto">
          <nav className="flex-1 space-y-1.5">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition ${
                    isActive 
                      ? "bg-[#252b3b] text-blue-400" 
                      : "text-slate-400 hover:bg-[#252b3b] hover:text-slate-200"
                  }`}
                >
                  {item.icon}
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="pt-4 border-t border-[#2a2e3f] mt-auto space-y-2">
            <Link 
              href="/" 
              target="_blank"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-slate-400 hover:bg-[#252b3b] hover:text-slate-200 transition"
            >
              <Sparkles size={20} />
              View Website
            </Link>
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-rose-400 hover:bg-rose-400/10 transition"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content — offset by sidebar width on desktop */}
      <div className="lg:ml-64 flex flex-col h-screen overflow-hidden">
        {/* Mobile Header — sticky at top */}
        <header className="lg:hidden shrink-0 h-16 bg-[#1a1d27]/95 backdrop-blur-md border-b border-[#2a2e3f] flex items-center px-4 z-30">
          <button 
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 -ml-2 text-slate-400 hover:bg-[#252b3b] rounded-lg"
          >
            <Menu size={24} />
          </button>
          <span className="ml-2 font-bold font-playfair text-white">Ruchi Makeover Admin</span>
        </header>

        <main className="flex-1 overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
