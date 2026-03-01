"use client";
import { useState } from 'react';
import { Home, Search, Library, Plus, Menu } from 'lucide-react';

export default function Sidebar() {
  // Sekarang manual aja, gak pake auto-collapse kalau layarnya sempit
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Komponen kecil buat menu biar rapi
  const NavItem = ({ icon: Icon, label, active = false }: { icon: any, label: string, active?: boolean }) => (
    <button 
      title={isCollapsed ? label : ""} 
      className={`w-full flex items-center gap-4 py-3 rounded-xl transition-all duration-300 overflow-hidden
        ${isCollapsed ? 'px-0 justify-center' : 'px-4 justify-start'}
        ${active 
          ? 'bg-white/10 text-white shadow-[0_0_15px_rgba(255,255,255,0.05)]' 
          : 'text-gray-400 hover:text-white hover:bg-white/5'
        }
      `}
    >
      <Icon size={24} className="flex-shrink-0" />
      {!isCollapsed && (
        <span className="font-semibold text-sm truncate animate-in fade-in duration-300">
          {label}
        </span>
      )}
    </button>
  );

  return (
    <div 
      className={`h-screen bg-[#121212]/80 backdrop-blur-xl border-r border-white/5 flex flex-col transition-all duration-500 ease-in-out z-40 relative flex-shrink-0 
      ${isCollapsed ? 'w-20' : 'w-64'}`}
    >
      {/* HEADER: Tombol Garis Tiga (Kiri) & Logo (Kanan) */}
      <div className={`p-6 flex items-center mb-4 transition-all gap-4 ${isCollapsed ? 'justify-center' : 'justify-start'}`}>
        
        {/* Tombol Garis Tiga sekarang ada di kiri logo */}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)} 
          className="p-2 bg-white/5 hover:bg-white/15 rounded-xl text-gray-400 hover:text-white transition-all focus:outline-none flex-shrink-0"
        >
          <Menu size={20} />
        </button>

        {/* Logo hanya muncul kalau Sidebar lagi kebuka */}
        {!isCollapsed && (
          <h1 className="text-2xl font-bold text-white tracking-tighter animate-in fade-in slide-in-from-left-4 truncate">
            mf<span className="text-purple-500">.</span>fm
          </h1>
        )}
      </div>

      {/* MENU UTAMA */}
      <div className="flex-1 px-3 space-y-2">
        <NavItem icon={Home} label="Home" active={true} />
        <NavItem icon={Search} label="Explore" />
        <NavItem icon={Library} label="Your Library" />
      </div>

      {/* FOOTER Bawah */}
      <div className="p-3 mb-24 border-t border-white/5">
        <button 
          className={`w-full flex items-center gap-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-300
            ${isCollapsed ? 'px-0 justify-center' : 'px-4 justify-start'}
          `}
        >
          <div className="p-1 bg-white/10 rounded-md flex-shrink-0">
            <Plus size={16} className="text-white" />
          </div>
          {!isCollapsed && <span className="font-semibold text-sm truncate animate-in fade-in duration-300">New Playlist</span>}
        </button>
      </div>
    </div>
  );
}