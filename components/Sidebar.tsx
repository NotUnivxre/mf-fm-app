"use client";
import Image from 'next/image'; 
import Link from 'next/link';
import { Home, Search, Radio, Library, Disc, Heart, UploadCloud, Settings } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  const renderLinks = (links: any[]) => {
    return links.map((link) => {
      const Icon = link.icon;
      const isActive = pathname === link.href;
      return (
        <Link 
          key={link.href} 
          href={link.href} 
          className={`flex items-center gap-4 px-4 py-2.5 rounded-full transition-all duration-200 ${
            isActive 
              ? 'bg-purple-500 text-white font-semibold shadow-md' 
              : 'text-gray-400 hover:text-white hover:bg-white/5 font-medium'
          }`}
        >
          <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
          <span className="text-sm">{link.label}</span>
        </Link>
      );
    });
  };

  return (
    <aside className="w-64 bg-[#111111] h-screen flex flex-col p-6 text-white border-r border-[#222] overflow-y-auto no-scrollbar">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-8 pl-2 mt-4">
        <Image src="/logo_baru.png" alt="mf.fm Logo" width={32} height={32} className="object-contain" />
        <h1 className="text-xl font-bold tracking-tight text-purple-500">mf.fm</h1>
      </div>
      
      {/* Kategori: MAIN */}
      <div className="mb-6">
        <p className="text-[10px] font-bold text-gray-500 tracking-widest mb-3 pl-4">MAIN</p>
        <nav className="flex flex-col gap-1">
          {renderLinks([
            { href: '/', icon: Home, label: 'Home' },
            { href: '/explore', icon: Search, label: 'Explore' },
            { href: '/live', icon: Radio, label: 'Live' },
          ])}
        </nav>
      </div>

      {/* Kategori: LIBRARY */}
      <div className="mb-6">
        <p className="text-[10px] font-bold text-gray-500 tracking-widest mb-3 pl-4">LIBRARY</p>
        <nav className="flex flex-col gap-1">
          {renderLinks([
            { href: '/library', icon: Library, label: 'Collection' },
            { href: '/playlists', icon: Disc, label: 'Playlists' },
            { href: '/likes', icon: Heart, label: 'Likes' },
          ])}
        </nav>
      </div>

      {/* Kategori: CREATOR */}
      <div className="flex-1">
        <p className="text-[10px] font-bold text-gray-500 tracking-widest mb-3 pl-4">CREATOR</p>
        <nav className="flex flex-col gap-1">
          {renderLinks([
            { href: '/studio', icon: UploadCloud, label: 'Studio' },
          ])}
        </nav>
      </div>

      {/* Kategori: SYSTEM (Bawah Sendiri) */}
      <div className="mt-auto pt-4 border-t border-[#222]">
        <nav className="flex flex-col gap-1">
          {renderLinks([
            { href: '/settings', icon: Settings, label: 'System' },
          ])}
        </nav>
      </div>
    </aside>
  );
}