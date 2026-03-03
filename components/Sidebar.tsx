"use client";
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, Library, Plus, Menu, Heart, Mic2 } from 'lucide-react';
import { usePlayerStore } from '../store/usePlayerStore';

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname(); 
  const createPlaylist = usePlayerStore((state) => state.createPlaylist); // Sinkron!

  const NavItem = ({ icon: Icon, label, href }: { icon: any, label: string, href: string }) => {
    const active = pathname === href; 
    return (
      <Link 
        href={href}
        title={isCollapsed ? label : ""} 
        className={`w-full flex items-center gap-4 py-3 rounded-xl transition-all duration-300 overflow-hidden
          ${isCollapsed ? 'px-0 justify-center' : 'px-4 justify-start'}
          ${active ? 'bg-white/20 text-white shadow-[0_0_20px_rgba(255,255,255,0.15)] border border-white/10' : 'text-gray-400 hover:text-white hover:bg-white/5'}
        `}
      >
        <Icon size={24} className="flex-shrink-0" />
        {!isCollapsed && <span className="font-semibold text-sm truncate animate-in fade-in duration-300">{label}</span>}
      </Link>
    );
  };

  return (
    <div className={`h-screen bg-[#121212]/95 backdrop-blur-xl border-r border-white/5 flex flex-col transition-all duration-500 ease-in-out z-50 flex-shrink-0 absolute md:relative ${isCollapsed ? 'w-20 translate-x-0' : 'w-64 translate-x-0'}`}>
      <div className={`p-6 flex items-center mb-4 transition-all gap-4 ${isCollapsed ? 'justify-center' : 'justify-start'}`}>
        <button onClick={() => setIsCollapsed(!isCollapsed)} className="p-2 bg-white/5 hover:bg-white/15 rounded-xl text-gray-400 hover:text-white transition-all focus:outline-none flex-shrink-0">
          <Menu size={20} />
        </button>
        {!isCollapsed && <h1 className="text-2xl font-bold text-white tracking-tighter truncate">mf<span className="text-purple-500">.</span>fm</h1>}
      </div>

      <div className="flex-1 px-3 space-y-8 overflow-y-auto no-scrollbar pb-24">
        <div className="space-y-2">
          <NavItem href="/" icon={Home} label="Home" />
          <NavItem href="/explore" icon={Search} label="Explore" />
        </div>
        <div className="space-y-2">
          {!isCollapsed && <p className="px-4 text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-3">Your Library</p>}
          <NavItem href="/playlists" icon={Library} label="Playlists" />
          <NavItem href="/liked" icon={Heart} label="Liked Songs" />
        </div>
        <div className="space-y-2">
          {!isCollapsed && <p className="px-4 text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-3">Creator</p>}
          <NavItem href="/studio" icon={Mic2} label="Studio Lab" />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full p-3 bg-[#121212] border-t border-white/5 z-10">
        <button 
          onClick={() => {
            const name = prompt("Masukkan nama Playlist baru:");
            if (name) createPlaylist(name);
          }} 
          className={`w-full flex items-center gap-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-300 ${isCollapsed ? 'px-0 justify-center' : 'px-4 justify-start'}`}
        >
          <div className="p-1 bg-white/10 rounded-md flex-shrink-0"><Plus size={16} className="text-white" /></div>
          {!isCollapsed && <span className="font-semibold text-sm truncate">New Playlist</span>}
        </button>
      </div>
    </div>
  );
}