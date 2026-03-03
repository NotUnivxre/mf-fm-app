"use client";
import { useState, useRef, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { usePlayerStore } from '../../../store/usePlayerStore';
import { Play, Search, MoreVertical, Edit2, Trash2 } from 'lucide-react';

export default function PlaylistDetail() {
  const params = useParams();
  const playlistId = params.id as string;
  const router = useRouter();
  
  const playlists = usePlayerStore((state) => state.playlists);
  const allTracks = usePlayerStore((state) => state.allTracks);
  const playPlaylist = usePlayerStore((state) => state.playPlaylist);
  const updatePlaylistName = usePlayerStore((state) => state.updatePlaylistName);
  const deletePlaylist = usePlayerStore((state) => state.deletePlaylist);

  // Popup state buat menu Delete
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const playlist = playlists.find(p => p.id === playlistId);

  // Tutup menu kalau klik di luar
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMoreMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!playlist) {
    return <div className="p-10 text-white flex items-center justify-center h-screen"><p>Playlist not found</p></div>;
  }

  // Tarik data lagu lengkap berdasarkan ID yang ada di playlist
  const tracks = playlist.tracks.map(id => allTracks.find(t => t.id === id)).filter(Boolean) as any[];

  // --- LOGIKA KOVER CAMPURAN ---
  // Default logo mf.fm kalo playlist kosong
  let coverImage;
  const numTracks = tracks.length;

  if (numTracks === 0) {
    coverImage = <div className="w-full h-full bg-[#1c1c1e] flex items-center justify-center text-5xl font-bold text-white tracking-tighter">mf.fm</div>;
  } else if (numTracks < 4) {
    // Kalo < 4, pake cover lagu pertama
    coverImage = <img src={tracks[0].coverImageUrl} alt={playlist.name} className="w-full h-full object-cover" />;
  } else {
    // Kalo >= 4, bikin grid campuran 4 cover pertama
    coverImage = (
      <div className="grid grid-cols-2 grid-rows-2 w-full h-full shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
        <img src={tracks[0].coverImageUrl} className="w-full h-full object-cover" alt="c1" />
        <img src={tracks[1].coverImageUrl} className="w-full h-full object-cover" alt="c2" />
        <img src={tracks[2].coverImageUrl} className="w-full h-full object-cover" alt="c3" />
        <img src={tracks[3].coverImageUrl} className="w-full h-full object-cover" alt="c4" />
      </div>
    );
  }
  // --- END LOGIKA KOVER ---

  // FUNGSI GANTI NAMA PLAYLIST
  const handleRenamePlaylist = () => {
    const newName = prompt("Rename playlist to:", playlist.name);
    if (newName && newName !== playlist.name) {
      updatePlaylistName(playlist.id, newName);
    }
  };

  // FUNGSI HAPUS PLAYLIST
  const handleDeletePlaylist = () => {
    const confirmDelete = window.confirm(`Are you sure you want to delete playlist "${playlist.name}"?`);
    if (confirmDelete) {
      deletePlaylist(playlist.id);
      router.push('/playlists'); // Balik ke halaman playlists
    }
  };

  return (
    <div className="p-6 md:p-10 w-full min-h-screen text-white pb-32 bg-[#0a0a0a] animate-in fade-in duration-500 font-sans">
      
      {/* SEARCH BAR (Tengah) */}
      <div className="flex justify-center mb-12 relative z-10">
        <div className="relative w-full max-w-2xl group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-400 transition-colors" size={20} />
          <input type="text" placeholder="Search for tracks in this playlist..." className="w-full bg-[#121212]/80 backdrop-blur-xl border border-white/10 rounded-full py-4 pl-14 pr-6 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/30 transition-all shadow-lg" />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 max-w-7xl mx-auto">
        
        {/* KIRI: Info Playlist & Kover Campuran */}
        <div className="flex flex-col items-center lg:items-start lg:w-1/3 flex-shrink-0 text-center lg:text-left sticky top-10 h-fit animate-in fade-in slide-in-from-left-5 duration-700">
          <div className="w-64 h-64 md:w-[320px] md:h-[320px] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] mb-6 border border-white/10 relative group bg-[#111] border border-white/5">
            {coverImage}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight leading-none text-white pb-1">{playlist.name}</h1>
          <div className="flex items-center justify-center lg:justify-start gap-3 text-sm text-gray-300 mb-2">
             <span className="w-7 h-7 rounded-full bg-purple-600 flex items-center justify-center text-white text-xs font-bold shadow-[0_0_10px_rgba(168,85,247,0.5)] border border-purple-500">Z</span>
             <span className="font-semibold text-gray-200">Zet Creator</span>
          </div>
          <p className="text-sm text-gray-400 mb-8 font-medium">Updated 2 mins ago • {tracks.length} tracks</p>
          
          <div className="flex items-center gap-4 relative">
            {/* TOMBOL TENGAH: PLAY FULL PLAYLIST */}
            <button 
              onClick={() => tracks.length > 0 && playPlaylist(playlist.tracks)}
              disabled={tracks.length === 0}
              className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-white hover:scale-105 active:scale-95 transition shadow-[0_0_20px_rgba(168,85,247,0.4)] disabled:bg-gray-700 disabled:shadow-none"
            >
              <Play size={30} fill="white" className="ml-1" />
            </button>
            
            {/* TOMBOL KANAN: EDIT NAMA */}
            <button 
              onClick={handleRenamePlaylist}
              className="p-4 bg-white/5 hover:bg-white/10 rounded-full text-gray-300 hover:text-white transition-all border border-white/5"
              title="Rename Playlist"
            >
              <Edit2 size={22} />
            </button>
            
            {/* TOMBOL KANAN: MORE MENU (DELETE) */}
            <button 
              onClick={() => setShowMoreMenu(!showMoreMenu)}
              className={`p-4 rounded-full transition-all border border-white/5 ${showMoreMenu ? 'bg-purple-600/20 text-purple-400' : 'bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white'}`}
              title="More Options"
            >
              <MoreVertical size={22} />
            </button>

            {/* POPUP MENU UNGU SUPER CLEAN */}
            {showMoreMenu && (
              <div ref={menuRef} className="absolute top-20 left-1/2 -translate-x-1/2 bg-[#1c1c1e] border border-white/10 p-2 rounded-2xl shadow-[0_15px_50px_rgba(0,0,0,0.6)] flex flex-col w-48 z-50 animate-in fade-in zoom-in duration-200 backdrop-blur-3xl">
                <button
                  onClick={handleDeletePlaylist}
                  className="text-left px-5 py-3 rounded-xl text-sm font-semibold text-red-400 hover:bg-red-500/10 flex items-center gap-3 transition-colors"
                >
                  <Trash2 size={16} /> Delete Playlist
                </button>
              </div>
            )}

          </div>
        </div>

        {/* KANAN: Daftar Lagu */}
        <div className="flex-1 w-full mt-8 lg:mt-0 animate-in fade-in slide-in-from-right-5 duration-700">
           {tracks.length === 0 ? (
             <div className="flex items-center justify-center h-40 border border-white/5 bg-[#121212]/50 rounded-2xl backdrop-blur-sm">
               <p className="text-gray-400">Playlist ini masih kosong melompong Zet.</p>
             </div>
           ) : (
             <div className="flex flex-col gap-2">
               {tracks.map((track, index) => (
                 <div 
                   key={index} 
                   onClick={() => playPlaylist(playlist.tracks.slice(index))}
                   className="flex items-center justify-between p-3 rounded-xl hover:bg-white/10 transition-all cursor-pointer group"
                 >
                    <div className="flex items-center gap-4 w-full">
                      <span className="w-6 text-center text-gray-500 font-medium group-hover:hidden">{index + 1}</span>
                      <Play size={16} fill="white" className="w-6 text-white hidden group-hover:block drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
                      <img src={track.coverImageUrl} alt={track.title} className="w-12 h-12 rounded-lg object-cover border border-white/5 shadow-md flex-shrink-0" />
                      <div className="flex flex-col overflow-hidden w-full">
                        <span className="font-semibold text-white group-hover:text-purple-400 transition-colors truncate">{track.title}</span>
                        <span className="text-sm text-gray-400 truncate mt-1">{track.artist} • independent release</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 text-gray-500 pl-4">
                      <MoreVertical size={18} className="opacity-0 group-hover:opacity-100 transition-opacity hover:text-white" />
                    </div>
                 </div>
               ))}
             </div>
           )}
        </div>
      </div>
    </div>
  );
}